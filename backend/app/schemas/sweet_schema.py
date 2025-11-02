from pydantic import BaseModel
from typing import Optional

class SweetCreate(BaseModel):
    name: str
    category: str
    price: float
    quantity: int

class SweetResponse(BaseModel):
    id: int
    name: str
    category: str
    price: float
    quantity: int
    added_by: Optional[int]

    class Config:
        orm_mode = True
