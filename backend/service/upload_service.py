from ..repository.upload_repo import UploadRepository
from ..schema.upload import UploadCreate
from uuid import UUID

class UploadService:
    def __init__(self, repo: UploadRepository):
        self.repo = repo

    def upload_file(self, user_id: UUID, upload: UploadCreate):
        return self.repo.create_upload(user_id, upload)

    def get_uploads(self, user_id: UUID):
        return self.repo.get_user_uploads(user_id)
