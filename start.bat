@echo off
echo ========================================
echo    Lixing Fitness 全栈应用启动器
echo ========================================
echo.

echo [1/3] 检查依赖...
if not exist "node_modules" (
    echo 前端依赖未安装，正在安装...
    call npm install
)

if not exist "backend\node_modules" (
    echo 后端依赖未安装，正在安装...
    cd backend
    call npm install
    cd ..
)

echo [2/3] 启动后端服务器...
start "Lixing Fitness Backend" cmd /k "cd backend && npm run dev"

echo 等待后端启动...
timeout /t 5 /nobreak > nul

echo [3/3] 启动前端应用...
start "Lixing Fitness Frontend" cmd /k "npm start"

echo.
echo ========================================
echo           应用启动完成！
echo ========================================
echo 前端应用: http://localhost:3000
echo 后端API:  http://localhost:5000
echo 健康检查: http://localhost:5000/api/health
echo.
echo 提示：
echo - 如果端口被占用，系统会自动提示选择其他端口
echo - 关闭窗口即可停止对应服务
echo - 首次启动可能需要较长时间
echo ========================================
pause 