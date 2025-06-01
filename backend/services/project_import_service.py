from typing import List, Optional
from models.project_import_model import ProjectImport
from repositories.project_import_repository import ProjectImportRepository

class ProjectImportService:
    def __init__(self, repository: ProjectImportRepository):
        self.repository = repository

    async def create_import(self, project_import: ProjectImport) -> ProjectImport:
        return await self.repository.create(project_import)

    async def get_all_imports(self) -> List[ProjectImport]:
        return await self.repository.get_all()

    async def get_import_by_id(self, import_id: str) -> Optional[ProjectImport]:
        return await self.repository.get_by_id(import_id)

    async def get_imports_by_project(self, project_id: str) -> List[ProjectImport]:
        return await self.repository.get_by_project_id(project_id)

    async def update_import_status(self, import_id: str, status: str) -> Optional[ProjectImport]:
        return await self.repository.update_status(import_id, status)