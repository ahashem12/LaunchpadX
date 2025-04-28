from pydantic import BaseModel, Field
from typing import Dict, Any, List
from datetime import datetime

class DashboardData(BaseModel):
    id: str = Field(default=None, alias="_id")
    user_id: str
    data_type: str
    data: Dict[str, Any]
    created_at: datetime = Field(default_factory=datetime.now)
    updated_at: datetime = Field(default_factory=datetime.now)

    class Config:
        allow_population_by_field_name = True
        json_encoders = {
            datetime: lambda v: v.isoformat()
        }

class DashboardWidget(BaseModel):
    id: str = Field(default=None, alias="_id")
    user_id: str
    widget_type: str
    position: Dict[str, int]
    config: Dict[str, Any]
    created_at: datetime = Field(default_factory=datetime.now)
    updated_at: datetime = Field(default_factory=datetime.now)

    class Config:
        allow_population_by_field_name = True
        json_encoders = {
            datetime: lambda v: v.isoformat()
        }

class DashboardLayout(BaseModel):
    id: str = Field(default=None, alias="_id")
    user_id: str
    widgets: List[DashboardWidget]
    created_at: datetime = Field(default_factory=datetime.now)
    updated_at: datetime = Field(default_factory=datetime.now)

    class Config:
        allow_population_by_field_name = True
        json_encoders = {
            datetime: lambda v: v.isoformat()
        } 