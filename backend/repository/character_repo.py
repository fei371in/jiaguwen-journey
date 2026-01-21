from supabase import Client
from typing import List, Optional
from ..schema.character import CharacterCreate

class CharacterRepository:
    def __init__(self, supabase: Client):
        self.supabase = supabase

    def get_all_characters(self):
        response = self.supabase.table("characters").select("*").execute()
        return response.data

    def get_character_by_id(self, char_id: str):
        response = self.supabase.table("characters").select("*").eq("id", char_id).execute()
        if response.data:
            return response.data[0]
        return None
    
    def create_character(self, character: CharacterCreate):
        # Admin or seed function potentially
        data = character.model_dump()
        response = self.supabase.table("characters").insert(data).execute()
        if response.data:
            return response.data[0]
        return None
