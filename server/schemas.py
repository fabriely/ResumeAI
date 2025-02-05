# app/schemas.py
from pydantic import BaseModel
from typing import List, Dict

class UserBase(BaseModel):
    name: str 
    last_name: str 
    email: str

class UserCreate(UserBase):
    password: str

class UserInDB(UserBase):
    summaries: List[str] = []

    class Config:
        orm_mode = True

class SummaryRequest(BaseModel):
    content: Dict[str, str]  

class SummariesResponse(BaseModel):
    summaries: List[str]
