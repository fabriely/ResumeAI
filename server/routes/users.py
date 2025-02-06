from fastapi import APIRouter, Depends, HTTPException
from bcrypt import checkpw
from sqlalchemy.orm import Session
import crud, schemas, dependencies
from ai_assistant_message import response_message

router = APIRouter()

@router.post("/users/")
async def create_user(request: schemas.UserCreate, db: Session = Depends(dependencies.get_db)):
    user = crud.create_user(db=db, email=request.email, password=request.password)
    return {"data": {"user": user}}

@router.post("/sessions")
async def login(request: schemas.UserCreate, db: Session = Depends(dependencies.get_db)):
    user = crud.get_user_by_email(db, request.email)
    if user and checkpw(request.password.encode('utf-8'), user.password.encode('utf-8')):
            return {"data": {"user": user}}
    raise HTTPException(status_code=401, detail="Invalid credentials")

@router.post("/messages/")
async def summarize_message(message: schemas.MessageRequest):
    text = message.message
    message = response_message(text)

    return {"message": message}