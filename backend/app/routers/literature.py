from fastapi import APIRouter, Depends
from pydantic import BaseModel
from sqlalchemy.orm import Session

from app.database import get_db
from app.services.literature_service import generate_literature_review


router = APIRouter(
    prefix="/literature",
    tags=["Literature Review"]
)


class LiteratureRequest(BaseModel):
    paper_ids: list[int]


@router.post("/")
def literature_review(
    request: LiteratureRequest,
    db: Session = Depends(get_db)
):
    result = generate_literature_review(
        request.paper_ids,
        db
    )

    return {
        "literature_review": result
    }