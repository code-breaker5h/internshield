// Authentication Context - Manages user authentication state
import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const AuthContext = createContext();

// API base URL - Use serverless functions on same domain
const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || '';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);
  const [credits, setCredits] = useState(0);

  // Initialize auth state on mount
  useEffect(() => {
    checkAuth();
  }, []);

  // Check if user is authenticated
  const checkAuth = async () => {
    try {
      const storedToken = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');

      if (storedToken && storedUser) {
        setToken(storedToken);
        const userData = JSON.parse(storedUser);
        setUser(userData);
        setCredits(userData.credits || 0);
        
        // Verify token is still valid and get updated credits
        const response = await axios.get(`${API_URL}/api/auth/me`, {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        });

        if (response.data.success) {
          setUser(response.data.data);
          setCredits(response.data.data.credits);
          // Update localStorage with fresh data
          localStorage.setItem('user', JSON.stringify(response.data.data));
        }
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      // Token invalid or expired - clear auth
      logout();
    } finally {
      setLoading(false);
    }
  };

  // Login with Google
  const loginWithGoogle = () => {
    // Redirect to serverless Google OAuth endpoint
    window.location.href = `${API_URL}/api/auth/google`;
  };

  // Handle OAuth callback (called from callback page)
  const handleAuthCallback = (token, userData) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    setToken(token);
    setUser(userData);
    setCredits(userData.credits || 5);
    
    // DO NOT clear guest analysis data - it should persist for 24 hours
    // even if user logs in and out
  };

  // Logout
  const logout = async () => {
    try {
      if (token) {
        await axios.get(`${API_URL}/api/auth/logout`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear local storage and state
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      Cookies.remove('token');
      setToken(null);
      setUser(null);
      setCredits(0);
    }
  };

  // Get user's analysis history
  const getHistory = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/auth/history`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.data;
    } catch (error) {
      console.error('Error fetching history:', error);
      return [];
    }
  };

  // Save analysis to history
  const saveAnalysis = async (analysisData) => {
    try {
      await axios.post(`${API_URL}/api/auth/save-analysis`, analysisData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return true;
    } catch (error) {
      console.error('Error saving analysis:', error);
      return false;
    }
  };

  // Get user's credits
  const getCredits = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/auth/credits`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.success) {
        setCredits(response.data.data.credits);
        return response.data.data;
      }
    } catch (error) {
      console.error('Error fetching credits:', error);
    }
    return null;
  };

  // Use one credit
  const useCredit = async () => {
    try {
      const response = await axios.post(`${API_URL}/api/auth/use-credit`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.success) {
        setCredits(response.data.data.credits);
        return true;
      }
    } catch (error) {
      console.error('Error using credit:', error);
      return false;
    }
  };

  const value = {
    user,
    token,
    loading,
    credits,
    isAuthenticated: !!user,
    loginWithGoogle,
    logout,
    handleAuthCallback,
    getHistory,
    saveAnalysis,
    getCredits,
    useCredit,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Custom hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
