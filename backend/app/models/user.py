from sqlalchemy import Column, Integer, String, Boolean
from sqlalchemy.orm import relationship
from app.db import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(50), unique=True, nullable=False)
    email = Column(String(100), unique=True, nullable=False)
    password_hash = Column(String(255), nullable=False)
    is_admin = Column(Boolean, default=False, nullable=False)

    # One-to-many relationship with sweets
    sweets = relationship("Sweet", back_populates="user")

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        # Ensure default value for is_admin
        if self.is_admin is None:
            self.is_admin = False
