FROM python:3.11-slim AS base

RUN pip install --no-cache-dir uv 

WORKDIR /app

COPY . .

RUN uv venv

RUN . .venv/bin/activate && uv sync


CMD ["fastapi", "dev", "main.py"] 