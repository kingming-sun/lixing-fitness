import { loadStripe } from '@stripe/stripe-js';

// 这里使用Stripe的测试公钥，实际使用时需要替换为你的真实公钥
// 测试公钥格式：pk_test_...
// 生产公钥格式：pk_live_...
const stripePromise = loadStripe('pk_test_51234567890abcdef'); // 替换为你的Stripe公钥

export default stripePromise; 