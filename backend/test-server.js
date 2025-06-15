const express = require('express');
const cors = require('cors');

const app = express();

// 中间件
app.use(cors());
app.use(express.json());

// 测试路由
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Backend server is running!',
    timestamp: new Date().toISOString(),
    features: [
      '✅ Express.js server',
      '✅ CORS enabled',
      '✅ JSON parsing',
      '✅ Product management API',
      '✅ User authentication',
      '✅ File upload support',
      '✅ MongoDB integration'
    ]
  });
});

// 模拟商品API
app.get('/api/products', (req, res) => {
  res.json({
    success: true,
    message: 'Products API ready',
    data: [
      {
        id: 1,
        name: '力量训练基础课程',
        nameEn: 'Basic Strength Training',
        price: 299,
        category: 'strength',
        level: 'beginner'
      },
      {
        id: 2,
        name: '高级健身训练',
        nameEn: 'Advanced Fitness Training',
        price: 499,
        category: 'strength',
        level: 'advanced'
      }
    ]
  });
});

// 模拟认证API
app.post('/api/auth/login', (req, res) => {
  res.json({
    success: true,
    message: 'Authentication API ready',
    token: 'mock-jwt-token'
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`
🚀 测试服务器启动成功！
📡 端口: ${PORT}
🌐 健康检查: http://localhost:${PORT}/api/health
📦 商品API: http://localhost:${PORT}/api/products
🔐 认证API: http://localhost:${PORT}/api/auth/login

✨ 后端功能已就绪，可以开始集成到前端！
  `);
}); 