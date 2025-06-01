from typing import List, Optional
from models.dashboard_model import DashboardData, DashboardWidget, DashboardLayout
from database import get_database

class DashboardRepository:
    def __init__(self):
        self.db = get_database()
        self.data_collection = self.db
        self.widget_collection = self.db
        self.layout_collection = self.db

    # Data methods
    async def create_data(self, data: DashboardData) -> DashboardData:
        data_dict = data.dict()
        result = await self.data_collection.insert_one(data_dict)
        data_dict["_id"] = str(result.inserted_id)
        return DashboardData(**data_dict)

    async def get_data_by_id(self, data_id: str) -> Optional[DashboardData]:
        data = await self.data_collection.find_one({"_id": data_id})
        if data:
            return DashboardData(**data)
        return None

    async def get_data_by_user(self, user_id: str) -> List[DashboardData]:
        data = await self.data_collection.find({"user_id": user_id}).to_list(length=None)
        return [DashboardData(**item) for item in data]

    async def update_data(self, data_id: str, data: DashboardData) -> Optional[DashboardData]:
        data_dict = data.dict()
        result = await self.data_collection.update_one(
            {"_id": data_id},
            {"$set": data_dict}
        )
        if result.modified_count:
            return await self.get_data_by_id(data_id)
        return None

    # Widget methods
    async def create_widget(self, widget: DashboardWidget) -> DashboardWidget:
        widget_dict = widget.dict()
        result = await self.widget_collection.insert_one(widget_dict)
        widget_dict["_id"] = str(result.inserted_id)
        return DashboardWidget(**widget_dict)

    async def get_widget_by_id(self, widget_id: str) -> Optional[DashboardWidget]:
        widget = await self.widget_collection.find_one({"_id": widget_id})
        if widget:
            return DashboardWidget(**widget)
        return None

    async def get_widgets_by_user(self, user_id: str) -> List[DashboardWidget]:
        widgets = await self.widget_collection.find({"user_id": user_id}).to_list(length=None)
        return [DashboardWidget(**widget) for widget in widgets]

    async def update_widget(self, widget_id: str, widget: DashboardWidget) -> Optional[DashboardWidget]:
        widget_dict = widget.dict()
        result = await self.widget_collection.update_one(
            {"_id": widget_id},
            {"$set": widget_dict}
        )
        if result.modified_count:
            return await self.get_widget_by_id(widget_id)
        return None

    # Layout methods
    async def create_layout(self, layout: DashboardLayout) -> DashboardLayout:
        layout_dict = layout.dict()
        result = await self.layout_collection.insert_one(layout_dict)
        layout_dict["_id"] = str(result.inserted_id)
        return DashboardLayout(**layout_dict)

    async def get_layout_by_user(self, user_id: str) -> Optional[DashboardLayout]:
        layout = await self.layout_collection.find_one({"user_id": user_id})
        if layout:
            return DashboardLayout(**layout)
        return None

    async def update_layout(self, layout_id: str, layout: DashboardLayout) -> Optional[DashboardLayout]:
        layout_dict = layout.dict()
        result = await self.layout_collection.update_one(
            {"_id": layout_id},
            {"$set": layout_dict}
        )
        if result.modified_count:
            return await self.get_layout_by_user(layout.user_id)
        return None