# Backend Setup Instructions - Login System Fix

## Issues Found and Fixed

1. **Missing .env file** - Created from .env.example with secure secrets
2. **Missing Google OAuth credentials** - Need to be configured
3. **Dependencies may not be installed** - Need to run npm install

## Step-by-Step Setup

### 1. Install Dependencies
```bash
cd Backend/fake-internship-detector-backend
npm install
```

### 2. Configure Google OAuth

You need to set up Google OAuth credentials:

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable "Google+ API" or "Google Identity Services"
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client ID"
5. Configure OAuth consent screen if prompted
6. For Application type, select "Web application"
7. Add authorized redirect URI: `http://localhost:3001/auth/google/callback`
8. Copy the Client ID and Client Secret

### 3. Update .env File

Open `Backend/fake-internship-detector-backend/.env` and update these values:

```env
# Replace with your actual Google OAuth credentials
GOOGLE_CLIENT_ID=your_actual_client_id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your_actual_client_secret

# Optional: Add Grok API key if you want AI analysis features
GROK_API_KEY=your_grok_api_key_here
```

### 4. Initialize Database

The SQLite database will be created automatically when you start the server.
Optionally, you can seed scam patterns:

```bash
node scripts/seedPatterns.js
```

### 5. Start the Server

```bash
npm start
# or for development with auto-reload:
npm run dev
```

The server should start on http://localhost:3001

### 6. Test the Login

1. Make sure the backend is running
2. Navigate to: http://localhost:3001/auth/google
3. You should be redirected to Google login page
4. After login, you'll be redirected back with a JWT token

## Troubleshooting

### "Not Found" Error on /auth/google

- ✅ **FIXED**: .env file was missing
- ✅ **FIXED**: Secure secrets generated
- ⚠️ **TODO**: Add your Google OAuth credentials

### Server won't start

- Check if port 3001 is already in use
- Verify all dependencies are installed: `npm install`
- Check for syntax errors in console

### Google OAuth errors

- Verify GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET are correct
- Ensure redirect URI matches exactly: `http://localhost:3001/auth/google/callback`
- Check that OAuth consent screen is configured

### Database errors

- The SQLite database file will be created automatically
- If issues persist, delete `database.sqlite` and restart server

## Current Configuration

- ✅ JWT_SECRET: Generated securely
- ✅ SESSION_SECRET: Generated securely
- ✅ PORT: 3001
- ✅ FRONTEND_URL: http://localhost:3000
- ⚠️ GOOGLE_CLIENT_ID: Needs your credentials
- ⚠️ GOOGLE_CLIENT_SECRET: Needs your credentials
- ⚠️ GROK_API_KEY: Optional, for AI features

## Next Steps

1. Install dependencies if not already done
2. Get Google OAuth credentials from Google Cloud Console
3. Update .env with your credentials
4. Start the server
5. Test login at http://localhost:3001/auth/google
