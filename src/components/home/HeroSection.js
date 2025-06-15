import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { LanguageContext } from '../layout/BlackFridayBanner';
import './HeroSection.css';

const HeroSection = () => {
  const { language } = useContext(LanguageContext);

  const text = {
    zh: {
      title: '训练课程',
      description: '探索我们的专业力量训练课程和用户评价，或使用我们的课程推荐工具找到最适合你的训练方案！',
      button: '课程推荐工具'
    },
    en: {
      title: 'Training Programs',
      description: 'Explore Our Premium Strength Training Programs and reviews or Use Our Program Recommender Tool to Find Your Perfect Fit!',
      button: 'Program Recommender'
    }
  };

  return (
    <section className="hero-section">
      <div className="hero-container">
        <div className="hero-content">
          <h1>{text[language].title}</h1>
          <p>
            {text[language].description}
          </p>
          <Link to="/program-recommender" className="hero-cta-btn">
            {text[language].button}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection; 