from app.models.user import User
from app.models.sweet import Sweet

def test_user_model_fields():
    user = User(username="testuser", email="test@example.com", password_hash="hashed")
    assert user.username == "testuser"
    assert user.email == "test@example.com"
    assert user.is_admin is False

def test_sweet_model_fields():
    sweet = Sweet(name="Ladoo", category="Traditional", price=10.5, quantity=100)
    assert sweet.name == "Ladoo"
    assert sweet.category == "Traditional"
    assert sweet.price == 10.5
    assert sweet.quantity == 100
