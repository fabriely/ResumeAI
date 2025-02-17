# ResumeAI

Aplicação web integrada com IA (OpenAI) que tem a funcionalidade de resumir e analisar dados gerando um gráfico de um arquivo submetido pelo usuário. 

# Conteúdos 
 1. [Tecnologias](https://github.com/PedroCLins/ResumeAI/blob/main/README.md#tecnologias)
 2. [Instruções](https://github.com/PedroCLins/ResumeAI?tab=readme-ov-file#instru%C3%A7%C3%B5es-para-rodar-o-c%C3%B3digo)
 3. [Documentação](https://github.com/PedroCLins/ResumeAI/blob/main/README.md#documenta%C3%A7%C3%A3o)
 4. [Visuais]()
 5. [Suporte](https://github.com/PedroCLins/ResumeAI/blob/main/README.md#suporte)
 6. [StatusProjeto](https://github.com/PedroCLins/ResumeAI/blob/main/README.md#status-do-projeto)

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

# Documentação 
 1. [Trello](https://trello.com/b/ZaLGktgi/resumeai)
 2. [Documento de Requisitos](https://docs.google.com/document/d/1sxilAVEbKGqRRhYz66RmxliXYwU-F_Hj-P_-mG4XVyA/edit?usp=sharing)

# Visuais 

[Figma]()

# Suporte 
 1. [Fabriely Santos - Tech Lead](https://github.com/fabriely)
 2. [Pedro Campelo - Developer](https://github.com/PedroCLins)
 3. [Kleberson Araújo - Developer](https://github.com/KleberAraujoo)
 4. [Danilo Coutinho - Developer](https://github.com/Djco21)
 5. [João Pedro Alves - Developer](https://github.com/SunIord)

# Status do Projeto 
Em desenvolvimento para finalizar o MVP 
