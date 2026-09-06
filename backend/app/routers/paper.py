from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.paper import Paper
from app.ai.rag import vector_db

router = APIRouter(prefix="/papers", tags=["Papers"])


@router.get("/")
def get_all_papers(db: Session = Depends(get_db)):
    papers = db.query(Paper).order_by(Paper.id.desc()).all()
    return papers


@router.delete("/{paper_id}")
def delete_paper(
    paper_id: int,
    db: Session = Depends(get_db)
):
    paper = db.query(Paper).filter(Paper.id == paper_id).first()

    if not paper:
        raise HTTPException(status_code=404, detail="Paper not found")

    # Delete embeddings from Chroma
    vector_db.delete(
        where={
            "paper_id": paper_id
        }
    )

    # Delete from PostgreSQL
    db.delete(paper)
    db.commit()

    return {
        "message": "Paper deleted successfully"
    }