import os
from dotenv import load_dotenv

# Loading environment variables
load_dotenv(dotenv_path= os.path.join(os.path.dirname(__file__), "..", ".env.local"))


DATABASE_URL:str = os.getenv("DATABASE_URL") or ""
SECRET_KEY:str = os.getenv("SECRET_KEY") or ""
FRONTEND_URL:str = os.getenv("FRONTEND_URL") or ""

# Safety check
if not DATABASE_URL:
    raise ValueError("Database_url is not set")

if not SECRET_KEY:
    raise ValueError("SECRET_KEY is not set")

if not FRONTEND_URL:
    raise ValueError("FRONTEND_URL is not  set")