from fastapi import APIRouter, Depends, HTTPException
from typing import List
from ..models.program_model import Program
from ..services.program_service import ProgramService
from ..repositories.program_repository import ProgramRepository

router = APIRouter()
program_service = ProgramService(ProgramRepository())

@router.post("/", response_model=Program)
async def create_program(program: Program):
    return await program_service.create_program(program)

@router.get("/", response_model=List[Program])
async def get_programs():
    return await program_service.get_all_programs()

@router.get("/{program_id}", response_model=Program)
async def get_program(program_id: str):
    program = await program_service.get_program_by_id(program_id)
    if not program:
        raise HTTPException(status_code=404, detail="Program not found")
    return program 