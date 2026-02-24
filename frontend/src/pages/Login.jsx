import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = async () => {

    // 🔹 VALIDATION
    if (!form.email || !form.password) {
      alert("Email and Password are required");
      return;
    }

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/login/",
        form
      );

      localStorage.setItem("user_id", response.data.user_id);
      localStorage.setItem("name", response.data.name);

      navigate("/dashboard");

    } catch (error) {
      alert(error.response?.data?.error || "Login failed");
    }
  };

  return (
    <div
      className="vh-100 d-flex justify-content-center align-items-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1555066931-4365d14bab8c')",
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
    >
      <div
        className="card p-4 shadow"
        style={{
          width: "350px",
          backgroundColor: "rgba(255,255,255,0.95)"
        }}
      >
        <h3 className="text-center mb-3">Task Management System</h3>

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="form-control mb-2"
          value={form.email}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="form-control mb-3"
          value={form.password}
          onChange={handleChange}
        />

        <button
          className="btn btn-primary btn-sm w-100"
          onClick={handleLogin}
        >
          Login
        </button>

        <p className="text-center mt-3 small">
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
