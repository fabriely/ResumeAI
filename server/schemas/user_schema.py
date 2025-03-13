from pydantic import BaseModel, EmailStr, constr, field_validator
from typing import List

class UserBase(BaseModel):
    email: EmailStr

class UserCreate(UserBase):
    name: str
    last_name: str
    password: constr(min_length=8)

    @field_validator('password')
    def password_complexity(cls, v):
        if not any(char.isdigit() for char in v):
            raise ValueError('A senha precisa ter pelo menos um número')
        if not any(char in '!@#$%^&*(),.?":{}|<>_-+=~`[]\\;\'/' for char in v):
            raise ValueError('A senha precisa ter pelo menos um caractere especial')
        return v

class UserInDB(UserBase):
    summaries: List[str] = []

    class Config:
        orm_mode = True

class LoginCredentials(BaseModel):
    email: EmailStr
    password: constr(min_length=8)

    @field_validator('password')
    def password_complexity(cls, v):
        if not any(char.isdigit() for char in v):
            raise ValueError('A senha precisa ter pelo menos um número')
        if not any(char in '!@#$%^&*(),.?":{}|<>_-+=~`[]\\;\'/' for char in v):
            raise ValueError('A senha precisa ter pelo menos um caractere especial')
        return v
    
class PasswordRequest (BaseModel):
    email: EmailStr
    password: constr(min_length=8)

    @field_validator('password')
    def password_complexity(cls, v):
        if not any(char.isdigit() for char in v):
            raise ValueError('A senha precisa ter pelo menos um número')
        if not any(char in '!@#$%^&*(),.?":{}|<>_-+=~`[]\\;\'/' for char in v):
            raise ValueError('A senha precisa ter pelo menos um caractere especial')
        return v