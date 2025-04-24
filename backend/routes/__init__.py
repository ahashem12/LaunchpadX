"""
Routes package for the Consulti API.
This package will contain all the route modules for different API endpoints.
"""

from fastapi import APIRouter

# Create a main router that will combine all sub-routers
main_router = APIRouter()

# Import and include all route modules here
# Example:
# from .auth import router as auth_router
# from .users import router as users_router
# from .consultations import router as consultations_router

# main_router.include_router(auth_router)
# main_router.include_router(users_router)
# main_router.include_router(consultations_router) 