@echo off
echo ========================================
echo      Lixing Fitness 状态检查
echo ========================================
echo.

echo 检查前端应用 (端口 3000)...
netstat -an | findstr :3000 > nul
if %errorlevel% == 0 (
    echo ✅ 前端应用正在运行: http://localhost:3000
) else (
    echo ❌ 前端应用未运行
)

echo.
echo 检查后端API (端口 5000)...
netstat -an | findstr :5000 > nul
if %errorlevel% == 0 (
    echo ✅ 后端API正在运行: http://localhost:5000
    echo.
    echo 测试API健康检查...
    curl -s http://localhost:5000/api/health > nul
    if %errorlevel% == 0 (
        echo ✅ API健康检查通过
    ) else (
        echo ❌ API健康检查失败
    )
) else (
    echo ❌ 后端API未运行
)

echo.
echo ========================================
echo           状态检查完成
echo ========================================
pause 