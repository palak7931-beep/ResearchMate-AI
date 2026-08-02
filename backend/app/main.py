from fastapi import FastAPI
from app.database import Base, engine
from app.models.user import User
from app.routers.auth import router as auth_router
from app.routers.upload import router as upload_router

Base.metadata.create_all(bind=engine)

app = FastAPI(title="ResearchOS API")

app.include_router(auth_router)
app.include_router(upload_router)


@app.get("/")
def root():
    return {"message": "ResearchOS Backend Running 🚀"}