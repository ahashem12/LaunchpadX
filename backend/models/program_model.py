from pydantic import BaseModel, Field
from typing import List
from datetime import datetime

class Program(BaseModel):
    id: str = Field(default=None, alias="_id")
    name: str
    description: str
    requirements: List[str]
    created_at: datetime = Field(default_factory=datetime.now)
    updated_at: datetime = Field(default_factory=datetime.now)

    class Config:
        allow_population_by_field_name = True
        json_encoders = {
            datetime: lambda v: v.isoformat()
        } 