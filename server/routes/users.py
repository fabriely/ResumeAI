from fastapi import APIRouter, Depends, HTTPException, Request
from bcrypt import checkpw
from sqlalchemy.orm import Session
import services.user_service as crud
import schemas.user_schema as schemas
import schemas.summary_schema as summary_schemas
import dependencies
from services.ai_assistant_message import response_message
from utils.verification_code import send_verification_email
from datetime import datetime, timedelta

router = APIRouter()

# In-memory cache for verification codes
verification_codes = {}

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
async def summarize_message(message: summary_schemas.MessageRequest):
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

@router.post("/users/sendcode")
async def send_verification_code(request: Request):
    data = await request.json()
    email = data.get("email")
    if not email:
        raise HTTPException(status_code=422, detail="Email is required")
    
    verification_code = send_verification_email(email)
    if verification_code:
        # Store the verification code in the in-memory cache with an expiration time
        expiration_time = datetime.now() + timedelta(minutes=5)  # Code expires in 5 minutes
        verification_codes[email] = {"code": verification_code, "expires_at": expiration_time}
        return {"message": "Verification code sent"}
    raise HTTPException(status_code=500, detail="Failed to send verification code")

@router.post("/users/checkcode")
async def check_verification_code(request: Request):
    data = await request.json()
    email = data.get("email")
    code = data.get("code")
    if not email or not code:
        raise HTTPException(status_code=422, detail="Email and code are required")
    
    if email in verification_codes:
        stored_code_info = verification_codes[email]
        if datetime.now() < stored_code_info["expires_at"]:
            if stored_code_info["code"] == code:
                return {"message": "Verification code is correct"}
            else:
                raise HTTPException(status_code=401, detail="Invalid verification code")
        else:
            del verification_codes[email]  # Remove expired code
            raise HTTPException(status_code=401, detail="Verification code has expired")
    raise HTTPException(status_code=404, detail="Verification code not found")