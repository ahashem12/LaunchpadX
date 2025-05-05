from typing import List, Optional
from models.project_model import Project
from database import get_database

class ProjectRepository:
    def __init__(self):
        self.db = get_database()
        self.collection = self.db

    async def create(self, project: Project) -> Project:
        project_dict = project.dict()
        result = await self.collection.insert_one(project_dict)
        project_dict["_id"] = str(result.inserted_id)
        return Project(**project_dict)

    async def get_all(self) -> List[Project]:
        projects = await self.collection.find().to_list(length=None)
        return [Project(**project) for project in projects]

    async def get_by_id(self, project_id: str) -> Optional[Project]:
        project = await self.collection.find_one({"_id": project_id})
        if project:
            return Project(**project)
        return None

    async def get_by_program_id(self, program_id: str) -> List[Project]:
        projects = await self.collection.find({"program_id": program_id}).to_list(length=None)
        return [Project(**project) for project in projects]

    async def update(self, project_id: str, project: Project) -> Optional[Project]:
        project_dict = project.dict()
        result = await self.collection.update_one(
            {"_id": project_id},
            {"$set": project_dict}
        )
        if result.modified_count:
            return await self.get_by_id(project_id)
        return None

    async def delete(self, project_id: str) -> bool:
        result = await self.collection.delete_one({"_id": project_id})
        return result.deleted_count > 0