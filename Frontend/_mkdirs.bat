@echo off
cd /d "%~dp0"
echo Creating directories...
mkdir lib 2>nul
mkdir pages\api 2>nul
echo Running setup script...
node _mkdirs.js
echo.
echo Done! Now restart with: npm run dev
pause
