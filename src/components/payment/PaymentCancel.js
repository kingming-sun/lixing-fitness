import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTimesCircle, FaHome, FaArrowLeft } from 'react-icons/fa';
import { LanguageContext } from '../layout/BlackFridayBanner';
import './PaymentCancel.css';

const PaymentCancel = () => {
  const navigate = useNavigate();
  const { language } = useContext(LanguageContext);

  const text = {
    zh: {
      title: '支付已取消',
      subtitle: '您的支付已被取消，没有产生任何费用',
      message: '如果您遇到任何问题或需要帮助，请随时联系我们的客服团队。',
      tryAgain: '重新尝试',
      backToHome: '返回首页',
      contactSupport: '联系客服',
      reasons: '可能的原因：',
      reasonsList: [
        '您主动取消了支付',
        '支付信息验证失败',
        '网络连接问题',
        '银行卡或支付方式问题'
      ]
    },
    en: {
      title: 'Payment Cancelled',
      subtitle: 'Your payment has been cancelled and no charges were made',
      message: 'If you encountered any issues or need assistance, please feel free to contact our support team.',
      tryAgain: 'Try Again',
      backToHome: 'Back to Home',
      contactSupport: 'Contact Support',
      reasons: 'Possible reasons:',
      reasonsList: [
        'You cancelled the payment',
        'Payment information verification failed',
        'Network connection issues',
        'Credit card or payment method issues'
      ]
    }
  };

  const handleTryAgain = () => {
    navigate(-1); // 返回上一页
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  const handleContactSupport = () => {
    // 这里可以实现联系客服的逻辑，比如打开聊天窗口或跳转到联系页面
    window.open('mailto:support@lixing-fitness.com', '_blank');
  };

  return (
    <div className="payment-cancel">
      <div className="container">
        <div className="cancel-content">
          <div className="cancel-header">
            <FaTimesCircle className="cancel-icon" />
            <h1>{text[language].title}</h1>
            <p className="cancel-subtitle">{text[language].subtitle}</p>
          </div>

          <div className="cancel-message">
            <p>{text[language].message}</p>
          </div>

          <div className="reasons-section">
            <h3>{text[language].reasons}</h3>
            <ul className="reasons-list">
              {text[language].reasonsList.map((reason, index) => (
                <li key={index}>{reason}</li>
              ))}
            </ul>
          </div>

          <div className="action-buttons">
            <button className="try-again-btn" onClick={handleTryAgain}>
              <FaArrowLeft /> {text[language].tryAgain}
            </button>
            
            <button className="home-btn" onClick={handleBackToHome}>
              <FaHome /> {text[language].backToHome}
            </button>
            
            <button className="support-btn" onClick={handleContactSupport}>
              {text[language].contactSupport}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentCancel; 