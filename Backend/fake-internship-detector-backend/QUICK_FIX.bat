@echo off
echo ========================================
echo BACKEND LOGIN SYSTEM - QUICK FIX
echo ========================================
echo.

cd /d "%~dp0"

echo [1/3] Installing dependencies...
call npm install
if errorlevel 1 (
    echo ERROR: Failed to install dependencies
    pause
    exit /b 1
)
echo.

echo [2/3] Checking .env file...
if exist ".env" (
    echo ✓ .env file exists
) else (
    echo ERROR: .env file not found!
    pause
    exit /b 1
)
echo.

echo [3/3] Setup complete!
echo.
echo ========================================
echo IMPORTANT: Configure Google OAuth
echo ========================================
echo.
echo 1. Go to: https://console.cloud.google.com/
echo 2. Create OAuth 2.0 credentials
echo 3. Add redirect URI: http://localhost:3001/auth/google/callback
echo 4. Copy Client ID and Secret to .env file
echo.
echo Then run: npm start
echo.
pause
