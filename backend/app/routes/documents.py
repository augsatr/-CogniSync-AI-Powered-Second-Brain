from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List
import os
import uuid
from app.database import get_db
from app.schemas.document import DocumentResponse, DocumentUploadResponse
from app.schemas.user import UserResponse
from app.services.auth_service import AuthService
from app.services.document_service import DocumentService
from app.config import get_settings

router = APIRouter(prefix="/documents", tags=["Documents"])
settings = get_settings()


@router.get("/", response_model=List[DocumentResponse])
async def list_documents(
    db: AsyncSession = Depends(get_db),
    current_user: UserResponse = Depends(AuthService.get_current_user),
):
    service = DocumentService(db)
    return await service.get_user_documents(current_user.id)


@router.post("/upload", response_model=DocumentUploadResponse, status_code=201)
async def upload_document(
    file: UploadFile = File(...),
    db: AsyncSession = Depends(get_db),
    current_user: UserResponse = Depends(AuthService.get_current_user),
):
    os.makedirs(settings.upload_dir, exist_ok=True)
    ext = os.path.splitext(file.filename)[1] if file.filename else ".bin"
    file_id = str(uuid.uuid4())
    saved_name = f"{file_id}{ext}"
    file_path = os.path.join(settings.upload_dir, saved_name)

    content = await file.read()
    if len(content) > settings.max_upload_size_mb * 1024 * 1024:
        raise HTTPException(status_code=413, detail="File too large")

    with open(file_path, "wb") as f:
        f.write(content)

    service = DocumentService(db)
    doc = await service.create_document(
        user_id=current_user.id,
        filename=file.filename or "untitled",
        file_type=ext.lower().replace(".", ""),
        file_size=len(content),
        file_path=file_path,
    )
    return DocumentUploadResponse(
        id=doc.id, filename=doc.filename, status=doc.status.value,
        message="Document uploaded successfully"
    )


@router.get("/{doc_id}", response_model=DocumentResponse)
async def get_document(
    doc_id: str,
    db: AsyncSession = Depends(get_db),
    current_user: UserResponse = Depends(AuthService.get_current_user),
):
    service = DocumentService(db)
    doc = await service.get_document(doc_id, current_user.id)
    if not doc:
        raise HTTPException(status_code=404, detail="Document not found")
    return doc


@router.post("/{doc_id}/analyze", response_model=DocumentResponse)
async def analyze_document(
    doc_id: str,
    db: AsyncSession = Depends(get_db),
    current_user: UserResponse = Depends(AuthService.get_current_user),
):
    service = DocumentService(db)
    doc = await service.analyze_document(doc_id, current_user.id)
    if not doc:
        raise HTTPException(status_code=404, detail="Document not found")
    return doc
