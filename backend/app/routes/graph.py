from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.database import get_db
from app.schemas.user import UserResponse
from app.services.auth_service import AuthService
from app.services.graph_service import GraphService

router = APIRouter(prefix="/graph", tags=["Knowledge Graph"])


@router.get("/")
async def get_graph(
    db: AsyncSession = Depends(get_db),
    current_user: UserResponse = Depends(AuthService.get_current_user),
):
    service = GraphService(db)
    return await service.build_graph(current_user.id)
