# app/schemas.py
from pydantic import BaseModel
from typing import List, Dict

class UserBase(BaseModel):
    email: str

class UserCreate(UserBase):
    password: str

class UserInDB(UserBase):
    email: str
    summaries: List[str] = []

    class Config:
        orm_mode = True

class SummaryRequest(BaseModel):
    content: Dict[str, str]  

class SummariesResponse(BaseModel):
    summaries: List[str]
