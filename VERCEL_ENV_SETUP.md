# Vercel Environment Variables Setup

## Required Environment Variables

Add these in **Vercel Dashboard → Your Project → Settings → Environment Variables**

### 1. Google OAuth Credentials

```
GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-client-secret
GOOGLE_REDIRECT_URI=https://your-vercel-url.vercel.app/api/auth/google/callback
```

**How to get these:**
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a project or select existing
3. Enable Google+ API
4. Go to Credentials → Create OAuth 2.0 Client ID
5. Add authorized redirect URI: `https://your-vercel-url.vercel.app/api/auth/google/callback`
6. Copy Client ID and Client Secret

### 2. JWT Secret

```
JWT_SECRET=your-random-secret-key-at-least-32-characters-long
```

**Generate a random secret:**
```bash
# On Linux/Mac
openssl rand -base64 32

# Or use any random string generator
```

### 3. Grok API Key

```
GROK_API_KEY=your-grok-api-key
```

Get from: https://console.x.ai/

### 4. Base URL

```
NEXT_PUBLIC_BASE_URL=https://your-vercel-url.vercel.app
```

Replace with your actual Vercel deployment URL.

### 5. Backend URL (Leave Empty)

```
NEXT_PUBLIC_BACKEND_URL=
```

Leave this empty to use serverless functions on the same domain.

## Step-by-Step Setup in Vercel

1. **Go to your Vercel project**
   - Visit https://vercel.com/dashboard
   - Select your "internshield" project

2. **Open Settings**
   - Click "Settings" tab
   - Click "Environment Variables" in sidebar

3. **Add each variable**
   - Click "Add New"
   - Enter Name (e.g., `GOOGLE_CLIENT_ID`)
   - Enter Value
   - Select environments: Production, Preview, Development
   - Click "Save"

4. **Redeploy**
   - Go to "Deployments" tab
   - Click "..." on latest deployment
   - Click "Redeploy"

## Google OAuth Setup for Production

### Update Google Cloud Console

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project
3. Go to "APIs & Services" → "Credentials"
4. Click on your OAuth 2.0 Client ID
5. Add to **Authorized redirect URIs**:
   ```
   https://your-vercel-url.vercel.app/api/auth/google/callback
   ```
6. Click "Save"

### Important Notes

- Replace `your-vercel-url.vercel.app` with your actual Vercel URL
- If using custom domain, use that instead
- Make sure there's no trailing slash in the redirect URI
- Must use HTTPS (not HTTP) for production

## Testing

After setting up:

1. Visit your Vercel URL
2. Click "Login"
3. Click "Sign in with Google"
4. Should redirect to Google login
5. After login, should redirect back to your app

## Troubleshooting

### "redirect_uri_mismatch" error
- Check that redirect URI in Google Console exactly matches Vercel URL
- No trailing slash
- Must be HTTPS

### "OAuth not configured" error
- Check that all environment variables are set in Vercel
- Redeploy after adding variables

### "Invalid token" error
- Check JWT_SECRET is set
- Make sure it's at least 32 characters

### Login works but shows "not found"
- This was the original issue - now fixed!
- Auth endpoints are now serverless functions
- No separate backend needed

## Local Development

For local development, create `Frontend/.env.local`:

```env
NEXT_PUBLIC_BACKEND_URL=
GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-client-secret
GOOGLE_REDIRECT_URI=http://localhost:3000/api/auth/google/callback
JWT_SECRET=your-local-secret-key
GROK_API_KEY=your-grok-api-key
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

Add to Google Console authorized redirect URIs:
```
http://localhost:3000/api/auth/google/callback
```

## Security Notes

- Never commit .env files to git
- Use different credentials for development and production
- Rotate JWT_SECRET regularly in production
- Keep GOOGLE_CLIENT_SECRET private
