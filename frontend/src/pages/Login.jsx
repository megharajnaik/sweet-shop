import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api";

export default function Login({ setToken }) {
  const [creds, setCreds] = useState({ username: "", password: "" });
  const [err, setErr] = useState(null);
  const navigate = useNavigate();

  const onChange = (e) => setCreds({ ...creds, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr(null);
    try {
      const params = new URLSearchParams();
      params.append("grant_type", "password");
      params.append("username", creds.username);
      params.append("password", creds.password);

      const res = await API.post("/auth/login", params.toString(), {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });

      const token = res.data?.access_token;
      if (token) {
        localStorage.setItem("token", token);
        setToken(token); // ✅ update state
        navigate("/dashboard");
      } else {
        setErr("No token returned from server.");
      }
    } catch (error) {
      setErr(error.response?.data?.detail || error.message);
    }
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      <form onSubmit={onSubmit}>
        <input
          name="username"
          placeholder="Username"
          value={creds.username}
          onChange={onChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={creds.password}
          onChange={onChange}
          required
        />
        <button type="submit">Login</button>
      </form>

      {err && <p className="error">{String(err)}</p>}
      <p>
        New here? <Link to="/register">Create account</Link>
      </p>
    </div>
  );
}
