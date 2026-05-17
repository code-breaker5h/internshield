// Google OAuth Callback Handler (Serverless)
import axios from 'axios';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  const { code, error } = req.query;

  if (error) {
    return res.redirect(`/login?error=${error}`);
  }

  if (!code) {
    return res.redirect('/login?error=no_code');
  }

  const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
  const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
  const GOOGLE_REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI || `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/auth/google/callback`;
  const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

  if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET) {
    return res.redirect('/login?error=oauth_not_configured');
  }

  try {
    // Exchange code for tokens
    const tokenResponse = await axios.post('https://oauth2.googleapis.com/token', {
      code,
      client_id: GOOGLE_CLIENT_ID,
      client_secret: GOOGLE_CLIENT_SECRET,
      redirect_uri: GOOGLE_REDIRECT_URI,
      grant_type: 'authorization_code',
    });

    const { access_token } = tokenResponse.data;

    // Get user info from Google
    const userResponse = await axios.get('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    const googleUser = userResponse.data;

    // Create user data
    const userData = {
      id: googleUser.id,
      email: googleUser.email,
      name: googleUser.name,
      picture: googleUser.picture,
      credits: 5, // Default credits for new users
      createdAt: new Date().toISOString(),
    };

    // Generate JWT token
    const token = jwt.sign(userData, JWT_SECRET, { expiresIn: '7d' });

    // Redirect to callback page with token
    res.redirect(`/auth/callback?token=${token}`);
  } catch (error) {
    console.error('OAuth error:', error.response?.data || error.message);
    res.redirect('/login?error=oauth_failed');
  }
}
