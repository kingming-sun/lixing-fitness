import React, { useState, useContext } from 'react';
import { FaFacebook, FaInstagram } from 'react-icons/fa';
import { LanguageContext } from './BlackFridayBanner';
import './Newsletter.css';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const { language } = useContext(LanguageContext);

  const text = {
    zh: {
      title: '成为会员',
      description: '及时了解我们最新的课程发布、网站优惠码和教练资讯。立即订阅我们的邮件列表！',
      placeholder: '邮箱地址',
      button: '订阅',
      thanks: '感谢您的订阅！'
    },
    en: {
      title: 'Become a Member',
      description: 'Stay up to date with all our program releases, website discount codes and coaching news. Subscribe to our mailing list below!',
      placeholder: 'Email',
      button: 'subscribe',
      thanks: 'Thank you for subscribing!'
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 处理订阅逻辑
    alert(text[language].thanks);
    setEmail('');
  };

  return (
    <section className="newsletter-section">
      <div className="newsletter-container">
        <div className="newsletter-content">
          <h2>{text[language].title}</h2>
          <p>
            {text[language].description}
          </p>
          
          <form onSubmit={handleSubmit} className="newsletter-form">
            <div className="input-group">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={text[language].placeholder}
                required
                className="email-input"
              />
              <button type="submit" className="subscribe-btn">
                {text[language].button}
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