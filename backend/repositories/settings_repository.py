from typing import List, Optional, Any
from ..models.settings_model import UserSettings, SystemSettings
from ..database import get_database

class SettingsRepository:
    def __init__(self):
        self.db = get_database()
        self.user_settings_collection = self.db.user_settings
        self.system_settings_collection = self.db.system_settings

    # User settings methods
    async def create_user_settings(self, settings: UserSettings) -> UserSettings:
        settings_dict = settings.dict()
        result = await self.user_settings_collection.insert_one(settings_dict)
        settings_dict["_id"] = str(result.inserted_id)
        return UserSettings(**settings_dict)

    async def get_user_settings(self, user_id: str) -> Optional[UserSettings]:
        settings = await self.user_settings_collection.find_one({"user_id": user_id})
        if settings:
            return UserSettings(**settings)
        return None

    async def update_user_settings(self, user_id: str, settings: UserSettings) -> Optional[UserSettings]:
        settings_dict = settings.dict()
        result = await self.user_settings_collection.update_one(
            {"user_id": user_id},
            {"$set": settings_dict}
        )
        if result.modified_count:
            return await self.get_user_settings(user_id)
        return None

    # System settings methods
    async def create_system_setting(self, setting: SystemSettings) -> SystemSettings:
        setting_dict = setting.dict()
        result = await self.system_settings_collection.insert_one(setting_dict)
        setting_dict["_id"] = str(result.inserted_id)
        return SystemSettings(**setting_dict)

    async def get_system_setting(self, key: str) -> Optional[SystemSettings]:
        setting = await self.system_settings_collection.find_one({"key": key})
        if setting:
            return SystemSettings(**setting)
        return None

    async def get_all_system_settings(self) -> List[SystemSettings]:
        settings = await self.system_settings_collection.find().to_list(length=None)
        return [SystemSettings(**setting) for setting in settings]

    async def update_system_setting(self, key: str, value: Any) -> Optional[SystemSettings]:
        result = await self.system_settings_collection.update_one(
            {"key": key},
            {"$set": {"value": value}}
        )
        if result.modified_count:
            return await self.get_system_setting(key)
        return None

    async def delete_system_setting(self, key: str) -> bool:
        result = await self.system_settings_collection.delete_one({"key": key})
        return result.deleted_count > 0 