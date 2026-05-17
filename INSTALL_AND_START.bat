@echo off
color 0A
echo ╔════════════════════════════════════════════════════════════╗
echo ║     INSTALLING DEPENDENCIES AND STARTING SERVERS           ║
echo ╚════════════════════════════════════════════════════════════╝
echo.

cd /d "%~dp0"

echo [1/4] Installing Backend Dependencies...
echo ────────────────────────────────────────────────────────────
cd Backend\fake-internship-detector-backend
call npm install
if errorlevel 1 (
    echo.
    echo ❌ ERROR: Failed to install backend dependencies
    echo.
    pause
    exit /b 1
)
echo ✓ Backend dependencies installed
echo.

cd ..\..

echo [2/4] Installing Frontend Dependencies...
echo ────────────────────────────────────────────────────────────
cd Frontend
call npm install
if errorlevel 1 (
    echo.
    echo ❌ ERROR: Failed to install frontend dependencies
    echo.
    pause
    exit /b 1
)
echo ✓ Frontend dependencies installed
echo.

cd ..

echo [3/4] Checking Configuration...
echo ────────────────────────────────────────────────────────────
if not exist "Backend\fake-internship-detector-backend\.env" (
    echo ❌ ERROR: .env file not found!
    echo Please run FIX_LOGIN_NOW.bat first
    pause
    exit /b 1
)
echo ✓ Configuration files exist
echo.

echo [4/4] Ready to Start!
echo ────────────────────────────────────────────────────────────
echo.
echo ⚠️  IMPORTANT: Before starting servers, you need to:
echo.
echo 1. Get Google OAuth credentials from:
echo    https://console.cloud.google.com/
echo.
echo 2. Edit Backend\fake-internship-detector-backend\.env
echo    and add your GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET
echo.
echo 3. See GOOGLE_OAUTH_SETUP.md for detailed instructions
echo.
echo ════════════════════════════════════════════════════════════
echo.
echo After adding Google credentials, run:
echo.
echo   START_BACKEND.bat    (in one terminal)
echo   START_FRONTEND.bat   (in another terminal)
echo.
echo ════════════════════════════════════════════════════════════
echo.
pause
