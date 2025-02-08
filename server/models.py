# app/models.py
from sqlalchemy import Column, String, Integer, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.ext.declarative import declarative_base
import uuid

Base = declarative_base()
  
class User(Base):
    __tablename__ = "users"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    name = Column(String) 
    last_name = Column(String)  
    email = Column(String, unique=True, index=True)
    password = Column(String)
    summaries = relationship("Summary", back_populates="user")

class Summary(Base):
    __tablename__ = "summaries"
    
    id = Column(Integer, primary_key=True, index=True)
    content = Column(String, index=True)
    user_email = Column(String, ForeignKey("users.email"))

    user = relationship("User", back_populates="summaries")

