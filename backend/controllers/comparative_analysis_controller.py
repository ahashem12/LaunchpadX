from fastapi import APIRouter, Depends, HTTPException
from typing import List
from models.comparative_analysis_model import ComparativeAnalysis
from services.comparative_analysis_service import ComparativeAnalysisService
from repositories.comparative_analysis_repository import ComparativeAnalysisRepository

router = APIRouter()
comparative_analysis_service = ComparativeAnalysisService(ComparativeAnalysisRepository())

@router.post("/", response_model=ComparativeAnalysis)
async def create_analysis(analysis: ComparativeAnalysis):
    return await comparative_analysis_service.create_analysis(analysis)

@router.get("/{analysis_id}", response_model=ComparativeAnalysis)
async def get_analysis(analysis_id: str):
    analysis = await comparative_analysis_service.get_analysis_by_id(analysis_id)
    if not analysis:
        raise HTTPException(status_code=404, detail="Comparative analysis not found")
    return analysis

@router.get("/project/{project_id}", response_model=List[ComparativeAnalysis])
async def get_analyses_by_project(project_id: str):
    return await comparative_analysis_service.get_analyses_by_project(project_id)

@router.get("/type/{analysis_type}", response_model=List[ComparativeAnalysis])
async def get_analyses_by_type(analysis_type: str):
    return await comparative_analysis_service.get_analyses_by_type(analysis_type)

@router.put("/{analysis_id}", response_model=ComparativeAnalysis)
async def update_analysis(analysis_id: str, analysis: ComparativeAnalysis):
    updated_analysis = await comparative_analysis_service.update_analysis(analysis_id, analysis)
    if not updated_analysis:
        raise HTTPException(status_code=404, detail="Comparative analysis not found")
    return updated_analysis

@router.post("/generate/", response_model=ComparativeAnalysis)
async def generate_analysis(project_ids: List[str], analysis_type: str):
    return await comparative_analysis_service.generate_comparative_analysis(project_ids, analysis_type)