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

  return (
    <div className="black-friday-banner">
      <div className="banner-content">
        <button 
          className="language-toggle"
          onClick={toggleLanguage}
        >
          {language === 'zh' ? 'EN' : '中'}
        </button>
      </div>
    </div>
  );
};

export default BlackFridayBanner; 