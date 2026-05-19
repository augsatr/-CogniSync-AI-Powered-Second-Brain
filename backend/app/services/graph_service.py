from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from collections import defaultdict
from app.models.note import Note, NoteEntity


class GraphService:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def build_graph(self, user_id: str) -> dict:
        result = await self.db.execute(
            select(Note).where(Note.user_id == user_id)
        )
        notes = result.scalars().all()

        nodes = {}
        edges = defaultdict(float)

        for note in notes:
            node_id = f"note_{note.id}"
            nodes[node_id] = {"id": node_id, "label": note.title, "type": "note", "weight": 1.0}

        for note in notes:
            if not note.entities:
                continue
            for entity in note.entities:
                entity_id = f"entity_{entity.id}"
                if entity_id not in nodes:
                    nodes[entity_id] = {
                        "id": entity_id,
                        "label": entity.name,
                        "type": entity.entity_type,
                        "weight": entity.relevance,
                    }
                edge_key = (f"note_{note.id}", entity_id)
                edges[edge_key] += entity.relevance

        note_list = list(nodes.values())
        edge_list = [
            {"source": s, "target": t, "weight": min(w, 1.0)}
            for (s, t), w in edges.items()
        ]

        return {"nodes": note_list, "edges": edge_list}
