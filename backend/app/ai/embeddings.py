from fastembed import TextEmbedding


class FastEmbedWrapper:
    def __init__(self):
        self._model = None

    def _get_model(self):
        if self._model is None:
            print("Loading FastEmbed model...")
            self._model = TextEmbedding(
                model_name="sentence-transformers/all-MiniLM-L6-v2"
            )
            print("FastEmbed model loaded.")
        return self._model

    def embed_documents(self, texts):
        return [embedding.tolist() for embedding in self._get_model().embed(texts)]

    def embed_query(self, text):
        return next(self._get_model().embed([text])).tolist()


embedding_model = FastEmbedWrapper()