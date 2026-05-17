@echo off
color 0E
cls
echo.
echo ╔════════════════════════════════════════════════════════════╗
echo ║          INTERNSHIP DETECTOR - QUICK START                 ║
echo ╚════════════════════════════════════════════════════════════╝
echo.
echo This will install dependencies and start both servers.
echo.
echo ⏱️  Estimated time: 2-3 minutes
echo.
pause

cd /d "%~dp0"

REM Install backend dependencies
echo.
echo [1/2] Installing Backend Dependencies...
cd Backend\fake-internship-detector-backend
if not exist "node_modules" (
    call npm install
    if errorlevel 1 (
        echo ❌ Failed to install backend dependencies
        pause
        exit /b 1
    )
) else (
    echo ✓ Backend dependencies already installed
)

REM Install frontend dependencies
cd ..\..
echo.
echo [2/2] Installing Frontend Dependencies...
cd Frontend
if not exist "node_modules" (
    call npm install
    if errorlevel 1 (
        echo ❌ Failed to install frontend dependencies
        pause
        exit /b 1
    )
) else (
    echo ✓ Frontend dependencies already installed
)

cd ..

echo.
echo ════════════════════════════════════════════════════════════
echo ✓ Installation Complete!
echo ════════════════════════════════════════════════════════════
echo.
echo NOW STARTING SERVERS...
echo.
echo Backend will start on: http://localhost:3001
echo Frontend will start on: http://localhost:3000
echo.
echo ⚠️  Keep this window open! Closing it will stop the servers.
echo.
echo To stop servers: Press Ctrl+C
echo.
pause

REM Start backend in background
echo Starting Backend Server...
start "Backend Server" cmd /k "cd /d %~dp0Backend\fake-internship-detector-backend && npm start"

REM Wait a bit for backend to start
timeout /t 5 /nobreak >nul

REM Start frontend
echo Starting Frontend Server...
start "Frontend Server" cmd /k "cd /d %~dp0Frontend && npm run dev"

echo.
echo ════════════════════════════════════════════════════════════
echo ✓ Servers Starting!
echo ════════════════════════════════════════════════════════════
echo.
echo Two new windows opened:
echo   1. Backend Server (port 3001)
echo   2. Frontend Server (port 3000)
echo.
echo Wait 10-15 seconds, then open: http://localhost:3000
echo.
echo ⚠️  If login doesn't work, you need Google OAuth credentials.
echo    See: GOOGLE_OAUTH_SETUP.md
echo.
pause
