#!/bin/bash

echo "========================================"
echo "   Lixing Fitness 全栈应用启动器"
echo "========================================"
echo

echo "[1/3] 检查依赖..."
if [ ! -d "node_modules" ]; then
    echo "前端依赖未安装，正在安装..."
    npm install
fi

if [ ! -d "backend/node_modules" ]; then
    echo "后端依赖未安装，正在安装..."
    cd backend
    npm install
    cd ..
fi

echo "[2/3] 启动后端服务器..."
cd backend && npm run dev &
BACKEND_PID=$!
cd ..

echo "等待后端启动..."
sleep 5

echo "[3/3] 启动前端应用..."
npm start &
FRONTEND_PID=$!

echo
echo "========================================"
echo "          应用启动完成！"
echo "========================================"
echo "前端应用: http://localhost:3000"
echo "后端API:  http://localhost:5000"
echo "健康检查: http://localhost:5000/api/health"
echo
echo "提示："
echo "- 如果端口被占用，系统会自动提示选择其他端口"
echo "- 按 Ctrl+C 停止所有服务"
echo "- 首次启动可能需要较长时间"
echo "========================================"

# 捕获中断信号，优雅关闭
cleanup() {
    echo
    echo "正在关闭服务..."
    kill $BACKEND_PID 2>/dev/null
    kill $FRONTEND_PID 2>/dev/null
    echo "所有服务已关闭"
    exit 0
}

trap cleanup SIGINT SIGTERM

# 等待用户中断
wait 