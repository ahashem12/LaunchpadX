from typing import List, Optional
from ..models.report_model import Report, ReportTemplate
from ..database import get_database

class ReportRepository:
    def __init__(self):
        self.db = get_database()
        self.reports_collection = self.db.reports
        self.templates_collection = self.db.report_templates

    # Report methods
    async def create_report(self, report: Report) -> Report:
        report_dict = report.dict()
        result = await self.reports_collection.insert_one(report_dict)
        report_dict["_id"] = str(result.inserted_id)
        return Report(**report_dict)

    async def get_report_by_id(self, report_id: str) -> Optional[Report]:
        report = await self.reports_collection.find_one({"_id": report_id})
        if report:
            return Report(**report)
        return None

    async def get_reports_by_user(self, user_id: str) -> List[Report]:
        reports = await self.reports_collection.find({"user_id": user_id}).to_list(length=None)
        return [Report(**report) for report in reports]

    async def get_reports_by_project(self, project_id: str) -> List[Report]:
        reports = await self.reports_collection.find({"project_id": project_id}).to_list(length=None)
        return [Report(**report) for report in reports]

    async def get_reports_by_program(self, program_id: str) -> List[Report]:
        reports = await self.reports_collection.find({"program_id": program_id}).to_list(length=None)
        return [Report(**report) for report in reports]

    async def update_report(self, report_id: str, report: Report) -> Optional[Report]:
        report_dict = report.dict()
        result = await self.reports_collection.update_one(
            {"_id": report_id},
            {"$set": report_dict}
        )
        if result.modified_count:
            return await self.get_report_by_id(report_id)
        return None

    # Template methods
    async def create_template(self, template: ReportTemplate) -> ReportTemplate:
        template_dict = template.dict()
        result = await self.templates_collection.insert_one(template_dict)
        template_dict["_id"] = str(result.inserted_id)
        return ReportTemplate(**template_dict)

    async def get_template_by_id(self, template_id: str) -> Optional[ReportTemplate]:
        template = await self.templates_collection.find_one({"_id": template_id})
        if template:
            return ReportTemplate(**template)
        return None

    async def get_templates_by_type(self, template_type: str) -> List[ReportTemplate]:
        templates = await self.templates_collection.find({"type": template_type}).to_list(length=None)
        return [ReportTemplate(**template) for template in templates]

    async def update_template(self, template_id: str, template: ReportTemplate) -> Optional[ReportTemplate]:
        template_dict = template.dict()
        result = await self.templates_collection.update_one(
            {"_id": template_id},
            {"$set": template_dict}
        )
        if result.modified_count:
            return await self.get_template_by_id(template_id)
        return None 