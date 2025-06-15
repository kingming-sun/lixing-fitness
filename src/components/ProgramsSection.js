import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import { LanguageContext } from './BlackFridayBanner';
import './ProgramsSection.css';

const ProgramsSection = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const programsPerPage = 12;
  const { language } = useContext(LanguageContext);
  const navigate = useNavigate();

  const text = {
    zh: {
      rated: '评分',
      outOf: '满分',
      selectOptions: '选择选项',
      buyNow: '立即购买',
      new: '新品',
      sale: '促销'
    },
    en: {
      rated: 'Rated',
      outOf: 'out of',
      selectOptions: 'Select options',
      buyNow: 'Buy Now',  
      new: 'NEW',
      sale: 'Sale!'
    }
  };

  const programs = [
    {
      id: 1,
      name: {
        zh: "贾马尔·布朗纳的力量举训练 第1卷",
        en: "Jamal Browner's The Powerlifter Vol. 1"
      },
      price: 59.99,
      rating: 4.33,
      isNew: true,
      image: "https://via.placeholder.com/300x200?text=Powerlifter+Vol.1"
    },
    {
      id: 2,
      name: {
        zh: "朗德尔·亨特的全能专家训练",
        en: "Rondel Hunte's The Total Specialist"
      },
      price: 59.99,
      rating: 4.92,
      isNew: true,
      image: "https://via.placeholder.com/300x200?text=Total+Specialist"
    },
    {
      id: 3,
      name: {
        zh: "SSTT 3日力量训练",
        en: "SSTT's 3 Day Strength"
      },
      price: 29.99,
      rating: 4.75,
      isNew: true,
      image: "https://via.placeholder.com/300x200?text=3+Day+Strength"
    },
    {
      id: 4,
      name: {
        zh: "SSTT 增重增肌系统",
        en: "SSTT's Weight Gain & Lean Mass System"
      },
      price: 99.99,
      rating: 5.00,
      isNew: true,
      image: "https://via.placeholder.com/300x200?text=Weight+Gain"
    },
    {
      id: 5,
      name: {
        zh: "贾马尔·布朗纳12周中级训练 第5卷",
        en: "Jamal Browner's 12 Week Intermediate Vol. 5"
      },
      price: 59.99,
      rating: 5.00,
      isNew: false,
      image: "https://via.placeholder.com/300x200?text=12+Week+Intermediate"
    },
    {
      id: 6,
      name: {
        zh: "SSTT 减脂塑形系统",
        en: "SSTT's Fat Loss & Body Recomp System"
      },
      price: 99.99,
      rating: 5.00,
      isNew: true,
      image: "https://via.placeholder.com/300x200?text=Fat+Loss"
    },
    {
      id: 7,
      name: {
        zh: "SSTT 健美上下肢+肩臂训练",
        en: "SSTT's Bodybuilding Upper Lower + Shoulders & Arms"
      },
      price: 39.99,
      rating: 5.00,
      isNew: false,
      image: "https://via.placeholder.com/300x200?text=Upper+Lower"
    },
    {
      id: 8,
      name: {
        zh: "贾马尔·布朗纳硬拉专项训练 第3卷",
        en: "Jamal Browner's Deadlift Specialization Vol. 3"
      },
      priceRange: "$49.99 – $69.99",
      rating: 5.00,
      isNew: true,
      hasOptions: true,
      image: "https://via.placeholder.com/300x200?text=Deadlift+Specialization"
    },
    {
      id: 9,
      name: {
        zh: "优惠套餐 - 任选2个课程",
        en: "Discount Bundle - Any 2 Programs"
      },
      originalPrice: 44.98,
      price: 27.98,
      isNew: true,
      isBundle: true,
      image: "https://via.placeholder.com/300x200?text=Bundle+2+Programs"
    },
    {
      id: 10,
      name: {
        zh: "健美力量套餐",
        en: "Jacked & Strong Program Bundle"
      },
      originalPrice: 84.97,
      price: 49.48,
      isNew: true,
      isBundle: true,
      image: "https://via.placeholder.com/300x200?text=Jacked+Strong"
    },
    {
      id: 11,
      name: {
        zh: "SSTT 健美推拉腿训练",
        en: "SSTT's Bodybuilding Push Pull Legs"  
      },
      price: 39.99,
      rating: 5.00,
      isNew: false,
      image: "https://via.placeholder.com/300x200?text=Push+Pull+Legs"
    },
    {
      id: 12,
      name: {
        zh: "教父课程套餐 (限量版)",
        en: "The Godfather Program Bundle (LIMITED)"
      },
      originalPrice: 239.99,
      price: 149.99,
      rating: 4.86,
      isOnSale: true,
      image: "https://via.placeholder.com/300x200?text=Godfather+Bundle"
    }
  ];

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={i} className="star filled" />);
    }
    
    if (hasHalfStar) {
      stars.push(<FaStar key="half" className="star half" />);
    }
    
    return stars;
  };

  const totalPages = Math.ceil(programs.length / programsPerPage);
  const indexOfLastProgram = currentPage * programsPerPage;
  const indexOfFirstProgram = indexOfLastProgram - programsPerPage;
  const currentPrograms = programs.slice(indexOfFirstProgram, indexOfLastProgram);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleProductClick = (programId) => {
    navigate(`/product/${programId}`);
  };

  const handlePurchaseClick = (e, programId) => {
    e.stopPropagation(); // 防止触发卡片点击事件
    navigate(`/product/${programId}`);
  };

  return (
    <section className="programs-section">
      <div className="programs-container">
        <div className="programs-grid">
          {currentPrograms.map(program => (
            <div 
              key={program.id} 
              className="program-card"
              onClick={() => handleProductClick(program.id)}
            >
              {program.isNew && <span className="new-badge">{text[language].new}</span>}
              {program.isOnSale && <span className="sale-badge">{text[language].sale}</span>}
              
              <div className="program-image">
                <img src={program.image} alt={program.name[language]} />
              </div>
              
              <div className="program-content">
                <h3 className="program-title">{program.name[language]}</h3>
                
                {program.rating && (
                  <div className="program-rating">
                    <span className="rating-text">{text[language].rated}</span>
                    <div className="stars">
                      {renderStars(program.rating)}
                    </div>
                    <span className="rating-number"><strong>{program.rating.toFixed(2)}</strong></span>
                    <span className="rating-text">{text[language].outOf} 5</span>
                  </div>
                )}
                
                <div className="program-price">
                  {program.originalPrice && (
                    <span className="original-price">${program.originalPrice.toFixed(2)}</span>
                  )}
                  {program.price ? (
                    <span className="current-price">${program.price.toFixed(2)}</span>
                  ) : (
                    <span className="price-range">{program.priceRange}</span>
                  )}
                </div>
                
                <div className="program-actions">
                  {program.hasOptions ? (
                    <button 
                      className="select-options-btn"
                      onClick={(e) => handlePurchaseClick(e, program.id)}
                    >
                      {text[language].selectOptions}
                    </button>
                  ) : (
                    <button 
                      className="buy-now-btn"
                      onClick={(e) => handlePurchaseClick(e, program.id)}
                    >
                      {text[language].buyNow}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => paginate(i + 1)}
              className={`page-btn ${currentPage === i + 1 ? 'active' : ''}`}
            >
              {i + 1}
            </button>
          ))}
          {currentPage < totalPages && (
            <button
              onClick={() => paginate(currentPage + 1)}
              className="page-btn next"
            >
              →
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProgramsSection; 