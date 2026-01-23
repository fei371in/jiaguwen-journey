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

# Comparison Logic
from fastapi import UploadFile, File, Form, status
from ..service.comparison_service import ComparisonService
import httpx

@router.post("/compare")
async def compare_tracing(
    file: UploadFile = File(...),
    reference_url: str = Form(...),
):
    """
    Compare uploaded tracing image with reference image URL.
    Returns similarity percentage.
    """
    # Instantiate service (could be dependency injected but keeping simple for now)
    service = ComparisonService()
    
    # Read uploaded file
    uploaded_bytes = await file.read()
    
    # Download reference image
    async with httpx.AsyncClient() as client:
        try:
            resp = await client.get(reference_url)
            resp.raise_for_status()
            reference_bytes = resp.content
        except Exception as e:
            raise HTTPException(status_code=400, detail=f"Failed to download reference image: {str(e)}")
            
    try:
        score = service.compare_images(uploaded_bytes, reference_bytes)
        return {"similarity": score}
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Comparison failed: {str(e)}")
