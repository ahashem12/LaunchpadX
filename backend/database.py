from motor.motor_asyncio import AsyncIOMotorClient
from typing import Optional
import os

class Database:
    client: Optional[AsyncIOMotorClient] = None

    @classmethod
    async def connect_to_database(cls):
        if cls.client is None:
            cls.client = AsyncIOMotorClient(os.getenv("MONGODB_URL", "mongodb://localhost:27017"))
            cls.db = cls.client.consulti_db

    @classmethod
    async def close_database_connection(cls):
        if cls.client is not None:
            cls.client.close()
            cls.client = None

    @classmethod
    def get_database(cls):
        if cls.client is None:
            raise Exception("Database not connected")
        return cls.db

async def get_database():
    return Database.get_database() 