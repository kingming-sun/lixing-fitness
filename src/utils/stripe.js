import { loadStripe } from '@stripe/stripe-js';

// Stripe公钥配置
// 开发环境使用测试公钥，生产环境使用真实公钥
const stripePublishableKey = process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY || 'pk_test_51234567890abcdef';

// 初始化Stripe
const stripePromise = loadStripe(stripePublishableKey);

export default stripePromise;

// 获取API基础URL
const getApiUrl = () => {
  if (process.env.NODE_ENV === 'production') {
    // 生产环境使用当前域名的API路由
    return window.location.origin;
  }
  // 开发环境使用环境变量或默认值
  return process.env.REACT_APP_API_URL || 'http://localhost:5000';
};

// 支付相关的API调用函数
export const createCheckoutSession = async (productId, quantity = 1, customerInfo = {}) => {
  try {
    const apiUrl = getApiUrl();
    const response = await fetch(`${apiUrl}/api/payments/create-checkout-session`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // 如果用户已登录，添加认证头
        ...(localStorage.getItem('token') && {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        })
      },
      body: JSON.stringify({
        productId,
        quantity,
        customerInfo
      })
    });

    const data = await response.json();
    
    if (!data.success) {
      throw new Error(data.message || '创建支付会话失败');
    }

    return data;
  } catch (error) {
    console.error('Create checkout session error:', error);
    throw error;
  }
};

// 获取支付会话详情
export const getSessionDetails = async (sessionId) => {
  try {
    const apiUrl = getApiUrl();
    const response = await fetch(`${apiUrl}/api/payments/session/${sessionId}`);
    const data = await response.json();
    
    if (!data.success) {
      throw new Error(data.message || '获取支付详情失败');
    }

    return data.session;
  } catch (error) {
    console.error('Get session details error:', error);
    throw error;
  }
};

// 获取产品列表
export const getProducts = async (params = {}) => {
  try {
    const apiUrl = getApiUrl();
    const queryString = new URLSearchParams(params).toString();
    const response = await fetch(`${apiUrl}/api/products${queryString ? `?${queryString}` : ''}`);
    const data = await response.json();
    
    if (!data.success) {
      throw new Error(data.message || '获取产品列表失败');
    }

    return data;
  } catch (error) {
    console.error('Get products error:', error);
    throw error;
  }
};

// 获取单个产品详情
export const getProduct = async (productId) => {
  try {
    const apiUrl = getApiUrl();
    const response = await fetch(`${apiUrl}/api/products/${productId}`);
    const data = await response.json();
    
    if (!data.success) {
      throw new Error(data.message || '获取产品详情失败');
    }

    return data.data;
  } catch (error) {
    console.error('Get product error:', error);
    throw error;
  }
}; 