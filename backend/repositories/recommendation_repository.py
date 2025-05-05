from typing import List, Optional
from models.recommendation_model import Recommendation
from database import get_database

class RecommendationRepository:
    def __init__(self):
        self.db = get_database()
        self.collection = self.db

    async def create(self, recommendation: Recommendation) -> Recommendation:
        recommendation_dict = recommendation.dict()
        result = await self.collection.insert_one(recommendation_dict)
        recommendation_dict["_id"] = str(result.inserted_id)
        return Recommendation(**recommendation_dict)

    async def get_by_id(self, recommendation_id: str) -> Optional[Recommendation]:
        recommendation = await self.collection.find_one({"_id": recommendation_id})
        if recommendation:
            return Recommendation(**recommendation)
        return None

    async def get_by_project(self, project_id: str) -> List[Recommendation]:
        recommendations = await self.collection.find({"project_id": project_id}).to_list(length=None)
        return [Recommendation(**recommendation) for recommendation in recommendations]

    async def get_by_program(self, program_id: str) -> List[Recommendation]:
        recommendations = await self.collection.find({"program_id": program_id}).to_list(length=None)
        return [Recommendation(**recommendation) for recommendation in recommendations]

    async def update(self, recommendation_id: str, recommendation: Recommendation) -> Optional[Recommendation]:
        recommendation_dict = recommendation.dict()
        result = await self.collection.update_one(
            {"_id": recommendation_id},
            {"$set": recommendation_dict}
        )
        if result.modified_count:
            return await self.get_by_id(recommendation_id)
        return None