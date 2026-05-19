from pydantic import BaseModel
from datetime import datetime


class DocumentResponse(BaseModel):
    id: str
    filename: str
    file_type: str
    file_size: int
    status: str
    ocr_text: str | None = None
    summary: str | None = None
    classification: str | None = None
    user_id: str
    uploaded_at: datetime

    class Config:
        from_attributes = True


class DocumentUploadResponse(BaseModel):
    id: str
    filename: str
    status: str
    message: str
