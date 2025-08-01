import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // for navigation
import "./Signup.css";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/signup",
        formData
      );

      const { message, username } = response.data;

      if (response.status === 200 && message.toLowerCase().includes("registered")) {
        localStorage.setItem("user", JSON.stringify({ username }));
        alert(message);
        navigate("/"); // Redirect to login
      } else {
        alert("⚠️ " + message);
      }
    } catch (error) {
      console.error("Signup Error:", error);
      alert("❌ Signup failed! Try again.");
    }
  };

  return (
    <div className="signup-container">
      <h2>Create Your Account</h2>
      <form onSubmit={handleSubmit} className="signup-form">
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
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
        <button type="submit">Sign Up</button>
      </form>
      <p>
        Already have an account?{" "}
        <span className="login-link" onClick={() => navigate("/")}>
          Login
        </span>
      </p>
    </div>
  );
};

export default Signup;
