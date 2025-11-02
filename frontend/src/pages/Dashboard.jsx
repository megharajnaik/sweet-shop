import { useEffect, useState } from "react";
import API from "../api";

export default function Dashboard() {
  const [sweets, setSweets] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [newSweet, setNewSweet] = useState({ name: "", price: "", quantity: "" });

  const fetchSweets = async () => {
    const res = await API.get("/sweets/");
    setSweets(res.data);
  };

  useEffect(() => {
    fetchSweets();
    const token = localStorage.getItem("token");
    if (token) {
      // decode token payload (very simple way)
      const payload = JSON.parse(atob(token.split(".")[1]));
      setIsAdmin(payload.sub === "admin@example.com");
    }
  }, []);

  const handleAddSweet = async (e) => {
    e.preventDefault();
    await API.post("/sweets/", newSweet);
    fetchSweets();
    setNewSweet({ name: "", price: "", quantity: "" });
  };

  return (
    <div className="dashboard">
      <h2>Sweet Shop</h2>

      {isAdmin && (
        <form onSubmit={handleAddSweet} className="admin-form">
          <input
            type="text"
            placeholder="Name"
            value={newSweet.name}
            onChange={(e) => setNewSweet({ ...newSweet, name: e.target.value })}
            required
          />
          <input
            type="number"
            placeholder="Price"
            value={newSweet.price}
            onChange={(e) => setNewSweet({ ...newSweet, price: e.target.value })}
            required
          />
          <input
            type="number"
            placeholder="Quantity"
            value={newSweet.quantity}
            onChange={(e) => setNewSweet({ ...newSweet, quantity: e.target.value })}
            required
          />
          <button type="submit">Add Sweet</button>
        </form>
      )}

      <div className="sweet-list">
        {sweets.map((sweet) => (
          <div key={sweet.id} className="sweet-card">
            <h3>{sweet.name}</h3>
            <p>Price: ₹{sweet.price}</p>
            <p>Quantity: {sweet.quantity}</p>
            <button disabled={sweet.quantity === 0}>Purchase</button>
          </div>
        ))}
      </div>
    </div>
  );
}
