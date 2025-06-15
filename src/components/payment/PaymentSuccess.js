import React, { useState, useEffect, useContext } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { FaCheckCircle, FaDownload, FaHome } from 'react-icons/fa';
import { LanguageContext } from '../layout/BlackFridayBanner';
import { getSessionDetails } from '../../utils/stripe';
import './PaymentSuccess.css';

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { language } = useContext(LanguageContext);
  const [sessionData, setSessionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const sessionId = searchParams.get('session_id');

  const text = {
    zh: {
      title: '支付成功！',
      subtitle: '感谢您的购买',
      orderNumber: '订单号',
      amount: '支付金额',
      email: '邮箱',
      status: '支付状态',
      paid: '已支付',
      downloadProgram: '下载课程',
      backToHome: '返回首页',
      orderDetails: '订单详情',
      customerInfo: '客户信息',
      loading: '正在加载订单信息...',
      error: '获取订单信息失败',
      noSession: '未找到支付会话信息',
      thankYou: '您将很快收到包含课程详情的确认邮件。'
    },
    en: {
      title: 'Payment Successful!',
      subtitle: 'Thank you for your purchase',
      orderNumber: 'Order Number',
      amount: 'Amount Paid',
      email: 'Email',
      status: 'Payment Status',
      paid: 'Paid',
      downloadProgram: 'Download Program',
      backToHome: 'Back to Home',
      orderDetails: 'Order Details',
      customerInfo: 'Customer Information',
      loading: 'Loading order information...',
      error: 'Failed to load order information',
      noSession: 'Payment session not found',
      thankYou: 'You will receive a confirmation email with program details shortly.'
    }
  };

  useEffect(() => {
    const fetchSessionDetails = async () => {
      if (!sessionId) {
        setError(text[language].noSession);
        setLoading(false);
        return;
      }

      try {
        const session = await getSessionDetails(sessionId);
        setSessionData(session);
      } catch (err) {
        console.error('Error fetching session details:', err);
        setError(text[language].error);
      } finally {
        setLoading(false);
      }
    };

    fetchSessionDetails();
  }, [sessionId, language]);

  const handleDownload = () => {
    // 这里可以实现实际的下载逻辑
    alert('下载功能将在后续版本中实现');
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  if (loading) {
    return (
      <div className="payment-success">
        <div className="container">
          <div className="loading-state">
            <div className="spinner"></div>
            <p>{text[language].loading}</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="payment-success">
        <div className="container">
          <div className="error-state">
            <h2>{text[language].error}</h2>
            <p>{error}</p>
            <button className="home-btn" onClick={handleBackToHome}>
              <FaHome /> {text[language].backToHome}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="payment-success">
      <div className="container">
        <div className="success-content">
          <div className="success-header">
            <FaCheckCircle className="success-icon" />
            <h1>{text[language].title}</h1>
            <p className="success-subtitle">{text[language].subtitle}</p>
            <p className="thank-you-message">{text[language].thankYou}</p>
          </div>

          {sessionData && (
            <div className="order-summary">
              <h2>{text[language].orderDetails}</h2>
              
              <div className="order-info">
                <div className="info-grid">
                  <div className="info-item">
                    <span className="label">{text[language].orderNumber}:</span>
                    <span className="value">{sessionData.id}</span>
                  </div>
                  
                  <div className="info-item">
                    <span className="label">{text[language].amount}:</span>
                    <span className="value">
                      ${(sessionData.amount_total / 100).toFixed(2)} {sessionData.currency.toUpperCase()}
                    </span>
                  </div>
                  
                  <div className="info-item">
                    <span className="label">{text[language].status}:</span>
                    <span className="value status-paid">{text[language].paid}</span>
                  </div>
                </div>

                {sessionData.customer_details && (
                  <div className="customer-details">
                    <h3>{text[language].customerInfo}</h3>
                    <div className="customer-grid">
                      {sessionData.customer_details.email && (
                        <div className="info-item">
                          <span className="label">{text[language].email}:</span>
                          <span className="value">{sessionData.customer_details.email}</span>
                        </div>
                      )}
                      
                      {sessionData.customer_details.name && (
                        <div className="info-item">
                          <span className="label">Name:</span>
                          <span className="value">{sessionData.customer_details.name}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {sessionData.line_items && sessionData.line_items.data && (
                  <div className="purchased-items">
                    <h3>Purchased Items</h3>
                    {sessionData.line_items.data.map((item, index) => (
                      <div key={index} className="item">
                        <span className="item-name">{item.description}</span>
                        <span className="item-quantity">x{item.quantity}</span>
                        <span className="item-price">
                          ${(item.amount_total / 100).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="action-buttons">
            <button className="download-btn" onClick={handleDownload}>
              <FaDownload /> {text[language].downloadProgram}
            </button>
            
            <button className="home-btn" onClick={handleBackToHome}>
              <FaHome /> {text[language].backToHome}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess; 