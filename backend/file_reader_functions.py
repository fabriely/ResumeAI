from fastapi import UploadFile
import pdfplumber
import xml.etree.ElementTree as ET
from docx import Document
from striprtf.striprtf import rtf_to_text

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