from datetime import datetime, timedelta
from typing import Optional
from jose import jwt, JWTError
from passlib.context import CryptContext
from ..core.config import settings
from ..repository.user_repo import UserRepository
from ..schema.user import UserCreate, UserLogin

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

class AuthService:
    def __init__(self, user_repo: UserRepository):
        self.user_repo = user_repo

    def verify_password(self, plain_password, hashed_password):
        # Truncate password to 72 bytes to satisfy bcrypt limit
        plain_password_bytes = plain_password.encode('utf-8')[:72]
        return pwd_context.verify(plain_password_bytes, hashed_password)

    def get_password_hash(self, password):
        # Truncate password to 72 bytes to satisfy bcrypt limit
        password_bytes = password.encode('utf-8')[:72]
        return pwd_context.hash(password_bytes)

    def create_access_token(self, data: dict, expires_delta: Optional[timedelta] = None):
        to_encode = data.copy()
        if expires_delta:
            expire = datetime.utcnow() + expires_delta
        else:
            expire = datetime.utcnow() + timedelta(minutes=15)
        to_encode.update({"exp": expire})
        encoded_jwt = jwt.encode(to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM)
        return encoded_jwt

    def register_user(self, user: UserCreate):
        existing_user = self.user_repo.get_user_by_email(user.email)
        if existing_user:
            raise ValueError("Email already registered")
        
        hashed_password = self.get_password_hash(user.password)
        return self.user_repo.create_user(user, hashed_password)

    def authenticate_user(self, user_login: UserLogin):
        user = self.user_repo.get_user_by_email(user_login.email)
        if not user:
            return None
        if not self.verify_password(user_login.password, user['hashed_password']):
            return None
        return user
