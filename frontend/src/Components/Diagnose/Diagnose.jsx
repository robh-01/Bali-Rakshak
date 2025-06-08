import React from "react";
import "./Diagnose.css";

function Home() {
  return (
    <div className="container">
      <div className="box">
        <div className="inside">
          <h1>Crop Disease Diagnosis</h1>
          <p>
            Upload a photo of your crop to receive an AI-powered diagnosis and
            potential solutions.
          </p>
          <div className="upload-box">
            <div className="items">
              <h1>Upload Crop Photo</h1>
              <p>
                Drag and drop or click to upload a photo of your crop. Supported
                formats: JPG, PNG.
              </p>
              <input type="file" accept="image/png,image/jpg" />
            </div>
          </div>
          <button className="diagnosis-btn">Get Diagnosis</button>
          <h3>Get Diagnosis</h3>
          <p>
            Once you upload a photo, the diagnosis results will appear here.
            This will include the identified disease, potential causes, and
            recommended treatments.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;
