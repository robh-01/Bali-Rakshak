import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Diagnose from "./Components/Diagnose/Diagnose";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer"

function App() {
  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path="/diagnose" element={<Diagnose />} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
