# app/main.py
from fastapi import FastAPI
from sqlalchemy import create_engine
from fastapi.middleware.cors import CORSMiddleware
from models import Base
from routes import users, summaries

DATABASE_URL = "sqlite:///./test.db"
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})

# Criação das tabelas se não existirem
Base.metadata.create_all(bind=engine)

app = FastAPI()

# Configuração do CORS para permitir requisições do frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Permite apenas esse frontend
    allow_credentials=True,
    allow_methods=["*"],  # Permite todos os métodos (GET, POST, etc.)
    allow_headers=["*"],  # Permite todos os headers
)


app.include_router(users.router)
app.include_router(summaries.router)

@app.get("/")
async def root():
    return {"message": "Bem-vindo à API!"}
