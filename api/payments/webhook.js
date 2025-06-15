const Stripe = require('stripe');
const dbConnect = require('../_lib/dbConnect');
const { Product, Order } = require('../_lib/models');

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      message: 'Method not allowed'
    });
  }

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

  try {
    await dbConnect();

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
  } catch (error) {
    console.error('Webhook processing error:', error);
    res.status(500).json({
      success: false,
      message: 'Webhook processing failed'
    });
  }
}

// 处理成功支付的内部函数
const handleSuccessfulPayment = async (session) => {
  try {
    const { productId, quantity, userId } = session.metadata;
    
    // 获取产品信息
    const ProductModel = Product();
    const product = await ProductModel.findById(productId);
    if (!product) {
      console.error('Product not found:', productId);
      return;
    }

    // 创建订单记录
    const OrderModel = Order();
    const order = await OrderModel.create({
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

// 配置为接收原始请求体
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '1mb',
    },
  },
} 