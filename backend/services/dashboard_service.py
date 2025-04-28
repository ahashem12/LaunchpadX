from typing import List, Optional
from ..models.dashboard_model import DashboardData, DashboardWidget, DashboardLayout
from ..repositories.dashboard_repository import DashboardRepository

class DashboardService:
    def __init__(self, repository: DashboardRepository):
        self.repository = repository

    # Data methods
    async def create_data(self, data: DashboardData) -> DashboardData:
        return await self.repository.create_data(data)

    async def get_data_by_id(self, data_id: str) -> Optional[DashboardData]:
        return await self.repository.get_data_by_id(data_id)

    async def get_data_by_user(self, user_id: str) -> List[DashboardData]:
        return await self.repository.get_data_by_user(user_id)

    async def update_data(self, data_id: str, data: DashboardData) -> Optional[DashboardData]:
        return await self.repository.update_data(data_id, data)

    # Widget methods
    async def create_widget(self, widget: DashboardWidget) -> DashboardWidget:
        return await self.repository.create_widget(widget)

    async def get_widget_by_id(self, widget_id: str) -> Optional[DashboardWidget]:
        return await self.repository.get_widget_by_id(widget_id)

    async def get_widgets_by_user(self, user_id: str) -> List[DashboardWidget]:
        return await self.repository.get_widgets_by_user(user_id)

    async def update_widget(self, widget_id: str, widget: DashboardWidget) -> Optional[DashboardWidget]:
        return await self.repository.update_widget(widget_id, widget)

    # Layout methods
    async def create_layout(self, layout: DashboardLayout) -> DashboardLayout:
        return await self.repository.create_layout(layout)

    async def get_layout_by_user(self, user_id: str) -> Optional[DashboardLayout]:
        return await self.repository.get_layout_by_user(user_id)

    async def update_layout(self, layout_id: str, layout: DashboardLayout) -> Optional[DashboardLayout]:
        return await self.repository.update_layout(layout_id, layout)

    async def generate_dashboard_data(self, user_id: str, data_type: str) -> DashboardData:
        # Here you would implement the actual dashboard data generation logic
        # This is a placeholder implementation
        data = {
            "metrics": {
                "total_projects": 10,
                "active_projects": 5,
                "completed_projects": 3
            },
            "charts": {
                "project_status": {
                    "labels": ["Active", "Completed", "Pending"],
                    "data": [5, 3, 2]
                }
            }
        }

        dashboard_data = DashboardData(
            user_id=user_id,
            data_type=data_type,
            data=data
        )
        return await self.create_data(dashboard_data) 