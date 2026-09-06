from sqlalchemy.orm import Session
from app.models.paper import Paper


def save_paper(
    db: Session,
    filename: str,
    summary: str,
):

    paper = Paper(
        filename=filename,
        summary=summary,
    )

    db.add(paper)
    db.commit()
    db.refresh(paper)

    return paper