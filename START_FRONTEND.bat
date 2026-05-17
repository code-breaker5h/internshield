@echo off
echo ========================================
echo Starting InternShield Frontend
echo ========================================
echo.

cd Frontend

echo Installing dependencies...
call npm install

echo.
echo Starting Next.js dev server on http://localhost:3000
echo Press Ctrl+C to stop
echo.

call npm run dev
