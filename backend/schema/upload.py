from pydantic import BaseModel
from typing import Optional
from uuid import UUID
from datetime import datetime

class UploadBase(BaseModel):
    file_url: str
    file_name: Optional[str] = None
    description: Optional[str] = None

class UploadCreate(UploadBase):
    pass

class UploadResponse(UploadBase):
    id: UUID
    user_id: UUID
    created_at: datetime

    class Config:
        from_attributes = True
