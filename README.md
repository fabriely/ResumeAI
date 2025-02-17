# ResumeAI

Aplicação web integrada com IA (OpenAI) que tem a funcionalidade de resumir e analisar dados gerando um gráfico de um arquivo submetido pelo usuário. 

# Conteúdos 
[Instruções](https://github.com/PedroCLins/ResumeAI/edit/main/README.md#instru%C3%A7%C3%B5es-para-rodar-o-c%C3%B3digo)

# Tecnologias 

Projeto desenvolvido com React + TypeScript para FrontEnd e Python + Uvicorn + FastAPI para BackEnd

# Instruções para Rodar o Código

Este projeto possui duas partes: **client** (frontend) e **server** (backend). Siga as etapas abaixo para rodar ambos os servidores localmente.

## Pré-requisitos

Certifique-se de ter o [nodejs](https://nodejs.org/pt), [pnpm](https://pnpm.io/) instalado para o frontend e [FastAPI](https://fastapi.tiangolo.com/) e [uvicorn](https://www.uvicorn.org/) para o backend.

## Configuração do Arquivo `.env`

Antes de rodar o código, é necessário configurar o arquivo `.env` para ambos o backend. 

   - No **backend** (server), crie um arquivo `.env` na pasta `server`.

2. Edite o arquivo `.env` de acordo com as configurações do seu ambiente local (como variáveis de banco de dados, API keys, etc.).

## Passos para Rodar o Código

### 1. Rodando o Frontend (Client)

Abra um terminal e navegue até a pasta `client`:

```bash
cd client
````
Instale as dependências com o pnpm:
```bash
pnpm i
````
Após a instalação, inicie o servidor de desenvolvimento:
```bash
pnpm run dev
````
O frontend estará disponível em http://localhost:3000.

### 2. Rodando o Backend (Server)
Abra outro terminal e navegue até a pasta `server`:
```bash
cd server
````
Sincronize o banco de dados e inicie o servidor utilizando o uvicorn e o arquivo main.py:
```bash
uv sync
fastapi dev main.py
````
O backend estará disponível em http://localhost:8000


