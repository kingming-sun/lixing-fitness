import React, { useContext, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaStar, FaArrowLeft, FaCheckCircle } from 'react-icons/fa';
import { LanguageContext } from '../layout/BlackFridayBanner';
import StripeCheckout from '../payment/StripeCheckout';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { language } = useContext(LanguageContext);
  const [showCheckout, setShowCheckout] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentData, setPaymentData] = useState(null);

  const text = {
    zh: {
      overview: '概述',
      programLength: '课程时长',
      liftingFrequency: '训练频率',
      type: '类型',
      buyNow: '立即购买',
      keyFeatures: '主要特色',
      back: '返回',
      reviews: '用户评价',
      rated: '评分',
      outOf: '满分',
      weeks: '周',
      months: '月',
      daysWeekly: '天/周',
      paymentSuccess: '支付成功！',
      paymentSuccessMessage: '感谢您的购买！您将收到包含课程详情的确认邮件。',
      orderNumber: '订单号',
      amount: '支付金额',
      continueShopping: '继续购物',
      paymentError: '支付失败',
      tryAgain: '重试'
    },
    en: {
      overview: 'Overview',
      programLength: 'Program Length',
      liftingFrequency: 'Overall Lifting Frequency',
      type: 'Type',
      buyNow: 'Buy Now',
      keyFeatures: 'Key Features',
      back: 'Back',
      reviews: 'Reviews',
      rated: 'Rated',
      outOf: 'out of',
      weeks: 'Weeks',
      months: 'Months',
      daysWeekly: 'Days/Weekly',
      paymentSuccess: 'Payment Successful!',
      paymentSuccessMessage: 'Thank you for your purchase! You will receive a confirmation email with program details.',
      orderNumber: 'Order Number',
      amount: 'Amount Paid',
      continueShopping: 'Continue Shopping',
      paymentError: 'Payment Failed',
      tryAgain: 'Try Again'
    }
  };

  // 模拟产品数据
  const programs = [
    {
      id: 1,
      name: {
        zh: "贾马尔·布朗纳的力量举训练 第1卷",
        en: "Jamal Browner's The Powerlifter Vol. 1"
      },
      price: 59.99,
      rating: 4.33,
      reviewCount: 3,
      isNew: true,
      image: "https://via.placeholder.com/400x300?text=Powerlifter+Vol.1",
      description: {
        zh: "力量举训练系列成为过去几年力量训练课程的黄金标准，我们不断提高标准，帮助成千上万的举重者创造新的个人记录，为比赛做准备，并在力量训练之路上不断进步。力量举训练课程是我们最精炼的版本。",
        en: "The Powerlifter. The intermediate series became the gold standard for strength programs over the last few years, we constantly upped the bar and helped 1000's of lifters hit new PRs, prepare for meets and progress along their strength journey. The Powerlifter program is our most refined yet."
      },
      features: {
        zh: [
          "中级系列所有课程的视频内容，由贾马尔和他的教练提供6+小时的内容",
          "访问SSTT社区：动作检查、直播通话、跟练课程、发布你的举重视频",
          "最新的RPE和百分比系统，允许课程以两种方式运行",
          "个性化RPE指南，让你轻松输入重复次数和RPE",
          "最新的定制系统，可以自动调整500多种不同方式",
          "详细的FAQ页面",
          "内置减量和1RM测试日",
          "自定义变化动作选择以加强薄弱环节",
          "课程追踪器记录每周体重、训练组数等数据"
        ],
        en: [
          "All videos from every program in the intermediate series is included here for a total of 6+ hours of content by Jamal and his coach",
          "Access to the SSTT community. Form checks, live calls, train along programs, posting your lifts, program discounts and more!",
          "Our Newest RPE & Percentage system which allows the program to be run both ways; Fully RPE based or Fully % based",
          "Our NEW personalized RPE GUIDE which allows you to simply plug in the number of reps and RPE",
          "Our Newest customization system. This new system allows this program to be automatically adjusted over 500 different ways",
          "A detailed FAQ page which answers a number of questions we often get about getting the most out of your program",
          "Built in Taper and 1RM test day so that you are able to use this program to prep into a meet",
          "Custom variant exercise selection to strengthen your weak points and utilize available equipment",
          "A program tracker which keeps a log of data like your weekly body weight, number of hard sets performed"
        ]
      },
      duration: {
        weeks: 12,
        months: 3
      },
      frequency: 5,
      programType: {
        zh: "基于RPE和百分比的最新系统",
        en: "RPE & Percentage Based. (Newest System)"
      }
    }
  ];

  const product = programs.find(p => p.id === parseInt(id));

  if (!product) {
    return (
      <div className="product-detail">
        <div className="container">
          <h2>{language === 'zh' ? '产品未找到' : 'Product not found'}</h2>
        </div>
      </div>
    );
  }

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

  const handlePurchase = () => {
    setShowCheckout(true);
  };

  const handlePaymentSuccess = (paymentIntent) => {
    setPaymentData(paymentIntent);
    setShowCheckout(false);
    setPaymentSuccess(true);
  };

  const handlePaymentError = (error) => {
    console.error('Payment failed:', error);
    alert(text[language].paymentError + ': ' + error.message);
    setShowCheckout(false);
  };

  const handlePaymentCancel = () => {
    setShowCheckout(false);
  };

  const handleContinueShopping = () => {
    setPaymentSuccess(false);
    setPaymentData(null);
    navigate('/');
  };

  // 支付成功页面
  if (paymentSuccess && paymentData) {
    return (
      <div className="product-detail">
        <div className="container">
          <div className="payment-success">
            <div className="success-content">
              <FaCheckCircle className="success-icon" />
              <h1>{text[language].paymentSuccess}</h1>
              <p>{text[language].paymentSuccessMessage}</p>
              
              <div className="payment-details">
                <div className="detail-item">
                  <span className="label">{text[language].orderNumber}:</span>
                  <span className="value">{paymentData.id}</span>
                </div>
                <div className="detail-item">
                  <span className="label">{text[language].amount}:</span>
                  <span className="value">${(paymentData.amount / 100).toFixed(2)}</span>
                </div>
              </div>

              <button className="continue-shopping-btn" onClick={handleContinueShopping}>
                {text[language].continueShopping}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="product-detail">
      <div className="container">
        <button className="back-button" onClick={() => navigate(-1)}>
          <FaArrowLeft /> {text[language].back}
        </button>

        <div className="product-header">
          <div className="product-image">
            <img src={product.image} alt={product.name[language]} />
            {product.isNew && <span className="new-badge">NEW</span>}
          </div>

          <div className="product-info">
            <h1>{product.name[language]}</h1>
            
            <div className="product-rating">
              <span className="rating-text">{text[language].rated}</span>
              <div className="stars">
                {renderStars(product.rating)}
              </div>
              <span className="rating-number"><strong>{product.rating.toFixed(2)}</strong></span>
              <span className="rating-text">{text[language].outOf} 5</span>
              <span className="review-count">({product.reviewCount} {text[language].reviews})</span>
            </div>

            <div className="product-price">
              <span className="price">${product.price.toFixed(2)}</span>
            </div>

            <div className="program-specs">
              <div className="spec-item">
                <strong>{text[language].programLength}:</strong> {product.duration.weeks} {text[language].weeks} ({product.duration.months} {text[language].months})
              </div>
              <div className="spec-item">
                <strong>{text[language].liftingFrequency}:</strong> {product.frequency} {text[language].daysWeekly}
              </div>
              <div className="spec-item">
                <strong>{text[language].type}:</strong> {product.programType[language]}
              </div>
            </div>

            <button className="buy-now-button" onClick={handlePurchase}>
              {text[language].buyNow}
            </button>
          </div>
        </div>

        <div className="product-content">
          <section className="overview-section">
            <h2>{text[language].overview}</h2>
            <p>{product.description[language]}</p>
          </section>

          <section className="features-section">
            <h2>{text[language].keyFeatures}</h2>
            <ul className="features-list">
              {product.features[language].map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </section>

          <section className="reviews-section">
            <h2>{text[language].reviews} ({product.reviewCount})</h2>
            <div className="review-item">
              <div className="review-header">
                <div className="reviewer-info">
                  <span className="reviewer-name">Shawn Nanton</span>
                  <span className="review-date">February 28, 2025</span>
                </div>
                <div className="review-rating">
                  {renderStars(4)}
                </div>
              </div>
              <p className="review-text">
                {language === 'zh' 
                  ? "无法决定我更喜欢这个课程还是V4版本，两个都很棒且有相似的功能。V4增加了27公斤，力量举训练增加了35公斤。"
                  : "Can't decide if I enjoyed this program more or V4 which I did before, both really nice and both have similar features. Added 27kg on v4 and 35kg on the powerlifter."
                }
              </p>
            </div>
          </section>
        </div>
      </div>

      {/* Stripe 结账模态框 */}
      {showCheckout && (
        <StripeCheckout
          product={product}
          onSuccess={handlePaymentSuccess}
          onError={handlePaymentError}
          onCancel={handlePaymentCancel}
        />
      )}
    </div>
  );
};

export default ProductDetail; 