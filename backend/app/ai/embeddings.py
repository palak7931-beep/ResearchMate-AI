from langchain_community.embeddings import HuggingFaceEmbeddings


class LazyEmbedding:
    def __init__(self):
        self._model = None

    def _get_model(self):
        if self._model is None:
            print("Loading embedding model...")
            self._model = HuggingFaceEmbeddings(
                model_name="sentence-transformers/all-MiniLM-L6-v2"
            )
            print("Embedding model loaded.")
        return self._model

    def embed_documents(self, texts):
        return self._get_model().embed_documents(texts)

    def embed_query(self, text):
        return self._get_model().embed_query(text)


embedding_model = LazyEmbedding()