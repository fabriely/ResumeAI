# app/crud.py
from bcrypt import hashpw, gensalt, checkpw
from sqlalchemy.orm import Session
from models import User, Summary
import schemas
import json

def create_user(db: Session, name: str, last_name: str, email: str, password: str):
    # Gerando o salt e o hash da senha
    hashed_password = hashpw(password.encode('utf-8'), gensalt())
  
    # Criando o usuário com todas as informações obrigatórias
    user = User(
      name = name,
      last_name = last_name,
      email = email,
      password = hashed_password.decode('utf-8')
    )
  
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
        summary_to_delete = db.query(Summary).filter(Summary.id == summary_id, Summary.user_email == email).first() 
        if summary_to_delete:
            db.delete(summary_to_delete)
            db.commit()
            return True
    return False

def check_password(db: Session, email: str, password: str):
    user = db.query(User).filter(User.email == email).first()
    if user:
        return checkpw(password.encode('utf-8'), user.password.encode('utf-8'))
    return False

def update_password(db: Session, email: str, new_password: str):
    user = db.query(User).filter(User.email == email).first()
    if user:
        hashed_password = hashpw(new_password.encode('utf-8'), gensalt())
        user.password = hashed_password.decode('utf-8')
        db.commit()
        return True
    return False