import React from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const handleLogout = () => {
    // Clear the token from local storage
    localStorage.removeItem("token");
    // Redirect to the home page
    return navigate("/", { replace: true });
  };

  return (
    <div className="navbar">
      <div className="logo">
        <img
          src="/assets/img/logo/logo-full-transparent.png"
          alt="Cost-Effective"
        />
        <Link to="/">
          Bali<span>Rakshak.</span>
        </Link>
      </div>
      <div className="link">
        <ul>
          <li>
            <Link to="/app">Diagnose</Link>
          </li>
          <li>
            <Link to="/app/ask">Ask AI</Link>
          </li>
          <li>
            <Link to="/app/community">Community</Link>
          </li>
        </ul>
      </div>
      <div className="logout">
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}

export default Navbar;
