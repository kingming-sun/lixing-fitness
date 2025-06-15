const express = require('express');
const {
  createCheckoutSession,
  handleWebhook,
  getSessionDetails
} = require('../controllers/paymentController');

const { optionalAuth } = require('../middleware/auth');

const router = express.Router();

// 创建Stripe Checkout会话
router.post('/create-checkout-session', optionalAuth, createCheckoutSession);

// Stripe Webhook处理（需要原始请求体）
router.post('/webhook', express.raw({ type: 'application/json' }), handleWebhook);

// 获取支付会话详情
router.get('/session/:sessionId', getSessionDetails);

module.exports = router; 