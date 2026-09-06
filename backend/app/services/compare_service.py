from sqlalchemy.orm import Session

from app.models.paper import Paper
from app.ai.llm import client


def compare_papers(
    paper1_id: int,
    paper2_id: int,
    db: Session,
):

    paper1 = db.query(Paper).filter(
        Paper.id == paper1_id
    ).first()

    paper2 = db.query(Paper).filter(
        Paper.id == paper2_id
    ).first()

    if not paper1 or not paper2:
        return "Paper not found."

    prompt = f"""
You are an AI Research Assistant.

Compare the following two research papers.

Paper 1

Title:
{paper1.filename}

Summary:
{paper1.summary}

---

Paper 2

Title:
{paper2.filename}

Summary:
{paper2.summary}

---

Create a clear comparison of the two papers.

IMPORTANT FORMATTING RULES:

1. Return ONLY Markdown.
2. Do NOT use a code block.
3. Use ## for section headings.
4. Make important terms bold using **bold**.
5. Use bullet points for explanations instead of long paragraphs.
6. Keep each bullet concise and informative.
7. For each section, provide 2-5 bullet points.
8. Put a blank line before and after every heading.

Use exactly these sections:

## Objective

- **Paper 1:** ...
- **Paper 2:** ...
- **Key Difference:** ...

## Methodology

- **Paper 1:** ...
- **Paper 2:** ...
- **Key Difference:** ...

## Key Contributions

- **Paper 1:** ...
- **Paper 2:** ...
- **Key Difference:** ...

## Advantages

- **Paper 1:** ...
- **Paper 2:** ...

## Limitations

- **Paper 1:** ...
- **Paper 2:** ...

## Future Scope

- **Paper 1:** ...
- **Paper 2:** ...
- **Combined Opportunity:** ...
"""

    response = client.chat.completions.create(
        model="openai/gpt-oss-120b",
        messages=[
            {
                "role": "user",
                "content": prompt,
            }
        ]
    )

    return response.choices[0].message.content