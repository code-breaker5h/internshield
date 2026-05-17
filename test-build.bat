@echo off
echo ========================================
echo Testing Build Before Vercel Deployment
echo ========================================
echo.

cd Frontend

echo [1/4] Installing dependencies...
call npm install
if %errorlevel% neq 0 (
    echo ERROR: npm install failed!
    pause
    exit /b 1
)
echo.

echo [2/4] Running production build...
call npm run build
if %errorlevel% neq 0 (
    echo ERROR: Build failed! Fix errors before deploying.
    pause
    exit /b 1
)
echo.

echo [3/4] Testing production server...
echo Starting server on http://localhost:3000
echo Press Ctrl+C to stop when done testing
echo.
call npm start

echo.
echo ========================================
echo Build test complete!
echo If everything worked, you're ready to deploy to Vercel!
echo ========================================
pause
