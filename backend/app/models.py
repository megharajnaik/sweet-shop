from sqlalchemy import Column, Integer, String, Float, Boolean, ForeignKey, event
from sqlalchemy.orm import relationship
from app.db import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(50), unique=True, nullable=False)
    email = Column(String(100), unique=True, nullable=False)
    password_hash = Column(String(255), nullable=False)
    is_admin = Column(Boolean, default=False, nullable=False)

    sweets = relationship("Sweet", back_populates="owner")

# Automatically ensure is_admin=False when a new User object is created
@event.listens_for(User, "init")
def set_default_is_admin(target, args, kwargs):
    if target.is_admin is None:
        target.is_admin = False


class Sweet(Base):
    __tablename__ = "sweets"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    price = Column(Float, nullable=False)
    quantity = Column(Integer, default=0)

    owner_id = Column(Integer, ForeignKey("users.id"))
    owner = relationship("User", back_populates="sweets")
