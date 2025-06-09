import React from "react";
import "./LoginPage.css";
import { Link } from "react-router-dom";
import { useState } from "react";

function LoginPage() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginClick = () => {
    fetch(`${import.meta.env.VITE_BACKEND_SERVER_URL}/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phone: phone,
        password: password,
      }),
    })
      .then((response) => {
        if (response.ok) {
          response.json().then((data) => {
            localStorage.setItem("token", data.token);
            window.location.href = "/app";
          });
        } else {
          alert("Login failed. Please check your credentials.");
        }
      })
      .catch((error) => {
        console.error("Error during login:", error);
        alert("An error occurred during login. Please try again later.");
      });
  };

  return (
    <>
      <div className="top-logo">
        <img
          src="/assets/img/logo/logo-full-transparent.png"
          alt="Cost-Effective"
        />
        <a href="/">
          Bali<span>Rakshak.</span>
        </a>
      </div>
      <div className="login-container">
        <h2>Log In</h2>

        <form action="">
          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="tel"
              placeholder="Enter your phone number"
              name="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </form>

        <button className="login-btn" onClick={handleLoginClick}>
          Log in
        </button>

        <p className="signup-link">
          Don’t have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </>
  );
}

export default LoginPage;
