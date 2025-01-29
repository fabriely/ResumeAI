from fastapi import FastAPI, File, UploadFile
import os
from openai import OpenAI
from dotenv import load_dotenv
import pdfplumber
from docx import Document
from striprtf.striprtf import rtf_to_text
import xml.etree.ElementTree as ET
from fastapi.middleware.cors import CORSMiddleware


# Load .env environment variables
load_dotenv()
app = FastAPI()

# Configuração do CORS para permitir requisições do frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Permite requisições do frontend
    allow_credentials=True,
    allow_methods=["*"],  # Permite todos os métodos (GET, POST, etc.)
    allow_headers=["*"],  # Permite todos os headers
)

# Configuração da OpenAI
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

# Funções para ler arquivos
def read_txt(file):
    return file.read().decode("utf-8")

def read_rtf(file):
    return rtf_to_text(file.read().decode("utf-8"))

def read_pdf(file):
    try:
        text = ""
        with pdfplumber.open(file) as pdf:
            for page in pdf.pages:
                text += page.extract_text() + "\n"
        return text.strip()
    except Exception as e:
        print(f"Erro ao processar PDF: {e}")
        return None

def read_docx(file):
    doc = Document(file)
    return "\n".join([paragraph.text for paragraph in doc.paragraphs])

def read_xml(file):
    tree = ET.parse(file)
    root = tree.getroot()
    return ET.tostring(root, method="xml").decode("utf-8")

# Função para determinar o tipo de arquivo e extrair o conteúdo
def extract_text(file: UploadFile):
    if file.filename.endswith(".txt"):
        return read_txt(file.file)
    elif file.filename.endswith(".rtf"):
        return read_rtf(file.file)
    elif file.filename.endswith(".pdf"):
        return read_pdf(file.file)
    elif file.filename.endswith(".docx"):
        return read_docx(file.file)
    elif file.filename.endswith(".xml"):
        return read_xml(file.file)
    else:
        return None

# Endpoint para receber arquivo e retornar resumo
@app.post("/summarize/")
async def summarize(file: UploadFile = File(...)):
    text = extract_text(file)
    if text is None:
        return {"error": "Formato de arquivo não suportado."}
    
    # Criar prompt e enviar para OpenAI
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "You are a helpful assistant that summarizes texts and data. You must take the"
                "most important key points from the original content to the summarized text, you have to make the information" 
                "on the summarized text very clear and understable for the user, and you should make topics and give examples" 
                "if necessary for a better visualization and understanding of the content for the user."},
            {"role": "user", "content": text}
        ]
    )

    summary = response.choices[0].message.content
    return {"summary": summary}
