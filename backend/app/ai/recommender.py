import numpy as np
from typing import List, Dict
from collections import Counter

try:
    from sentence_transformers import SentenceTransformer
    MODEL = SentenceTransformer("all-MiniLM-L6-v2")
    TRANSFORMERS_AVAILABLE = True
except ImportError:
    TRANSFORMERS_AVAILABLE = False
    MODEL = None


class RecommenderService:
    def __init__(self):
        self.model = MODEL

    def compute_similarity(self, text1: str, text2: str) -> float:
        if not TRANSFORMERS_AVAILABLE or not self.model:
            return self._jaccard_similarity(text1, text2)

        try:
            emb1 = self.model.encode(text1[:500])
            emb2 = self.model.encode(text2[:500])
            sim = np.dot(emb1, emb2) / (np.linalg.norm(emb1) * np.linalg.norm(emb2))
            return float(sim)
        except Exception:
            return self._jaccard_similarity(text1, text2)

    def recommend_notes(self, query: str, notes: List[Dict], top_k: int = 5) -> List[Dict]:
        if not notes:
            return []
        scored = []
        for note in notes:
            content = f"{note.get('title', '')} {note.get('content', '')}"
            score = self.compute_similarity(query, content)
            scored.append((score, note))
        scored.sort(reverse=True)
        return [n for _, n in scored[:top_k]]

    def suggest_tags(self, content: str, existing_tags: List[str] = None) -> List[str]:
        topics = {
            "ai": ["machine learning", "deep learning", "neural", "transformer", "nlp"],
            "business": ["strategy", "revenue", "growth", "market", "customer"],
            "technical": ["api", "database", "deployment", "architecture", "pipeline"],
            "design": ["ui", "ux", "design", "interface", "user experience"],
            "research": ["research", "study", "analysis", "findings", "survey"],
        }
        content_lower = content.lower()
        suggested = set()
        for topic, keywords in topics.items():
            if any(kw in content_lower for kw in keywords):
                suggested.add(topic)
        if existing_tags:
            suggested.update(existing_tags)
        return list(suggested)[:5]

    def _jaccard_similarity(self, text1: str, text2: str) -> float:
        set1 = set(text1.lower().split())
        set2 = set(text2.lower().split())
        if not set1 or not set2:
            return 0.0
        intersection = set1 & set2
        union = set1 | set2
        return len(intersection) / len(union)
