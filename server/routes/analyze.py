# app/routes/analyze.py
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from sqlalchemy.orm import Session
from datetime import datetime
import crud, schemas, dependencies
from file_reader_functions import extract_text
from ai_assistant_data_visualization import generate_data_visualization
import base64

router = APIRouter()

# Endpoint para receber arquivo e retornar análise (visualização de dados)
@router.post("/analyze/")
async def analyze(file: UploadFile = File(...)):
    text = extract_text(file)
    if text is None:
        return {"error": "Formato de arquivo não suportado."}

    output_file = generate_data_visualization(text)

    if output_file is None:
        return {"error": "Erro ao gerar visualização de dados."}

    # Leia o arquivo de imagem e converta para base64
    with open(output_file, "rb") as img_file:
        img_base64 = base64.b64encode(img_file.read()).decode("utf-8")

    analysis_data = {
        "file_name": file.filename,
        "image_base64": img_base64,
        "created_at": datetime.now().isoformat(),
    }

    return {"analysis_data": analysis_data}

# Endpoint para adicionar uma análise ao histórico do usuário
@router.post("/users/{email}/analyses/")
async def add_analysis(email: str, analysis_data: schemas.AnalysisRequest, db: Session = Depends(dependencies.get_db)):
    user = crud.add_analysis(db=db, email=email, analysis_data=analysis_data)
    if user:
        return {"message": "Análise adicionada ao histórico."}
    raise HTTPException(status_code=404, detail="Usuário não encontrado")

# Endpoint para buscar todas as análises de um usuário
@router.get("/users/{email}/analyses/")
async def get_analyses(email: str, db: Session = Depends(dependencies.get_db)):
    analyses = crud.get_analyses(db=db, email=email)
    if analyses is None:
        raise HTTPException(status_code=404, detail="Usuário não encontrado")
    return {"analyses": analyses}

# Endpoint para excluir uma análise específica de um usuário
@router.delete("/users/{email}/analyses/{analysis_id}/")
async def delete_analysis(email: str, analysis_id: int, db: Session = Depends(dependencies.get_db)):
    success = crud.delete_analysis(db=db, email=email, analysis_id=analysis_id)
    if success:
        return {"message": "Análise deletada com sucesso."}
    raise HTTPException(status_code=404, detail="Análise ou usuário não encontrado")
