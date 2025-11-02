from fastapi import FastAPI

app = FastAPI(title="Sweet Shop Management System")

@app.get("/")
def read_root():
    return {"message": "Welcome to Sweet Shop API"}
