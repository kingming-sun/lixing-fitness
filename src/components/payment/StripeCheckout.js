import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { LanguageContext } from '../layout/BlackFridayBanner';
import { createCheckoutSession } from '../../utils/stripe';
import './StripeCheckout.css';

const StripeCheckout = ({ product, onSuccess, onError, onCancel }) => {
  const { language } = useContext(LanguageContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    email: '',
    name: ''
  });

  const text = {
    zh: {
      title: '安全支付',
      subtitle: '使用Stripe安全支付系统',
      email: '邮箱地址',
      name: '姓名（可选）',
      payNow: '立即支付',
      processing: '正在跳转到支付页面...',
      cancel: '取消',
      orderSummary: '订单摘要',
      total: '总计',
      securePayment: '🔒 安全支付',
      supportedMethods: '支持信用卡、支付宝、微信支付等多种支付方式',
      emailRequired: '请输入邮箱地址',
      emailInvalid: '请输入有效的邮箱地址',
      paymentError: '支付初始化失败，请重试'
    },
    en: {
      title: 'Secure Payment',
      subtitle: 'Powered by Stripe secure payment system',
      email: 'Email Address',
      name: 'Full Name (Optional)',
      payNow: 'Pay Now',
      processing: 'Redirecting to payment page...',
      cancel: 'Cancel',
      orderSummary: 'Order Summary',
      total: 'Total',
      securePayment: '🔒 Secure Payment',
      supportedMethods: 'Supports credit cards, Alipay, WeChat Pay and more',
      emailRequired: 'Please enter your email address',
      emailInvalid: 'Please enter a valid email address',
      paymentError: 'Failed to initialize payment, please try again'
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    if (!customerInfo.email.trim()) {
      alert(text[language].emailRequired);
      return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(customerInfo.email)) {
      alert(text[language].emailInvalid);
      return false;
    }
    
    return true;
  };

  const handleCheckout = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // 创建Stripe Checkout会话
      const { sessionId, url } = await createCheckoutSession(
        product.id,
        1,
        customerInfo
      );

      // 直接跳转到Stripe Checkout页面
      window.location.href = url;
      
    } catch (error) {
      console.error('Checkout error:', error);
      alert(text[language].paymentError + ': ' + error.message);
      if (onError) {
        onError(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="stripe-checkout-modal">
      <div className="checkout-overlay" onClick={onCancel}></div>
      <div className="checkout-container">
        <div className="checkout-content">
          {/* 订单摘要 */}
          <div className="order-summary">
            <h3>{text[language].orderSummary}</h3>
            <div className="product-info">
              <img src={product.image} alt={product.name[language]} />
              <div className="product-details">
                <h4>{product.name[language]}</h4>
                <p className="product-price">${product.price.toFixed(2)}</p>
              </div>
            </div>
            <div className="total-section">
              <div className="total-line">
                <span>{text[language].total}</span>
                <span className="total-amount">${product.price.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* 支付表单 */}
          <div className="payment-form">
            <div className="payment-header">
              <h3>{text[language].title}</h3>
              <p className="payment-subtitle">{text[language].subtitle}</p>
            </div>
            
            <form onSubmit={(e) => { e.preventDefault(); handleCheckout(); }}>
              <div className="form-group">
                <label>{text[language].email} *</label>
                <input
                  type="email"
                  name="email"
                  value={customerInfo.email}
                  onChange={handleInputChange}
                  required
                  placeholder="your@email.com"
                />
              </div>

              <div className="form-group">
                <label>{text[language].name}</label>
                <input
                  type="text"
                  name="name"
                  value={customerInfo.name}
                  onChange={handleInputChange}
                  placeholder="John Doe"
                />
              </div>

              <div className="payment-info">
                <div className="secure-badge">
                  {text[language].securePayment}
                </div>
                <p className="supported-methods">
                  {text[language].supportedMethods}
                </p>
              </div>

              <div className="form-actions">
                <button 
                  type="button" 
                  className="cancel-btn"
                  onClick={onCancel}
                  disabled={isLoading}
                >
                  {text[language].cancel}
                </button>
                
                <button 
                  type="submit" 
                  className="pay-btn"
                  disabled={isLoading}
                >
                  {isLoading 
                    ? text[language].processing 
                    : `${text[language].payNow} $${product.price.toFixed(2)}`
                  }
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StripeCheckout; 