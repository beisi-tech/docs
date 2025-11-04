# /Users/profighted/beisi-tech/docs/RAG-Anything/beisi_rag/chat_qwen_rag.py
import os
from pathlib import Path
from dotenv import load_dotenv

from langchain_community.vectorstores import FAISS
from langchain_community.embeddings import DashScopeEmbeddings
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables import RunnableParallel, RunnablePassthrough, RunnableLambda
from langchain_core.messages import AIMessage, HumanMessage, SystemMessage, BaseMessage

from openai import OpenAI

load_dotenv(dotenv_path=Path(__file__).resolve().parents[1] / "config" / ".env")

# 本地向量库目录（确保与 ingest 阶段一致）
INDEX_DIR = Path(__file__).parent.parent / "vectordb"

# ====== 配置 Qwen 兼容端点 ======
DASHSCOPE_API_KEY = os.environ.get("DASHSCOPE_API_KEY")
assert DASHSCOPE_API_KEY, "请先 export DASHSCOPE_API_KEY=你的通义 DashScope Key"

# 如需新加坡地域，改成 https://dashscope-intl.aliyuncs.com/compatible-mode/v1
DASHSCOPE_BASE_URL = os.environ.get(
    "DASHSCOPE_BASE_URL",
    "https://dashscope.aliyuncs.com/compatible-mode/v1",
)

# 对话模型 & 向量模型（按你账号可用情况调整）
CHAT_MODEL = os.environ.get("QWEN_CHAT_MODEL", "qwen-plus")           # 也可用 qwen2.5-7b-instruct / qwen-turbo 等
EMBEDDING_MODEL = os.environ.get("QWEN_EMBED_MODEL", "text-embedding-v3")


def load_retriever():
    """加载 FAISS 检索器（与 ingest 使用同一 Embedding 模型）"""
    embeddings = DashScopeEmbeddings(
        dashscope_api_key=DASHSCOPE_API_KEY,
        model=EMBEDDING_MODEL,
    )
    vectordb = FAISS.load_local(str(INDEX_DIR), embeddings, allow_dangerous_deserialization=True)
    return vectordb.as_retriever(search_type="similarity", search_kwargs={"k": 4})


def build_llm_runnable():
    """
    用 OpenAI 兼容端点（Qwen）构建一个 LangChain Runnable。
    避免使用 langchain_openai，降低版本依赖冲突风险。
    """
    client = OpenAI(api_key=DASHSCOPE_API_KEY, base_url=DASHSCOPE_BASE_URL)

    def _lc_to_openai_messages(prompt_value) -> list[dict]:
        """
        将 LangChain 的 PromptValue / BaseMessage 列表转换为 OpenAI 兼容 messages。
        """
        if hasattr(prompt_value, "to_messages"):
            msgs = prompt_value.to_messages()  # List[BaseMessage]
        elif isinstance(prompt_value, list) and all(isinstance(m, BaseMessage) for m in prompt_value):
            msgs = prompt_value
        else:
            # 兜底：当成用户单轮输入
            msgs = [HumanMessage(content=str(prompt_value))]

        out = []
        for m in msgs:
            if isinstance(m, SystemMessage):
                role = "system"
            elif isinstance(m, HumanMessage):
                role = "user"
            elif isinstance(m, AIMessage):
                role = "assistant"
            else:
                role = "user"
            out.append({"role": role, "content": m.content})
        return out

    def _invoke(prompt_value: BaseMessage | list[BaseMessage] | str) -> str:
        messages = _lc_to_openai_messages(prompt_value)
        resp = client.chat.completions.create(
            model=CHAT_MODEL,
            messages=messages,
            temperature=0.3,
        )
        return resp.choices[0].message.content

    return RunnableLambda(_invoke)


# RAG_PROMPT = ChatPromptTemplate.from_template(
#     """你是严谨的检索增强助手。结合<已检索上下文>回答用户问题。
# - 如果答案不在上下文里，请明确说明“不确定”并给出你能确认的线索。
# - 用中文输出，尽量给出引用的原句摘要，并在末尾标注引用编号（如 [1][3]）。

# <已检索上下文>
# {context}
# </已检索上下文>

# 用户问题：{question}
# """
# )

RAG_PROMPT = ChatPromptTemplate.from_template(
    """你是严谨的检索增强助手。结合<已检索上下文>回答用户问题。
    -- 如果答案不在上下文里，请明确说明“不确定”并给出你能确认的线索。
    -- 用中文输出，尽量给出引用的原句摘要，并在末尾标注引用编号（如 [1][3]）。
        你是严谨的检索增强助手。请**用你自己的话**综合回答，禁止大段原文粘贴。
    +规则：
    +1) 先总结，再给出处；答案主体必须是**你自己的表述**。
    +2) 如需引用原句，每处引用≤50字，并用引号与编号标注，如 “……”[1]。
    +3) 如果上下文没有明确答案，请说“不确定”，并给出可验证的线索。
    +4) 输出中文、结构化要点，并在末尾列出参考编号。
    
    <已检索上下文>
    {context}
    </已检索上下文>
    
    用户问题：{question}
    """
)



def format_docs(docs):
    out = []
    for i, d in enumerate(docs, 1):
        meta = d.metadata or {}
        src = meta.get("source", "unknown")
        # 摘要最多 500 字符，避免过长提示上下文
        out.append(f"[{i}] ({src}) {d.page_content[:500]}")
    return "\n\n".join(out)


def main():
    retriever = load_retriever()
    llm_runnable = build_llm_runnable()

    # RAG 链：检索 → 拼接上下文 → 提示词 → Qwen(兼容端点) → 解析文本
    chain = (
        RunnableParallel(context=retriever | format_docs, question=RunnablePassthrough())
        | RAG_PROMPT
        | llm_runnable
        | StrOutputParser()
    )

    print("💬 输入你的问题（Ctrl+C 退出）")
    while True:
        try:
            q = input("> ").strip()
            if not q:
                continue
            ans = chain.invoke(q)
            print("\n" + ans + "\n")
        except (EOFError, KeyboardInterrupt):
            print("\n再见～")
            break
        except Exception as e:
            print("❌ 出错：", e)


if __name__ == "__main__":
    main()
