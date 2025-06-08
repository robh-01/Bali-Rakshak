import React from "react";
import "./HomePage.css";

function Home() {
  return (
    <>
      <div className="navbar">
        <div className="logo">
          Bali<span>Rakshak.</span>
        </div>
        <div className="btns">
          <a href="/signup" className="sign-in">Sign up</a>
          <a href="/login" className="login">Login</a>
        </div>
      </div>

      {/* HERO SECTION */}
      <section className="hero">
        <div className="hero-box">
          <div className="overlay"></div>
          <div className="text">
            <div className="textbox">
              <p>Bali Rakshak: The Soultion For The Tomorrow's Agriculture</p>
              <h1>Detect Crop Diseases Instantly with Just a Photo</h1>
              <button>Get Started</button>
            </div>
          </div>
          <div className="image"></div>
        </div>
      </section>

      {/* Features */}
      <div className="feature">
        <hr />
        <div className="feature-text">
          <h1>How It Works</h1>
          <p>Our platform simplifies crop disease management with three easy steps.</p>
        </div>
        <div className="feature-box">
            <div className="features"></div>
            <div className="features"></div>
            <div className="features"></div>
        </div>
      </div>
    </>
  );
}

export default Home;
