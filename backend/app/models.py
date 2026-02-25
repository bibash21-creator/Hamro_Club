from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
from .database import Base

# User Model
class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    phone = Column(String, unique=True, index=True, nullable=True)
    password_hash = Column(String, nullable=False)
    image = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationship: one user ---> many posts
    posts = relationship("Post", back_populates="author")


# Post Model
class Post(Base):
    __tablename__ = "posts"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    content = Column(String, nullable=False)
    media = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    # Foreign Key -> Link to User
    author_id = Column(Integer, ForeignKey("users.id"))

    # Relationship: post belongs to one user
    author = relationship("User", back_populates="posts")