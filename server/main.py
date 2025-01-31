# app/main.py
from fastapi import FastAPI
from sqlalchemy import create_engine
from models import Base
from routes import users, summaries

DATABASE_URL = "sqlite:///./test.db"
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})

# Criação das tabelas se não existirem
Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(users.router)
app.include_router(summaries.router)

@app.get("/")
async def root():
    return {"message": "Bem-vindo à API!"}
