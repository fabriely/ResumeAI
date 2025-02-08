# app/routes/summaries.py
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from sqlalchemy.orm import Session
from datetime import datetime
import crud, schemas, dependencies
from file_reader_functions import extract_text
from ai_assistant_summarization import summarize_text

router = APIRouter()

# Endpoint para receber arquivo e retornar resumo
@router.post("/summarize/")
async def summarize(file: UploadFile = File(...)):
    text = extract_text(file)
    if text is None:
        return {"error": "Formato de arquivo não suportado."}
    
    summary = summarize_text(text)
    file_name = file.filename
    summary_data = {
        "file_name": file_name,
        "summary_content": summary,
        "created_at": datetime.now().isoformat(),
    }

    return {"summary_data": summary_data}

@router.post("/summarize/message/")
async def summarize_message(message: schemas.MessageRequest):
    text = message.message
    summary = summarize_text(text)
    summary_data = {
        "file_name": "Mensagem de texto resumida",
        "summary_content": summary,
        "created_at": datetime.now().isoformat(),
    }

    return {"summary_data": summary_data}

# Endpoints para adicionar e buscar resumos
@router.post("/users/{email}/summaries/")
async def add_summary(email: str, summary_data: schemas.SummaryRequest, db: Session = Depends(dependencies.get_db)):
    user = crud.add_summary(db=db, email=email, summary_data=summary_data)
    if user:
        return {"message": "Resumo adicionado ao histórico."}
    raise HTTPException(status_code=404, detail="User not found")


@router.get("/users/{email}/summaries/")
async def get_summaries(email: str, db: Session = Depends(dependencies.get_db)):
    summaries = crud.get_summaries(db=db, email=email)
    if summaries is None:
        raise HTTPException(status_code=404, detail="User not found")
    return {"summaries": summaries}


@router.delete("/users/{email}/summaries/{summary_id}/")
async def delete_summary(email: str, summary_id: int, db: Session = Depends(dependencies.get_db)):
    success = crud.delete_summary(db=db, email=email, summary_id=summary_id)
    if success:
        return {"message": "Resumo deletado com sucesso."}
    raise HTTPException(status_code=404, detail="Resumo ou usuário não encontrado")

