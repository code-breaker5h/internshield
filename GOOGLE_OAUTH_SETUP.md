# Google OAuth Setup - Step by Step

## Why You Need This

The login system uses Google OAuth for authentication. You need to create credentials in Google Cloud Console.

## Step-by-Step Instructions

### 1. Go to Google Cloud Console
Visit: https://console.cloud.google.com/

### 2. Create or Select Project
- Click "Select a project" at the top
- Click "NEW PROJECT"
- Name it: "Internship Detector" (or any name)
- Click "CREATE"

### 3. Enable Google+ API (or Google Identity)
- In the left menu, go to "APIs & Services" → "Library"
- Search for "Google+ API" or "Google Identity Services"
- Click on it and click "ENABLE"

### 4. Configure OAuth Consent Screen
- Go to "APIs & Services" → "OAuth consent screen"
- Select "External" (unless you have Google Workspace)
- Click "CREATE"
- Fill in:
  - App name: "Internship Detector"
  - User support email: your email
  - Developer contact: your email
- Click "SAVE AND CONTINUE"
- Skip scopes (click "SAVE AND CONTINUE")
- Add test users if needed (your email)
- Click "SAVE AND CONTINUE"

### 5. Create OAuth 2.0 Credentials
- Go to "APIs & Services" → "Credentials"
- Click "CREATE CREDENTIALS" → "OAuth client ID"
- Application type: "Web application"
- Name: "Internship Detector Web Client"
- Authorized JavaScript origins:
  - Add: `http://localhost:3000`
  - Add: `http://localhost:3001`
- Authorized redirect URIs:
  - Add: `http://localhost:3001/auth/google/callback`
- Click "CREATE"

### 6. Copy Your Credentials
You'll see a popup with:
- Client ID (looks like: xxxxx.apps.googleusercontent.com)
- Client Secret (random string)

**IMPORTANT**: Copy both values!

### 7. Update .env File

Open: `Backend/fake-internship-detector-backend/.env`

Replace these lines:
```env
GOOGLE_CLIENT_ID=your_google_client_id_here.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your_google_client_secret_here
```

With your actual values:
```env
GOOGLE_CLIENT_ID=123456789-abcdefg.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-your_actual_secret_here
```

### 8. Save and Test

1. Save the .env file
2. Start backend: `cd Backend/fake-internship-detector-backend && npm start`
3. Visit: http://localhost:3001/auth/google
4. You should see Google login page!

## Troubleshooting

### "Error 400: redirect_uri_mismatch"
- Check that redirect URI in Google Console exactly matches: `http://localhost:3001/auth/google/callback`
- No trailing slash!
- Must be http (not https) for localhost

### "Error 401: invalid_client"
- Double-check Client ID and Secret are copied correctly
- No extra spaces or line breaks
- Make sure you saved the .env file

### "This app isn't verified"
- This is normal for development
- Click "Advanced" → "Go to [App Name] (unsafe)"
- This only appears in development mode

### Still not working?
- Restart the backend server after changing .env
- Clear browser cookies
- Try incognito/private browsing mode
- Check backend console for error messages

## Production Deployment

When deploying to production:

1. Add production URLs to Google Console:
   - Authorized origins: `https://yourdomain.com`
   - Redirect URI: `https://api.yourdomain.com/auth/google/callback`

2. Update .env for production:
   ```env
   GOOGLE_CALLBACK_URL=https://api.yourdomain.com/auth/google/callback
   FRONTEND_URL=https://yourdomain.com
   NODE_ENV=production
   ```

3. Publish OAuth consent screen (move from Testing to Production)

## Security Notes

- Never commit .env file to git (it's in .gitignore)
- Keep Client Secret private
- Use different credentials for development and production
- Regularly rotate secrets in production
