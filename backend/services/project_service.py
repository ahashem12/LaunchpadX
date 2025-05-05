from typing import List, Optional
from models.project_model import Project
from repositories.project_repository import ProjectRepository

class ProjectService:
    def __init__(self, repository: ProjectRepository):
        self.repository = repository

    async def create_project(self, project: Project) -> Project:
        return await self.repository.create(project)

    async def get_all_projects(self) -> List[Project]:
        return await self.repository.get_all()

    async def get_project_by_id(self, project_id: str) -> Optional[Project]:
        return await self.repository.get_by_id(project_id)

    async def get_projects_by_program(self, program_id: str) -> List[Project]:
        return await self.repository.get_by_program_id(program_id)

    async def update_project(self, project_id: str, project: Project) -> Optional[Project]:
        return await self.repository.update(project_id, project)

    async def delete_project(self, project_id: str) -> bool:
        return await self.repository.delete(project_id)