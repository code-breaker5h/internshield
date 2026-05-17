@echo off
title Opening Internship Detector Website
color 0B

echo.
echo ════════════════════════════════════════════════════════════
echo           OPENING INTERNSHIP DETECTOR WEBSITE
echo ════════════════════════════════════════════════════════════
echo.

REM Check if backend is running
echo Checking if servers are running...
netstat -ano | findstr ":3001" >nul 2>&1
if errorlevel 1 (
    echo.
    echo ❌ Backend server is NOT running on port 3001
    echo.
    echo Please start the servers first:
    echo   1. Double-click QUICK_START.bat
    echo   OR
    echo   2. Run START_BACKEND.bat and START_FRONTEND.bat
    echo.
    pause
    exit /b 1
)

netstat -ano | findstr ":3000" >nul 2>&1
if errorlevel 1 (
    echo.
    echo ❌ Frontend server is NOT running on port 3000
    echo.
    echo Please start the servers first:
    echo   1. Double-click QUICK_START.bat
    echo   OR
    echo   2. Run START_BACKEND.bat and START_FRONTEND.bat
    echo.
    pause
    exit /b 1
)

echo ✓ Backend running on port 3001
echo ✓ Frontend running on port 3000
echo.
echo Opening website in your default browser...
echo.

REM Open website in default browser
start http://localhost:3000

echo ✓ Website opened!
echo.
echo If the page doesn't load:
echo   - Wait 10-15 seconds for servers to fully start
echo   - Refresh the page (F5)
echo   - Check terminal windows for errors
echo.
timeout /t 3 >nul
