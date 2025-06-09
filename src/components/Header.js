import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes, FaShoppingCart } from 'react-icons/fa';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <Link to="/">
            <h1>Strengths Studio TT</h1>
            <span className="logo-subtitle">sstt-logo</span>
          </Link>
        </div>

        <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
          <ul className="nav-list">
            <li><Link to="/">Home</Link></li>
            <li 
              className="dropdown"
              onMouseEnter={() => setIsServicesOpen(true)}
              onMouseLeave={() => setIsServicesOpen(false)}
            >
              <span>Services</span>
              <ul className={`dropdown-menu ${isServicesOpen ? 'show' : ''}`}>
                <li><Link to="/powerlifting-coaching">Powerlifting Coaching</Link></li>
                <li><Link to="/physique-weight-loss">Physique / Weight Loss</Link></li>
                <li><Link to="/nutrition">Nutrition</Link></li>
              </ul>
            </li>
            <li><Link to="/programs">Programs</Link></li>
            <li><Link to="/testimonials">Testimonials</Link></li>
            <li><Link to="/coaches">Coaches</Link></li>
            <li 
              className="dropdown"
              onMouseEnter={() => setIsHelpOpen(true)}
              onMouseLeave={() => setIsHelpOpen(false)}
            >
              <span>Help</span>
              <ul className={`dropdown-menu ${isHelpOpen ? 'show' : ''}`}>
                <li><Link to="/contact">Contact Us</Link></li>
                <li><Link to="/terms">Terms of Service</Link></li>
                <li><Link to="/privacy">Privacy Policy</Link></li>
                <li><Link to="/manage-subscription">Manage a Subscription</Link></li>
              </ul>
            </li>
          </ul>
        </nav>

        <div className="header-actions">
          <div className="cart">
            <FaShoppingCart />
            <span className="cart-text">$0.00 0 Cart</span>
          </div>
          
          <button className="menu-toggle" onClick={toggleMenu}>
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header; 