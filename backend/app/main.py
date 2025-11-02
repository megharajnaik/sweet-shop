from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.db import Base, engine
from app.routes import auth_routes, sweet_routes

# Create database tables (if not already created)
Base.metadata.create_all(bind=engine)

# Initialize FastAPI app
app = FastAPI(title="Sweet Shop Management System")

# ✅ Allow frontend (React app) to access backend API
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Root endpoint
@app.get("/")
def read_root():
    return {"message": "Welcome to Sweet Shop API"}

# Include routers
app.include_router(auth_routes.router)
app.include_router(sweet_routes.router)
