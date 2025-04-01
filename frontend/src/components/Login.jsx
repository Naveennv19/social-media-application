import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";

const Login = () => {
  const [action, setAction] = useState("Login");
  const [formData, setFormData] = useState({
    emailAddress: "",
    password: "",
    fullName: "",
    userName: "",
    identifier: "" 
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toggleAction = () => {
    setAction((prev) => (prev === "Login" ? "Sign up" : "Login"));
    setFormData({ emailAddress: "", password: "", fullName: "", userName: "", identifier: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Define API URL based on action
    const apiUrl = action === "Login"
      ? "http://localhost:3000/login"
      : "http://localhost:3000/signup";

    // Prepare correct payload
    const requestData = action === "Login"
      ? { identifier: formData.identifier, password: formData.password }
      : {
          emailAddress: formData.emailAddress,
          password: formData.password,
          fullName: formData.fullName,
          userName: formData.userName,
        };

    try {
      const response = await axios.post(apiUrl, requestData);
      console.log("Server Response:", response.data);

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        navigate("/home");
      } else {
        alert(response.data.message || "Invalid credentials");
      }
    } catch (error) {
      console.error("Auth error:", error.response?.data || error);
      alert(error.response?.data?.error || "An error occurred, please try again.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-title">Echo Bond</h1>
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
                type="email"
                name="emailAddress"
                placeholder="Email Address"
                className="input-field"
                value={formData.emailAddress}
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
                value={formData.fullName}
                onChange={handleChange}
              />
              <input
                type="text"
                name="userName"
                placeholder="Username"
                className="input-field"
                value={formData.userName}
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

        {/* <button className="fb-login-button">
          <img src="facebook-icon.png" alt="Facebook" className="fb-icon" />
          Log in with Facebook
        </button> */}

        <a href="#" className="forgot-password">
          Forgotten your password?
        </a>

        <div className="signup-box">
          <p>
            {action === "Login" ? "Don't have an account?" : "Already have an account?"}{" "}
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
