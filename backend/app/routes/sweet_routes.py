from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.db import SessionLocal
from app.models.sweet import Sweet
from app.schemas.sweet_schema import SweetCreate, SweetResponse
from app.routes.auth_routes import get_current_user

router = APIRouter(prefix="/sweets", tags=["Sweets"])

# --- Dependency ---
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# --- Get all sweets for current user ---
@router.get("/", response_model=list[SweetResponse])
def get_sweets(db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    sweets = db.query(Sweet).filter(Sweet.owner_id == current_user.id).all()
    if not sweets:
        return []
    return sweets


# --- Add a new sweet ---
@router.post("/", response_model=SweetResponse)
def add_sweet(sweet: SweetCreate, db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    new_sweet = Sweet(
        name=sweet.name,
        category=sweet.category,
        price=sweet.price,
        quantity=sweet.quantity,
        owner_id=current_user.id
    )
    db.add(new_sweet)
    db.commit()
    db.refresh(new_sweet)
    return new_sweet


# --- Update a sweet ---
@router.put("/{sweet_id}", response_model=SweetResponse)
def update_sweet(
    sweet_id: int,
    sweet_data: SweetCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    sweet = db.query(Sweet).filter(Sweet.id == sweet_id, Sweet.owner_id == current_user.id).first()
    if not sweet:
        raise HTTPException(status_code=404, detail="Sweet not found")

    sweet.name = sweet_data.name
    sweet.category = sweet_data.category
    sweet.price = sweet_data.price
    sweet.quantity = sweet_data.quantity
    db.commit()
    db.refresh(sweet)
    return sweet


# --- Delete a sweet ---
@router.delete("/{sweet_id}")
def delete_sweet(sweet_id: int, db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    sweet = db.query(Sweet).filter(Sweet.id == sweet_id, Sweet.owner_id == current_user.id).first()
    if not sweet:
        raise HTTPException(status_code=404, detail="Sweet not found")

    db.delete(sweet)
    db.commit()
    return {"message": "Sweet deleted successfully"}
