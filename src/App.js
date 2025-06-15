import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { Header, Footer, BlackFridayBanner } from './components/layout';
import { HeroSection, ProgramsSection, ProgramRecommender, Newsletter } from './components/home';
import { ProductDetail } from './components/product';
import { LanguageProvider } from './components/layout/BlackFridayBanner';

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
            <Route path="/product/:id" element={<ProductDetail />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </LanguageProvider>
  );
}

export default App;
