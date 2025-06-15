# Vercel 部署指南

## 🚀 快速部署

本项目已优化为支持 Vercel 一键部署，包含前端和后端 API。

## 📋 部署前准备

### 1. 环境变量配置

在 Vercel 项目设置中配置以下环境变量：

#### 必需的环境变量

```env
# MongoDB 数据库
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/lixing-fitness

# Stripe 配置
STRIPE_SECRET_KEY=sk_live_your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

# 前端URL（自动设置）
CLIENT_URL=https://your-domain.vercel.app

# React 环境变量
REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_live_your_stripe_publishable_key
```

#### 可选环境变量

```env
# Node.js 环境
NODE_ENV=production

# JWT 配置（如果使用认证）
JWT_SECRET=your-super-secret-jwt-key
```

### 2. 数据库准备

#### 使用 MongoDB Atlas（推荐）

1. 注册 [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. 创建免费集群
3. 创建数据库用户
4. 获取连接字符串
5. 将 IP 地址添加到白名单（或使用 0.0.0.0/0 允许所有）

#### 本地 MongoDB

如果使用本地 MongoDB，需要确保数据库可以从外网访问。

## 🔧 部署步骤

### 方法一：GitHub 自动部署（推荐）

1. **推送代码到 GitHub**

   ```bash
   git add .
   git commit -m "Prepare for Vercel deployment"
   git push origin main
   ```

2. **连接 Vercel**

   - 访问 [Vercel Dashboard](https://vercel.com/dashboard)
   - 点击 "New Project"
   - 选择你的 GitHub 仓库
   - 点击 "Import"

3. **配置项目**

   - Framework Preset: `Create React App`
   - Root Directory: `./` (默认)
   - Build Command: `npm run build` (自动检测)
   - Output Directory: `build` (自动检测)

4. **设置环境变量**

   - 在项目设置中添加上述环境变量
   - 确保所有必需的变量都已配置

5. **部署**
   - 点击 "Deploy"
   - 等待部署完成

### 方法二：Vercel CLI 部署

1. **安装 Vercel CLI**

   ```bash
   npm i -g vercel
   ```

2. **登录 Vercel**

   ```bash
   vercel login
   ```

3. **部署项目**

   ```bash
   vercel
   ```

4. **设置环境变量**

   ```bash
   vercel env add MONGODB_URI
   vercel env add STRIPE_SECRET_KEY
   vercel env add STRIPE_WEBHOOK_SECRET
   vercel env add REACT_APP_STRIPE_PUBLISHABLE_KEY
   ```

5. **重新部署**
   ```bash
   vercel --prod
   ```

## 🔗 API 端点

部署后，你的 API 端点将是：

- **健康检查**: `https://your-domain.vercel.app/api/health`
- **产品列表**: `https://your-domain.vercel.app/api/products`
- **产品详情**: `https://your-domain.vercel.app/api/products/[id]`
- **创建支付**: `https://your-domain.vercel.app/api/payments/create-checkout-session`
- **支付详情**: `https://your-domain.vercel.app/api/payments/session/[sessionId]`
- **Webhook**: `https://your-domain.vercel.app/api/payments/webhook`

## ⚙️ Stripe Webhook 配置

1. **登录 Stripe Dashboard**
2. **导航至 Webhooks**
   - 开发者 > Webhooks
3. **添加端点**
   - URL: `https://your-domain.vercel.app/api/payments/webhook`
   - 事件: `checkout.session.completed`
4. **复制 Webhook 密钥**
   - 将密钥添加到 Vercel 环境变量 `STRIPE_WEBHOOK_SECRET`

## 🎯 功能验证

### 1. 检查 API 状态

访问：`https://your-domain.vercel.app/api/health`

应该返回：

```json
{
  "success": true,
  "message": "Vercel API is running",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "environment": "production"
}
```

### 2. 测试支付流程

1. 访问你的网站
2. 选择一个产品
3. 点击"立即支付"
4. 使用测试卡号：`4242 4242 4242 4242`
5. 完成支付流程

## 🔧 故障排除

### 常见问题

#### 1. API 500 错误

- 检查环境变量是否正确配置
- 查看 Vercel 函数日志
- 确认 MongoDB 连接字符串正确

#### 2. CORS 错误

- 确认 `CLIENT_URL` 环境变量设置正确
- 检查 API 函数中的 CORS 设置

#### 3. Stripe Webhook 失败

- 确认 Webhook URL 正确
- 检查 `STRIPE_WEBHOOK_SECRET` 环境变量
- 查看 Stripe Dashboard 中的 Webhook 日志

#### 4. 数据库连接失败

- 检查 MongoDB Atlas 白名单设置
- 确认数据库用户权限
- 验证连接字符串格式

### 查看日志

1. 访问 Vercel Dashboard
2. 选择你的项目
3. 点击 "Functions" 标签
4. 查看函数执行日志

## 📊 性能优化

### 1. 数据库优化

- 为常用查询添加索引
- 使用 MongoDB Atlas 的性能建议

### 2. API 优化

- 启用 Vercel 的边缘缓存
- 优化数据库查询
- 使用连接池

### 3. 前端优化

- 启用 Vercel 的自动压缩
- 使用 CDN 加速静态资源
- 实现代码分割

## 🔄 持续部署

### 自动部署

- 推送到 `main` 分支自动触发部署
- 预览部署：推送到其他分支

### 环境管理

- 生产环境：`main` 分支
- 预览环境：其他分支
- 开发环境：本地开发

## 📈 监控和分析

### Vercel Analytics

1. 在项目设置中启用 Analytics
2. 查看性能指标和用户行为

### 错误监控

- 使用 Vercel 的内置错误跟踪
- 集成第三方监控服务（如 Sentry）

## 🔐 安全最佳实践

1. **环境变量安全**

   - 不要在代码中硬编码密钥
   - 使用 Vercel 的环境变量管理

2. **API 安全**

   - 实现请求限制
   - 验证输入数据
   - 使用 HTTPS

3. **数据库安全**
   - 限制数据库访问权限
   - 使用强密码
   - 定期备份数据

---

🎉 **部署完成！** 你的 Lixing Fitness 应用现在已在 Vercel 上运行！

## 📞 支持

如遇问题，请：

1. 查看 [Vercel 文档](https://vercel.com/docs)
2. 检查项目的 GitHub Issues
3. 联系开发团队
