from sqlalchemy.orm import Session

from app.models.paper import Paper
from app.ai.llm import client


def generate_literature_review(
    paper_ids: list[int],
    db: Session,
):

    papers = (
        db.query(Paper)
        .filter(Paper.id.in_(paper_ids))
        .all()
    )

    if not papers:
        return "No papers found."

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
You are an AI Research Assistant specializing in academic literature reviews.

Using ONLY the research papers provided below, generate a structured
literature review.

{papers_context}

IMPORTANT FORMATTING RULES:

1. Return ONLY Markdown.
2. Do NOT use a code block.
3. Use ## for every major section.
4. Use ### for important subsections when needed.
5. Make important concepts and keywords **bold**.
6. Avoid long paragraphs.
7. Use bullet points wherever possible.
8. Keep paragraphs short, maximum 3-4 sentences.
9. For each major section, provide clear and structured points.
10. Put a blank line before and after every heading.

Use exactly these sections:

## Introduction

Write a short overview of the research topic and the papers analyzed.

## Existing Research

- **Study 1:** ...
- **Study 2:** ...
- **Study 3:** ...

## Comparison of Studies

- **Similarities:** ...
- **Differences:** ...
- **Methodological differences:** ...
- **Key findings:** ...

## Research Trends

- **Trend 1:** ...
- **Trend 2:** ...
- **Trend 3:** ...

## Limitations in Existing Research

- **Limitation 1:** ...
- **Limitation 2:** ...
- **Limitation 3:** ...

## Potential Research Directions

- **Direction 1:** ...
- **Direction 2:** ...
- **Direction 3:** ...

## Conclusion

Provide a short summary of the overall findings.
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