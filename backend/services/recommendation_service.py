from typing import List, Optional
from ..models.recommendation_model import Recommendation
from ..repositories.recommendation_repository import RecommendationRepository

class RecommendationService:
    def __init__(self, repository: RecommendationRepository):
        self.repository = repository

    async def create_recommendation(self, recommendation: Recommendation) -> Recommendation:
        return await self.repository.create(recommendation)

    async def get_recommendation_by_id(self, recommendation_id: str) -> Optional[Recommendation]:
        return await self.repository.get_by_id(recommendation_id)

    async def get_recommendations_by_project(self, project_id: str) -> List[Recommendation]:
        return await self.repository.get_by_project(project_id)

    async def get_recommendations_by_program(self, program_id: str) -> List[Recommendation]:
        return await self.repository.get_by_program(program_id)

    async def update_recommendation(self, recommendation_id: str, recommendation: Recommendation) -> Optional[Recommendation]:
        return await self.repository.update(recommendation_id, recommendation)

    async def generate_recommendations(self, project_id: str, program_id: str) -> Recommendation:
        # Here you would implement the actual recommendation generation logic
        # This is a placeholder implementation
        recommendations = [
            {
                "type": "improvement",
                "description": "Consider implementing additional security measures",
                "priority": "high"
            },
            {
                "type": "optimization",
                "description": "Optimize database queries for better performance",
                "priority": "medium"
            }
        ]

        recommendation = Recommendation(
            project_id=project_id,
            program_id=program_id,
            recommendations=recommendations
        )
        return await self.create_recommendation(recommendation) 