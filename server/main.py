from fastapi import FastAPI, File, UploadFile, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
from file_reader_functions import extract_text
from ai_assistant_summarization import summarize_text
import uuid
from sqlalchemy.dialects.postgresql import UUID

DATABASE_URL = "sqlite:///./test.db"

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

class User(Base):
    __tablename__ = "users"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    username = Column(String, unique=True, index=True)
    password = Column(String)

Base.metadata.create_all(bind=engine)

app = FastAPI()

# Configuração do CORS para permitir requisições do frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Permite requisições do frontend
    allow_credentials=True,
    allow_methods=["*"],  # Permite todos os métodos (GET, POST, etc.)
    allow_headers=["*"],  # Permite todos os headers
)

# Dependência para obter a sessão do banco de dados
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Endpoint para receber arquivo e retornar resumo
@app.post("/summarize/")
async def summarize(file: UploadFile = File(...)):
    text = extract_text(file)
    if text is None:
        return {"error": "Formato de arquivo não suportado."}
    
    summary = summarize_text(text)
    return {"summary": summary}

# Modelo para a requisição de login
class LoginRequest(BaseModel):
    username: str
    password: str

# Endpoint para realizar login
@app.post("/sessions")
async def login(request: LoginRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.username == request.username).first()
    if user and user.password == request.password:
        return {"data": {"user": {"id": user.id, "username": user.username}}}
    raise HTTPException(status_code=401, detail="Invalid credentials")

# Endpoint para criar um novo usuário
@app.post("/users/")
async def create_user(request: LoginRequest, db: Session = Depends(get_db)):
    user = User(username=request.username, password=request.password)
    db.add(user)
    db.commit()
    db.refresh(user)
    return {"data": {"user": {"id": user.id, "username": user.username}}}