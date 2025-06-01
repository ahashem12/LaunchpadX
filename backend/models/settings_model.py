from pydantic import BaseModel, Field
from typing import Dict, Any, Optional
from datetime import datetime

class UserSettings(BaseModel):
    id: str = Field(default=None, alias="_id")
    user_id: str
    settings: Dict[str, Any]
    created_at: datetime = Field(default_factory=datetime.now)
    updated_at: datetime = Field(default_factory=datetime.now)

    class Config:
        allow_population_by_field_name = True
        json_encoders = {
            datetime: lambda v: v.isoformat()
        }

class SystemSettings(BaseModel):
    id: str = Field(default=None, alias="_id")
    key: str
    value: Any
    description: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.now)
    updated_at: datetime = Field(default_factory=datetime.now)

    class Config:
        allow_population_by_field_name = True
        json_encoders = {
            datetime: lambda v: v.isoformat()
        } 