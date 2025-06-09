import React from "react";
import "./Navbar.css";

function Navbar() {
  const handleLogout = () => {
    // Clear the token from local storage
    localStorage.removeItem("token");
    // Redirect to the home page
    window.location.href = "/";
  };

  return (
    <div className="navbar">
      <div className="logo">
        <img
          src="/assets/img/logo/logo-full-transparent.png"
          alt="Cost-Effective"
        />
        <a href="/">
          Bali<span>Rakshak.</span>
        </a>
      </div>
      <div className="link">
        <ul>
          <li>
            <a href="/app">Diagnose</a>
          </li>
          <li>
            <a href="/app/ask">Ask AI</a>
          </li>
          <li>
            <a href="/app/community">Community</a>
          </li>
        </ul>
      </div>
      <div className="logout">
        <a onClick={handleLogout}>Logout</a>
      </div>
    </div>
  );
}

export default Navbar;
