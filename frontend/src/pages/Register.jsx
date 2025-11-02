import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api";

export default function Register() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [msg, setMsg] = useState(null);
  const [err, setErr] = useState(null);
  const navigate = useNavigate();

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setMsg(null);
    setErr(null);
    try {
      const res = await API.post("/auth/register", form);
      // backend might return access_token directly, or message + user_id
      if (res.data?.access_token) {
        localStorage.setItem("token", res.data.access_token);
        navigate("/dashboard");
      } else {
        setMsg(res.data?.message || "Registered successfully — please login.");
        setTimeout(() => navigate("/login"), 1000);
      }
    } catch (error) {
      setErr(error.response?.data?.detail || error.response?.data || error.message);
    }
  };

  return (
    <div className="form-container">
      <h2>Register</h2>
      <form onSubmit={onSubmit}>
        <input name="username" placeholder="Username" value={form.username} onChange={onChange} required />
        <input name="email" placeholder="Email" value={form.email} onChange={onChange} required />
        <input type="password" name="password" placeholder="Password" value={form.password} onChange={onChange} required />
        <button type="submit">Register</button>
      </form>

      {msg && <p className="success">{String(msg)}</p>}
      {err && <p className="error">{String(err)}</p>}

      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}
