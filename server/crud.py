# app/crud.py
from sqlalchemy.orm import Session
from models import User, Summary
import schemas
import json

def create_user(db: Session, email: str, password: str):
    user = User(email=email, password=password)
    db.add(user)
    db.commit()
    db.refresh(user)
    return user

def get_user_by_email(db: Session, email: str):
    return db.query(User).filter(User.email == email).first()

def add_summary(db: Session, email: str, summary_data: schemas.SummaryRequest):
    user = db.query(User).filter(User.email == email).first()
    if user:
        # Serializando o dicionário para string JSON
        summary_content = json.dumps(summary_data.content)  
        new_summary = Summary(content=summary_content)
        user.summaries.append(new_summary)
        db.commit()
        db.refresh(user)
        return user
    return None

def get_summaries(db: Session, email: str):
    user = db.query(User).filter(User.email == email).first()
    return user.summaries if user else None

def delete_summary(db: Session, email: str, summary_id: int):
    user = db.query(User).filter(User.email == email).first()
    if user:
        summary_to_delete = db.query(Summary).filter(Summary.id == summary_id, Summary.user_id == user.id).first()
        if summary_to_delete:
            db.delete(summary_to_delete)
            db.commit()
            return True
    return False
