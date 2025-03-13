# Etapa 1: Build do Frontend (Next.js)
FROM node:20.9 AS frontend

# Ativar Corepack e configurar diretório de trabalho
RUN corepack enable
WORKDIR /app/client

# Copiar arquivos essenciais e instalar dependências
COPY client/package.json client/pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Copiar código restante do frontend e fazer o build
COPY client ./
ENV NODE_ENV=production
ENV NODE_OPTIONS=--max_old_space_size=2560
RUN pnpm build


# Etapa 2: Backend (FastAPI)
FROM python:3.12-slim AS backend

# Configurar diretório de trabalho e variáveis de ambiente
WORKDIR /app/server
ENV PYTHONUNBUFFERED=1

# Copiar e instalar dependências do backend
COPY server/requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Copiar código restante do backend
COPY server ./

# Definir variável do banco de dados (SQLite)
ENV DATABASE_URL=sqlite:///./data/database.db


# Etapa Final: Criando o Contêiner de Produção
FROM python:3.12-slim

# Criar diretório de trabalho
WORKDIR /app

# Instalar Node.js, habilitar Corepack e preparar pnpm
RUN apt-get update && apt-get install -y curl gnupg && \
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && \
    apt-get install -y nodejs && \
    corepack enable && \
    corepack prepare pnpm@8.8.0 --activate

# Copiar backend e frontend das etapas anteriores
COPY --from=backend /app/server /app/server
COPY --from=frontend /app/client/.next /app/client/.next
COPY --from=frontend /app/client/public /app/client/public
# Copiar manifest do frontend para que o pnpm funcione
COPY --from=frontend /app/client/package.json /app/client/package.json
COPY --from=frontend /app/client/pnpm-lock.yaml /app/client/pnpm-lock.yaml

# Instalar dependências do backend novamente para evitar problemas
RUN pip install --no-cache-dir -r /app/server/requirements.txt

# Expor portas para o frontend e backend
EXPOSE 3000 8000

# Comando para rodar backend e frontend simultaneamente
CMD uvicorn server.main:app --host 0.0.0.0 --port 8000 & \
    pnpm --dir /app/client start