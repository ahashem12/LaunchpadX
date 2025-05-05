from typing import List, Optional
from models.program_model import Program
from repositories.program_repository import ProgramRepository

class ProgramService:
    def __init__(self, repository: ProgramRepository):
        self.repository = repository

    async def create_program(self, program: Program) -> Program:
        return await self.repository.create(program)

    async def get_all_programs(self) -> List[Program]:
        return await self.repository.get_all()

    async def get_program_by_id(self, program_id: str) -> Optional[Program]:
        return await self.repository.get_by_id(program_id)

    async def update_program(self, program_id: str, program: Program) -> Optional[Program]:
        return await self.repository.update(program_id, program)

    async def delete_program(self, program_id: str) -> bool:
        return await self.repository.delete(program_id) 