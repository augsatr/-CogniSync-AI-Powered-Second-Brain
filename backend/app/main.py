from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import get_settings
from app.database import init_db
from app.routes import auth_router, notes_router, tasks_router, documents_router, graph_router, ai_router

settings = get_settings()

app = FastAPI(
    title=settings.app_name,
    version=settings.app_version,
    docs_url="/docs",
    redoc_url="/redoc",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router, prefix="/api")
app.include_router(notes_router, prefix="/api")
app.include_router(tasks_router, prefix="/api")
app.include_router(documents_router, prefix="/api")
app.include_router(graph_router, prefix="/api")
app.include_router(ai_router, prefix="/api")


@app.on_event("startup")
async def startup():
    await init_db()


@app.get("/api/health")
async def health_check():
    return {"status": "healthy", "service": settings.app_name, "version": settings.app_version}


@app.get("/")
async def root():
    return {
        "message": "CogniSync API - AI-Powered Second Brain",
        "docs": "/docs",
        "version": settings.app_version,
    }
