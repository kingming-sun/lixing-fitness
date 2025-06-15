import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import { LanguageContext } from './BlackFridayBanner';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const { language } = useContext(LanguageContext);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const text = {
    zh: {
      home: '首页',
      services: '服务',
      programs: '课程',
      testimonials: '见证',
      coaches: '教练',
      help: '帮助',
      powerlifting: '力量举训练',
      physique: '体型塑造/减重',
      nutrition: '营养指导',
      contact: '联系我们',
      terms: '服务条款',
      privacy: '隐私政策',
      subscription: '管理订阅'
    },
    en: {
      home: 'Home',
      services: 'Services',
      programs: 'Programs',
      testimonials: 'Testimonials',
      coaches: 'Coaches',
      help: 'Help',
      powerlifting: 'Powerlifting Coaching',
      physique: 'Physique / Weight Loss',
      nutrition: 'Nutrition',
      contact: 'Contact Us',
      terms: 'Terms of Service',
      privacy: 'Privacy Policy',
      subscription: 'Manage a Subscription'
    }
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
            <li><Link to="/">{text[language].home}</Link></li>
            <li 
              className="dropdown"
              onMouseEnter={() => setIsServicesOpen(true)}
              onMouseLeave={() => setIsServicesOpen(false)}
            >
              <span>{text[language].services}</span>
              <ul className={`dropdown-menu ${isServicesOpen ? 'show' : ''}`}>
                <li><Link to="/powerlifting-coaching">{text[language].powerlifting}</Link></li>
                <li><Link to="/physique-weight-loss">{text[language].physique}</Link></li>
                <li><Link to="/nutrition">{text[language].nutrition}</Link></li>
              </ul>
            </li>
            <li><Link to="/programs">{text[language].programs}</Link></li>
            <li><Link to="/testimonials">{text[language].testimonials}</Link></li>
            <li><Link to="/coaches">{text[language].coaches}</Link></li>
            <li 
              className="dropdown"
              onMouseEnter={() => setIsHelpOpen(true)}
              onMouseLeave={() => setIsHelpOpen(false)}
            >
              <span>{text[language].help}</span>
              <ul className={`dropdown-menu ${isHelpOpen ? 'show' : ''}`}>
                <li><Link to="/contact">{text[language].contact}</Link></li>
                <li><Link to="/terms">{text[language].terms}</Link></li>
                <li><Link to="/privacy">{text[language].privacy}</Link></li>
                <li><Link to="/manage-subscription">{text[language].subscription}</Link></li>
              </ul>
            </li>
          </ul>
        </nav>

        <div className="header-actions">
          <button className="menu-toggle" onClick={toggleMenu}>
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header; 