from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.db import get_db
from app.models.sweet import Sweet
from app.schemas.sweet_schema import SweetCreate, SweetResponse
from app.routes.auth_routes import get_current_user

router = APIRouter(prefix="/sweets", tags=["Sweets"])

@router.post("/", response_model=SweetResponse)
def create_sweet(sweet: SweetCreate, db: Session = Depends(get_db), current_user: dict = Depends(get_current_user)):
    new_sweet = Sweet(
        name=sweet.name,
        category=sweet.category,
        price=sweet.price,
        quantity=sweet.quantity,
        added_by=current_user.id
    )
    db.add(new_sweet)
    db.commit()
    db.refresh(new_sweet)
    return new_sweet


@router.get("/", response_model=list[SweetResponse])
def get_sweets(db: Session = Depends(get_db)):
    return db.query(Sweet).all()


@router.put("/{sweet_id}", response_model=SweetResponse)
def update_sweet(sweet_id: int, sweet: SweetCreate, db: Session = Depends(get_db)):
    existing_sweet = db.query(Sweet).filter(Sweet.id == sweet_id).first()
    if not existing_sweet:
        raise HTTPException(status_code=404, detail="Sweet not found")
    
    existing_sweet.name = sweet.name
    existing_sweet.category = sweet.category
    existing_sweet.price = sweet.price
    existing_sweet.quantity = sweet.quantity
    
    db.commit()
    db.refresh(existing_sweet)
    return existing_sweet


@router.delete("/{sweet_id}")
def delete_sweet(sweet_id: int, db: Session = Depends(get_db)):
    sweet = db.query(Sweet).filter(Sweet.id == sweet_id).first()
    if not sweet:
        raise HTTPException(status_code=404, detail="Sweet not found")
    db.delete(sweet)
    db.commit()
    return {"message": "Sweet deleted successfully"}
