from supabase import Client
from typing import List
from uuid import UUID
from ..schema.upload import UploadCreate

class UploadRepository:
    def __init__(self, supabase: Client):
        self.supabase = supabase

    def create_upload(self, user_id: UUID, upload: UploadCreate):
        data = upload.model_dump()
        data['user_id'] = str(user_id)
        response = self.supabase.table("user_uploads").insert(data).execute()
        if response.data:
            return response.data[0]
        return None

    def get_user_uploads(self, user_id: UUID):
        response = self.supabase.table("user_uploads").select("*").eq("user_id", str(user_id)).execute()
        return response.data
