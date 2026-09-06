from pydantic import BaseModel

class PaperResponse(BaseModel):
    id: int
    filename: str
    summary: str

    class Config:
        from_attributes = True