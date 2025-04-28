from typing import List, Optional
from ..models.report_model import Report, ReportTemplate
from ..repositories.report_repository import ReportRepository

class ReportService:
    def __init__(self, repository: ReportRepository):
        self.repository = repository

    # Report methods
    async def create_report(self, report: Report) -> Report:
        return await self.repository.create_report(report)

    async def get_report_by_id(self, report_id: str) -> Optional[Report]:
        return await self.repository.get_report_by_id(report_id)

    async def get_reports_by_user(self, user_id: str) -> List[Report]:
        return await self.repository.get_reports_by_user(user_id)

    async def get_reports_by_project(self, project_id: str) -> List[Report]:
        return await self.repository.get_reports_by_project(project_id)

    async def get_reports_by_program(self, program_id: str) -> List[Report]:
        return await self.repository.get_reports_by_program(program_id)

    async def update_report(self, report_id: str, report: Report) -> Optional[Report]:
        return await self.repository.update_report(report_id, report)

    # Template methods
    async def create_template(self, template: ReportTemplate) -> ReportTemplate:
        return await self.repository.create_template(template)

    async def get_template_by_id(self, template_id: str) -> Optional[ReportTemplate]:
        return await self.repository.get_template_by_id(template_id)

    async def get_templates_by_type(self, template_type: str) -> List[ReportTemplate]:
        return await self.repository.get_templates_by_type(template_type)

    async def update_template(self, template_id: str, template: ReportTemplate) -> Optional[ReportTemplate]:
        return await self.repository.update_template(template_id, template)

    async def generate_report(self, template_id: str, user_id: str, project_id: Optional[str] = None, program_id: Optional[str] = None) -> Report:
        template = await self.get_template_by_id(template_id)
        if not template:
            raise ValueError("Template not found")

        # Here you would implement the actual report generation logic
        # This is a placeholder implementation
        content = {
            "summary": "Report generated from template",
            "data": {
                "metrics": {
                    "total_items": 100,
                    "processed_items": 75,
                    "remaining_items": 25
                },
                "charts": {
                    "progress": {
                        "labels": ["Completed", "In Progress", "Pending"],
                        "data": [75, 15, 10]
                    }
                }
            }
        }

        report = Report(
            name=f"Report from {template.name}",
            type=template.type,
            content=content,
            user_id=user_id,
            project_id=project_id,
            program_id=program_id
        )
        return await self.create_report(report) 