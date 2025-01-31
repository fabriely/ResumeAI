# app/models.py
from sqlalchemy import Column, String
from sqlalchemy.dialects.postgresql import UUID, JSON
from sqlalchemy.ext.declarative import declarative_base
import uuid

Base = declarative_base()

class User(Base):
    __tablename__ = "users"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    email = Column(String, unique=True, index=True)
    password = Column(String)
    summaries = Column(JSON, default=list, nullable=True)  # Histórico de resumos como uma lista JSON
