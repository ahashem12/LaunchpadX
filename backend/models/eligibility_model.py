from pydantic import BaseModel, Field
from typing import List, Dict, Any
from datetime import datetime

class EligibilityCriteria(BaseModel):
    id: str = Field(default=None, alias="_id")
    program_id: str
    criteria: Dict[str, Any]
    created_at: datetime = Field(default_factory=datetime.now)
    updated_at: datetime = Field(default_factory=datetime.now)

    class Config:
        allow_population_by_field_name = True
        json_encoders = {
            datetime: lambda v: v.isoformat()
        }

class EligibilityResult(BaseModel):
    id: str = Field(default=None, alias="_id")
    project_id: str
    program_id: str
    is_eligible: bool
    reasons: List[str]
    created_at: datetime = Field(default_factory=datetime.now)

    class Config:
        allow_population_by_field_name = True
        json_encoders = {
            datetime: lambda v: v.isoformat()
        } 