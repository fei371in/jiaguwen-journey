from pydantic import BaseModel
from typing import Optional
from uuid import UUID
from datetime import datetime

class CharacterBase(BaseModel):
    char_cn: str
    char_oracle_url: Optional[str] = None
    pinyin: Optional[str] = None
    meaning_en: Optional[str] = None
    meaning_cn: Optional[str] = None
    description: Optional[str] = None
    category: Optional[str] = None

class CharacterCreate(CharacterBase):
    pass

class CharacterResponse(CharacterBase):
    id: UUID
    created_at: datetime

    class Config:
        from_attributes = True
