from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .core.config import settings
from .api import auth, characters, uploads

app = FastAPI(title=settings.PROJECT_NAME)

# CORS config
origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "https://jiaguwen-journey.vercel.app",
    "https://jiaguwen-journey-git-main-fei371ins-projects.vercel.app",
    "https://jiaguwen-journey-fei371ins-projects.vercel.app",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routers
app.include_router(auth.router, prefix=f"{settings.API_V1_STR}/auth", tags=["auth"])
app.include_router(characters.router, prefix=f"{settings.API_V1_STR}/characters", tags=["characters"])
app.include_router(uploads.router, prefix=f"{settings.API_V1_STR}/uploads", tags=["uploads"])

@app.get("/")
def read_root():
    return {"message": "Welcome to Jiaguwen Journey API"}
