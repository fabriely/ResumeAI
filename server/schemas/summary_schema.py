from pydantic import BaseModel
from typing import Dict, List

class SummaryRequest(BaseModel):
    content: Dict[str, str]  

class SummariesResponse(BaseModel):
    summaries: List[str]

class MessageRequest(BaseModel):
    message: str