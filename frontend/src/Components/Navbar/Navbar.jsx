import React from 'react'
import "./Navbar.css"

function Navbar() {
  return (
    <div className='navbar'>
      <div className="logo">
        Bali<span>Rakshak.</span>
      </div>
      <div className="link">
        <ul>
            <li><a href="/">Diagnose</a></li>
            <li><a href="/app/ask">Ask AI</a></li>
            <li><a href="/app/community">Community</a></li>
        </ul>
      </div>
      <div className="logout">
        <a href="">Logout</a>
      </div>
      
    </div>
  )
}

export default Navbar
