from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime

class Project(BaseModel):
    id: str = Field(default=None, alias="_id")
    name: str
    description: str
    program_id: str
    status: str
    created_at: datetime = Field(default_factory=datetime.now)
    updated_at: datetime = Field(default_factory=datetime.now)

    class Config:
        allow_population_by_field_name = True
        json_encoders = {
            datetime: lambda v: v.isoformat()
        } 