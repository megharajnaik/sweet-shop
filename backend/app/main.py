from fastapi import FastAPI
from app.db import Base, engine
from app.routes import auth_routes, sweet_routes

# Create database tables (if not already created)
Base.metadata.create_all(bind=engine)

# Initialize FastAPI app
app = FastAPI(title="Sweet Shop Management System")

# Root endpoint
@app.get("/")
def read_root():
    return {"message": "Welcome to Sweet Shop API"}

# Include routers
app.include_router(auth_routes.router)
app.include_router(sweet_routes.router)
