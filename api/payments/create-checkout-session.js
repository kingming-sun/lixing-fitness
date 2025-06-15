const Stripe = require('stripe');
const dbConnect = require('../_lib/dbConnect');
const { Product } = require('../_lib/models');

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  // 设置CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', process.env.CLIENT_URL || '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      message: 'Method not allowed'
    });
  }

  try {
    await dbConnect();

    const { productId, quantity = 1, customerInfo } = req.body;

    // 获取产品信息
    const ProductModel = Product();
    const product = await ProductModel.findById(productId);
    
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
} 