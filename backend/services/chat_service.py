from typing import List, Optional
from models.chat_model import ChatMessage, ChatSession
from repositories.chat_repository import ChatRepository

class ChatService:
    def __init__(self, repository: ChatRepository):
        self.repository = repository

    # Message methods
    async def create_message(self, message: ChatMessage) -> ChatMessage:
        return await self.repository.create_message(message)

    async def get_message_by_id(self, message_id: str) -> Optional[ChatMessage]:
        return await self.repository.get_message_by_id(message_id)

    async def get_messages_by_user(self, user_id: str) -> List[ChatMessage]:
        return await self.repository.get_messages_by_user(user_id)

    # Session methods
    async def create_session(self, session: ChatSession) -> ChatSession:
        return await self.repository.create_session(session)

    async def get_session_by_id(self, session_id: str) -> Optional[ChatSession]:
        return await self.repository.get_session_by_id(session_id)

    async def get_sessions_by_user(self, user_id: str) -> List[ChatSession]:
        return await self.repository.get_sessions_by_user(user_id)

    async def update_session(self, session_id: str, session: ChatSession) -> Optional[ChatSession]:
        return await self.repository.update_session(session_id, session)

    async def process_message(self, user_id: str, message: str) -> ChatMessage:
        # Here you would implement the actual message processing logic
        # This is a placeholder implementation
        response = f"Processed message: {message}"

        chat_message = ChatMessage(
            user_id=user_id,
            message=message,
            response=response
        )
        return await self.create_message(chat_message)

    async def start_session(self, user_id: str) -> ChatSession:
        session = ChatSession(
            user_id=user_id,
            messages=[]
        )
        return await self.create_session(session)