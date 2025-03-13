# app/routes/analyze.py
from fastapi import APIRouter, UploadFile, File
from sqlalchemy.orm import Session
from fastapi.responses import FileResponse
from file_reader_functions import extract_text
from services.ai_assistant_data_visualization import generate_data_visualization
import base64

router = APIRouter()

# Endpoint para receber arquivo e retornar visualização de dados
@router.post("/analyze/")
async def visualize(file: UploadFile = File(...)):
    text = extract_text(file)
    if text is None:
        return {"error": "Formato de arquivo não suportado."}

    output_file = generate_data_visualization(text)

    if output_file is None:
        return {"error": "Erro ao gerar visualização de dados."}

    # Leia o arquivo de imagem e converta para base64
    with open(output_file, "rb") as img_file:
        img_base64 = base64.b64encode(img_file.read()).decode("utf-8")

    return {"image_base64": img_base64}

