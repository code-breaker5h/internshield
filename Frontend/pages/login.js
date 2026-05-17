// Login Page
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../contexts/AuthContext';
import GoogleLoginButton from '../components/GoogleLoginButton';
import GradientBackground from '../components/GradientBackground';
import { Shield, CheckCircle, Lock, Zap } from 'lucide-react';

export default function Login() {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  // Redirect if already logged in
  useEffect(() => {
    if (!loading && isAuthenticated) {
      const pendingRedirect = localStorage.getItem('postLoginRedirect');

      if (pendingRedirect) {
        localStorage.removeItem('postLoginRedirect');
        router.push(pendingRedirect);
      } else {
        router.push('/dashboard');
      }
    }
  }, [isAuthenticated, loading, router]);

  // Save redirect intent if coming from a specific page
  useEffect(() => {
    const { redirect } = router.query;
    if (redirect) {
      localStorage.setItem('postLoginRedirect', redirect);
    }
  }, [router.query]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-black">
      {/* Pure Black Background with Glow Effects */}
      <div className="absolute inset-0 bg-black" />
      
      {/* Animated Glow Orbs */}
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-purple-600/30 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-pink-600/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-600/10 rounded-full blur-[150px]" />

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md w-full">
          {/* Login Card */}
          <div className="relative overflow-hidden bg-black backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/10">
            {/* Card Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-transparent to-pink-600/10" />
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-purple-500/30 rounded-full blur-3xl" />
            
            {/* Logo & Title */}
            <div className="text-center mb-8 relative z-10">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mb-4 shadow-lg shadow-purple-500/50">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">
                Welcome to InternShield
              </h1>
              <p className="text-white/60">
                Sign in to protect yourself from fake internships
              </p>
            </div>

            {/* Google Login Button */}
            <div className="mb-6 relative z-10">
              <GoogleLoginButton className="w-full" />
            </div>

            {/* Features */}
            <div className="space-y-3 pt-6 border-t border-white/10 relative z-10">
              <div className="flex items-center gap-3 text-sm text-white/60">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span>Save your analysis history</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-white/60">
                <Lock className="w-5 h-5 text-blue-400" />
                <span>Secure authentication with Google</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-white/60">
                <Zap className="w-5 h-5 text-yellow-400" />
                <span>Access advanced AI features</span>
              </div>
            </div>

            {/* Privacy Note */}
            <p className="text-xs text-center text-white/40 mt-6 relative z-10">
              By signing in, you agree to our Terms of Service and Privacy Policy.
              We only access your basic profile information.
            </p>
          </div>

          {/* Back to Home */}
          <div className="text-center mt-6">
            <button
              onClick={() => router.push('/')}
              className="text-white/60 hover:text-white transition-colors"
            >
              ← Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
