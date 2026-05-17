# Complete Setup Guide - Fix Login System

## Quick Start (3 Steps)

### 1️⃣ Install Backend Dependencies
```bash
cd Backend/fake-internship-detector-backend
npm install
```

### 2️⃣ Configure Google OAuth

Get credentials from [Google Cloud Console](https://console.cloud.google.com/):
- Create OAuth 2.0 Client ID
- Add redirect URI: `http://localhost:3001/auth/google/callback`
- Copy Client ID and Secret

Edit `Backend/fake-internship-detector-backend/.env`:
```env
GOOGLE_CLIENT_ID=your_client_id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your_client_secret
```

### 3️⃣ Start Both Servers

Backend:
```bash
cd Backend/fake-internship-detector-backend
npm start
```

Frontend (in new terminal):
```bash
cd Frontend
npm install
npm run dev
```

## What Was Fixed

✅ Created backend .env with secure secrets
✅ Created frontend .env.local with backend URL
✅ Verified all auth routes are properly configured
✅ Confirmed database setup is correct

## Test Login

1. Open http://localhost:3000 (frontend)
2. Click login/sign in
3. Should redirect to Google OAuth
4. After login, redirected back with authentication

## Files Created

- `Backend/fake-internship-detector-backend/.env` - Backend config
- `Frontend/.env.local` - Frontend config  
- `Backend/fake-internship-detector-backend/SETUP_INSTRUCTIONS.md` - Detailed guide
- `Backend/fake-internship-detector-backend/QUICK_FIX.bat` - Auto setup script
- `LOGIN_FIX_SUMMARY.md` - Technical details
- `COMPLETE_SETUP_GUIDE.md` - This file

## Need Help?

See `LOGIN_FIX_SUMMARY.md` for technical details or `Backend/fake-internship-detector-backend/SETUP_INSTRUCTIONS.md` for step-by-step instructions.
