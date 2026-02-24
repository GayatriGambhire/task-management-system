import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleRegister = async () => {

    // 🔹 VALIDATION
    if (!form.name.trim()) {
      alert("Name is required");
      return;
    }

    if (!form.email.includes("@")) {
      alert("Enter a valid email");
      return;
    }

    if (form.password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    try {
      await axios.post("http://127.0.0.1:8000/api/register/", form);
      alert("Registration successful");
      navigate("/");
    } catch (error) {
      alert(error.response?.data?.error || "Registration failed");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">

      <div className="card p-4 shadow" style={{ width: "350px" }}>
        <h4 className="text-center mb-3">Create Account</h4>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          className="form-control mb-2"
          value={form.name}
          onChange={handleChange}
        />

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
          onClick={handleRegister}
        >
          Register
        </button>

        <p className="text-center mt-3 small">
          Already have an account? <Link to="/">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
