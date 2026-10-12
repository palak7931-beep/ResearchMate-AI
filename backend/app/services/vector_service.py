from app.ai.rag import vector_db, text_splitter
from app.ai.embeddings import embedding_model
import uuid


def store_document(
    paper_id,
    filename,
    text,
):

    chunks = text_splitter.split_text(text)

    # Remove empty chunks
    chunks = [
        chunk.strip()
        for chunk in chunks
        if chunk and chunk.strip()
    ]

    if not chunks:
        print("No valid text chunks found in PDF.")
        return

    metadatas = []

    for i in range(len(chunks)):
        metadatas.append(
            {
                "paper_id": paper_id,
                "filename": filename,
                "chunk": i,
            }
        )

    print(f"Storing {len(chunks)} chunks for paper_id={paper_id}")

    # Generate embeddings manually
    embeddings = embedding_model.embed_documents(chunks)

    print(f"Generated {len(embeddings)} embeddings")

    # Add directly to Chroma collection
    ids = [
        f"{paper_id}_{i}_{uuid.uuid4().hex}"
        for i in range(len(chunks))
    ]

    vector_db._collection.add(
        ids=ids,
        documents=chunks,
        metadatas=metadatas,
        embeddings=embeddings,
    )

    print("Document successfully stored in ChromaDB.")