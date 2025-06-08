import React from "react";
import "./LoginPage.css";
import {Link} from "react-router-dom";

function LoginPage() {
  return (
    <>
      <div className="top-logo">
        <img
              src="../src/assets/img/logo/logo-full-transparent.png"
              alt="Cost-Effective"
            />
        <a href="/home">Bali<span>Rakshak.</span></a>
      </div>
      <div className="login-container">
        <h2>Log In</h2>

        <form action="">
          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="text"
              placeholder="Enter your phone number"
              name="phone"
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              name="password"
            />
          </div>
        </form>

        <button className="login-btn">Log in</button>

       <p className="signup-link">
        Don’t have an account? <Link to="/signup">Sign up</Link>
      </p>
      </div>
    </>
  );
}

export default LoginPage;
