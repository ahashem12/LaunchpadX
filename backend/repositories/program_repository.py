from typing import List, Optional
from models.program_model import Program
from database import get_database

class ProgramRepository:
    def __init__(self):
        self.db = get_database()
        self.collection = self.db

    async def create(self, program: Program) -> Program:
        program_dict = program.dict()
        result = await self.collection.insert_one(program_dict)
        program_dict["_id"] = str(result.inserted_id)
        return Program(**program_dict)

    async def get_all(self) -> List[Program]:
        programs = await self.collection.find().to_list(length=None)
        return [Program(**program) for program in programs]

    async def get_by_id(self, program_id: str) -> Optional[Program]:
        program = await self.collection.find_one({"_id": program_id})
        if program:
            return Program(**program)
        return None

    async def update(self, program_id: str, program: Program) -> Optional[Program]:
        program_dict = program.dict()
        result = await self.collection.update_one(
            {"_id": program_id},
            {"$set": program_dict}
        )
        if result.modified_count:
            return await self.get_by_id(program_id)
        return None

    async def delete(self, program_id: str) -> bool:
        result = await self.collection.delete_one({"_id": program_id})
        return result.deleted_count > 0