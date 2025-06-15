const Stripe = require('stripe');
const Product = require('../models/Product');
const Order = require('../models/Order');

// 初始化Stripe
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

// @desc    创建Stripe Checkout会话
// @route   POST /api/payments/create-checkout-session
// @access  Public
exports.createCheckoutSession = async (req, res) => {
  try {
    const { productId, quantity = 1, customerInfo } = req.body;

    // 获取产品信息
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: '产品不存在'
      });
    }

    // 创建Stripe Checkout会话
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card', 'alipay', 'wechat_pay'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: product.nameEn || product.name,
              description: product.descriptionEn || product.description,
              images: product.image ? [product.image] : [],
            },
            unit_amount: Math.round(product.price * 100), // 转换为分
          },
          quantity: quantity,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.CLIENT_URL}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/payment/cancel`,
      customer_email: customerInfo?.email,
      billing_address_collection: 'required',
      shipping_address_collection: {
        allowed_countries: ['US', 'CA', 'CN', 'HK', 'TW'],
      },
      metadata: {
        productId: productId,
        quantity: quantity.toString(),
        userId: req.user?.id || 'guest',
      },
      locale: 'auto', // 自动检测语言
    });

    res.status(200).json({
      success: true,
      sessionId: session.id,
      url: session.url
    });
  } catch (error) {
    console.error('Stripe Checkout Session Error:', error);
    res.status(500).json({
      success: false,
      message: '创建支付会话失败',
      error: error.message
    });
  }
};

// @desc    处理Stripe Webhook
// @route   POST /api/payments/webhook
// @access  Public
exports.handleWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // 处理事件
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object;
      await handleSuccessfulPayment(session);
      break;
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      console.log('Payment succeeded:', paymentIntent.id);
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.json({ received: true });
};

// @desc    获取支付会话详情
// @route   GET /api/payments/session/:sessionId
// @access  Public
exports.getSessionDetails = async (req, res) => {
  try {
    const { sessionId } = req.params;
    
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['line_items', 'customer_details']
    });

    res.status(200).json({
      success: true,
      session: {
        id: session.id,
        payment_status: session.payment_status,
        amount_total: session.amount_total,
        currency: session.currency,
        customer_details: session.customer_details,
        line_items: session.line_items
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: '获取支付会话详情失败',
      error: error.message
    });
  }
};

// 处理成功支付的内部函数
const handleSuccessfulPayment = async (session) => {
  try {
    const { productId, quantity, userId } = session.metadata;
    
    // 获取产品信息
    const product = await Product.findById(productId);
    if (!product) {
      console.error('Product not found:', productId);
      return;
    }

    // 创建订单记录
    const order = await Order.create({
      user: userId !== 'guest' ? userId : null,
      products: [{
        product: productId,
        name: product.name,
        price: product.price,
        quantity: parseInt(quantity)
      }],
      totalAmount: session.amount_total / 100, // 转换回元
      paymentStatus: 'paid',
      paymentMethod: 'stripe',
      paymentId: session.payment_intent,
      customerInfo: {
        name: session.customer_details.name,
        email: session.customer_details.email,
        address: session.customer_details.address
      },
      status: 'completed'
    });

    console.log('Order created successfully:', order.orderNumber);
  } catch (error) {
    console.error('Error handling successful payment:', error);
  }
};

module.exports = {
  createCheckoutSession: exports.createCheckoutSession,
  handleWebhook: exports.handleWebhook,
  getSessionDetails: exports.getSessionDetails
}; 