from fastapi import APIRouter
from controllers.program_controller import router as program_router
from controllers.project_controller import router as project_router
from controllers.project_import_controller import router as project_import_router
from controllers.eligibility_controller import router as eligibility_router
from controllers.recommendation_controller import router as recommendation_router
from controllers.comparative_analysis_controller import router as comparative_analysis_router
from controllers.chat_controller import router as chat_router
from controllers.dashboard_controller import router as dashboard_router
from controllers.report_controller import router as report_router
from controllers.settings_controller import router as settings_router

# Create main router
api_router = APIRouter()

# Include all routers
api_router.include_router(program_router, prefix="/programs", tags=["Programs"])
api_router.include_router(project_router, prefix="/projects", tags=["Projects"])
api_router.include_router(project_import_router, prefix="/project-imports", tags=["Project Imports"])
api_router.include_router(eligibility_router, prefix="/eligibility", tags=["Eligibility"])
api_router.include_router(recommendation_router, prefix="/recommendations", tags=["Recommendations"])
api_router.include_router(comparative_analysis_router, prefix="/comparative-analysis", tags=["Comparative Analysis"])
api_router.include_router(chat_router, prefix="/chat", tags=["Chat"])
api_router.include_router(dashboard_router, prefix="/dashboard", tags=["Dashboard"])
api_router.include_router(report_router, prefix="/reports", tags=["Reports"])
api_router.include_router(settings_router, prefix="/settings", tags=["Settings"])