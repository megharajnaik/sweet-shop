from pydantic import BaseModel, EmailStr


# ✅ Schema for registering new users
class UserCreate(BaseModel):
    username: str
    email: EmailStr
    password: str


# ✅ Schema for sending user info back to the client
class UserOut(BaseModel):
    id: int
    username: str
    email: EmailStr
    is_admin: bool

    class Config:
        from_attributes = True  # replaces orm_mode in Pydantic v2


# ✅ Schema for JWT token response
class Token(BaseModel):
    access_token: str
    token_type: str


# ✅ Schema for decoded token data
class TokenData(BaseModel):
    email: str | None = None
