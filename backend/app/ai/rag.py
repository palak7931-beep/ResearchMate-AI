from langchain_community.vectorstores import Chroma
from langchain_text_splitters import RecursiveCharacterTextSplitter
from app.ai.embeddings import embedding_model

DB_PATH = "chroma_db"

vector_db = Chroma(
    persist_directory=DB_PATH,
    embedding_function=embedding_model,
)

text_splitter = RecursiveCharacterTextSplitter(
    chunk_size=1000,
    chunk_overlap=200,
)