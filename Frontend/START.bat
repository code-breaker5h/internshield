@echo off
cd /d "%~dp0"
echo ============================================
echo    InternShield - Starting App
echo ============================================
echo.
echo Starting backend server on port 3001...
start "InternShield-Backend" cmd /c "cd /d \"c:\Users\Naman\OneDrive\Documents\backendINTERNS\fake-internship-detector-backend\" && node server.js"
timeout /t 2 >nul
echo Backend started!
echo.
echo Starting frontend on port 3000...
echo ============================================
echo    Open http://localhost:3000 in your browser
echo ============================================
echo.
call npm run dev
