import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";

const Login = () => {
  const [action, setAction] = useState("Login");
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toggleAction = () => {
    setAction((prev) => (prev === "Login" ? "Sign up" : "Login"));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://127.0.0.1:8000", formData);
      if (response.data.success) {
        navigate("/home");
      } else {
        alert("Invalid credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred");
    }
  };

// added comment
  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-title">Instagram</h1>
        <form onSubmit={handleSubmit}>
  {action === "Login" ? (
    <>
      <input
        type="text"
        name="identifier"
        placeholder="Phone number, username, or email"
        className="input-field"
        value={formData.identifier}
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        className="input-field"
        value={formData.password}
        onChange={handleChange}
      />
      <button type="submit" className="login-button">
        {action}
      </button>
    </>
  ) : (
    <>
    <input
        type="text"
        name="identifier"
        placeholder="Mobile number or email"
        className="input-field"
        value={formData.identifier}
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        className="input-field"
        value={formData.password}
        onChange={handleChange}
      />
      
      <input
        type="text"
        name="fullName"
        placeholder="Full Name"
        className="input-field"
        value={formData.fullName || ""}
        onChange={handleChange}
        />
        <input
        type="text"
        name="username"
        placeholder="Username"
        className="input-field"
        value={formData.username || ""}
        onChange={handleChange}
      />

      <button type="submit" className="login-button">
        {action}
      </button>
    </>
  )}
</form>


        <div className="or-divider">
          <span className="line"></span>
          <span className="or-text">OR</span>
          <span className="line"></span>
        </div>

        <button className="fb-login-button">
          <img src="facebook-icon.png" alt="Facebook" className="fb-icon" />
          Log in with Facebook
        </button>

        <a href="#" className="forgot-password">
          Forgotten your password?
        </a>

        <div className="signup-box">
          <p>
            {action === "Login"
              ? "Don't have an account?"
              : "Already have an account?"}{" "}
            <span className="signup-link" onClick={toggleAction}>
              {action === "Login" ? "Sign up" : "Login"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
