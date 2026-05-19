from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List
from app.database import get_db
from app.schemas.task import TaskCreate, TaskResponse, TaskPrioritizeResponse
from app.schemas.user import UserResponse
from app.services.auth_service import AuthService
from app.services.task_service import TaskService

router = APIRouter(prefix="/tasks", tags=["Tasks"])


@router.get("/", response_model=List[TaskResponse])
async def list_tasks(
    db: AsyncSession = Depends(get_db),
    current_user: UserResponse = Depends(AuthService.get_current_user),
):
    service = TaskService(db)
    return await service.get_user_tasks(current_user.id)


@router.post("/", response_model=TaskResponse, status_code=201)
async def create_task(
    data: TaskCreate,
    db: AsyncSession = Depends(get_db),
    current_user: UserResponse = Depends(AuthService.get_current_user),
):
    service = TaskService(db)
    return await service.create_task(current_user.id, data)


@router.get("/{task_id}", response_model=TaskResponse)
async def get_task(
    task_id: str,
    db: AsyncSession = Depends(get_db),
    current_user: UserResponse = Depends(AuthService.get_current_user),
):
    service = TaskService(db)
    task = await service.get_task(task_id, current_user.id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    return task


@router.post("/{task_id}/prioritize", response_model=TaskPrioritizeResponse)
async def prioritize_task(
    task_id: str,
    db: AsyncSession = Depends(get_db),
    current_user: UserResponse = Depends(AuthService.get_current_user),
):
    service = TaskService(db)
    result = await service.prioritize_task(task_id, current_user.id)
    if not result:
        raise HTTPException(status_code=404, detail="Task not found")
    return result


@router.patch("/{task_id}/status", response_model=TaskResponse)
async def update_task_status(
    task_id: str,
    status: str,
    db: AsyncSession = Depends(get_db),
    current_user: UserResponse = Depends(AuthService.get_current_user),
):
    service = TaskService(db)
    task = await service.update_status(task_id, current_user.id, status)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    return task
