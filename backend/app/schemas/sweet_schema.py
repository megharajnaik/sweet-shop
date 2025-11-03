from pydantic import BaseModel
from typing import Optional

class SweetBase(BaseModel):
    name: str
    category: Optional[str] = None
    price: float
    quantity: int


class SweetCreate(SweetBase):
    pass


class SweetResponse(SweetBase):
    id: int
    owner_id: Optional[int]

    class Config:
        orm_mode = True
