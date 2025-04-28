from typing import List, Optional
from ..models.project_import_model import ProjectImport
from ..database import get_database

class ProjectImportRepository:
    def __init__(self):
        self.db = get_database()
        self.collection = self.db.project_imports

    async def create(self, project_import: ProjectImport) -> ProjectImport:
        project_import_dict = project_import.dict()
        result = await self.collection.insert_one(project_import_dict)
        project_import_dict["_id"] = str(result.inserted_id)
        return ProjectImport(**project_import_dict)

    async def get_all(self) -> List[ProjectImport]:
        imports = await self.collection.find().to_list(length=None)
        return [ProjectImport(**import_data) for import_data in imports]

    async def get_by_id(self, import_id: str) -> Optional[ProjectImport]:
        import_data = await self.collection.find_one({"_id": import_id})
        if import_data:
            return ProjectImport(**import_data)
        return None

    async def get_by_project_id(self, project_id: str) -> List[ProjectImport]:
        imports = await self.collection.find({"project_id": project_id}).to_list(length=None)
        return [ProjectImport(**import_data) for import_data in imports]

    async def update_status(self, import_id: str, status: str) -> Optional[ProjectImport]:
        result = await self.collection.update_one(
            {"_id": import_id},
            {"$set": {"status": status}}
        )
        if result.modified_count:
            return await self.get_by_id(import_id)
        return None 