from fastapi import APIRouter, Depends, HTTPException
from typing import List, Any
from ..models.settings_model import UserSettings, SystemSettings
from ..services.settings_service import SettingsService
from ..repositories.settings_repository import SettingsRepository

router = APIRouter()
settings_service = SettingsService(SettingsRepository())

# User settings endpoints
@router.post("/user/", response_model=UserSettings)
async def create_user_settings(settings: UserSettings):
    return await settings_service.create_user_settings(settings)

@router.get("/user/{user_id}", response_model=UserSettings)
async def get_user_settings(user_id: str):
    settings = await settings_service.get_user_settings(user_id)
    if not settings:
        settings = await settings_service.get_default_user_settings(user_id)
    return settings

@router.put("/user/{user_id}", response_model=UserSettings)
async def update_user_settings(user_id: str, settings: UserSettings):
    updated_settings = await settings_service.update_user_settings(user_id, settings)
    if not updated_settings:
        raise HTTPException(status_code=404, detail="User settings not found")
    return updated_settings

@router.patch("/user/{user_id}/{key}", response_model=UserSettings)
async def update_user_setting(user_id: str, key: str, value: Any):
    updated_settings = await settings_service.update_user_setting(user_id, key, value)
    if not updated_settings:
        raise HTTPException(status_code=404, detail="User settings not found")
    return updated_settings

# System settings endpoints
@router.post("/system/", response_model=SystemSettings)
async def create_system_setting(setting: SystemSettings):
    return await settings_service.create_system_setting(setting)

@router.get("/system/{key}", response_model=SystemSettings)
async def get_system_setting(key: str):
    setting = await settings_service.get_system_setting(key)
    if not setting:
        raise HTTPException(status_code=404, detail="System setting not found")
    return setting

@router.get("/system/", response_model=List[SystemSettings])
async def get_all_system_settings():
    return await settings_service.get_all_system_settings()

@router.put("/system/{key}", response_model=SystemSettings)
async def update_system_setting(key: str, value: Any):
    updated_setting = await settings_service.update_system_setting(key, value)
    if not updated_setting:
        raise HTTPException(status_code=404, detail="System setting not found")
    return updated_setting

@router.delete("/system/{key}")
async def delete_system_setting(key: str):
    success = await settings_service.delete_system_setting(key)
    if not success:
        raise HTTPException(status_code=404, detail="System setting not found")
    return {"message": "System setting deleted successfully"} 