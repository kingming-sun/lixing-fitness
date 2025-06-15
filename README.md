# Lixing Fitness - 全栈健身训练平台

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/kingming-sun/lixing-fitness)

这是一个基于 React + Node.js 的全栈健身训练平台，提供完整的商品管理、用户认证、支付处理等功能。现已优化支持 **Vercel 一键部署**。

## 🚀 快速部署

### Vercel 部署（推荐）

1. 点击上方 "Deploy with Vercel" 按钮
2. 连接你的 GitHub 账户
3. 配置环境变量（见 [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md)）
4. 点击部署

### 本地开发

详见下方 [安装和运行](#🛠️-安装和运行) 部分

## 🚀 功能特点

### 前端功能

- 🎯 **黑色星期五倒计时横幅** - 动态倒计时显示
- 🏋️ **训练项目展示** - 完整的项目卡片网格布局
- ⭐ **评分系统** - 星级评分显示
- 📱 **响应式设计** - 完美适配移动端和桌面端
- 🛒 **购物车功能** - 添加到购物车按钮
- 💳 **Stripe 支付集成** - 安全的在线支付
- 📧 **邮件订阅** - 新闻订阅功能
- 🌐 **多语言支持** - 中英文切换
- 🔗 **社交媒体链接** - Facebook 和 Instagram 链接
- 📄 **分页功能** - 项目列表分页显示

### 后端功能

- 🔐 **用户认证系统** - JWT 认证，角色权限管理
- 📦 **商品管理** - CRUD 操作，图片上传，分类筛选
- 📁 **文件上传** - 支持图片上传和管理
- 🛡️ **安全防护** - 请求限制、CORS、Helmet 安全头
- 📊 **数据统计** - 商品统计和分析
- 🌍 **双语支持** - 中英文商品信息

## 📋 技术栈

### 前端

- **React** - 前端框架
- **React Router** - 路由管理
- **React Icons** - 图标库
- **Stripe** - 支付处理
- **CSS3** - 样式和动画

### 后端

- **Node.js** - 运行环境
- **Express.js** - Web 框架
- **MongoDB** - 数据库
- **Mongoose** - ODM
- **JWT** - 身份认证
- **Multer** - 文件上传
- **bcryptjs** - 密码加密

## 🏗️ 项目结构

```
lixing-fitness/
├── src/                           # 前端源码
│   ├── components/
│   │   ├── layout/               # 布局组件
│   │   │   ├── Header.js/css
│   │   │   ├── Footer.js/css
│   │   │   └── BlackFridayBanner.js/css
│   │   ├── home/                 # 首页组件
│   │   │   ├── HeroSection.js/css
│   │   │   ├── ProgramsSection.js/css
│   │   │   ├── ProgramRecommender.js/css
│   │   │   └── Newsletter.js/css
│   │   ├── product/              # 产品组件
│   │   │   └── ProductDetail.js/css
│   │   ├── payment/              # 支付组件
│   │   │   └── StripeCheckout.js/css
│   │   └── index.js              # 组件统一导出
│   ├── App.js                    # 主应用组件
│   └── App.css                   # 全局样式
├── backend/                      # 后端源码
│   ├── config/
│   │   └── database.js           # 数据库配置
│   ├── controllers/
│   │   ├── authController.js     # 认证控制器
│   │   └── productController.js  # 商品控制器
│   ├── middleware/
│   │   ├── auth.js               # 认证中间件
│   │   └── upload.js             # 文件上传中间件
│   ├── models/
│   │   ├── User.js               # 用户模型
│   │   ├── Product.js            # 商品模型
│   │   └── Order.js              # 订单模型
│   ├── routes/
│   │   ├── auth.js               # 认证路由
│   │   └── products.js           # 商品路由
│   ├── uploads/                  # 上传文件目录
│   ├── server.js                 # 服务器入口
│   ├── test-server.js            # 测试服务器
│   └── package.json              # 后端依赖
├── public/                       # 静态资源
├── package.json                  # 前端依赖
└── README.md
```

## 🛠️ 安装和运行

### 前置要求

- **Node.js** >= 14.0.0
- **MongoDB** (本地安装或云服务)
- **npm** 或 **yarn**

### 1. 克隆项目

```bash
git clone [repository-url]
cd lixing-fitness
```

### 2. 安装依赖

#### 安装前端依赖

```bash
npm install
```

#### 安装后端依赖

```bash
cd backend
npm install
cd ..
```

### 3. 环境配置

在 `backend/` 目录下创建 `.env` 文件：

```env
# 服务器配置
PORT=5000
NODE_ENV=development

# 数据库配置
MONGODB_URI=mongodb://localhost:27017/lixing-fitness

# JWT配置
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRE=30d
JWT_COOKIE_EXPIRE=30

# 前端地址
CLIENT_URL=http://localhost:3000

# 管理员账户（可选）
ADMIN_EMAIL=admin@lixing-fitness.com
ADMIN_PASSWORD=admin123

# 文件上传限制
MAX_FILE_SIZE=5000000
```

### 4. 启动数据库

确保 MongoDB 服务正在运行：

```bash
# Windows (如果使用本地MongoDB)
net start MongoDB

# macOS/Linux
sudo systemctl start mongod
# 或
brew services start mongodb-community
```

### 5. 启动应用

#### 方法一：分别启动前后端

**启动后端服务器：**

```bash
cd backend
npm run dev
# 或使用测试服务器
node test-server.js
```

**启动前端应用：**

```bash
# 在项目根目录
npm start
```

#### 方法二：同时启动（推荐）

在项目根目录创建启动脚本：

**Windows (start.bat):**

```batch
@echo off
echo 启动 Lixing Fitness 全栈应用...
echo.

echo 启动后端服务器...
start cmd /k "cd backend && npm run dev"

echo 等待后端启动...
timeout /t 3 /nobreak > nul

echo 启动前端应用...
start cmd /k "npm start"

echo.
echo 应用启动完成！
echo 前端: http://localhost:3000
echo 后端: http://localhost:5000
pause
```

**macOS/Linux (start.sh):**

```bash
#!/bin/bash
echo "启动 Lixing Fitness 全栈应用..."
echo

echo "启动后端服务器..."
cd backend && npm run dev &
BACKEND_PID=$!

echo "等待后端启动..."
sleep 3

echo "启动前端应用..."
cd .. && npm start &
FRONTEND_PID=$!

echo
echo "应用启动完成！"
echo "前端: http://localhost:3000"
echo "后端: http://localhost:5000"
echo
echo "按 Ctrl+C 停止所有服务"

# 等待用户中断
wait
```

### 6. 访问应用

- **前端应用**: http://localhost:3000 (或系统分配的其他端口)
- **后端 API**: http://localhost:5000
- **API 健康检查**: http://localhost:5000/api/health

## 🔧 开发说明

### 创建管理员账户

首次运行时，可以创建管理员账户：

```bash
curl -X POST http://localhost:5000/api/auth/create-admin \
  -H "Content-Type: application/json"
```

### API 端点

#### 认证接口

- `POST /api/auth/register` - 用户注册
- `POST /api/auth/login` - 用户登录
- `GET /api/auth/me` - 获取当前用户信息
- `PUT /api/auth/updatedetails` - 更新用户信息
- `PUT /api/auth/updatepassword` - 更新密码
- `POST /api/auth/logout` - 用户登出

#### 商品接口

- `GET /api/products` - 获取商品列表
- `GET /api/products/:id` - 获取单个商品
- `POST /api/products` - 创建商品 (管理员)
- `PUT /api/products/:id` - 更新商品 (管理员)
- `DELETE /api/products/:id` - 删除商品 (管理员)
- `GET /api/products/stats` - 获取统计信息 (管理员)

### 端口说明

- **前端默认端口**: 3000
- **后端默认端口**: 5000
- 如果端口被占用，系统会自动提示选择其他可用端口

## 📦 部署

### 前端部署

```bash
npm run build
```

构建文件将生成在 `build/` 目录中。

### 后端部署

```bash
cd backend
npm start
```

确保生产环境中设置正确的环境变量。

## 🐛 故障排除

### 常见问题

1. **端口冲突**

   - 前端：系统会自动提示选择其他端口
   - 后端：修改 `.env` 文件中的 `PORT` 值

2. **MongoDB 连接失败**

   - 确保 MongoDB 服务正在运行
   - 检查 `MONGODB_URI` 配置

3. **模块导入错误**

   - 确保所有依赖都已安装
   - 检查导入路径是否正确

4. **文件上传失败**
   - 确保 `backend/uploads/` 目录存在
   - 检查文件大小限制

## 📄 许可证

此项目仅用于学习和演示目的。

---

© 2025 Lixing Fitness. 全栈健身训练平台。
