import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/login",
        formData
      );

      console.log("Response:", response.data);

      // Check if login is successful
      if (
        response.status === 200 &&
        response.data.message &&
        response.data.message.toLowerCase().includes("login successful")
      ) {
        // ✅ Store username from backend
        localStorage.setItem("user", JSON.stringify({ username: response.data.username }));
        alert("✅ Login Successful!");
        navigate("/videos"); // redirect to Video Gallery
      } else {
        alert("❌ " + (response.data.message || "Login failed"));
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("❌ Login failed! Check your email or password.");
    }
  };

  return (
    <div className="login-container">
      <h2>Welcome Back</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
      </form>
      <p>
        Don’t have an account?{" "}
        <span className="signup-link" onClick={() => navigate("/signup")}>
          Sign Up
        </span>
      </p>
    </div>
  );
};

export default Login;
