import React, { useState } from "react";
import "./SignUpPage.css";
import { Link } from "react-router-dom";

function SignUp() {
  const [isChecked, setIsChecked] = useState(false);
  const [image, setImage] = useState(null);

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

  return (
    <>
      <div className="top-logo">
        <a href="/home">Bali<span>Rakshak.</span></a>
      </div>

      <div className="signup-container">
        <h2>Sign Up</h2>

        <form>
          <div className="form-group">
            <label>Full Name</label>
            <input type="text" placeholder="Enter your name" name="name" />
          </div>

          <div className="form-group">
            <label>Phone Number</label>
            <input type="text" placeholder="Enter your phone number" name="phone-number" />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input type="password" placeholder="Enter your password" name="password" />
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
                  <p>Please upload a photo of your official document for verification.</p>
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

        <button className="signup-btn" disabled={!image} >Sign up</button>

        <p className="login-link">
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </div>
    </>
  );
}

export default SignUp;
