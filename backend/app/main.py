from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import Base, engine
from app.models.user import User
from app.models.paper import Paper

from app.routers.auth import router as auth_router
from app.routers.upload import router as upload_router
from app.routers.paper import router as paper_router
from app.routers.chat import router as chat_router
from app.routers.compare import router as compare_router
from app.routers.literature import router as literature_router
from app.routers.research_gap import router as research_gap_router


Base.metadata.create_all(bind=engine)

app = FastAPI(title="ResearchOS API")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(upload_router)
app.include_router(paper_router)
app.include_router(chat_router)
app.include_router(compare_router)
app.include_router(literature_router)
app.include_router(research_gap_router)

@app.get("/")
def root():
    return {"message": "ResearchOS Backend Running 🚀"}