from typing import List, Optional, Any, Dict
from models.settings_model import UserSettings, SystemSettings
from repositories.settings_repository import SettingsRepository

class SettingsService:
    def __init__(self, repository: SettingsRepository):
        self.repository = repository

    # User settings methods
    async def create_user_settings(self, settings: UserSettings) -> UserSettings:
        return await self.repository.create_user_settings(settings)

    async def get_user_settings(self, user_id: str) -> Optional[UserSettings]:
        return await self.repository.get_user_settings(user_id)

    async def update_user_settings(self, user_id: str, settings: UserSettings) -> Optional[UserSettings]:
        return await self.repository.update_user_settings(user_id, settings)

    # System settings methods
    async def create_system_setting(self, setting: SystemSettings) -> SystemSettings:
        return await self.repository.create_system_setting(setting)

    async def get_system_setting(self, key: str) -> Optional[SystemSettings]:
        return await self.repository.get_system_setting(key)

    async def get_all_system_settings(self) -> List[SystemSettings]:
        return await self.repository.get_all_system_settings()

    async def update_system_setting(self, key: str, value: Any) -> Optional[SystemSettings]:
        return await self.repository.update_system_setting(key, value)

    async def delete_system_setting(self, key: str) -> bool:
        return await self.repository.delete_system_setting(key)

    async def get_default_user_settings(self, user_id: str) -> UserSettings:
        # Here you would implement the default settings logic
        # This is a placeholder implementation
        default_settings = {
            "theme": "light",
            "notifications": {
                "email": True,
                "push": True
            },
            "preferences": {
                "language": "en",
                "timezone": "UTC"
            }
        }

        settings = UserSettings(
            user_id=user_id,
            settings=default_settings
        )
        return await self.create_user_settings(settings)

    async def update_user_setting(self, user_id: str, key: str, value: Any) -> Optional[UserSettings]:
        current_settings = await self.get_user_settings(user_id)
        if not current_settings:
            current_settings = await self.get_default_user_settings(user_id)

        settings_dict = current_settings.settings
        settings_dict[key] = value

        updated_settings = UserSettings(
            user_id=user_id,
            settings=settings_dict
        )
        return await self.update_user_settings(user_id, updated_settings)