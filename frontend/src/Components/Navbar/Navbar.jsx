import React from 'react'
import "./Navbar.css"

function Navbar() {
  return (
    <div className='navbar'> 
      <div className="logo">
        <img
              src="../src/assets/img/logo/logo-full-transparent.png"
              alt="Cost-Effective"
            />
        <a href="/">Bali<span>Rakshak.</span></a>
      </div>
      <div className="link">
        <ul>
            <li><a href="/app">Diagnose</a></li>
            <li><a href="/app/ask">Ask AI</a></li>
            <li><a href="/app/community">Community</a></li>
        </ul>
      </div>
      <div className="logout">
        <a href="/home">Logout</a>
      </div>
      
    </div>
  )
}

export default Navbar
