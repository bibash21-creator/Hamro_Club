from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordRequestForm
from app import models, schemas, database
from app.auth import utils, oauth2


router = APIRouter(
    prefix= "/auth",
    tags=["Authentication"]
)


def get_db():
    db = database.SessionLocal()
    try: 
        yield db
    finally:
        db.close()