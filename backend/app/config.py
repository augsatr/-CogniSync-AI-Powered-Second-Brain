from pydantic_settings import BaseSettings
from functools import lru_cache


class Settings(BaseSettings):
    app_name: str = "CogniSync API"
    app_version: str = "1.0.0"
    debug: bool = True

    database_url: str = "postgresql+asyncpg://postgres:postgres@localhost:5432/cognisync"
    database_url_sync: str = "postgresql+psycopg2://postgres:postgres@localhost:5432/cognisync"

    redis_url: str = "redis://localhost:6379/0"

    secret_key: str = "cognisync-secret-key-change-in-production"
    algorithm: str = "HS256"
    access_token_expire_minutes: int = 60 * 24

    allowed_origins: list[str] = ["http://localhost:3000", "http://localhost:8000"]

    upload_dir: str = "uploads"
    max_upload_size_mb: int = 50

    openai_api_key: str | None = None
    huggingface_model: str = "sentence-transformers/all-MiniLM-L6-v2"

    class Config:
        env_file = ".env"
        case_sensitive = False


@lru_cache()
def get_settings() -> Settings:
    return Settings()
