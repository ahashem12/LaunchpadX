from typing import List, Optional
from ..models.comparative_analysis_model import ComparativeAnalysis
from ..repositories.comparative_analysis_repository import ComparativeAnalysisRepository

class ComparativeAnalysisService:
    def __init__(self, repository: ComparativeAnalysisRepository):
        self.repository = repository

    async def create_analysis(self, analysis: ComparativeAnalysis) -> ComparativeAnalysis:
        return await self.repository.create(analysis)

    async def get_analysis_by_id(self, analysis_id: str) -> Optional[ComparativeAnalysis]:
        return await self.repository.get_by_id(analysis_id)

    async def get_analyses_by_project(self, project_id: str) -> List[ComparativeAnalysis]:
        return await self.repository.get_by_project(project_id)

    async def get_analyses_by_type(self, analysis_type: str) -> List[ComparativeAnalysis]:
        return await self.repository.get_by_type(analysis_type)

    async def update_analysis(self, analysis_id: str, analysis: ComparativeAnalysis) -> Optional[ComparativeAnalysis]:
        return await self.repository.update(analysis_id, analysis)

    async def generate_comparative_analysis(self, project_ids: List[str], analysis_type: str) -> ComparativeAnalysis:
        # Here you would implement the actual comparative analysis logic
        # This is a placeholder implementation
        results = {
            "comparison_points": [
                {
                    "metric": "performance",
                    "values": {
                        project_id: 85 for project_id in project_ids
                    }
                },
                {
                    "metric": "security",
                    "values": {
                        project_id: 90 for project_id in project_ids
                    }
                }
            ],
            "summary": "Projects show similar performance and security metrics"
        }

        analysis = ComparativeAnalysis(
            project_ids=project_ids,
            analysis_type=analysis_type,
            results=results
        )
        return await self.create_analysis(analysis) 