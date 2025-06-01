from fastapi import APIRouter, Depends, HTTPException
from typing import List, Optional
from models.report_model import Report, ReportTemplate
from services.report_service import ReportService
from repositories.report_repository import ReportRepository

router = APIRouter()
report_service = ReportService(ReportRepository())

# Report endpoints
@router.post("/", response_model=Report)
async def create_report(report: Report):
    return await report_service.create_report(report)

@router.get("/{report_id}", response_model=Report)
async def get_report(report_id: str):
    report = await report_service.get_report_by_id(report_id)
    if not report:
        raise HTTPException(status_code=404, detail="Report not found")
    return report

@router.get("/user/{user_id}", response_model=List[Report])
async def get_reports_by_user(user_id: str):
    return await report_service.get_reports_by_user(user_id)

@router.get("/project/{project_id}", response_model=List[Report])
async def get_reports_by_project(project_id: str):
    return await report_service.get_reports_by_project(project_id)

@router.get("/program/{program_id}", response_model=List[Report])
async def get_reports_by_program(program_id: str):
    return await report_service.get_reports_by_program(program_id)

@router.put("/{report_id}", response_model=Report)
async def update_report(report_id: str, report: Report):
    updated_report = await report_service.update_report(report_id, report)
    if not updated_report:
        raise HTTPException(status_code=404, detail="Report not found")
    return updated_report

# Template endpoints
@router.post("/templates/", response_model=ReportTemplate)
async def create_template(template: ReportTemplate):
    return await report_service.create_template(template)

@router.get("/templates/{template_id}", response_model=ReportTemplate)
async def get_template(template_id: str):
    template = await report_service.get_template_by_id(template_id)
    if not template:
        raise HTTPException(status_code=404, detail="Template not found")
    return template

@router.get("/templates/type/{template_type}", response_model=List[ReportTemplate])
async def get_templates_by_type(template_type: str):
    return await report_service.get_templates_by_type(template_type)

@router.put("/templates/{template_id}", response_model=ReportTemplate)
async def update_template(template_id: str, template: ReportTemplate):
    updated_template = await report_service.update_template(template_id, template)
    if not updated_template:
        raise HTTPException(status_code=404, detail="Template not found")
    return updated_template

# Report generation endpoint
@router.post("/generate/", response_model=Report)
async def generate_report(template_id: str, user_id: str, project_id: Optional[str] = None, program_id: Optional[str] = None):
    try:
        return await report_service.generate_report(template_id, user_id, project_id, program_id)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e)) 