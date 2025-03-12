# app/main.py
from fastapi import FastAPI, HTTPException
import uvicorn
from pydantic import ValidationError
from schemas.user_schema import LoginCredentials
from sqlalchemy import create_engine
from fastapi.middleware.cors import CORSMiddleware
from dependencies import Base
from routes import users, summaries, analyze
import pytest


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
app.include_router(analyze.router)

@app.get("/")
async def root():
    return {"message": "Bem-vindo à API!"}

@app.post("/api/login")
async def login(credentials: LoginCredentials):
    try:
        credentials = LoginCredentials(**credentials.model_dump())
    except ValidationError as e:
        raise HTTPException(status_code=400, detail=e.errors())

    return {"success": True, "message": "Login realizado com sucesso!"}

if __name__ == "__main__":
    print("🔍 Executando testes antes de iniciar o servidor...")
    result = pytest.main(["-q", "--disable-warnings"])

    if result == 0:
        print("✅ Todos os testes passaram! Iniciando o servidor...")
        uvicorn.run(app, host="127.0.0.1", port=8000)

    else:
        print("❌ Testes falharam! Corrija os erros antes de iniciar o servidor.")

