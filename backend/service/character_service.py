from ..repository.character_repo import CharacterRepository
from ..schema.character import CharacterCreate

class CharacterService:
    def __init__(self, repo: CharacterRepository):
        self.repo = repo

    def get_characters(self):
        return self.repo.get_all_characters()

    def get_character(self, char_id: str):
        return self.repo.get_character_by_id(char_id)

    def add_character(self, character: CharacterCreate):
        return self.repo.create_character(character)
