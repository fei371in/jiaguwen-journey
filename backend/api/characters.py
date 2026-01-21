from fastapi import APIRouter, Depends, HTTPException
from typing import List
from ..schema.character import CharacterResponse, CharacterCreate
from ..service.character_service import CharacterService
from ..repository.character_repo import CharacterRepository
from ..core.database import supabase_client

router = APIRouter()

def get_character_service():
    repo = CharacterRepository(supabase_client)
    return CharacterService(repo)

@router.get("/", response_model=List[CharacterResponse])
def read_characters(service: CharacterService = Depends(get_character_service)):
    return service.get_characters()

@router.get("/{char_id}", response_model=CharacterResponse)
def read_character(char_id: str, service: CharacterService = Depends(get_character_service)):
    character = service.get_character(char_id)
    if not character:
        raise HTTPException(status_code=404, detail="Character not found")
    return character
