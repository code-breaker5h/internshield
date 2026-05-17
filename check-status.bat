@echo off
echo ========================================
echo InternShield - Status Check
echo ========================================
echo.

echo Checking Backend (Port 3001)...
curl -s http://localhost:3001 2>nul
if %errorlevel% equ 0 (
    echo [OK] Backend is running!
) else (
    echo [ERROR] Backend is NOT running!
    echo Please start it with: cd Backend/fake-internship-detector-backend ^&^& npm start
)

echo.
echo Checking Frontend (Port 3002)...
curl -s http://localhost:3002 -I 2>nul | findstr "200" >nul
if %errorlevel% equ 0 (
    echo [OK] Frontend is running!
) else (
    echo [ERROR] Frontend is NOT running!
    echo Please start it with: cd Frontend ^&^& npm run dev
)

echo.
echo ========================================
echo Access your app at: http://localhost:3002
echo ========================================
pause
