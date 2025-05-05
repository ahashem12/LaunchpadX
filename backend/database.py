from typing import Optional
import os
import asyncpg

class Database:
    pool: Optional[asyncpg.Pool] = None

    @classmethod
    async def connect_to_database(cls):
        if cls.pool is None:
            cls.pool = await asyncpg.create_pool(
                dsn=os.getenv("POSTGRES_URL", "postgresql://user:password@localhost:5432/consulti_db")
            )

    @classmethod
    async def close_database_connection(cls):
        if cls.pool is not None:
            await cls.pool.close()
            cls.pool = None

    @classmethod
    def get_database(cls):
        if cls.pool is None:
            print("Database not connected")
        return cls.pool

def get_database():
    return Database.get_database()