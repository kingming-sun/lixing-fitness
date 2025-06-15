import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import BlackFridayBanner, { LanguageProvider } from './components/BlackFridayBanner';
import HeroSection from './components/HeroSection';
import ProgramsSection from './components/ProgramsSection';
import ProgramRecommender from './components/ProgramRecommender';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';

function App() {
  return (
    <LanguageProvider>
      <Router>
        <div className="App">
          <BlackFridayBanner />
          <Header />
          <Routes>
            <Route path="/" element={
              <>
                <HeroSection />
                <ProgramsSection />
                <ProgramRecommender />
                <Newsletter />
              </>
            } />
          </Routes>
          <Footer />
        </div>
      </Router>
    </LanguageProvider>
  );
}

export default App;
