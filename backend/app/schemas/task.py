from pydantic import BaseModel
from datetime import datetime
from typing import Optional
from app.models.task import TaskPriority, TaskStatus


class TaskCreate(BaseModel):
    title: str
    description: str | None = None
    priority: TaskPriority = TaskPriority.MEDIUM
    due_date: datetime | None = None
    estimated_minutes: int | None = None


class TaskResponse(BaseModel):
    id: str
    title: str
    description: str | None = None
    priority: TaskPriority
    status: TaskStatus
    due_date: datetime | None = None
    estimated_minutes: int | None = None
    ai_score: float | None = None
    user_id: str
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class TaskPrioritizeResponse(BaseModel):
    task: TaskResponse
    ai_priority_score: float
    reasoning: str
