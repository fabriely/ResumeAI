from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from models.user import User
import pytest
from dependencies import Base
from services.user_service import create_user, check_user_password, update_password
from utils.security import hash_password

DATABASE_URL = "sqlite:///./test.db"
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


@pytest.fixture
def db():
    Base.metadata.create_all(bind=engine)
    session = TestingSessionLocal()
    yield session
    session.close()
    Base.metadata.drop_all(bind=engine)

def test_create_user(db):
    user = create_user(db, "John", "Doe", "john@example.com", "Password@123")
    assert user.email == "john@example.com"
    assert user.password != "Password@123"

def test_check_user_password(db):
    hashed_pw = hash_password("securepassword!")
    user = User(name="Alice", last_name="Smith", email="alice@example.com", password=hashed_pw)
    db.add(user)
    db.commit()

    assert check_user_password(db, "alice@example.com", "securepassword!") is True
    assert check_user_password(db, "alice@example.com", "wrongpassword") is False

def test_create_user_with_duplicate_email(db):
    create_user(db, "John", "Doe", "john@example.com", "Password@123")
    with pytest.raises(Exception):  
        create_user(db, "Jane", "Doe", "john@example.com", "AnotherPassword@123")

def test_update_password(db):
    user = create_user(db, "John", "Doe", "john@example.com", "Password@123")
    new_password = "NewPassword@123"
    assert update_password(db, user.email, new_password) is True
    assert check_user_password(db, user.email, new_password) is True

def test_update_password_with_nonexistent_user(db):
    assert update_password(db, "", "NewPassword@123") is False
