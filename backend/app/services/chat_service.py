from app.ai.rag import vector_db
from app.ai.llm import client




def ask_pdf(
    paper_id: int,
    question: str,
):

    print("\n========== CHAT DEBUG ==========")
    print("paper_id:", paper_id)
    print("paper_id type:", type(paper_id))
    print("question:", question)
    
    # For summary-type questions, retrieve broader parts of the paper
    summary_keywords = [
        "summary",
        "summarize",
        "summarise",
        "overview",
        "what is this paper about",
        "give summary",
        "main points",
    ]

    is_summary_question = any(
        keyword in question.lower()
        for keyword in summary_keywords
    )

    if is_summary_question:
        search_query = """
        research paper objective methodology
        key contributions findings advantages limitations
        conclusion results
        """
        k = 8
    else:
        search_query = question
        k = 4

    docs = vector_db.similarity_search(
        search_query,
        k=k,
        filter={
            "paper_id": paper_id
        }
    )

    print("\n========== RETRIEVED CHUNKS ==========\n")

    for i, doc in enumerate(docs):
        print(f"\n------ Chunk {i+1} ------")
        print(doc.page_content[:500])
        print("\nMetadata:", doc.metadata)

    context = "\n\n".join(
        [doc.page_content for doc in docs]
    )

    prompt = f"""
You are ResearchOS AI, an AI research assistant.

Your task is to answer the user's question using the provided
research-paper context.

IMPORTANT RULES:

1. Use the provided context as the primary source.
2. If the context contains relevant information, answer the question
   by synthesizing that information.
3. Do NOT say that information is unavailable simply because the
   exact wording of the question does not appear in the context.
4. For summary questions, combine the important information available
   in the retrieved sections and create a concise research-paper summary.
5. Do not invent facts that are not supported by the context.
6. If the context genuinely contains no information relevant to the
   question, reply exactly:

"This information is not available in the uploaded paper."

FORMAT:

Return the answer in valid Markdown.

Use:

## Heading

### Subheading

- Bullet points

Use **bold** for important concepts.

For a summary, preferably organize the answer as:

## Summary

## Objective

## Methodology

## Key Contributions

## Findings

## Limitations

## Conclusion

Only include sections that are supported by the retrieved context.

Research Paper Context:
{context}

User Question:
{question}
"""

    response = client.chat.completions.create(
        model="openai/gpt-oss-120b",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ]
    )

    return response.choices[0].message.content