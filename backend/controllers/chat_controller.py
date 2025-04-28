from fastapi import APIRouter, Depends, HTTPException
from typing import List
from ..models.chat_model import ChatMessage, ChatSession
from ..services.chat_service import ChatService
from ..repositories.chat_repository import ChatRepository

router = APIRouter()
chat_service = ChatService(ChatRepository())

# Message endpoints
@router.post("/messages/", response_model=ChatMessage)
async def create_message(message: ChatMessage):
    return await chat_service.create_message(message)

@router.get("/messages/{message_id}", response_model=ChatMessage)
async def get_message(message_id: str):
    message = await chat_service.get_message_by_id(message_id)
    if not message:
        raise HTTPException(status_code=404, detail="Message not found")
    return message

@router.get("/messages/user/{user_id}", response_model=List[ChatMessage])
async def get_messages_by_user(user_id: str):
    return await chat_service.get_messages_by_user(user_id)

# Session endpoints
@router.post("/sessions/", response_model=ChatSession)
async def create_session(session: ChatSession):
    return await chat_service.create_session(session)

@router.get("/sessions/{session_id}", response_model=ChatSession)
async def get_session(session_id: str):
    session = await chat_service.get_session_by_id(session_id)
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")
    return session

@router.get("/sessions/user/{user_id}", response_model=List[ChatSession])
async def get_sessions_by_user(user_id: str):
    return await chat_service.get_sessions_by_user(user_id)

@router.put("/sessions/{session_id}", response_model=ChatSession)
async def update_session(session_id: str, session: ChatSession):
    updated_session = await chat_service.update_session(session_id, session)
    if not updated_session:
        raise HTTPException(status_code=404, detail="Session not found")
    return updated_session

# Chat interaction endpoints
@router.post("/process/", response_model=ChatMessage)
async def process_message(user_id: str, message: str):
    return await chat_service.process_message(user_id, message)

@router.post("/start-session/", response_model=ChatSession)
async def start_session(user_id: str):
    return await chat_service.start_session(user_id) 