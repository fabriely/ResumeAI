# app/crud.py
from sqlalchemy.orm import Session
from models import User
import uuid

def create_user(db: Session, email: str, password: str):
    user = User(email=email, password=password)
    db.add(user)
    db.commit()
    db.refresh(user)
    return user

def get_user_by_email(db: Session, email: str):
    return db.query(User).filter(User.email == email).first()

def add_summary(db: Session, user_id: uuid.UUID, summary: str):
    user = db.query(User).filter(User.id == user_id).first()
    if user:
        user.summaries.append(summary)
        db.commit()
        db.refresh(user)
        return user
    return None

def get_summaries(db: Session, user_id: uuid.UUID):
    user = db.query(User).filter(User.id == user_id).first()
    return user.summaries if user else None
