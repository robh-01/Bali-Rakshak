import React, { useState } from "react";
import "./Diagnose.css";

import ReactMarkdown from "react-markdown";

function Home() {
  const [image, setImage] = useState(null);
  const [diagnosisLoading, setDiagnosisLoading] = useState(false);
  const [diagnosis, setDiagnosis] = useState("");
  const [nepaliDiagnosis, setNepaliDiagnosis] = useState(""); 

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

  // Utility function to convert base64 to Blob
  function dataURItoBlob(dataURI) {
    const byteString = atob(dataURI.split(",")[1]);
    const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  }

  function handleDiagnosis() {
    console.log("Diagnosis button clicked");
    setDiagnosisLoading(true);

    // Convert the base64 image to a Blob
    const blob = dataURItoBlob(image);
    const formData = new FormData();
    formData.append("crop-image", blob, "upload.jpg");

    fetch(`${import.meta.env.VITE_BACKEND_SERVER_URL}/prescription`, {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Diagnosis request failed");
        }
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let result = "";
        
        const readStream = () => {
          reader.read().then(({ done, value }) => {
            if (done) {
              setDiagnosisLoading(false);
              return;
            }
            result += decoder.decode(value, { stream: true });
            // Update state on each chunk arrival
            setDiagnosis(result);
            readStream();
          }).catch((error) => {
            console.error("Stream reading error:", error);
            setDiagnosisLoading(false);
          });
        };
        readStream();
      })
      .catch((error) => {
        console.error(error);
        setDiagnosisLoading(false);
      });
  }

  // Quick translation helper using Google Translate unofficial API
  function translateToNepali(text) {
    fetch(
      `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=ne&dt=t&q=${encodeURIComponent(
        text
      )}`
    )
      .then((res) => res.json())
      .then((data) => {
        let translatedText = data[0].map((item) => item[0]).join("");
        setNepaliDiagnosis(translatedText);
      })
      .catch((err) => console.error(err));
  }

  function handleDiagnosisTranslationToNepali() {
    if (diagnosis) {
      translateToNepali(diagnosis);
    } else {
      console.warn("No diagnosis available to translate.");
    }
  }

  return (
    <div className="container">
      <div className="box">
        <div className="inside">
          <h1>Crop Disease Diagnosis</h1>
          <p>
            Upload a photo of your crop to receive an AI-powered diagnosis and
            potential solutions. 
          </p>


          <div className={`upload-box ${image ? "no-border" : ""}`}>
            {image ? (
              <img src={image} alt="Uploaded" className="uploaded-img" />
            ) : (
              <div className="items">
                <h1>Upload Crop Photo</h1>
                <p>
                  Drag and drop or click to upload a photo of your crop.
                  Supported formats: JPG, PNG.
                </p>
                <label className="upload-label">
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


          <button
            className="diagnosis-btn btn1"

            disabled={!image || diagnosisLoading}
            onClick={handleDiagnosis}
          >
            {diagnosisLoading ? "Loading..." : "Get Diagnosis"}
          </button>
          {diagnosis && (
            <button
              className="diagnosis-btn"
              disabled={!diagnosis}
              onClick={handleDiagnosisTranslationToNepali}
            >
              Translate to Nepali
            </button> 
          )}
          <h3>{diagnosis ? "Diagnosis Result" : "Get Diagnosis"}</h3>
          {diagnosis ? (
            <p className="prescription">
              <ReactMarkdown>{nepaliDiagnosis || diagnosis}</ReactMarkdown>
            </p>
          ) : (
            <p>
              Once you upload a photo, the diagnosis results will appear here.
              This will include the identified disease, potential causes, and
              recommended treatments.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
