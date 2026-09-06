from fastapi import APIRouter, Depends
from pydantic import BaseModel
from sqlalchemy.orm import Session

from app.database import get_db
from app.services.compare_service import compare_papers

router = APIRouter(
    prefix="/compare",
    tags=["Compare"]
)


class CompareRequest(BaseModel):
    paper1_id: int
    paper2_id: int


@router.post("/")
def compare(
    request: CompareRequest,
    db: Session = Depends(get_db)
):
    result = compare_papers(
        request.paper1_id,
        request.paper2_id,
        db,
    )

    return {
        "comparison": result
    }