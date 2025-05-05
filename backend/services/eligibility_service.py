from typing import List, Optional
from models.eligibility_model import EligibilityCriteria, EligibilityResult
from repositories.eligibility_repository import EligibilityRepository

class EligibilityService:
    def __init__(self, repository: EligibilityRepository):
        self.repository = repository

    # Criteria methods
    async def create_criteria(self, criteria: EligibilityCriteria) -> EligibilityCriteria:
        return await self.repository.create_criteria(criteria)

    async def get_criteria_by_program(self, program_id: str) -> Optional[EligibilityCriteria]:
        return await self.repository.get_criteria_by_program(program_id)

    async def update_criteria(self, criteria_id: str, criteria: EligibilityCriteria) -> Optional[EligibilityCriteria]:
        return await self.repository.update_criteria(criteria_id, criteria)

    # Results methods
    async def create_result(self, result: EligibilityResult) -> EligibilityResult:
        return await self.repository.create_result(result)

    async def get_result_by_id(self, result_id: str) -> Optional[EligibilityResult]:
        return await self.repository.get_result_by_id(result_id)

    async def get_results_by_project(self, project_id: str) -> List[EligibilityResult]:
        return await self.repository.get_results_by_project(project_id)

    async def get_results_by_program(self, program_id: str) -> List[EligibilityResult]:
        return await self.repository.get_results_by_program(program_id)

    async def check_eligibility(self, project_id: str, program_id: str) -> EligibilityResult:
        criteria = await self.get_criteria_by_program(program_id)
        if not criteria:
            raise ValueError("No eligibility criteria found for this program")

        # Here you would implement the actual eligibility checking logic
        # This is a placeholder implementation
        is_eligible = True
        reasons = ["Project meets all criteria"]

        result = EligibilityResult(
            project_id=project_id,
            program_id=program_id,
            is_eligible=is_eligible,
            reasons=reasons
        )
        return await self.create_result(result)