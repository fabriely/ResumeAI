# app/routes/summaries.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import crud, schemas, dependencies

router = APIRouter()

@router.post("/users/{email}/summaries/")
async def add_summary(email: str, summary: schemas.SummaryRequest, db: Session = Depends(dependencies.get_db)):
    user = crud.add_summary(db=db, email=email, summary=summary.summary)
    if user:
        return {"message": "Resumo adicionado ao histórico."}
    raise HTTPException(status_code=404, detail="User not found")

@router.get("/users/{email}/summaries/")
async def get_summaries(email: str, db: Session = Depends(dependencies.get_db)):
    summaries = crud.get_summaries(db=db, email=email)
    if summaries is None:
        raise HTTPException(status_code=404, detail="User not found")
    return {"summaries": summaries}
