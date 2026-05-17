// Credits Display Component
import { useAuth } from '../contexts/AuthContext';
import { getGuestCredits, formatTimeUntilReset, getGuestCreditResetTime } from '../lib/creditsManager';
import { Coins, Clock } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function CreditsDisplay({ showDetails = true, isHome = false }) {
  const { isAuthenticated, credits, user } = useAuth();
  const [timeUntilReset, setTimeUntilReset] = useState('');
  const [guestResetTime, setGuestResetTime] = useState('');
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch by only rendering after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isAuthenticated && user?.creditsResetAt) {
      // Update time every minute for authenticated users
      const updateTime = () => {
        setTimeUntilReset(formatTimeUntilReset(user.creditsResetAt));
      };
      
      updateTime();
      const interval = setInterval(updateTime, 60000); // Update every minute
      
      return () => clearInterval(interval);
    }
  }, [isAuthenticated, user]);

  useEffect(() => {
    if (!isAuthenticated) {
      // Update time every minute for guest users
      const updateGuestTime = () => {
        const resetInfo = getGuestCreditResetTime();
        if (resetInfo) {
          const { hours, minutes } = resetInfo;
          setGuestResetTime(`${hours}h ${minutes}m`);
        } else {
          setGuestResetTime('');
        }
      };
      
      updateGuestTime();
      const interval = setInterval(updateGuestTime, 60000); // Update every minute
      
      return () => clearInterval(interval);
    }
  }, [isAuthenticated]);

  // Don't render until mounted to avoid hydration mismatch
  if (!mounted) {
    return (
      <div className={`btn-gradient-wrap ${isHome ? 'btn-gradient-wrap-gold' : ''}`}>
        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-black">
          <Coins className="w-4 h-4 text-yellow-400" />
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-white">-- / --</span>
          </div>
        </div>
      </div>
    );
  }

  const displayCredits = isAuthenticated ? credits : getGuestCredits();
  const maxCredits = isAuthenticated ? (user?.isPremium ? '∞' : 5) : 1;
  const isPremium = user?.isPremium;

  return (
    <div className={`btn-gradient-wrap ${isHome ? 'btn-gradient-wrap-gold' : ''}`}>
      <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-black">
        <Coins className="w-4 h-4 text-yellow-400" />
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-white">
            {isPremium ? '∞' : displayCredits} / {maxCredits}
          </span>
        {showDetails && isAuthenticated && !isPremium && timeUntilReset && (
          <div className="flex items-center gap-1 text-xs text-white/40">
            <Clock className="w-3 h-3" />
            <span>{timeUntilReset}</span>
          </div>
        )}
        {showDetails && !isAuthenticated && displayCredits === 0 && guestResetTime && (
          <div className="flex items-center gap-1 text-xs text-white/40">
            <Clock className="w-3 h-3" />
            <span>{guestResetTime}</span>
          </div>
        )}
        {showDetails && !isAuthenticated && displayCredits === 0 && !guestResetTime && (
          <span className="text-xs text-white/40">Login for more</span>
        )}
      </div>
    </div>
    </div>
  );
}
