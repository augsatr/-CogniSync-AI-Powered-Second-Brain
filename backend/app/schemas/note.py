from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class EntityResponse(BaseModel):
    name: str
    entity_type: str
    relevance: float


class NoteCreate(BaseModel):
    title: str
    content: str = ""
    tags: list[str] = []


class NoteResponse(BaseModel):
    id: str
    title: str
    content: str
    summary: str | None = None
    sentiment: str | None = None
    is_analyzed: bool
    user_id: str
    entities: list[EntityResponse] = []
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class NoteAnalysis(BaseModel):
    entities: list[EntityResponse]
    summary: str
    sentiment: str
