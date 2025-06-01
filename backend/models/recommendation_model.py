from pydantic import BaseModel, Field
from typing import List, Dict, Any
from datetime import datetime

class Recommendation(BaseModel):
    id: str = Field(default=None, alias="_id")
    project_id: str
    program_id: str
    recommendations: List[Dict[str, Any]]
    created_at: datetime = Field(default_factory=datetime.now)

    class Config:
        allow_population_by_field_name = True
        json_encoders = {
            datetime: lambda v: v.isoformat()
        } 