# /Users/profighted/beisi-tech/docs/beisi_rag/ingest_qwen_faiss.py
import os
from pathlib import Path
from dotenv import load_dotenv

from langchain_community.document_loaders import TextLoader, DirectoryLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import FAISS
from langchain_community.embeddings import DashScopeEmbeddings

load_dotenv()

DATA_DIR = Path(__file__).parent.parent / "my-website" / "docs"
INDEX_DIR = Path(__file__).parent / "vectordb"
INDEX_DIR.mkdir(exist_ok=True)

MAX_BATCH = 10  # DashScope 限制：一次 <= 10

def load_docs():
    loader = DirectoryLoader(
        str(DATA_DIR),
        glob="**/*",
        loader_cls=TextLoader,
        show_progress=True
    )
    return loader.load()

def chunked(iterable, n):
    for i in range(0, len(iterable), n):
        yield iterable[i:i + n]

def main():
    # 1) 加载与切分
    docs = load_docs()
    splitter = RecursiveCharacterTextSplitter(
        chunk_size=800,
        chunk_overlap=120,
        separators=["\n\n", "\n", "。", "！", "？", "，", " ", ""]
    )
    splits = splitter.split_documents(docs)
    texts = [d.page_content for d in splits]
    metas = [d.metadata for d in splits]

    # 2) Qwen（DashScope）嵌入
    api_key = os.environ.get("DASHSCOPE_API_KEY")
    if not api_key:
        raise RuntimeError("请先 export DASHSCOPE_API_KEY=你的key")

    embeddings = DashScopeEmbeddings(
        dashscope_api_key=api_key,
        model="text-embedding-v3",  # 按你账号可用模型名调整
    )

    # 3) 建立 FAISS，并以“<=10条/批”的方式喂入
    if len(texts) == 0:
        raise RuntimeError("没有可用文本分片，请检查 data/ 是否有可读文件。")

    # 先用第一批初始化索引
    first_texts = texts[:MAX_BATCH]
    first_metas = metas[:MAX_BATCH]
    store = FAISS.from_texts(first_texts, embeddings, metadatas=first_metas)

    # 追加其余批次
    for batch_texts, batch_metas in zip(
        chunked(texts[MAX_BATCH:], MAX_BATCH),
        chunked(metas[MAX_BATCH:], MAX_BATCH),
    ):
        store.add_texts(batch_texts, metadatas=batch_metas)

    # 4) 保存索引
    store.save_local(str(INDEX_DIR))
    print(f"✅ 完成向量化，共 {len(texts)} 段，索引保存在: {INDEX_DIR}")

if __name__ == "__main__":
    main()
