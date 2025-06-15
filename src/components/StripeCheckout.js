import React, { useState, useContext } from 'react';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { LanguageContext } from './BlackFridayBanner';
import stripePromise from '../utils/stripe';
import './StripeCheckout.css';

// 支付表单组件
const CheckoutForm = ({ product, onSuccess, onError, onCancel }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { language } = useContext(LanguageContext);
  const [isProcessing, setIsProcessing] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    address: {
      line1: '',
      city: '',
      state: '',
      postal_code: '',
      country: 'US'
    }
  });

  const text = {
    zh: {
      title: '支付信息',
      name: '姓名',
      email: '邮箱',
      address: '地址',
      city: '城市',
      state: '州/省',
      postalCode: '邮政编码',
      country: '国家',
      cardInfo: '银行卡信息',
      processing: '处理中...',
      payNow: '立即支付',
      cancel: '取消',
      nameRequired: '请输入姓名',
      emailRequired: '请输入邮箱',
      emailInvalid: '请输入有效的邮箱地址',
      paymentFailed: '支付失败，请重试',
      paymentSuccess: '支付成功！',
      orderSummary: '订单摘要',
      total: '总计'
    },
    en: {
      title: 'Payment Information',
      name: 'Full Name',
      email: 'Email',
      address: 'Address',
      city: 'City',
      state: 'State',
      postalCode: 'Postal Code',
      country: 'Country',
      cardInfo: 'Card Information',
      processing: 'Processing...',
      payNow: 'Pay Now',
      cancel: 'Cancel',
      nameRequired: 'Please enter your name',
      emailRequired: 'Please enter your email',
      emailInvalid: 'Please enter a valid email address',
      paymentFailed: 'Payment failed, please try again',
      paymentSuccess: 'Payment successful!',
      orderSummary: 'Order Summary',
      total: 'Total'
    }
  };

  const cardElementOptions = {
    style: {
      base: {
        fontSize: '16px',
        color: '#424770',
        '::placeholder': {
          color: '#aab7c4',
        },
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      },
      invalid: {
        color: '#9e2146',
      },
    },
    hidePostalCode: true, // 我们会单独收集邮政编码
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name.startsWith('address.')) {
      const addressField = name.split('.')[1];
      setCustomerInfo(prev => ({
        ...prev,
        address: {
          ...prev.address,
          [addressField]: value
        }
      }));
    } else {
      setCustomerInfo(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const validateForm = () => {
    if (!customerInfo.name.trim()) {
      alert(text[language].nameRequired);
      return false;
    }
    
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

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    if (!validateForm()) {
      return;
    }

    setIsProcessing(true);

    const cardElement = elements.getElement(CardElement);

    // 在实际应用中，你需要调用你的后端API来创建PaymentIntent
    // 这里我们模拟一个支付流程
    try {
      // 模拟API调用延迟
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // 模拟支付成功（实际中需要调用Stripe的confirmCardPayment）
      const mockPaymentResult = {
        paymentIntent: {
          id: 'pi_mock_' + Date.now(),
          status: 'succeeded',
          amount: Math.round(product.price * 100), // Stripe使用分为单位
          currency: 'usd'
        }
      };

      if (mockPaymentResult.paymentIntent.status === 'succeeded') {
        onSuccess(mockPaymentResult.paymentIntent);
      } else {
        onError(new Error(text[language].paymentFailed));
      }
    } catch (error) {
      onError(error);
    }

    setIsProcessing(false);
  };

  return (
    <div className="stripe-checkout">
      <div className="checkout-container">
        <div className="checkout-content">
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

          <div className="payment-form">
            <h3>{text[language].title}</h3>
            
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label>{text[language].name}</label>
                  <input
                    type="text"
                    name="name"
                    value={customerInfo.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>{text[language].email}</label>
                  <input
                    type="email"
                    name="email"
                    value={customerInfo.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>{text[language].address}</label>
                <input
                  type="text"
                  name="address.line1"
                  value={customerInfo.address.line1}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>{text[language].city}</label>
                  <input
                    type="text"
                    name="address.city"
                    value={customerInfo.address.city}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="form-group">
                  <label>{text[language].state}</label>
                  <input
                    type="text"
                    name="address.state"
                    value={customerInfo.address.state}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="form-group">
                  <label>{text[language].postalCode}</label>
                  <input
                    type="text"
                    name="address.postal_code"
                    value={customerInfo.address.postal_code}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>{text[language].cardInfo}</label>
                <div className="card-element-container">
                  <CardElement options={cardElementOptions} />
                </div>
              </div>

              <div className="form-actions">
                <button 
                  type="button" 
                  className="cancel-btn"
                  onClick={onCancel}
                  disabled={isProcessing}
                >
                  {text[language].cancel}
                </button>
                
                <button 
                  type="submit" 
                  className="pay-btn"
                  disabled={!stripe || isProcessing}
                >
                  {isProcessing 
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

// 主要的Stripe结账组件
const StripeCheckout = ({ product, onSuccess, onError, onCancel }) => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm 
        product={product}
        onSuccess={onSuccess}
        onError={onError}
        onCancel={onCancel}
      />
    </Elements>
  );
};

export default StripeCheckout; 