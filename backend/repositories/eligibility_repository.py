from typing import List, Optional
from models.eligibility_model import EligibilityCriteria, EligibilityResult
from database import get_database

class EligibilityRepository:
    def __init__(self):
        self.db = get_database()
        self.criteria_collection = self.db
        self.results_collection = self.db

    # Criteria methods
    async def create_criteria(self, criteria: EligibilityCriteria) -> EligibilityCriteria:
        criteria_dict = criteria.dict()
        result = await self.criteria_collection.insert_one(criteria_dict)
        criteria_dict["_id"] = str(result.inserted_id)
        return EligibilityCriteria(**criteria_dict)

    async def get_criteria_by_program(self, program_id: str) -> Optional[EligibilityCriteria]:
        criteria = await self.criteria_collection.find_one({"program_id": program_id})
        if criteria:
            return EligibilityCriteria(**criteria)
        return None

    async def update_criteria(self, criteria_id: str, criteria: EligibilityCriteria) -> Optional[EligibilityCriteria]:
        criteria_dict = criteria.dict()
        result = await self.criteria_collection.update_one(
            {"_id": criteria_id},
            {"$set": criteria_dict}
        )
        if result.modified_count:
            return await self.get_criteria_by_program(criteria.program_id)
        return None

    # Results methods
    async def create_result(self, result: EligibilityResult) -> EligibilityResult:
        result_dict = result.dict()
        db_result = await self.results_collection.insert_one(result_dict)
        result_dict["_id"] = str(db_result.inserted_id)
        return EligibilityResult(**result_dict)

    async def get_result_by_id(self, result_id: str) -> Optional[EligibilityResult]:
        result = await self.results_collection.find_one({"_id": result_id})
        if result:
            return EligibilityResult(**result)
        return None

    async def get_results_by_project(self, project_id: str) -> List[EligibilityResult]:
        results = await self.results_collection.find({"project_id": project_id}).to_list(length=None)
        return [EligibilityResult(**result) for result in results]

    async def get_results_by_program(self, program_id: str) -> List[EligibilityResult]:
        results = await self.results_collection.find({"program_id": program_id}).to_list(length=None)
        return [EligibilityResult(**result) for result in results]