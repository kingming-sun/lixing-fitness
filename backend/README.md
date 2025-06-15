# Lixing Fitness Backend API

健身训练平台的后端 API 服务，提供商品管理、用户认证、文件上传等功能。

## 🚀 功能特性

- **用户认证系统**：注册、登录、JWT 认证
- **商品管理**：CRUD 操作、图片上传、分类筛选
- **文件上传**：支持图片上传和管理
- **权限控制**：基于角色的访问控制
- **数据验证**：完整的输入验证和错误处理
- **安全防护**：请求限制、CORS、Helmet 安全头

## 📋 技术栈

- **Node.js** - 运行环境
- **Express.js** - Web 框架
- **MongoDB** - 数据库
- **Mongoose** - ODM
- **JWT** - 身份认证
- **Multer** - 文件上传
- **bcryptjs** - 密码加密

## 🛠️ 安装和运行

### 前置要求

- Node.js >= 14.0.0
- MongoDB
- npm 或 yarn

### 安装步骤

1. 安装依赖

```bash
npm install
```

2. 配置环境变量
   复制 `.env.example` 到 `.env` 并配置：

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/lixing-fitness
JWT_SECRET=your-super-secret-jwt-key
CLIENT_URL=http://localhost:3000
```

3. 启动 MongoDB 服务

4. 运行项目

```bash
# 开发模式
npm run dev

# 生产模式
npm start
```

## 📚 API 文档

### 认证接口

| 方法 | 路径                       | 描述             | 权限 |
| ---- | -------------------------- | ---------------- | ---- |
| POST | `/api/auth/register`       | 用户注册         | 公开 |
| POST | `/api/auth/login`          | 用户登录         | 公开 |
| GET  | `/api/auth/me`             | 获取当前用户信息 | 私有 |
| PUT  | `/api/auth/updatedetails`  | 更新用户信息     | 私有 |
| PUT  | `/api/auth/updatepassword` | 更新密码         | 私有 |
| POST | `/api/auth/logout`         | 用户登出         | 私有 |
| POST | `/api/auth/create-admin`   | 创建管理员       | 公开 |

### 商品接口

| 方法   | 路径                  | 描述         | 权限   |
| ------ | --------------------- | ------------ | ------ |
| GET    | `/api/products`       | 获取商品列表 | 公开   |
| GET    | `/api/products/:id`   | 获取单个商品 | 公开   |
| POST   | `/api/products`       | 创建商品     | 管理员 |
| PUT    | `/api/products/:id`   | 更新商品     | 管理员 |
| DELETE | `/api/products/:id`   | 删除商品     | 管理员 |
| GET    | `/api/products/stats` | 获取统计信息 | 管理员 |

### 查询参数

商品列表支持以下查询参数：

- `page` - 页码
- `limit` - 每页数量
- `category` - 分类筛选
- `level` - 难度筛选
- `minPrice` / `maxPrice` - 价格范围
- `search` - 搜索关键词
- `sort` - 排序字段
- `order` - 排序方向 (asc/desc)

## 📁 项目结构

```
backend/
├── config/
│   └── database.js          # 数据库配置
├── controllers/
│   ├── authController.js    # 认证控制器
│   └── productController.js # 商品控制器
├── middleware/
│   ├── auth.js              # 认证中间件
│   └── upload.js            # 文件上传中间件
├── models/
│   ├── User.js              # 用户模型
│   ├── Product.js           # 商品模型
│   └── Order.js             # 订单模型
├── routes/
│   ├── auth.js              # 认证路由
│   └── products.js          # 商品路由
├── uploads/                 # 上传文件目录
├── .env                     # 环境变量
├── server.js                # 服务器入口
└── package.json
```

## 🔐 认证说明

API 使用 JWT 进行身份认证。需要认证的接口需要在请求头中包含：

```
Authorization: Bearer <your-jwt-token>
```

## 📝 数据模型

### 用户模型

```javascript
{
  name: String,
  email: String,
  password: String,
  role: String, // 'user' | 'admin'
  avatar: String,
  phone: String,
  isActive: Boolean
}
```

### 商品模型

```javascript
{
  name: String,
  nameEn: String,
  description: String,
  descriptionEn: String,
  price: Number,
  originalPrice: Number,
  category: String,
  level: String,
  duration: String,
  frequency: String,
  image: String,
  images: [String],
  features: [String],
  featuresEn: [String],
  rating: Number,
  reviewCount: Number,
  isActive: Boolean,
  isFeatured: Boolean
}
```

## 🚦 健康检查

访问 `/api/health` 检查服务器状态。

## �� 许可证

ISC License
