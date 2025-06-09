import React, { useState } from "react";
import "./SignUpPage.css";
import { Link } from "react-router-dom";

function SignUp() {
  const [isChecked, setIsChecked] = useState(false);
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const imageIn = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  function handleSignupClick() {
    if (!name || !phone || !password) {
      alert("Please fill in all fields.");
      return;
    }

    if (isChecked && !image) {
      alert("Please upload your verification document.");
      return;
    }

    fetch(`${import.meta.env.VITE_BACKEND_SERVER_URL}/user/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        isExpert: isChecked,
        phone: phone,
        password: password,
      }),
    })
      .then((response) => {
        if (response.ok) {
          alert("Signup successful! Please log in.");
          window.location.href = "/login";
        } else {
          alert("Signup failed. Please try again later.");
        }
      })
      .catch((error) => {
        console.error("Error during login:", error);
        alert("An error occurred signing up. Please try again later.");
      });
  }

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

      <div className="signup-container">
        <h2>Sign Up</h2>

        <form>
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="text"
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

          {/* Expert checkbox */}
          <label className="expert-checkbox">
            <input
              type="checkbox"
              checked={isChecked}
              onChange={(e) => setIsChecked(e.target.checked)}
            />
            &nbsp;Are you an Expert Agriculture Officer?
          </label>

          {/* Upload Box with Preview */}
          {isChecked && (
            <div className="popup-box">
              {image ? (
                <img src={image} alt="Uploaded" className="preview-image" />
              ) : (
                <div className="document-upload">
                  <h4>Upload Verification Document</h4>
                  <p>
                    Please upload a photo of your official document for
                    verification.
                  </p>
                  <label className="document-upload-btn">
                    Upload
                    <input
                      type="file"
                      accept="image/jpg, image/png"
                      onChange={imageIn}
                      hidden
                    />
                  </label>
                </div>
              )}
            </div>
          )}
        </form>

        <button className="signup-btn" onClick={handleSignupClick}>
          Sign up
        </button>

        <p className="login-link">
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </div>
    </>
  );
}

export default SignUp;
