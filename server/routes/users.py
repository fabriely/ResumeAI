from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import crud, schemas, dependencies
import uuid

router = APIRouter()

@router.post("/users/")
async def create_user(request: schemas.UserCreate, db: Session = Depends(dependencies.get_db)):
    user = crud.create_user(db=db, email=request.email, password=request.password)
    return {"data": {"user": user}}

@router.post("/sessions")
async def login(request: schemas.UserCreate, db: Session = Depends(dependencies.get_db)):
    user = crud.get_user_by_email(db, request.email)
    if user and user.password == request.password:
        return {"data": {"user": user}}
    raise HTTPException(status_code=401, detail="Invalid credentials")