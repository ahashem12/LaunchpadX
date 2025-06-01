from fastapi import APIRouter, Depends, HTTPException
from typing import List
from models.project_import_model import ProjectImport
from services.project_import_service import ProjectImportService
from repositories.project_import_repository import ProjectImportRepository

router = APIRouter()
project_import_service = ProjectImportService(ProjectImportRepository())

@router.post("/", response_model=ProjectImport)
async def create_project_import(project_import: ProjectImport):
    return await project_import_service.create_import(project_import)

@router.get("/", response_model=List[ProjectImport])
async def get_project_imports():
    return await project_import_service.get_all_imports()

@router.get("/{import_id}", response_model=ProjectImport)
async def get_project_import(import_id: str):
    project_import = await project_import_service.get_import_by_id(import_id)
    if not project_import:
        raise HTTPException(status_code=404, detail="Project import not found")
    return project_import

@router.get("/project/{project_id}", response_model=List[ProjectImport])
async def get_project_imports_by_project(project_id: str):
    return await project_import_service.get_imports_by_project(project_id)

@router.put("/{import_id}/status", response_model=ProjectImport)
async def update_import_status(import_id: str, status: str):
    updated_import = await project_import_service.update_import_status(import_id, status)
    if not updated_import:
        raise HTTPException(status_code=404, detail="Project import not found")
    return updated_import 