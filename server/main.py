from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from file_reader_functions import extract_text
from ai_assistant_summarization import summarize_text

app = FastAPI()

# Configuração do CORS para permitir requisições do frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Permite requisições do frontend
    allow_credentials=True,
    allow_methods=["*"],  # Permite todos os métodos (GET, POST, etc.)
    allow_headers=["*"],  # Permite todos os headers
)

# Endpoint para receber arquivo e retornar resumo
@app.post("/summarize/")
async def summarize(file: UploadFile = File(...)):
    text = extract_text(file)
    if text is None:
        return {"error": "Formato de arquivo não suportado."}
    
    summary = summarize_text(text)
    return {"summary": summary}

@app.get("/")
def read_root():
    return {"Hello": "World"}
