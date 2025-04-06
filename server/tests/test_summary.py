import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from models.user import User
from models.summary import Summary
from dependencies import Base
from services.summary_service import add_summary, get_summaries, delete_summary
from schemas.summary_schema import SummaryRequest

DATABASE_URL = "sqlite:///./test.db"
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

@pytest.fixture
def db():
    """Cria um banco de testes e fecha após os testes"""
    Base.metadata.create_all(bind=engine)
    session = TestingSessionLocal()
    yield session
    session.close()
    Base.metadata.drop_all(bind=engine)

@pytest.fixture
def test_user(db):
    """Cria um usuário de teste"""
    user = User(name="Test", last_name="User", email="test@example.com", password="hashedpassword123")
    db.add(user)
    db.commit()
    return user

def test_add_summary(db, test_user):
    """Testa a adição de um resumo"""
    summary_data = SummaryRequest(content={"title": "Test Summary", "text": "This is a test summary."})
    summary = add_summary(db, test_user.email, summary_data)

    assert summary is not None
    assert summary.content == '{"title": "Test Summary", "text": "This is a test summary."}'
    assert summary.user_email == test_user.email

def test_add_summary_with_invalid_user(db):
    """Testa a adição de um resumo com um usuário inválido"""
    summary_data = SummaryRequest(content={"title": "Test Summary", "text": "This is a test summary."})
    summary = add_summary(db, "", summary_data) # Usuário inválido
    assert summary is None  
    assert db.query(Summary).count() == 0  # Nenhum resumo deve ser adicionado

def test_get_summaries(db, test_user):
    """Testa a recuperação de resumos"""
    summary_data1 = SummaryRequest(content={"title": "Summary 1", "text": "First summary."})
    summary_data2 = SummaryRequest(content={"title": "Summary 2", "text": "Second summary."})
    
    add_summary(db, test_user.email, summary_data1)
    add_summary(db, test_user.email, summary_data2)

    summaries = get_summaries(db, test_user.email)

    assert summaries is not None
    assert len(summaries) == 2
    assert summaries[0].content == '{"title": "Summary 1", "text": "First summary."}'
    assert summaries[1].content == '{"title": "Summary 2", "text": "Second summary."}'

def test_delete_summary(db, test_user):
    """Testa a exclusão de um resumo"""
    summary_data = SummaryRequest(content={"title": "Delete Me", "text": "This will be deleted."})
    summary = add_summary(db, test_user.email, summary_data)

    assert delete_summary(db, test_user.email, summary.id) is True

    summaries = get_summaries(db, test_user.email)
    assert len(summaries) == 0  # Deve estar vazio após a exclusão

def test_delete_summary_with_invalid_user(db):
    """Testa a exclusão de um resumo com um usuário inválido"""
    summary_data = SummaryRequest(content={"title": "Delete Me", "text": "This will be deleted."})
    summary = add_summary(db, test_user.user, summary_data)
    assert delete_summary(db, "", summary.id) is False  # Usuário inválido