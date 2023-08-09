import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

//Header
import { Navbar } from "./components/Navbar";

// Import Pages
import { Home } from "./pages/home";

export default function App() {
  return (
    <div className="bg-slate-50 h-screen ">
      <BrowserRouter>
        <Navbar />
        <div className="pages m-auto w-[90%] md:w-[70%]">
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
          <Toaster position="bottom-left" />
        </div>
      </BrowserRouter>  
    </div>
  );
}
