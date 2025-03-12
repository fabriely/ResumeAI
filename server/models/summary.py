from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from dependencies import Base

class Summary(Base):
    __tablename__ = "summaries"

    id = Column(Integer, primary_key=True, index=True)
    content = Column(String, nullable=False)
    user_email = Column(String, ForeignKey("users.email"), nullable=False)

    user = relationship("User", back_populates="summaries")
