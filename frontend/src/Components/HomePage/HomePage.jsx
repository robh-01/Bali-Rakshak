import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";

function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const controller = new AbortController();
    fetch(`${import.meta.env.VITE_BACKEND_SERVER_URL}/user/verify`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      signal: controller.signal,
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Token verification failed");
        }
      })
      .then((data) => {
        if (data.status === "success") {
          // User is authenticated, redirect to /app
          navigate("/app");
        }
      })
      .catch((error) => {
        // Ignore fetch abort errors
        if (error.name === "AbortError") {
          console.log("Fetch aborted");
          return;
        }

        console.error("Error verifying token:", error);
      });

    return () => {
      controller.abort();
    };
  }, [navigate]);
  return (
    <>
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
        <div className="btns">
          <a href="/signup" className="sign-in">
            Sign up
          </a>
          <a href="/login" className="login">
            Login
          </a>
        </div>
      </div>

      {/* HERO SECTION */}
      <section className="hero">
        <div className="hero-box">
          <div className="overlay"></div>
          <div className="text">
            <div className="textbox">
              <p>Empowering Farmers with AI-Powered Protection</p>
              <h1>Instant Crop Disease Detection Using a Single Photo</h1>

              <button>
                <a href="/signup">Get Started</a>
              </button>
            </div>
          </div>
          <div className="image"></div>
        </div>
      </section>

      {/* Features */}
      <div className="feature">
        <div className="feature-text">
          <h1>How It Works</h1>
          <p>
            Our platform simplifies crop disease management with three easy
            steps.
          </p>
        </div>

        <div className="feature-box">
          <div className="feature-card">
            <div className="icon">📸</div>
            <h2>Upload a Photo</h2>
            <p>
              Capture a clear image of the affected crop using your smartphone
              or camera.
            </p>
          </div>

          <div className="feature-card">
            <div className="icon">🤖</div>
            <h2>AI Diagnosis</h2>
            <p>
              Our AI analyzes the image and provides an accurate diagnosis with
              recommended solutions.
            </p>
          </div>

          <div className="feature-card">
            <div className="icon">👨‍🌾</div>
            <h2>Connect with Experts</h2>
            <p>
              Join our forum to discuss your diagnosis with fellow farmers and
              experts.
            </p>
          </div>
        </div>
      </div>

      {/* Benefits */}
      <div className="benefits">
        <div className="benefits-text">
          <h1>Benefits of Using Bali Rakshak</h1>
          <p>Our platform offers numerous advantages for farmers.</p>
        </div>

        <div className="benefits-box">
          <div className="benefit-card">
            <img src="/assets/img/secondary-image-3.jpg" alt="Expert Support" />
            <div>
              <h2>Expert Support</h2>
              <p>
                Get guidance from agricultural experts to make the right
                decisions for your crops.
              </p>
            </div>
          </div>

          <div className="benefit-card">
            <img
              src="/assets/img/secondary-image-2.jpg"
              alt="Cost-Effective"
            />
            <div>
              <h2>Cost-Effective Solutions</h2>
              <p>
                Affordable disease detection and advice, reducing crop losses
                and input costs.
              </p>
            </div>
          </div>

          <div className="benefit-card">
            <img
              src="/assets/img/secondary-image-1.jpg"
              alt="Early Detection"
              className="secondary-image-3"
            />
            <div>
              <h2>Early Detection</h2>
              <p>
                Detect diseases in the early stages to prevent spreading and
                ensure healthy yields.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Ready */}
      <div className="cta-section">
        <div className="cta-content">
          <h1>Are You Ready to Protect Your Crop?</h1>
          <p>
            Join Bali Rakshak today and take the first step toward healthier,
            more productive farming.
          </p>
          <a href="/signup" className="cta-section-a">
            Get Started
          </a>
        </div>
      </div>

      {/* footer */}

      <footer className="footer">
        <div className="footer-top">
          <div className="footer-links">
            <ul>
              <li>
                <a href="#">About Us</a>
              </li>
              <li>
                <a href="#">Contact</a>
              </li>
              <li>
                <a href="#">Privacy Policy</a>
              </li>
              <li>
                <a href="#">Terms of Service</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2025 BaliRakshak. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}

export default Home;
