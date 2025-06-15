import React, { useState, useEffect, createContext, useContext } from 'react';
import './BlackFridayBanner.css';

// 创建语言上下文
export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('zh'); // 默认中文

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'zh' ? 'en' : 'zh');
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

const BlackFridayBanner = () => {
  const { language, toggleLanguage } = useContext(LanguageContext);

  const text = {
    zh: {
      title: '健身训练项目',
      subtitle: '专业力量训练课程 - 立即开始你的健身之旅！',
      button: '开始训练'
    },
    en: {
      title: 'Fitness Training Programs',
      subtitle: 'Professional Strength Training Programs - Start Your Fitness Journey Now!',
      button: 'Start Training'
    }
  };

  return (
    <div className="black-friday-banner">
      <div className="banner-content">
        <button 
          className="language-toggle"
          onClick={toggleLanguage}
        >
          {language === 'zh' ? 'EN' : '中'}
        </button>
        <h2>{text[language].title}</h2>
        <p>{text[language].subtitle}</p>
        <button className="cta-button">
          {text[language].button}
        </button>
      </div>
    </div>
  );
};

export default BlackFridayBanner; 