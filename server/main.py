# app/main.py
from fastapi import FastAPI, HTTPException
import uvicorn
import pytest
import sys
from pydantic import ValidationError
from schemas.user_schema import LoginCredentials
from sqlalchemy import create_engine
from fastapi.middleware.cors import CORSMiddleware
from dependencies import Base
from routes import users, summaries, analyze


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



def run_tests():
    """Executa os testes antes de iniciar o servidor"""
    print("🔍 Executando testes automatizados...")
    result = pytest.main(["tests/"])  # Executa os testes na pasta "tests"
    
    if result != 0:
        print("❌ Testes falharam! Corrija os erros antes de iniciar o servidor.")
        sys.exit(1)  # Interrompe o servidor caso os testes falhem
    print("✅ Todos os testes passaram! Iniciando o servidor...")

if __name__ == "__main__":
    run_tests()  # Executa os testes antes de iniciar o servidor
    uvicorn.run(app, host="0.0.0.0", port=8000)
