from sqlalchemy import Column, Integer, String, Float, ForeignKey
from app.db import Base
from sqlalchemy.orm import relationship

class Sweet(Base):
    __tablename__ = "sweets"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    category = Column(String(100))
    price = Column(Float)
    quantity = Column(Integer)
    owner_id = Column(Integer, ForeignKey("users.id"))  # ✅ important!

    owner = relationship("User", back_populates="sweets")
