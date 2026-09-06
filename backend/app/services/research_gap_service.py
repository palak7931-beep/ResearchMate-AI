from sqlalchemy.orm import Session

from app.models.paper import Paper
from app.ai.llm import client


def find_research_gaps(
    paper_ids: list[int],
    db: Session,
):

    papers = (
        db.query(Paper)
        .filter(Paper.id.in_(paper_ids))
        .all()
    )

    if len(papers) < 1:
        return "At least 1 paper is required."

    papers_context = ""

    for i, paper in enumerate(papers, start=1):
        papers_context += f"""
Paper {i}

Title:
{paper.filename}

Summary:
{paper.summary}

--------------------------------
"""

    prompt = f"""
You are an AI Research Assistant specializing in academic research analysis.

Analyze the following research papers:

{papers_context}

Identify meaningful research gaps based ONLY on the information
provided in these papers.

IMPORTANT RULES:

1. Use ONLY the information provided.
2. Do not invent facts or research findings.
3. Return ONLY Markdown.
4. Do not use a code block.
5. Use ## for major headings.
6. Make important concepts **bold**.
7. Use bullet points instead of long paragraphs.
8. Clearly distinguish existing research from proposed gaps.

Use exactly these sections:

## Existing Research

Summarize what the papers currently investigate.

## Common Limitations

Identify limitations shared by multiple papers.

## Missing Areas

Identify areas that are insufficiently explored.

## Research Gaps

Identify specific and meaningful research gaps.

## Suggested Research Directions

Suggest potential areas for future research based on the identified gaps.

## Overall Research Opportunity

Provide a concise summary of the most promising research opportunity.
"""

    response = client.chat.completions.create(
        model="openai/gpt-oss-120b",
        messages=[
            {
                "role": "user",
                "content": prompt,
            }
        ],
    )

    return response.choices[0].message.content