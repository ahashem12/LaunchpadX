from fastapi import APIRouter, Depends, HTTPException
from typing import List
from ..models.dashboard_model import DashboardData, DashboardWidget, DashboardLayout
from ..services.dashboard_service import DashboardService
from ..repositories.dashboard_repository import DashboardRepository

router = APIRouter()
dashboard_service = DashboardService(DashboardRepository())

# Data endpoints
@router.post("/data/", response_model=DashboardData)
async def create_data(data: DashboardData):
    return await dashboard_service.create_data(data)

@router.get("/data/{data_id}", response_model=DashboardData)
async def get_data(data_id: str):
    data = await dashboard_service.get_data_by_id(data_id)
    if not data:
        raise HTTPException(status_code=404, detail="Dashboard data not found")
    return data

@router.get("/data/user/{user_id}", response_model=List[DashboardData])
async def get_data_by_user(user_id: str):
    return await dashboard_service.get_data_by_user(user_id)

@router.put("/data/{data_id}", response_model=DashboardData)
async def update_data(data_id: str, data: DashboardData):
    updated_data = await dashboard_service.update_data(data_id, data)
    if not updated_data:
        raise HTTPException(status_code=404, detail="Dashboard data not found")
    return updated_data

# Widget endpoints
@router.post("/widgets/", response_model=DashboardWidget)
async def create_widget(widget: DashboardWidget):
    return await dashboard_service.create_widget(widget)

@router.get("/widgets/{widget_id}", response_model=DashboardWidget)
async def get_widget(widget_id: str):
    widget = await dashboard_service.get_widget_by_id(widget_id)
    if not widget:
        raise HTTPException(status_code=404, detail="Widget not found")
    return widget

@router.get("/widgets/user/{user_id}", response_model=List[DashboardWidget])
async def get_widgets_by_user(user_id: str):
    return await dashboard_service.get_widgets_by_user(user_id)

@router.put("/widgets/{widget_id}", response_model=DashboardWidget)
async def update_widget(widget_id: str, widget: DashboardWidget):
    updated_widget = await dashboard_service.update_widget(widget_id, widget)
    if not updated_widget:
        raise HTTPException(status_code=404, detail="Widget not found")
    return updated_widget

# Layout endpoints
@router.post("/layouts/", response_model=DashboardLayout)
async def create_layout(layout: DashboardLayout):
    return await dashboard_service.create_layout(layout)

@router.get("/layouts/user/{user_id}", response_model=DashboardLayout)
async def get_layout_by_user(user_id: str):
    layout = await dashboard_service.get_layout_by_user(user_id)
    if not layout:
        raise HTTPException(status_code=404, detail="Layout not found")
    return layout

@router.put("/layouts/{layout_id}", response_model=DashboardLayout)
async def update_layout(layout_id: str, layout: DashboardLayout):
    updated_layout = await dashboard_service.update_layout(layout_id, layout)
    if not updated_layout:
        raise HTTPException(status_code=404, detail="Layout not found")
    return updated_layout

# Data generation endpoint
@router.post("/generate-data/", response_model=DashboardData)
async def generate_data(user_id: str, data_type: str):
    return await dashboard_service.generate_dashboard_data(user_id, data_type) 