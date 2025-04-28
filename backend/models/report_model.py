from pydantic import BaseModel, Field
from typing import Dict, Any, List, Optional
from datetime import datetime

class Report(BaseModel):
    id: str = Field(default=None, alias="_id")
    name: str
    type: str
    content: Dict[str, Any]
    created_at: datetime = Field(default_factory=datetime.now)
    updated_at: datetime = Field(default_factory=datetime.now)
    user_id: Optional[str] = None
    project_id: Optional[str] = None
    program_id: Optional[str] = None

    class Config:
        allow_population_by_field_name = True
        json_encoders = {
            datetime: lambda v: v.isoformat()
        }

class ReportTemplate(BaseModel):
    id: str = Field(default=None, alias="_id")
    name: str
    type: str
    template: Dict[str, Any]
    created_at: datetime = Field(default_factory=datetime.now)
    updated_at: datetime = Field(default_factory=datetime.now)

    class Config:
        allow_population_by_field_name = True
        json_encoders = {
            datetime: lambda v: v.isoformat()
        } 