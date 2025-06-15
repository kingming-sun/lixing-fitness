import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { Header, Footer, BlackFridayBanner } from './components/layout';
import { HeroSection, ProgramsSection, ProgramRecommender, Newsletter } from './components/home';
import { ProductDetail } from './components/product';
import { PaymentSuccess, PaymentCancel } from './components/payment';
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
            <Route path="/payment/success" element={<PaymentSuccess />} />
            <Route path="/payment/cancel" element={<PaymentCancel />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </LanguageProvider>
  );
}

export default App;
