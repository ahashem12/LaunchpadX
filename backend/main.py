from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.gzip import GZipMiddleware
from fastapi.responses import JSONResponse
from routers import api_router
from database import Database

app = FastAPI(
    title="Consulti API",
    description="Backend API for Consulti application",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Add Gzip compression
app.add_middleware(GZipMiddleware, minimum_size=1000)

# Include main router
app.include_router(api_router, prefix="/api/v1")

@app.on_event("startup")
async def startup_db_client():
    try:
        await Database.connect_to_database()
    except Exception as e:
        print(f"❌ Failed to connect to the database: {e}")
    

@app.on_event("shutdown")
async def shutdown_db_client():
    await Database.close_database_connection()

@app.get("/")
async def root():
    return {"message": "Welcome to Consulti API"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000) 