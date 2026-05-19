import re
from typing import List
from textblob import TextBlob

try:
    import spacy
    nlp = spacy.load("en_core_web_sm")
except (ImportError, OSError):
    nlp = None


class NLPService:
    def extract_entities(self, text: str) -> List[dict]:
        if not text or not text.strip():
            return []

        entities = []
        seen = set()

        if nlp:
            doc = nlp(text[:50000])
            for ent in doc.ents:
                key = f"{ent.text.lower()}_{ent.label_}"
                if key not in seen and len(ent.text) > 1:
                    seen.add(key)
                    entities.append({
                        "name": ent.text,
                        "type": ent.label_.lower(),
                        "relevance": round(min(1.0, ent.end_char / len(text)), 2),
                    })

        if not entities:
            words = re.findall(r'\b[A-Z][a-z]+(?:\s[A-Z][a-z]+)*\b', text)
            for w in words[:15]:
                key = w.lower()
                if key not in seen and len(w) > 2:
                    seen.add(key)
                    entities.append({
                        "name": w,
                        "type": "concept",
                        "relevance": round(min(1.0, text.count(w) / 10), 2),
                    })

        return entities[:20]

    def summarize(self, text: str, max_sentences: int = 3) -> str:
        if not text or not text.strip():
            return ""

        sentences = re.split(r'(?<=[.!?])\s+', text.strip())
        if len(sentences) <= max_sentences:
            return text.strip()

        word_freq = defaultdict(int)
        for word in re.findall(r'\w+', text.lower()):
            word_freq[word] += 1

        scored = []
        for i, sent in enumerate(sentences):
            score = sum(word_freq.get(w.lower(), 0) for w in re.findall(r'\w+', sent))
            scored.append((score / max(len(sent.split()), 1), i, sent))

        scored.sort(reverse=True)
        top = sorted(scored[:max_sentences], key=lambda x: x[1])
        return " ".join(s[2] for s in top)

    def analyze_sentiment(self, text: str) -> str:
        if not text or not text.strip():
            return "neutral"
        try:
            blob = TextBlob(text[:10000])
            polarity = blob.sentiment.polarity
            if polarity > 0.1:
                return "positive"
            elif polarity < -0.1:
                return "negative"
            return "neutral"
        except Exception:
            return "neutral"

    def generate_response(self, message: str) -> str:
        message_lower = message.lower()
        if "hello" in message_lower or "hi" in message_lower:
            return "Hello! I'm CogniSync AI. I can help you analyze notes, prioritize tasks, or explore your knowledge graph."
        if "note" in message_lower or "analyze" in message_lower:
            return "I can extract entities, generate summaries, and detect sentiment from your notes. Try uploading or creating a note and I'll analyze it."
        if "task" in message_lower or "prioritize" in message_lower:
            return "I prioritize tasks based on deadlines, dependencies, and your work patterns. Check your Smart Tasks dashboard."
        if "graph" in message_lower or "connect" in message_lower:
            return "Your knowledge graph visualizes connections between notes and extracted entities. Visit the Knowledge Graph page."
        return "I'm here to help you manage your knowledge. You can ask me about notes, tasks, documents, or your knowledge graph."


from collections import defaultdict
