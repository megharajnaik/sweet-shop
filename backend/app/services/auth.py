from datetime import datetime, timedelta
from jose import jwt, JWTError
from passlib.context import CryptContext
from app.models.user import User
from app.db import SessionLocal
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

# Secret key and algorithm for JWT
SECRET_KEY = os.getenv("JWT_SECRET", "supersecretkey")
ALGORITHM = os.getenv("ALGORITHM", "HS256")
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", 60))

# Password hashing context
pwd_context = CryptContext(schemes=["pbkdf2_sha256"], deprecated="auto")

# --- Helper functions ---
def hash_password(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

# --- JWT Token creation ---
def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

# --- Register new user ---
def register_user(username: str, email: str, password: str, is_admin: bool = False):
    db = SessionLocal()
    try:
        existing_user = db.query(User).filter((User.username == username) | (User.email == email)).first()
        if existing_user:
            return {"error": "User already exists"}

        hashed = hash_password(password)
        new_user = User(username=username, email=email, password_hash=hashed, is_admin=is_admin)
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
        return {"message": "User registered successfully", "user_id": new_user.id}

    except Exception as e:
        db.rollback()
        print(f"⚠️ ERROR DURING REGISTRATION: {e}")  # logs in terminal
        return {"error": str(e)}

    finally:
        db.close()

# --- Authenticate user (login) ---
def authenticate_user(email: str, password: str):
    db = SessionLocal()
    try:
        user = db.query(User).filter(User.email == email).first()
        if not user or not verify_password(password, user.password_hash):
            return None
        return user
    finally:
        db.close()

# --- Decode and verify JWT ---
def verify_token(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload.get("sub")  # 'sub' stores user email
    except JWTError:
        return None
