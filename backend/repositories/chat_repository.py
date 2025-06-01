from typing import List, Optional
from models.chat_model import ChatMessage, ChatSession
from database import get_database

class ChatRepository:
    def __init__(self):
        self.db = get_database()
        self.messages_collection = self.db
        self.sessions_collection = self.db

    # Message methods
    async def create_message(self, message: ChatMessage) -> ChatMessage:
        message_dict = message.dict()
        result = await self.messages_collection.insert_one(message_dict)
        message_dict["_id"] = str(result.inserted_id)
        return ChatMessage(**message_dict)

    async def get_message_by_id(self, message_id: str) -> Optional[ChatMessage]:
        message = await self.messages_collection.find_one({"_id": message_id})
        if message:
            return ChatMessage(**message)
        return None

    async def get_messages_by_user(self, user_id: str) -> List[ChatMessage]:
        messages = await self.messages_collection.find({"user_id": user_id}).to_list(length=None)
        return [ChatMessage(**message) for message in messages]

    # Session methods
    async def create_session(self, session: ChatSession) -> ChatSession:
        session_dict = session.dict()
        result = await self.sessions_collection.insert_one(session_dict)
        session_dict["_id"] = str(result.inserted_id)
        return ChatSession(**session_dict)

    async def get_session_by_id(self, session_id: str) -> Optional[ChatSession]:
        session = await self.sessions_collection.find_one({"_id": session_id})
        if session:
            return ChatSession(**session)
        return None

    async def get_sessions_by_user(self, user_id: str) -> List[ChatSession]:
        sessions = await self.sessions_collection.find({"user_id": user_id}).to_list(length=None)
        return [ChatSession(**session) for session in sessions]

    async def update_session(self, session_id: str, session: ChatSession) -> Optional[ChatSession]:
        session_dict = session.dict()
        result = await self.sessions_collection.update_one(
            {"_id": session_id},
            {"$set": session_dict}
        )
        if result.modified_count:
            return await self.get_session_by_id(session_id)
        return None