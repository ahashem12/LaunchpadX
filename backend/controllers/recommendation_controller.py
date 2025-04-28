from fastapi import APIRouter, Depends, HTTPException
from typing import List
from ..models.recommendation_model import Recommendation
from ..services.recommendation_service import RecommendationService
from ..repositories.recommendation_repository import RecommendationRepository

router = APIRouter()
recommendation_service = RecommendationService(RecommendationRepository())

@router.post("/", response_model=Recommendation)
async def create_recommendation(recommendation: Recommendation):
    return await recommendation_service.create_recommendation(recommendation)

@router.get("/{recommendation_id}", response_model=Recommendation)
async def get_recommendation(recommendation_id: str):
    recommendation = await recommendation_service.get_recommendation_by_id(recommendation_id)
    if not recommendation:
        raise HTTPException(status_code=404, detail="Recommendation not found")
    return recommendation

@router.get("/project/{project_id}", response_model=List[Recommendation])
async def get_recommendations_by_project(project_id: str):
    return await recommendation_service.get_recommendations_by_project(project_id)

@router.get("/program/{program_id}", response_model=List[Recommendation])
async def get_recommendations_by_program(program_id: str):
    return await recommendation_service.get_recommendations_by_program(program_id)

@router.put("/{recommendation_id}", response_model=Recommendation)
async def update_recommendation(recommendation_id: str, recommendation: Recommendation):
    updated_recommendation = await recommendation_service.update_recommendation(recommendation_id, recommendation)
    if not updated_recommendation:
        raise HTTPException(status_code=404, detail="Recommendation not found")
    return updated_recommendation

@router.post("/generate/", response_model=Recommendation)
async def generate_recommendations(project_id: str, program_id: str):
    return await recommendation_service.generate_recommendations(project_id, program_id) 