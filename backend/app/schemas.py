from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime

# User Schemas
class UserBase(BaseModel):
    username: str
    email: EmailStr
    phone: Optional[str] = None
    image: Optional[str] = None


class UserCreate(UserBase):
    password: str


class UserResponse(UserBase):
    id: int
    created_at: datetime


    class Config:
        orm_mode = True # allows SQLAlchemy models ---> Pydantic conversion 


#  Post   Schemas
class PostBase(BaseModel):
    title: str
    content: str
    media: Optional[str] = None

class PostCreate(PostBase):
    pass

class PostResponse(PostBase):
    id: int
    created_at: datetime
    author_id: int

    class Config:
        orm_mode = True

# Combined Schemas

class UserWithPosts(UserResponse):
    posts : List[PostResponse] = []