// Premium/Upgrade Page
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { useAuth } from '../contexts/AuthContext';
import { Crown, Check, Zap, Shield, Infinity } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';
import GradientBackground from '../components/GradientBackground';

export default function Premium() {
  const router = useRouter();
  const { isAuthenticated, user } = useAuth();

  const features = [
    'Unlimited analyses per day',
    'Priority support',
    'Advanced AI insights',
    'Detailed PDF reports',
    'No ads',
    'Early access to new features',
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-32 pb-24 px-6 min-h-screen relative"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-black" />
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-yellow-600/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />

      <div className="max-w-4xl mx-auto relative z-10">
        <ScrollReveal>
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full mb-6 shadow-lg shadow-yellow-500/50">
              <Crown className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display tracking-tight mb-4">
              Upgrade to
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">Premium</span>
            </h1>
            <p className="text-white/40 text-lg max-w-2xl mx-auto">
              Unlock unlimited analyses and advanced features
            </p>
          </div>
        </ScrollReveal>

        {/* Pricing Card */}
        <ScrollReveal delay={0.1}>
          <div className="relative overflow-hidden rounded-2xl border border-yellow-500/30 bg-black p-8 sm:p-12">
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 via-transparent to-orange-500/10" />
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-yellow-500/30 rounded-full blur-3xl" />
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-3xl font-bold font-display mb-2">Premium Plan</h2>
                  <p className="text-white/60">Everything you need for safe internship hunting</p>
                </div>
                <div className="text-right">
                  <div className="text-5xl font-bold font-display">₹99</div>
                  <div className="text-white/40 text-sm">/month</div>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                {features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center">
                      <Check className="w-4 h-4 text-green-400" />
                    </div>
                    <span className="text-white/80">{feature}</span>
                  </div>
                ))}
              </div>

              <span className="btn-gradient-wrap w-full">
                <button
                  onClick={() => alert('Payment integration coming soon!')}
                  className="w-full flex items-center justify-center gap-3 py-4 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-bold text-lg hover:shadow-lg hover:shadow-yellow-500/50 transition-all"
                >
                  <Zap className="w-5 h-5" />
                  Upgrade Now
                </button>
              </span>

              <p className="text-center text-white/40 text-sm mt-4">
                Cancel anytime • No hidden fees • Secure payment
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* Comparison */}
        <ScrollReveal delay={0.2}>
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-white/10 bg-black p-6">
              <h3 className="text-xl font-bold mb-4">Free Plan</h3>
              <div className="space-y-3 text-white/60">
                <div>✓ 5 analyses per day</div>
                <div>✓ Basic risk detection</div>
                <div>✓ Analysis history</div>
                <div className="text-white/30">✗ Priority support</div>
                <div className="text-white/30">✗ PDF reports</div>
              </div>
            </div>

            <div className="rounded-2xl border border-yellow-500/30 bg-gradient-to-br from-yellow-500/5 to-orange-500/5 p-6">
              <div className="flex items-center gap-2 mb-4">
                <Crown className="w-5 h-5 text-yellow-400" />
                <h3 className="text-xl font-bold">Premium Plan</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Infinity className="w-4 h-4 text-yellow-400" />
                  <span>Unlimited analyses</span>
                </div>
                <div>✓ Advanced AI insights</div>
                <div>✓ Detailed PDF reports</div>
                <div>✓ Priority support</div>
                <div>✓ No ads</div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </motion.div>
  );
}
