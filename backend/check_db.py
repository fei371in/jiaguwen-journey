import os
from dotenv import load_dotenv
from supabase import create_client, Client
import sys

# Try loading from backend/.env first, then .env
if os.path.exists("backend/.env"):
    print("Loading backend/.env")
    load_dotenv("backend/.env")
elif os.path.exists(".env"):
    print("Loading .env")
    load_dotenv(".env")
else:
    print("No .env file found!")

url = os.getenv("SUPABASE_URL")
key = os.getenv("SUPABASE_KEY")

if not url or not key:
    print("Error: SUPABASE_URL or SUPABASE_KEY not set in environment.")
    sys.exit(1)

print(f"URL: {url}")
print(f"Key: {key[:5]}...{key[-5:] if key else ''}")

try:
    supabase: Client = create_client(url, key)
    # Try a simple query
    response = supabase.table("users").select("count", count="exact").head().execute()
    print("Connection Successful!")
    print(f"Data: {response}")
except Exception as e:
    print(f"Connection Failed: {e}")
