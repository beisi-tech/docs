from __future__ import annotations
import os
from pathlib import Path
from typing import List, AsyncGenerator
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel, Field
from dotenv import load_dotenv
import dashscope
from dashscope.aigc.generation import AioGeneration
from langchain_community.vectorstores import FAISS
from langchain_community.embeddings import DashScopeEmbeddings
from langchain_core.documents import Document

# 加载环境变量
load_dotenv(dotenv_path=Path(__file__).resolve().parents[1] / "config" / ".env")

# 初始化DashScope API
DASHSCOPE_API_KEY = os.getenv("DASHSCOPE_API_KEY")
BASE_URL = os.getenv("OPENAI_BASE_URL")
MODEL_NAME = os.getenv("MODEL_NAME", "qwen-plus")
TOP_K_DEFAULT = int(os.getenv("TOP_K", "4"))

# 初始化 DashScope 生成客户端
client = AioGeneration()

# 加载 FAISS 向量数据库
INDEX_DIR = Path(__file__).parent.parent / "vectordb"
emb = DashScopeEmbeddings(dashscope_api_key=DASHSCOPE_API_KEY, model="text-embedding-v3")
vectordb = FAISS.load_local(str(INDEX_DIR), emb, allow_dangerous_deserialization=True)

# 格式化上下文
def formatContext(docs: List[Document]) -> str:
    parts = []
    for i, d in enumerate(docs, 1):
        src = (d.metadata or {}).get("source", "unknown")
        txt = (d.page_content or "").replace("\n", " ")
        if len(txt) > 500:
            txt = txt[:500] + "…"
        parts.append(f"[{i}] ({src}) {txt}")
    return "\n".join(parts)

# 同步检索
def retrieve(question: str, k: int) -> List[Document]:
    retriever = vectordb.as_retriever(search_type="similarity", search_kwargs={"k": k})
    return retriever.invoke(question)

SYSTEM_PROMPT = (
    "你是严谨的中文检索增强助手。严格依据给定上下文回答；"
    "若上下文没有答案，请明确说“不确定”，并给出你能确认的线索。"
)

# 构建用户提示
def buildUserPrompt(question: str, context: str) -> str:
    return (
        "结合<已检索上下文>作答：\n"
        f"<已检索上下文>\n{context}\n</已检索上下文>\n\n"
        f"用户问题：{question}\n"
        "要求：若答案不在上下文里，明确说明不确定；用中文、分点作答，必要时给出引用的原句摘要。"
    )

# FastAPI应用设置
app = FastAPI(title="Qwen RAG QA Backend", version="1.0.0")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 请求模型
class ChatReq(BaseModel):
    question: str
    top_k: int = Field(default=TOP_K_DEFAULT, ge=1, le=12)
    model: str = Field(default=MODEL_NAME)
    temperature: float = Field(default=0.3, ge=0, le=1)

class ChatResp(BaseModel):
    answer: str

# 流式接口
async def _sse_event(data: str) -> bytes:
    print(f"发送流数据: {data}")  # 增加调试信息
    return f"data: {data}\n\n".encode("utf-8")

@app.post("/chat/stream")
async def chat_stream(req: ChatReq):
    try:
        docs = retrieve(req.question, req.top_k)
        context = formatContext(docs)
        prompt = buildUserPrompt(req.question, context)

        async def event_gen() -> AsyncGenerator[bytes, None]:
            yield await _sse_event("{\"type\":\"meta\",\"message\":\"stream-start\"}")
            
            # 调试: 输出流的开始
            print("流式处理开始...")

            try:
                # 使用 DashScope 生成流式回答
                stream = dashscope.Generation.call(
                    api_key=DASHSCOPE_API_KEY,
                    model=req.model,
                    messages=[{"role": "system", "content": SYSTEM_PROMPT},
                              {"role": "user", "content": prompt}],
                    result_format="message",
                    enable_thinking=True,
                    stream=True,
                    incremental_output=True,
                )

                reasoning_content = ""
                answer_content = ""
                is_answering = False

                # 逐步处理流数据
                for chunk in stream:
                    print(f"处理流数据: {chunk.output}")  # 增加调试信息

                    if chunk.output.choices[0].message.content == "" and chunk.output.choices[0].message.reasoning_content == "":
                        continue
                    elif chunk.output.choices[0].message.reasoning_content != "" and chunk.output.choices[0].message.content == "":
                        reasoning_content += chunk.output.choices[0].message.reasoning_content
                        yield await _sse_event(chunk.output.choices[0].message.reasoning_content)
                    elif chunk.output.choices[0].message.content != "":
                        if not is_answering:
                            yield await _sse_event("\n" + "=" * 20 + "完整回复" + "=" * 20)
                            is_answering = True
                        answer_content += chunk.output.choices[0].message.content
                        yield await _sse_event(chunk.output.choices[0].message.content)

                yield await _sse_event("[DONE]")
            except Exception as ie:
                # 错误事件
                err = str(ie).replace("\n", " ")
                yield await _sse_event(f"{{\"type\":\"error\",\"message\":\"{err}\"}}")

        return StreamingResponse(event_gen(), media_type="text/event-stream")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# 非流式接口
@app.post("/chat", response_model=ChatResp)
async def chat(req: ChatReq):
    try:
        docs = retrieve(req.question, req.top_k)
        context = formatContext(docs)
        prompt = buildUserPrompt(req.question, context)

        response = await AioGeneration.call(
            api_key=DASHSCOPE_API_KEY,
            model=req.model,
            messages=[{"role": "system", "content": SYSTEM_PROMPT},
                      {"role": "user", "content": prompt}],
            result_format="message",
        )
        answer = response.output.choices[0].message.content.strip()
        return ChatResp(answer=answer)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


if __name__ == "__main__":
    import uvicorn
    HOST = os.getenv("HOST", "0.0.0.0")
    PORT = int(os.getenv("PORT", "8000"))
    uvicorn.run(app, host=HOST, port=PORT, reload=False)
