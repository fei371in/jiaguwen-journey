from fastapi import APIRouter, Depends, HTTPException
from typing import List
from ..schema.upload import UploadResponse, UploadCreate
from ..schema.user import UserResponse
from ..service.upload_service import UploadService
from ..repository.upload_repo import UploadRepository
from ..core.database import supabase_client
from .auth import get_auth_service
from ..service.auth_service import AuthService
from fastapi.security import OAuth2PasswordBearer

router = APIRouter()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="api/v1/auth/token") # Adjust path if needed

def get_upload_service():
    repo = UploadRepository(supabase_client)
    return UploadService(repo)

def get_current_user(token: str = Depends(oauth2_scheme), service: AuthService = Depends(get_auth_service)):
    # This is a simplified dependency. In a real app, you would decode the token and get the user.
    # For now, we will assume the token validation happens in the service or we need a proper dependency here.
    # Let's fix this to actually decode the token properly using the auth logic we implemented.
    # But wait, our auth service has create_access_token but verify is implicitly done by jose.
    from jose import jwt, JWTError
    from ..core.config import settings
    
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise HTTPException(status_code=401, detail="Invalid token")
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")
    
    user = service.user_repo.get_user_by_email(email)
    if user is None:
        raise HTTPException(status_code=401, detail="User not found")
    return user

@router.post("/", response_model=UploadResponse)
def create_upload(
    upload: UploadCreate, 
    service: UploadService = Depends(get_upload_service),
    current_user: dict = Depends(get_current_user)
):
    return service.upload_file(current_user['id'], upload)

@router.get("/", response_model=List[UploadResponse])
def read_uploads(
    service: UploadService = Depends(get_upload_service),
    current_user: dict = Depends(get_current_user)
):
    return service.get_uploads(current_user['id'])
