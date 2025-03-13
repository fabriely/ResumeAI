from sqlalchemy.orm import Session
from models.user import User
from utils.security import hash_password, verify_password

def create_user(db: Session, name: str, last_name: str, email: str, password: str):
    user = User(
        name=name,
        last_name=last_name,
        email=email,
        password=hash_password(password)
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user

def get_user_by_email(db: Session, email: str):
    return db.query(User).filter(User.email == email).first()

def check_user_password(db: Session, email: str, password: str):
    user = db.query(User).filter(User.email == email).first()
    return verify_password(password, user.password) if user else False

def update_password(db: Session, email: str, new_password: str):
    user = db.query(User).filter(User.email == email).first()
    if user:
        user.password = hash_password(new_password)
        db.commit()
        return True
    return False
