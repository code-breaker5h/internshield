@echo off
echo ========================================
echo Starting InternShield Backend Server
echo ========================================
echo.

cd Backend\fake-internship-detector-backend

echo Installing dependencies...
call npm install

echo.
echo Starting server on http://localhost:3001
echo Press Ctrl+C to stop
echo.

call npm start
