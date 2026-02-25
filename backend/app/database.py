from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from .config import DATABASE_URL

# SQLAchemy Engine
engine = create_engine(DATABASE_URL)

# Session Factory
SessionLocal= sessionmaker(autocommit=False)

# Base class for all models
Base = declarative_base()


# Dependency for FastAPI routes
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()