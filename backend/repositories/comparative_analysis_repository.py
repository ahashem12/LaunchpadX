from typing import List, Optional
from models.comparative_analysis_model import ComparativeAnalysis
from database import get_database

class ComparativeAnalysisRepository:
    def __init__(self):
        self.db = get_database()
        self.collection = self.db

    async def create(self, analysis: ComparativeAnalysis) -> ComparativeAnalysis:
        analysis_dict = analysis.dict()
        result = await self.collection.insert_one(analysis_dict)
        analysis_dict["_id"] = str(result.inserted_id)
        return ComparativeAnalysis(**analysis_dict)

    async def get_by_id(self, analysis_id: str) -> Optional[ComparativeAnalysis]:
        analysis = await self.collection.find_one({"_id": analysis_id})
        if analysis:
            return ComparativeAnalysis(**analysis)
        return None

    async def get_by_project(self, project_id: str) -> List[ComparativeAnalysis]:
        analyses = await self.collection.find({"project_ids": project_id}).to_list(length=None)
        return [ComparativeAnalysis(**analysis) for analysis in analyses]

    async def get_by_type(self, analysis_type: str) -> List[ComparativeAnalysis]:
        analyses = await self.collection.find({"analysis_type": analysis_type}).to_list(length=None)
        return [ComparativeAnalysis(**analysis) for analysis in analyses]

    async def update(self, analysis_id: str, analysis: ComparativeAnalysis) -> Optional[ComparativeAnalysis]:
        analysis_dict = analysis.dict()
        result = await self.collection.update_one(
            {"_id": analysis_id},
            {"$set": analysis_dict}
        )
        if result.modified_count:
            return await self.get_by_id(analysis_id)
        return None