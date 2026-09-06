from fastapi import APIRouter
from pydantic import BaseModel

from app.services.chat_service import ask_pdf

router = APIRouter(
    prefix="/chat",
    tags=["Chat"]
)


class ChatRequest(BaseModel):
    paper_id: int
    question: str


@router.post("/")
def chat(request: ChatRequest):

    answer = ask_pdf(
        request.paper_id,
        request.question
    )

    return {
        "answer": answer
    }