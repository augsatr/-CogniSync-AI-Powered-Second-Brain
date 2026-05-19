from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from app.schemas.user import UserResponse
from app.services.auth_service import AuthService
from app.ai.nlp import NLPService

router = APIRouter(prefix="/ai", tags=["AI"])


class ChatRequest(BaseModel):
    message: str


class AnalyzeRequest(BaseModel):
    text: str


class ChatResponse(BaseModel):
    response: str


class AnalyzeResponse(BaseModel):
    entities: list[dict]
    summary: str
    sentiment: str


@router.post("/chat", response_model=ChatResponse)
async def chat(
    data: ChatRequest,
    current_user: UserResponse = Depends(AuthService.get_current_user),
):
    try:
        nlp = NLPService()
        response = nlp.generate_response(data.message)
        return ChatResponse(response=response)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/analyze", response_model=AnalyzeResponse)
async def analyze_text(
    data: AnalyzeRequest,
    current_user: UserResponse = Depends(AuthService.get_current_user),
):
    try:
        nlp = NLPService()
        entities = nlp.extract_entities(data.text)
        summary = nlp.summarize(data.text)
        sentiment = nlp.analyze_sentiment(data.text)
        return AnalyzeResponse(
            entities=[{"name": e["name"], "entity_type": e["type"], "relevance": e["relevance"]} for e in entities],
            summary=summary,
            sentiment=sentiment,
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
