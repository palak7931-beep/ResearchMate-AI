from fastapi import APIRouter, UploadFile, File, Depends
from sqlalchemy.orm import Session

from app.database import get_db

from app.services.pdf_service import extract_text
from app.services.summary_service import generate_summary
from app.services.vector_service import store_document
from app.services.paper_service import save_paper

router = APIRouter(
    prefix="/upload",
    tags=["Upload"]
)


@router.post("/pdf")
async def upload_pdf(
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):

    pdf_bytes = await file.read()

    text, total_pages = extract_text(pdf_bytes)

    summary = generate_summary(text)

    paper = save_paper(
    db=db,
    filename=file.filename,
    summary=summary,
)

    store_document(
    paper.id,
    file.filename,
    text,
)

    return {
        "message": "Paper uploaded successfully",
        "paper_id": paper.id,
        "filename": paper.filename,
        "pages": total_pages,
        "summary": summary,
    }