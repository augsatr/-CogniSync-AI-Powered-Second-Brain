from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from typing import List
from app.models.note import Note, NoteEntity
from app.schemas.note import NoteResponse, NoteAnalysis, EntityResponse
from app.ai.nlp import NLPService


class NoteService:
    def __init__(self, db: AsyncSession):
        self.db = db
        self.nlp = NLPService()

    async def get_user_notes(self, user_id: str) -> List[NoteResponse]:
        result = await self.db.execute(
            select(Note).where(Note.user_id == user_id).order_by(Note.updated_at.desc())
        )
        notes = result.scalars().all()
        return [await self._to_response(n) for n in notes]

    async def create_note(self, user_id: str, title: str, content: str) -> NoteResponse:
        note = Note(title=title, content=content, user_id=user_id)
        self.db.add(note)
        await self.db.commit()
        await self.db.refresh(note)
        return await self._to_response(note)

    async def get_note(self, note_id: str, user_id: str) -> NoteResponse | None:
        result = await self.db.execute(
            select(Note).where(Note.id == note_id, Note.user_id == user_id)
        )
        note = result.scalar_one_or_none()
        return await self._to_response(note) if note else None

    async def analyze_note(self, note_id: str, user_id: str) -> NoteAnalysis | None:
        result = await self.db.execute(
            select(Note).where(Note.id == note_id, Note.user_id == user_id)
        )
        note = result.scalar_one_or_none()
        if not note:
            return None

        entities = self.nlp.extract_entities(note.content)
        summary = self.nlp.summarize(note.content)
        sentiment = self.nlp.analyze_sentiment(note.content)

        for ent in entities:
            entity = NoteEntity(
                name=ent["name"],
                entity_type=ent["type"],
                relevance=ent["relevance"],
                note_id=note.id,
            )
            self.db.add(entity)

        note.summary = summary
        note.sentiment = sentiment
        note.is_analyzed = True
        await self.db.commit()

        return NoteAnalysis(
            entities=[EntityResponse(name=e["name"], entity_type=e["type"], relevance=e["relevance"]) for e in entities],
            summary=summary,
            sentiment=sentiment,
        )

    async def delete_note(self, note_id: str, user_id: str) -> bool:
        result = await self.db.execute(
            select(Note).where(Note.id == note_id, Note.user_id == user_id)
        )
        note = result.scalar_one_or_none()
        if not note:
            return False
        await self.db.delete(note)
        await self.db.commit()
        return True

    async def _to_response(self, note: Note) -> NoteResponse:
        entities = []
        if note.entities:
            entities = [
                EntityResponse(name=e.name, entity_type=e.entity_type, relevance=e.relevance)
                for e in note.entities
            ]
        return NoteResponse(
            id=note.id,
            title=note.title,
            content=note.content,
            summary=note.summary,
            sentiment=note.sentiment,
            is_analyzed=note.is_analyzed,
            user_id=note.user_id,
            entities=entities,
            created_at=note.created_at,
            updated_at=note.updated_at,
        )
