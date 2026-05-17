@echo off
color 0A
echo.
echo ╔════════════════════════════════════════════════════════════╗
echo ║     INTERNSHIP DETECTOR - LOGIN SYSTEM FIX                 ║
echo ╚════════════════════════════════════════════════════════════╝
echo.
echo [✓] Backend .env file created with secure secrets
echo [✓] Frontend .env.local file created
echo [✓] All configuration files ready
echo.
echo ════════════════════════════════════════════════════════════
echo NEXT STEPS TO FIX LOGIN:
echo ════════════════════════════════════════════════════════════
echo.
echo 1. Install backend dependencies:
echo    cd Backend\fake-internship-detector-backend
echo    npm install
echo.
echo 2. Get Google OAuth credentials:
echo    - Visit: https://console.cloud.google.com/
echo    - Create OAuth 2.0 Client ID
echo    - Redirect URI: http://localhost:3001/auth/google/callback
echo.
echo 3. Edit Backend\fake-internship-detector-backend\.env
echo    Replace these lines with your actual credentials:
echo    GOOGLE_CLIENT_ID=your_client_id.apps.googleusercontent.com
echo    GOOGLE_CLIENT_SECRET=your_client_secret
echo.
echo 4. Start backend:
echo    cd Backend\fake-internship-detector-backend
echo    npm start
echo.
echo 5. Start frontend (new terminal):
echo    cd Frontend
echo    npm run dev
echo.
echo 6. Test login at: http://localhost:3000
echo.
echo ════════════════════════════════════════════════════════════
echo.
echo Press any key to open setup instructions...
pause >nul
start COMPLETE_SETUP_GUIDE.md
