from pydantic import BaseModel

class SweetBase(BaseModel):
    name: str
    category: str
    price: float
    quantity: int

class SweetCreate(SweetBase):
    pass

class SweetUpdate(BaseModel):
    name: str | None = None
    category: str | None = None
    price: float | None = None
    quantity: int | None = None

class SweetOut(SweetBase):
    id: int

    class Config:
        orm_mode = True
