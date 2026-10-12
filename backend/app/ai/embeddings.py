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
        embeddings = []

        for text in texts:
            embedding = next(
                self._get_model().embed([text])
            )

            embeddings.append(
                embedding.tolist()
            )

        return embeddings

    def embed_query(self, text):
        return next(
            self._get_model().embed([text])
        ).tolist()


embedding_model = FastEmbedWrapper()