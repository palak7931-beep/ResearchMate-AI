from app.ai.rag import vector_db, text_splitter


def store_document(
    paper_id,
    filename,
    text,
):

    chunks = text_splitter.split_text(text)

    metadatas = []

    for i in range(len(chunks)):
        metadatas.append(
            {
                "paper_id": paper_id,
                "filename": filename,
                "chunk": i,
            }
        )

    vector_db.add_texts(
        texts=chunks,
        metadatas=metadatas,
    )