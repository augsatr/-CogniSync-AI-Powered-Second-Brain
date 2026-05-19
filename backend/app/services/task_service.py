from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from typing import List
from datetime import datetime
from app.models.task import Task, TaskPriority, TaskStatus
from app.schemas.task import TaskCreate, TaskResponse, TaskPrioritizeResponse
from app.ai.nlp import NLPService


class TaskService:
    def __init__(self, db: AsyncSession):
        self.db = db
        self.nlp = NLPService()

    async def get_user_tasks(self, user_id: str) -> List[TaskResponse]:
        result = await self.db.execute(
            select(Task).where(Task.user_id == user_id).order_by(Task.created_at.desc())
        )
        tasks = result.scalars().all()
        return [self._to_response(t) for t in tasks]

    async def create_task(self, user_id: str, data: TaskCreate) -> TaskResponse:
        task = Task(
            title=data.title,
            description=data.description,
            priority=data.priority,
            due_date=data.due_date,
            estimated_minutes=data.estimated_minutes,
            user_id=user_id,
        )
        self.db.add(task)
        await self.db.commit()
        await self.db.refresh(task)
        return self._to_response(task)

    async def get_task(self, task_id: str, user_id: str) -> TaskResponse | None:
        result = await self.db.execute(
            select(Task).where(Task.id == task_id, Task.user_id == user_id)
        )
        task = result.scalar_one_or_none()
        return self._to_response(task) if task else None

    async def prioritize_task(self, task_id: str, user_id: str) -> TaskPrioritizeResponse | None:
        result = await self.db.execute(
            select(Task).where(Task.id == task_id, Task.user_id == user_id)
        )
        task = result.scalar_one_or_none()
        if not task:
            return None

        score = 0.5
        reasoning = []

        if task.due_date:
            hours_left = (task.due_date - datetime.utcnow()).total_seconds() / 3600
            if hours_left < 24:
                score += 0.3
                reasoning.append("Due within 24 hours")
            elif hours_left < 72:
                score += 0.15
                reasoning.append("Due within 3 days")

        urgency_map = {TaskPriority.LOW: 0, TaskPriority.MEDIUM: 0.1, TaskPriority.HIGH: 0.2, TaskPriority.CRITICAL: 0.3}
        score += urgency_map.get(task.priority, 0)
        reasoning.append(f"Priority level: {task.priority.value}")

        if task.estimated_minutes and task.estimated_minutes <= 15:
            score += 0.15
            reasoning.append("Quick win: estimated < 15 min")

        score = min(1.0, max(0.0, score))
        task.ai_score = score
        await self.db.commit()

        return TaskPrioritizeResponse(
            task=self._to_response(task),
            ai_priority_score=round(score, 2),
            reasoning=", ".join(reasoning),
        )

    async def update_status(self, task_id: str, user_id: str, status: str) -> TaskResponse | None:
        result = await self.db.execute(
            select(Task).where(Task.id == task_id, Task.user_id == user_id)
        )
        task = result.scalar_one_or_none()
        if not task:
            return None
        try:
            task.status = TaskStatus(status)
        except ValueError:
            return None
        await self.db.commit()
        await self.db.refresh(task)
        return self._to_response(task)

    def _to_response(self, task: Task) -> TaskResponse:
        return TaskResponse(
            id=task.id,
            title=task.title,
            description=task.description,
            priority=task.priority,
            status=task.status,
            due_date=task.due_date,
            estimated_minutes=task.estimated_minutes,
            ai_score=task.ai_score,
            user_id=task.user_id,
            created_at=task.created_at,
            updated_at=task.updated_at,
        )
