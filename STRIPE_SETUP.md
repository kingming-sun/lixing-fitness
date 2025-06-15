# Stripe 支付集成配置指南

## 🚀 快速开始

本项目已完全集成 Stripe Checkout，支持信用卡、支付宝、微信支付等多种支付方式。

## 📋 前提条件

1. **Stripe 账户**：注册 [Stripe 账户](https://dashboard.stripe.com/register)
2. **API 密钥**：从 Stripe Dashboard 获取测试和生产密钥
3. **Node.js 18+** 和 **npm**

## 🔧 配置步骤

### 1. 获取 Stripe API 密钥

1. 登录 [Stripe Dashboard](https://dashboard.stripe.com)
2. 导航至 **开发者** > **API 密钥**
3. 复制以下密钥：
   - **Publishable Key** (pk_test_xxx) - 用于前端
   - **Secret Key** (sk_test_xxx) - 用于后端

### 2. 配置后端环境变量

在 `backend/` 目录创建 `.env` 文件：

```env
# 服务器配置
PORT=5000
NODE_ENV=development

# 数据库
MONGODB_URI=mongodb://localhost:27017/lixing-fitness

# JWT
JWT_SECRET=your-super-secret-jwt-key-here

# 前端URL
CLIENT_URL=http://localhost:3000

# Stripe 配置
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
```

### 3. 配置前端环境变量

在项目根目录创建 `.env` 文件：

```env
REACT_APP_API_URL=http://localhost:5000
REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key_here
```

### 4. 配置 Webhook（可选但推荐）

1. 在 Stripe Dashboard 中，导航至 **开发者** > **Webhooks**
2. 点击 **添加端点**
3. 设置端点 URL：`http://localhost:5000/api/payments/webhook`
4. 选择事件：`checkout.session.completed`
5. 复制 **Webhook 签名密钥** 到 `.env` 文件

## 🎯 支持的功能

### 支付方式
- ✅ 信用卡/借记卡
- ✅ 支付宝 (Alipay)
- ✅ 微信支付 (WeChat Pay)
- ✅ 其他本地支付方式

### 功能特性
- ✅ 安全的 Stripe Checkout 页面
- ✅ 多语言支持（中文/英文）
- ✅ 游客结账（无需注册）
- ✅ 订单跟踪和管理
- ✅ 支付成功/取消页面
- ✅ Webhook 事件处理
- ✅ 响应式设计

## 🧪 测试

### 测试卡号
使用以下测试卡号进行测试：

- **成功支付**：`4242 4242 4242 4242`
- **需要验证**：`4000 0025 0000 3155`
- **被拒绝**：`4000 0000 0000 0002`

### 测试支付宝/微信支付
在测试模式下，Stripe 会显示模拟的支付宝/微信支付界面。

## 🚀 启动应用

### 1. 启动后端
```bash
cd backend
npm run dev
```

### 2. 启动前端
```bash
npm start
```

### 3. 或使用一键启动脚本
```bash
# Windows
start.bat

# macOS/Linux
./start.sh
```

## 📱 API 端点

### 支付相关 API
- `POST /api/payments/create-checkout-session` - 创建支付会话
- `POST /api/payments/webhook` - Stripe Webhook
- `GET /api/payments/session/:sessionId` - 获取支付详情

## 🔒 安全性

- ✅ PCI DSS 合规（通过 Stripe）
- ✅ HTTPS 强制（生产环境）
- ✅ Webhook 签名验证
- ✅ JWT 认证
- ✅ 请求限制

## 🌍 生产环境部署

### 1. 更新 API 密钥
将测试密钥替换为生产密钥：
- `pk_live_xxx` (前端)
- `sk_live_xxx` (后端)

### 2. 更新 URL
```env
CLIENT_URL=https://yourdomain.com
REACT_APP_API_URL=https://api.yourdomain.com
```

### 3. 配置 Webhook
更新 Webhook URL 为生产环境地址：
`https://api.yourdomain.com/api/payments/webhook`

## 🐛 常见问题

### Q: 支付宝/微信支付不可用？
A: 需要在 Stripe Dashboard 中启用这些支付方式，可能需要额外验证。

### Q: Webhook 验证失败？
A: 确保 `STRIPE_WEBHOOK_SECRET` 正确配置，并且端点 URL 可访问。

### Q: CORS 错误？
A: 检查后端 `CLIENT_URL` 配置是否正确。

### Q: 测试卡被拒绝？
A: 使用 [Stripe 官方测试卡](https://docs.stripe.com/testing)。

## 📚 相关文档

- [Stripe Checkout 文档](https://docs.stripe.com/payments/checkout)
- [Stripe.js 参考](https://docs.stripe.com/js)
- [Webhook 指南](https://docs.stripe.com/webhooks)
- [测试指南](https://docs.stripe.com/testing)

## 💰 费用

- **测试模式**：免费
- **生产模式**：2.9% + $0.30 每笔交易（美国）
- 详见 [Stripe 定价](https://stripe.com/pricing)

## 🆘 支持

如需帮助，请：
1. 查看 [Stripe 文档](https://docs.stripe.com)
2. 联系 [Stripe 支持](https://support.stripe.com)
3. 在项目中创建 Issue

---

🎉 **恭喜！** 您的 Stripe 支付系统已配置完成！ 