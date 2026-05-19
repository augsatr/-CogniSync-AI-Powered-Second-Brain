from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List
from app.database import get_db
from app.schemas.note import NoteCreate, NoteResponse, NoteAnalysis
from app.schemas.user import UserResponse
from app.services.auth_service import AuthService
from app.services.note_service import NoteService

router = APIRouter(prefix="/notes", tags=["Notes"])


@router.get("/", response_model=List[NoteResponse])
async def list_notes(
    db: AsyncSession = Depends(get_db),
    current_user: UserResponse = Depends(AuthService.get_current_user),
):
    service = NoteService(db)
    return await service.get_user_notes(current_user.id)


@router.post("/", response_model=NoteResponse, status_code=201)
async def create_note(
    data: NoteCreate,
    db: AsyncSession = Depends(get_db),
    current_user: UserResponse = Depends(AuthService.get_current_user),
):
    service = NoteService(db)
    return await service.create_note(current_user.id, data.title, data.content)


@router.get("/{note_id}", response_model=NoteResponse)
async def get_note(
    note_id: str,
    db: AsyncSession = Depends(get_db),
    current_user: UserResponse = Depends(AuthService.get_current_user),
):
    service = NoteService(db)
    note = await service.get_note(note_id, current_user.id)
    if not note:
        raise HTTPException(status_code=404, detail="Note not found")
    return note


@router.post("/{note_id}/analyze", response_model=NoteAnalysis)
async def analyze_note(
    note_id: str,
    db: AsyncSession = Depends(get_db),
    current_user: UserResponse = Depends(AuthService.get_current_user),
):
    service = NoteService(db)
    result = await service.analyze_note(note_id, current_user.id)
    if not result:
        raise HTTPException(status_code=404, detail="Note not found")
    return result


@router.delete("/{note_id}", status_code=204)
async def delete_note(
    note_id: str,
    db: AsyncSession = Depends(get_db),
    current_user: UserResponse = Depends(AuthService.get_current_user),
):
    service = NoteService(db)
    deleted = await service.delete_note(note_id, current_user.id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Note not found")
