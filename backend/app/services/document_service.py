from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from typing import List
from app.models.document import Document, DocumentStatus
from app.schemas.document import DocumentResponse
from app.ai.vision import VisionService


class DocumentService:
    def __init__(self, db: AsyncSession):
        self.db = db
        self.vision = VisionService()

    async def get_user_documents(self, user_id: str) -> List[DocumentResponse]:
        result = await self.db.execute(
            select(Document).where(Document.user_id == user_id).order_by(Document.uploaded_at.desc())
        )
        docs = result.scalars().all()
        return [self._to_response(d) for d in docs]

    async def create_document(
        self, user_id: str, filename: str, file_type: str, file_size: int, file_path: str
    ) -> Document:
        doc = Document(
            filename=filename,
            file_type=file_type,
            file_size=file_size,
            file_path=file_path,
            user_id=user_id,
        )
        self.db.add(doc)
        await self.db.commit()
        await self.db.refresh(doc)
        return doc

    async def get_document(self, doc_id: str, user_id: str) -> DocumentResponse | None:
        result = await self.db.execute(
            select(Document).where(Document.id == doc_id, Document.user_id == user_id)
        )
        doc = result.scalar_one_or_none()
        return self._to_response(doc) if doc else None

    async def analyze_document(self, doc_id: str, user_id: str) -> DocumentResponse | None:
        result = await self.db.execute(
            select(Document).where(Document.id == doc_id, Document.user_id == user_id)
        )
        doc = result.scalar_one_or_none()
        if not doc:
            return None

        doc.status = DocumentStatus.PROCESSING
        await self.db.commit()

        try:
            if doc.file_type in ("png", "jpg", "jpeg", "tiff", "bmp"):
                extracted = self.vision.extract_text(doc.file_path)
                doc.ocr_text = extracted
                doc.classification = self.vision.classify_document(extracted or doc.filename)
            elif doc.file_type == "pdf":
                doc.ocr_text = "PDF text extraction placeholder"
                doc.classification = "document"

            doc.summary = f"AI analysis complete for {doc.filename}"
            doc.status = DocumentStatus.ANALYZED
        except Exception:
            doc.status = DocumentStatus.ERROR

        await self.db.commit()
        await self.db.refresh(doc)
        return self._to_response(doc)

    def _to_response(self, doc: Document) -> DocumentResponse:
        return DocumentResponse(
            id=doc.id,
            filename=doc.filename,
            file_type=doc.file_type,
            file_size=doc.file_size,
            status=doc.status.value if hasattr(doc.status, "value") else str(doc.status),
            ocr_text=doc.ocr_text,
            summary=doc.summary,
            classification=doc.classification,
            user_id=doc.user_id,
            uploaded_at=doc.uploaded_at,
        )
