from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer

from ..schema.user import UserCreate, UserLogin, UserResponse, Token
from ..service.auth_service import AuthService
from ..repository.user_repo import UserRepository
from ..core.database import supabase_client

router = APIRouter()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

def get_auth_service():
    user_repo = UserRepository(supabase_client)
    return AuthService(user_repo)

@router.post("/signup", response_model=UserResponse)
def signup(user: UserCreate, service: AuthService = Depends(get_auth_service)):
    try:
        new_user = service.register_user(user)
        return new_user
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/login", response_model=Token)
def login(user: UserLogin, service: AuthService = Depends(get_auth_service)):
    authenticated_user = service.authenticate_user(user)
    if not authenticated_user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token = service.create_access_token(data={"sub": authenticated_user['email']})
    return {"access_token": access_token, "token_type": "bearer"}
