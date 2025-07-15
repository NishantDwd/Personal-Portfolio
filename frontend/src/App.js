import React from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "./components/ui/toaster";

// Components
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import TechStack from "./components/TechStack";
import Education from "./components/Education";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

// Mock Data
import { portfolioData } from "./data/mock";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar data={portfolioData} />
        <Hero data={portfolioData} />
        <About data={portfolioData} />
        <Projects data={portfolioData} />
        <TechStack data={portfolioData} />
        <Education data={portfolioData} />
        <Contact data={portfolioData} />
        <Footer data={portfolioData} />
        <Toaster />
      </div>
    </BrowserRouter>
  );
}

export default App;