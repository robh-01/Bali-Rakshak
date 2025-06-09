import React from "react";
import "./Navbar.css";
import { Link, useNavigate, useLocation } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    return navigate("/", { replace: true });
  };

  // Helper to check active route
  const isActive = (path) => {
    return location.pathname === path;
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
          <li className={isActive("/app") ? "active" : ""}>
            <Link to="/app">Diagnosis</Link>
          </li>
          <li className={isActive("/app/ask") ? "active" : ""}>
            <Link to="/app/ask">Rakshak AI</Link>
          </li>
          <li className={isActive("/app/community") ? "active" : ""}>
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
