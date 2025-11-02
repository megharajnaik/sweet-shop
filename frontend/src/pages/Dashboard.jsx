import { useEffect, useState } from "react";
import API from "../api";

export default function Dashboard({ setToken }) {
  const [sweets, setSweets] = useState([]);
  const [error, setError] = useState(null);

  const fetchSweets = async () => {
    try {
      const res = await API.get("/sweets");
      setSweets(res.data);
    } catch (err) {
      setError(err.response?.data?.detail || err.message);
    }
  };

  useEffect(() => {
    fetchSweets();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <div className="dashboard">
      <header className="dash-header">
        <h1>🍬 Sweet Shop</h1>
        <button onClick={logout}>Logout</button>
      </header>

      {error && <p className="error">{String(error)}</p>}

      <div className="sweets-list">
        {sweets.length === 0 ? (
          <p>No sweets found.</p>
        ) : (
          sweets.map((s) => (
            <div key={s.id} className="sweet-card">
              <h3>{s.name}</h3>
              <p>Category: {s.category}</p>
              <p>Price: ₹{s.price}</p>
              <p>Qty: {s.quantity}</p>
              <button disabled={s.quantity <= 0}>
                {s.quantity > 0 ? "Purchase" : "Out of stock"}
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
