from fastapi import APIRouter, Depends
from pydantic import BaseModel
from sqlalchemy.orm import Session

from app.database import get_db
from app.services.research_gap_service import find_research_gaps


router = APIRouter(
    prefix="/research-gap",
    tags=["Research Gap"]
)


class ResearchGapRequest(BaseModel):
    paper_ids: list[int]


@router.post("/")
def research_gap(
    request: ResearchGapRequest,
    db: Session = Depends(get_db)
):
    result = find_research_gaps(
        request.paper_ids,
        db
    )

    return {
        "research_gap": result
    }