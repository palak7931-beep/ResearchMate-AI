from fastapi import APIRouter, UploadFile, File

router = APIRouter(prefix="/upload", tags=["Upload"])


@router.post("/pdf")
async def upload_pdf(file: UploadFile = File(...)):
    return {
        "filename": file.filename
    }