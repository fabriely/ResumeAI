from sqlalchemy.orm import Session
import json
from models.user import User
from models.summary import Summary
import schemas.summary_schema as schema

def add_summary(db: Session, email: str, summary_data: schema.SummaryRequest):
    user = db.query(User).filter(User.email == email).first()
    if user:
        summary_content = json.dumps(summary_data.content)
        new_summary = Summary(content=summary_content, user_email=email)
        db.add(new_summary)
        db.commit()
        return new_summary
    return None

def get_summaries(db: Session, email: str):
    user = db.query(User).filter(User.email == email).first()
    return user.summaries if user else None

def delete_summary(db: Session, email: str, summary_id: int):
    summary = db.query(Summary).filter(Summary.id == summary_id, Summary.user_email == email).first()
    if summary:
        db.delete(summary)
        db.commit()
        return True
    return False
