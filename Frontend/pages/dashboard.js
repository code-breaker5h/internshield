// User Dashboard Page
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { Shield, TrendingUp, Clock, AlertTriangle, ArrowRight, Activity } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';
import GradientBackground from '../components/GradientBackground';
import CreditsDisplay from '../components/CreditsDisplay';

export default function Dashboard() {
  const { user, isAuthenticated, loading, getHistory } = useAuth();
  const [history, setHistory] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    highRisk: 0,
    mediumRisk: 0,
    lowRisk: 0,
  });
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, loading, router]);

  useEffect(() => {
    if (isAuthenticated) {
      loadHistory();
    }
  }, [isAuthenticated]);

  const loadHistory = async () => {
    const data = await getHistory();
    setHistory(data.slice(0, 5));

    const stats = {
      total: data.length,
      highRisk: data.filter((item) => item.status === 'High Risk').length,
      mediumRisk: data.filter((item) => item.status === 'Medium Risk').length,
      lowRisk: data.filter((item) => item.status === 'Low Risk').length,
    };
    setStats(stats);
  };

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-black"
    >
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden border-b border-white/5">
        {/* Pure Black Background with Glow Effects */}
        <div className="absolute inset-0 bg-black" />
        
        {/* Animated Glow Orbs */}
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-purple-600/30 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-600/10 rounded-full blur-[150px]" />
        
        <div className="absolute inset-0 bg-pattern opacity-30" />

        <div className="relative max-w-5xl mx-auto px-6 text-center pt-32 pb-24 z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/[0.03] text-sm text-white/50 mb-8">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              Active Account
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl sm:text-7xl font-bold font-display tracking-tight leading-[0.95] mb-6"
          >
            Welcome back,
            <br />
            <span className="text-white/20">{user.name?.split(' ')[0]}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-white/40 text-lg max-w-2xl mx-auto mb-8"
          >
            Your internship analysis overview and recent activity
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex justify-center"
          >
            <CreditsDisplay />
          </motion.div>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="py-20 px-6 relative">
        {/* Background Glow */}
        <div className="absolute inset-0 bg-gradient-radial from-purple-900/5 via-transparent to-transparent" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <ScrollReveal>
            <div className="mb-12">
              <p className="text-white/30 text-sm font-medium uppercase tracking-wider mb-2">Statistics</p>
              <h2 className="text-3xl sm:text-4xl font-bold font-display tracking-tight">
                Your analysis
                <br />
                <span className="text-white/20">overview.</span>
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <ScrollReveal delay={0}>
              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black p-8 hover:border-white/20 transition-all duration-300 group">
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <Shield className="w-8 h-8 text-white/60 mb-4 relative z-10" />
                <div className="text-4xl font-bold font-display mb-2 relative z-10">{stats.total}</div>
                <div className="text-white/40 text-sm relative z-10">Total Analyses</div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <div className="relative overflow-hidden rounded-2xl border border-red-500/30 bg-black p-8 hover:border-red-500/50 transition-all duration-300 group">
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-transparent" />
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-red-500/20 rounded-full blur-2xl opacity-50 group-hover:opacity-100 transition-opacity" />
                <AlertTriangle className="w-8 h-8 text-red-400 mb-4 relative z-10" />
                <div className="text-4xl font-bold font-display mb-2 text-red-400 relative z-10">{stats.highRisk}</div>
                <div className="text-red-400/60 text-sm relative z-10">High Risk</div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="relative overflow-hidden rounded-2xl border border-yellow-500/30 bg-black p-8 hover:border-yellow-500/50 transition-all duration-300 group">
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-transparent" />
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-yellow-500/20 rounded-full blur-2xl opacity-50 group-hover:opacity-100 transition-opacity" />
                <TrendingUp className="w-8 h-8 text-yellow-400 mb-4 relative z-10" />
                <div className="text-4xl font-bold font-display mb-2 text-yellow-400 relative z-10">{stats.mediumRisk}</div>
                <div className="text-yellow-400/60 text-sm relative z-10">Medium Risk</div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <div className="relative overflow-hidden rounded-2xl border border-green-500/30 bg-black p-8 hover:border-green-500/50 transition-all duration-300 group">
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent" />
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-green-500/20 rounded-full blur-2xl opacity-50 group-hover:opacity-100 transition-opacity" />
                <Shield className="w-8 h-8 text-green-400 mb-4 relative z-10" />
                <div className="text-4xl font-bold font-display mb-2 text-green-400 relative z-10">{stats.lowRisk}</div>
                <div className="text-green-400/60 text-sm relative z-10">Low Risk</div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Recent Analyses */}
      <section className="py-20 px-6 bg-pattern relative">
        {/* Background Glow */}
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px]" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <ScrollReveal>
            <div className="flex items-center justify-between mb-12">
              <div>
                <p className="text-white/30 text-sm font-medium uppercase tracking-wider mb-2">Activity</p>
                <h2 className="text-3xl sm:text-4xl font-bold font-display tracking-tight">
                  Recent
                  <br />
                  <span className="text-white/20">analyses.</span>
                </h2>
              </div>
              <span className="btn-gradient-wrap hidden md:inline-flex">
                <button
                  onClick={() => router.push('/history')}
                  className="flex items-center gap-2 px-6 py-3 bg-black text-white rounded-full text-sm font-medium hover:bg-black/90 transition-all"
                >
                  View All
                  <ArrowRight className="w-4 h-4" />
                </button>
              </span>
            </div>
          </ScrollReveal>

          {history.length === 0 ? (
            <ScrollReveal>
              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black p-16 text-center group">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-transparent to-blue-600/10 opacity-50" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl" />
                <Activity className="w-16 h-16 text-white/20 mx-auto mb-6 relative z-10" />
                <h3 className="text-2xl font-bold font-display mb-3 relative z-10">No analyses yet</h3>
                <p className="text-white/40 mb-8 max-w-md mx-auto relative z-10">
                  Start by analyzing an internship posting to see your results here
                </p>
                <span className="btn-gradient-wrap">
                  <button
                    onClick={() => router.push('/analyze')}
                    className="inline-flex items-center gap-2 px-8 py-4 bg-black text-white rounded-full font-medium hover:bg-black/90 transition-all relative z-10"
                  >
                    Analyze Now
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </span>
              </div>
            </ScrollReveal>
          ) : (
            <div className="space-y-4">
              {history.map((item, index) => (
                <ScrollReveal key={index} delay={index * 0.1}>
                  <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black p-6 hover:border-white/20 transition-all duration-300 group">
                    <div className="absolute inset-0 bg-gradient-to-r from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="flex items-start justify-between gap-4 relative z-10">
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-medium mb-2 truncate">
                          {item.text?.substring(0, 80) || item.url}...
                        </p>
                        <div className="flex items-center gap-3 text-sm text-white/40">
                          <Clock className="w-4 h-4" />
                          {new Date(item.analyzedAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </div>
                      </div>
                      <div className="flex items-center gap-4 flex-shrink-0">
                        <span
                          className={`px-4 py-2 rounded-full text-sm font-medium ${
                            item.status === 'High Risk'
                              ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                              : item.status === 'Medium Risk'
                              ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                              : 'bg-green-500/20 text-green-400 border border-green-500/30'
                          }`}
                        >
                          {item.status}
                        </span>
                        <span className="text-3xl font-bold font-display">
                          {item.riskScore}
                        </span>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          )}

          <div className="md:hidden mt-8 text-center">
            <span className="btn-gradient-wrap">
              <button
                onClick={() => router.push('/history')}
                className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-full text-sm font-medium hover:bg-black/90 transition-all"
              >
                View All
                <ArrowRight className="w-4 h-4" />
              </button>
            </span>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-20 px-6 relative">
        {/* Background Glow */}
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[100px]" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ScrollReveal>
              <button
                onClick={() => router.push('/analyze')}
                className="relative overflow-hidden rounded-2xl border border-white/10 bg-black p-12 text-left hover:border-white/20 transition-all duration-300 group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-purple-500/30 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <Shield className="w-12 h-12 mb-6 group-hover:scale-110 transition-transform relative z-10" />
                <h3 className="text-2xl font-bold font-display mb-3 relative z-10">Analyze New Posting</h3>
                <p className="text-white/60 mb-6 relative z-10">
                  Check if an internship posting is legitimate
                </p>
                <div className="inline-flex items-center gap-2 text-sm font-medium relative z-10">
                  Start Analysis
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <button
                onClick={() => router.push('/how-it-works')}
                className="relative overflow-hidden rounded-2xl border border-white/10 bg-black p-12 text-left hover:border-white/20 transition-all duration-300 group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-500/30 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <Activity className="w-12 h-12 text-white/60 mb-6 group-hover:scale-110 transition-transform relative z-10" />
                <h3 className="text-2xl font-bold font-display mb-3 relative z-10">How It Works</h3>
                <p className="text-white/40 mb-6 relative z-10">
                  Learn about our detection technology
                </p>
                <div className="inline-flex items-center gap-2 text-sm font-medium text-white/60 relative z-10">
                  Learn More
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
