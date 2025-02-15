from fastapi import APIRouter, Depends, HTTPException
from bcrypt import checkpw
from sqlalchemy.orm import Session
import crud, schemas, dependencies
from ai_assistant_message import response_message

router = APIRouter()

@router.post("/users/")
async def create_user(request: schemas.UserCreate, db: Session = Depends(dependencies.get_db)):
    user = crud.create_user(db=db, name=request.name, last_name=request.last_name, email=request.email, password=request.password)
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

@router.get("/users/{email}") 
async def get_user(email: str, db: Session = Depends(dependencies.get_db)):
    user = crud.get_user_by_email(db, email)
    if user:
        return {"data": {"user": user}}
    raise HTTPException(status_code=404, detail="User not found")

@router.post("/users/checkpassword") 
async def check_password(request: schemas.PasswordRequest, db: Session = Depends(dependencies.get_db)):
    print(f"Email: {request.email}")
    print(f"Password: {request.password}")
    if crud.check_password(db, request.email, request.password):
        return {"message": "Password is correct"}
    raise HTTPException(status_code=401, detail="A senha atual está incorreta")

@router.post("/users/{email}/{new_password}")
async def update_password(email: str, new_password: str, db: Session = Depends(dependencies.get_db) ):
    if crud.update_password(db, email, new_password):
        return {"message": "Password updated successfully"}
    raise HTTPException(status_code=404, detail="User not found")