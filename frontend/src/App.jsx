import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

export default function App() {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load token from localStorage when app starts
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
    setLoading(false);
  }, []);

  if (loading) return <p>Loading...</p>; // prevents flicker/redirect loop

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Navigate to={token ? "/dashboard" : "/login"} replace />}
        />
        <Route
          path="/login"
          element={
            token ? <Navigate to="/dashboard" replace /> : <Login setToken={setToken} />
          }
        />
        <Route
          path="/register"
          element={
            token ? <Navigate to="/dashboard" replace /> : <Register setToken={setToken} />
          }
        />
        <Route
          path="/dashboard"
          element={
            token ? <Dashboard setToken={setToken} /> : <Navigate to="/login" replace />
          }
        />
      </Routes>
    </Router>
  );
}
