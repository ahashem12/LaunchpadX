from fastapi import APIRouter, Depends, HTTPException
from typing import List
from models.project_model import Project
from services.project_service import ProjectService
from repositories.project_repository import ProjectRepository

router = APIRouter()
project_service = ProjectService(ProjectRepository())

@router.post("/", response_model=Project)
async def create_project(project: Project):
    return await project_service.create_project(project)

@router.get("/", response_model=List[Project])
async def get_projects():
    return await project_service.get_all_projects()

@router.get("/{project_id}", response_model=Project)
async def get_project(project_id: str):
    project = await project_service.get_project_by_id(project_id)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    return project

@router.get("/program/{program_id}", response_model=List[Project])
async def get_projects_by_program(program_id: str):
    return await project_service.get_projects_by_program(program_id)

@router.put("/{project_id}", response_model=Project)
async def update_project(project_id: str, project: Project):
    updated_project = await project_service.update_project(project_id, project)
    if not updated_project:
        raise HTTPException(status_code=404, detail="Project not found")
    return updated_project

@router.delete("/{project_id}")
async def delete_project(project_id: str):
    success = await project_service.delete_project(project_id)
    if not success:
        raise HTTPException(status_code=404, detail="Project not found")
    return {"message": "Project deleted successfully"} 