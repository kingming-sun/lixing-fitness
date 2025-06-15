# 🚀 Lixing Fitness 快速启动指南

## 一键启动（推荐）

### Windows 用户

双击运行 `start.bat` 文件，脚本会自动：

- 检查并安装依赖
- 启动后端服务器
- 启动前端应用

### macOS/Linux 用户

在终端中运行：

```bash
./start.sh
```

## 手动启动

### 1. 安装依赖

```bash
# 安装前端依赖
npm install

# 安装后端依赖
cd backend
npm install
cd ..
```

### 2. 配置环境变量

在 `backend/` 目录下创建 `.env` 文件：

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/lixing-fitness
JWT_SECRET=your-super-secret-jwt-key
CLIENT_URL=http://localhost:3000
```

### 3. 启动 MongoDB

确保 MongoDB 服务正在运行

### 4. 启动应用

**方法一：分别启动**

```bash
# 终端1 - 启动后端
cd backend
npm run dev

# 终端2 - 启动前端
npm start
```

**方法二：后台启动**

```bash
# 启动后端（后台）
cd backend && npm run dev &

# 启动前端
npm start
```

## 访问地址

- **前端应用**: http://localhost:3000
- **后端 API**: http://localhost:5000
- **健康检查**: http://localhost:5000/api/health

## 常见问题

### 端口被占用

- 前端：系统会自动提示选择其他端口
- 后端：修改 `.env` 文件中的 `PORT` 值

### MongoDB 连接失败

- 确保 MongoDB 服务正在运行
- 检查连接字符串是否正确

### 依赖安装失败

```bash
# 清除缓存重新安装
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

## 首次使用

1. 创建管理员账户：

```bash
curl -X POST http://localhost:5000/api/auth/create-admin
```

2. 访问前端应用开始使用

## 停止服务

- **Windows**: 关闭对应的命令行窗口
- **macOS/Linux**: 按 `Ctrl+C` 停止服务
