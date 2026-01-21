from supabase import Client
from ..schema.user import UserCreate
from typing import Optional

class UserRepository:
    def __init__(self, supabase: Client):
        self.supabase = supabase

    def create_user(self, user: UserCreate, hashed_password: str):
        data = {
            "email": user.email,
            "hashed_password": hashed_password,
            "full_name": user.full_name
        }
        response = self.supabase.table("users").insert(data).execute()
        if response.data:
            return response.data[0]
        return None

    def get_user_by_email(self, email: str):
        response = self.supabase.table("users").select("*").eq("email", email).execute()
        if response.data:
            return response.data[0]
        return None
