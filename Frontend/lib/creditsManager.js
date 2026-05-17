// Credits Management System
// Handles both guest (localStorage) and authenticated user credits

const GUEST_STORAGE_KEY = 'guest_analysis_data';

/**
 * Check if guest user has used their free analysis
 * @returns {boolean} true if guest has already used their free analysis
 */
export const hasGuestUsedFreeAnalysis = () => {
  if (typeof window === 'undefined') return false;
  
  const data = localStorage.getItem(GUEST_STORAGE_KEY);
  if (!data) return false;
  
  try {
    const parsed = JSON.parse(data);
    
    // Check if 24 hours have passed since the analysis
    if (parsed.used && parsed.timestamp) {
      const usedTime = new Date(parsed.timestamp);
      const now = new Date();
      const hoursSinceUse = (now - usedTime) / (1000 * 60 * 60);
      
      // If 24 hours have passed, reset the guest credit
      if (hoursSinceUse >= 24) {
        localStorage.removeItem(GUEST_STORAGE_KEY);
        return false;
      }
      
      return true;
    }
    
    return parsed.used === true;
  } catch (error) {
    return false;
  }
};

/**
 * Mark guest's free analysis as used
 */
export const markGuestAnalysisUsed = () => {
  if (typeof window === 'undefined') return;
  
  const data = {
    used: true,
    timestamp: new Date().toISOString(),
  };
  
  localStorage.setItem(GUEST_STORAGE_KEY, JSON.stringify(data));
};

/**
 * Clear guest analysis data (useful after login)
 * NOTE: This should NOT be called automatically on login
 * Guest data should persist for 24 hours regardless of login/logout
 */
export const clearGuestAnalysisData = () => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(GUEST_STORAGE_KEY);
};

/**
 * Get remaining credits for guest user
 * @returns {number} 0 or 1
 */
export const getGuestCredits = () => {
  return hasGuestUsedFreeAnalysis() ? 0 : 1;
};

/**
 * Get time until guest credit resets (24 hours from usage)
 * @returns {object} { hours, minutes, resetTime } or null if not used
 */
export const getGuestCreditResetTime = () => {
  if (typeof window === 'undefined') return null;
  
  const data = localStorage.getItem(GUEST_STORAGE_KEY);
  if (!data) return null;
  
  try {
    const parsed = JSON.parse(data);
    if (!parsed.used || !parsed.timestamp) return null;
    
    const usedTime = new Date(parsed.timestamp);
    const resetTime = new Date(usedTime.getTime() + 24 * 60 * 60 * 1000); // Add 24 hours
    const now = new Date();
    const diff = resetTime - now;
    
    if (diff <= 0) {
      return { hours: 0, minutes: 0, resetTime };
    }
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    return { hours, minutes, resetTime };
  } catch (error) {
    return null;
  }
};

/**
 * Calculate time until credits reset (for authenticated users)
 * @param {Date|string} creditsResetAt - When credits were last reset
 * @returns {object} { hours, minutes, resetTime }
 */
export const getTimeUntilReset = (creditsResetAt) => {
  if (!creditsResetAt) return { hours: 0, minutes: 0, resetTime: null };
  
  const resetTime = new Date(creditsResetAt);
  const nextReset = new Date(resetTime.getTime() + 24 * 60 * 60 * 1000); // Add 24 hours
  const now = new Date();
  const diff = nextReset - now;
  
  if (diff <= 0) {
    return { hours: 0, minutes: 0, resetTime: nextReset };
  }
  
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  
  return { hours, minutes, resetTime: nextReset };
};

/**
 * Format time until reset as string
 * @param {Date|string} creditsResetAt 
 * @returns {string} e.g., "23h 45m"
 */
export const formatTimeUntilReset = (creditsResetAt) => {
  const { hours, minutes } = getTimeUntilReset(creditsResetAt);
  
  if (hours === 0 && minutes === 0) {
    return 'Ready to reset';
  }
  
  return `${hours}h ${minutes}m`;
};
