import React from 'react';
import { Link } from 'react-router-dom';
import './ProgramRecommender.css';

const ProgramRecommender = () => {
  return (
    <section className="program-recommender-section">
      <div className="recommender-container">
        <div className="recommender-content">
          <h2>Program Selector</h2>
          <p>
            Our Program Recommender is a user-friendly tool designed to help you find the ideal 
            training program tailored to your specific goals and fitness level. Simply answer a 
            few questions, and we'll recommend the perfect program from our range of premium 
            strength training options. Take the guesswork out of your fitness journey and start 
            achieving your goals today!
          </p>
          <Link to="/program-recommender" className="recommender-btn">
            Program Recommender
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProgramRecommender; 