// Referral Program Page
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { useAuth } from '../contexts/AuthContext';
import { Gift, Copy, Users, Award, Check, Share2 } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001';

export default function Referral() {
  const router = useRouter();
  const { isAuthenticated, user, token } = useAuth();
  const [referralCode, setReferralCode] = useState('');
  const [referralStats, setReferralStats] = useState(null);
  const [copied, setCopied] = useState(false);
  const [applyCode, setApplyCode] = useState('');
  const [applyMessage, setApplyMessage] = useState('');

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }
    fetchReferralData();
  }, [isAuthenticated]);

  const fetchReferralData = async () => {
    try {
      const [codeRes, statsRes] = await Promise.all([
        axios.get(`${API_URL}/auth/referral-code`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get(`${API_URL}/auth/referral-stats`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      if (codeRes.data.success) {
        setReferralCode(codeRes.data.data.referralCode);
      }
      if (statsRes.data.success) {
        setReferralStats(statsRes.data.data);
      }
    } catch (error) {
      console.error('Error fetching referral data:', error);
    }
  };

  const copyToClipboard = () => {
    if (typeof window !== 'undefined') {
      const referralLink = `${window.location.origin}?ref=${referralCode}`;
      navigator.clipboard.writeText(referralLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleApplyCode = async () => {
    if (!applyCode.trim()) return;

    try {
      const res = await axios.post(
        `${API_URL}/auth/apply-referral`,
        { referralCode: applyCode },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.success) {
        setApplyMessage('✓ ' + res.data.message);
        setApplyCode('');
        setTimeout(() => {
          if (typeof window !== 'undefined') {
            window.location.reload();
          }
        }, 2000);
      }
    } catch (error) {
      setApplyMessage('✗ ' + (error.response?.data?.message || 'Invalid code'));
    }
  };

  const shareOptions = typeof window !== 'undefined' ? [
    { name: 'WhatsApp', icon: '💬', url: `https://wa.me/?text=Check out InternShield! Use my code ${referralCode} to get 3 bonus credits: ${window.location.origin}?ref=${referralCode}` },
    { name: 'Twitter', icon: '🐦', url: `https://twitter.com/intent/tweet?text=Protect yourself from fake internships with InternShield! Use code ${referralCode} for bonus credits&url=${window.location.origin}?ref=${referralCode}` },
    { name: 'LinkedIn', icon: '💼', url: `https://www.linkedin.com/sharing/share-offsite/?url=${window.location.origin}?ref=${referralCode}` },
  ] : [];

  if (!isAuthenticated) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-32 pb-24 px-6 min-h-screen relative bg-black"
    >
      {/* Background Glows */}
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-green-600/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />

      <div className="max-w-4xl mx-auto relative z-10">
        <ScrollReveal>
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500 to-blue-500 rounded-full mb-6 shadow-lg shadow-green-500/50">
              <Gift className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display tracking-tight mb-4">
              Referral
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">Program</span>
            </h1>
            <p className="text-white/40 text-lg max-w-2xl mx-auto">
              Earn 2 bonus credits for every friend you refer!
            </p>
          </div>
        </ScrollReveal>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <ScrollReveal delay={0.1}>
            <div className="rounded-2xl border border-white/10 bg-black p-6 text-center">
              <Users className="w-8 h-8 text-blue-400 mx-auto mb-3" />
              <div className="text-3xl font-bold font-display mb-1">{referralStats?.totalReferred || 0}</div>
              <div className="text-white/40 text-sm">Friends Referred</div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="rounded-2xl border border-green-500/30 bg-gradient-to-br from-green-500/10 to-transparent p-6 text-center">
              <Award className="w-8 h-8 text-green-400 mx-auto mb-3" />
              <div className="text-3xl font-bold font-display mb-1 text-green-400">{referralStats?.bonusCredits || 0}</div>
              <div className="text-white/40 text-sm">Bonus Credits Earned</div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <div className="rounded-2xl border border-white/10 bg-black p-6 text-center">
              <Share2 className="w-8 h-8 text-purple-400 mx-auto mb-3" />
              <div className="text-3xl font-bold font-display mb-1">{referralStats?.referralCount || 0}</div>
              <div className="text-white/40 text-sm">Successful Referrals</div>
            </div>
          </ScrollReveal>
        </div>

        {/* Referral Code Card */}
        <ScrollReveal delay={0.4}>
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black p-8 mb-8">
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-blue-500/5" />
            
            <div className="relative z-10">
              <h2 className="text-2xl font-bold font-display mb-4">Your Referral Code</h2>
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-1 bg-white/5 border border-white/10 rounded-xl px-6 py-4 font-mono text-2xl font-bold text-center">
                  {referralCode || 'Loading...'}
                </div>
                <button
                  onClick={copyToClipboard}
                  className="px-6 py-4 bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl transition-all"
                >
                  {copied ? <Check className="w-6 h-6 text-green-400" /> : <Copy className="w-6 h-6" />}
                </button>
              </div>

              <div className="space-y-3 text-white/60 text-sm">
                <p>• Share your code with friends</p>
                <p>• They get 3 bonus credits when they sign up</p>
                <p>• You get 2 bonus credits for each referral</p>
                <p>• Bonus credits are added to your daily limit!</p>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Share Buttons */}
        <ScrollReveal delay={0.5}>
          <div className="rounded-2xl border border-white/10 bg-black p-8 mb-8">
            <h3 className="text-xl font-bold mb-4">Share with Friends</h3>
            <div className="grid grid-cols-3 gap-4">
              {shareOptions.map((option, i) => (
                <a
                  key={i}
                  href={option.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-2 p-4 rounded-xl border border-white/10 hover:border-white/20 hover:bg-white/5 transition-all"
                >
                  <span className="text-3xl">{option.icon}</span>
                  <span className="text-sm text-white/60">{option.name}</span>
                </a>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Apply Referral Code */}
        {!user?.referredBy && (
          <ScrollReveal delay={0.6}>
            <div className="rounded-2xl border border-white/10 bg-black p-8">
              <h3 className="text-xl font-bold mb-4">Have a Referral Code?</h3>
              <p className="text-white/60 text-sm mb-4">Enter a friend's code to get 3 bonus credits!</p>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={applyCode}
                  onChange={(e) => setApplyCode(e.target.value.toUpperCase())}
                  placeholder="Enter code"
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-white/20 transition-colors"
                />
                <button
                  onClick={handleApplyCode}
                  className="px-6 py-3 bg-green-500 hover:bg-green-600 rounded-xl font-medium transition-all"
                >
                  Apply
                </button>
              </div>
              {applyMessage && (
                <p className={`mt-3 text-sm ${applyMessage.startsWith('✓') ? 'text-green-400' : 'text-red-400'}`}>
                  {applyMessage}
                </p>
              )}
            </div>
          </ScrollReveal>
        )}
      </div>
    </motion.div>
  );
}
