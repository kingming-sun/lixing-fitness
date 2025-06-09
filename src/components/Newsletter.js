import React, { useState } from 'react';
import { FaFacebook, FaInstagram } from 'react-icons/fa';
import './Newsletter.css';

const Newsletter = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // 处理订阅逻辑
    alert('Thank you for subscribing!');
    setEmail('');
  };

  return (
    <section className="newsletter-section">
      <div className="newsletter-container">
        <div className="newsletter-content">
          <h2>Become a Member</h2>
          <p>
            Stay up to date with all our program releases, website discount codes and coaching news. 
            Subscribe to our mailing list below!
          </p>
          
          <form onSubmit={handleSubmit} className="newsletter-form">
            <div className="input-group">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
                className="email-input"
              />
              <button type="submit" className="subscribe-btn">
                subscribe
              </button>
            </div>
          </form>
          
          <div className="social-links">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebook />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter; 