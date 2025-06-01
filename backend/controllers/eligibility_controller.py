from fastapi import APIRouter, Depends, HTTPException
from typing import List
from models.eligibility_model import EligibilityCriteria, EligibilityResult
from services.eligibility_service import EligibilityService
from repositories.eligibility_repository import EligibilityRepository

router = APIRouter()
eligibility_service = EligibilityService(EligibilityRepository())

# Criteria endpoints
@router.post("/criteria/", response_model=EligibilityCriteria)
async def create_criteria(criteria: EligibilityCriteria):
    return await eligibility_service.create_criteria(criteria)

@router.get("/criteria/program/{program_id}", response_model=EligibilityCriteria)
async def get_criteria_by_program(program_id: str):
    criteria = await eligibility_service.get_criteria_by_program(program_id)
    if not criteria:
        raise HTTPException(status_code=404, detail="Eligibility criteria not found")
    return criteria

@router.put("/criteria/{criteria_id}", response_model=EligibilityCriteria)
async def update_criteria(criteria_id: str, criteria: EligibilityCriteria):
    updated_criteria = await eligibility_service.update_criteria(criteria_id, criteria)
    if not updated_criteria:
        raise HTTPException(status_code=404, detail="Eligibility criteria not found")
    return updated_criteria

# Results endpoints
@router.post("/check/", response_model=EligibilityResult)
async def check_eligibility(project_id: str, program_id: str):
    try:
        return await eligibility_service.check_eligibility(project_id, program_id)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/results/{result_id}", response_model=EligibilityResult)
async def get_result(result_id: str):
    result = await eligibility_service.get_result_by_id(result_id)
    if not result:
        raise HTTPException(status_code=404, detail="Eligibility result not found")
    return result

@router.get("/results/project/{project_id}", response_model=List[EligibilityResult])
async def get_results_by_project(project_id: str):
    return await eligibility_service.get_results_by_project(project_id)

@router.get("/results/program/{program_id}", response_model=List[EligibilityResult])
async def get_results_by_program(program_id: str):
    return await eligibility_service.get_results_by_program(program_id)