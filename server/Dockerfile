FROM python:3.12-slim as backend

ENV PYTHONUNBUFFERED=1

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# Configura a variável para o SQLite persistente
ENV PYTHONPATH=$PYTHONPATH:/app
ENV DATABASE_URL=sqlite:///./data/database.db

EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
