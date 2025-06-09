import React from 'react';
import { Link } from 'react-router-dom';
import './HeroSection.css';

const HeroSection = () => {
  return (
    <section className="hero-section">
      <div className="hero-container">
        <div className="hero-content">
          <h1>Training Programs</h1>
          <p>
            Explore Our Premium Strength Training Programs and <strong>reviews</strong> or 
            Use Our Program Recommender Tool to Find Your Perfect Fit!
          </p>
          <Link to="/program-recommender" className="hero-cta-btn">
            Program Recommender
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection; 