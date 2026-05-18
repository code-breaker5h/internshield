// OAuth Callback Handler Page
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || '';

export default function AuthCallback() {
  const router = useRouter();
  const { handleAuthCallback } = useAuth();

  useEffect(() => {
    // Extract token from URL query params (user data is no longer passed in URL)
    const { token, error } = router.query;

    if (error) {
      // Authentication failed
      console.error('Auth error:', error);
      router.push('/login?error=' + error);
      return;
    }

    if (token) {
      // Fetch user data from backend using the token
      axios.get(`${API_URL}/api/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((response) => {
          if (response.data.success) {
            const userData = response.data.data;
            
            // Save auth data to context and localStorage
            handleAuthCallback(token, userData);

            // Check for pending redirect
            const pendingRedirect = localStorage.getItem('postLoginRedirect');

            setTimeout(() => {
              if (pendingRedirect) {
                localStorage.removeItem('postLoginRedirect');
                router.push(pendingRedirect);
              } else {
                router.push('/dashboard');
              }
            }, 500);
          } else {
            router.push('/login?error=invalid_token');
          }
        })
        .catch((err) => {
          console.error('Error fetching user data:', err);
          router.push('/login?error=fetch_failed');
        });
    }
  }, [router.query]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="text-center">
        {/* Loading Spinner */}
        <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-500 mb-4"></div>
        
        <h2 className="text-2xl font-bold text-white mb-2">
          Completing Sign In...
        </h2>
        <p className="text-white/60">
          Please wait while we set up your account
        </p>
      </div>
    </div>
  );
}
