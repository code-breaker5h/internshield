import Link from 'next/link'
import { motion } from 'framer-motion'
import { Shield, Globe, BarChart3, ArrowRight } from 'lucide-react'
import ScrollReveal from '@/components/ScrollReveal'
import FeatureCard from '@/components/FeatureCard'
import StepCard from '@/components/StepCard'
import GradientBackground from '@/components/GradientBackground'
import CounterAnimation from '@/components/CounterAnimation'

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Gradient Background */}
        <GradientBackground />

        <div className="absolute inset-0 bg-pattern opacity-30" />

        <div className="relative max-w-5xl mx-auto px-6 text-center pt-32 pb-24 z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 text-sm text-white/50 mb-8">
              <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              AI-Powered Internship Verification
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl sm:text-7xl lg:text-8xl font-bold font-display tracking-tight leading-[0.95] mb-8"
          >
            Detect Fake
            <br />
            Internships
            <br />
            <span className="text-white/20">Instantly.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-white/40 text-lg sm:text-xl max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            Protect yourself from internship scams with intelligent AI analysis.
            Verify postings before you apply.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <span className="btn-gradient-wrap btn-gradient-wrap-blue">
              <Link href="/analyze" className="btn-primary text-base px-8 py-4 group">
                Analyze Internship
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </span>
            <span className="btn-gradient-wrap btn-gradient-wrap-blue">
              <Link href="/how-it-works" className="btn-outline text-base px-8 py-4">
                How It Works
              </Link>
            </span>
          </motion.div>
        </div>
      </section>

      {/* Marquee */}
      <div className="border-y border-white/5 py-4 overflow-hidden">
        <div className="marquee-track">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex items-center gap-8 px-4 whitespace-nowrap">
              {['Scam Detection', 'AI Analysis', 'Domain Verification', 'Risk Scoring', 'Pattern Recognition', 'Student Safety', 'Smart Alerts', 'Real-time Check'].map((text, j) => (
                <span key={j} className="flex items-center gap-3 text-white/20 text-sm font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
                  {text}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Features */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-20">
              <p className="text-white/30 text-sm font-medium uppercase tracking-wider mb-4">Capabilities</p>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display tracking-tight">
                Built to protect
                <br />
                <span className="text-blue-400">students.</span>
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FeatureCard
              icon={Shield}
              title="AI Scam Detection"
              description="Advanced machine learning algorithms analyze internship postings and identify scam patterns with high accuracy."
              index={0}
            />
            <FeatureCard
              icon={Globe}
              title="Domain Verification"
              description="Automatically checks company domains, website age, and online presence to verify legitimacy."
              index={1}
            />
            <FeatureCard
              icon={BarChart3}
              title="Risk Score Analysis"
              description="Generates a comprehensive risk score from 0-100 with detailed breakdown of detected red flags."
              index={2}
            />
          </div>
        </div>
      </section>

      {/* How It Works Preview */}
      <section className="py-32 px-6 bg-pattern">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-20">
              <p className="text-white/30 text-sm font-medium uppercase tracking-wider mb-4">Process</p>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display tracking-tight">
                Three simple
                <br />
                <span className="text-blue-400">steps.</span>
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <StepCard number={1} title="Submit Posting" description="Paste the internship URL, description text, or upload a screenshot of the posting." index={0} />
            <StepCard number={2} title="AI Analysis" description="Our AI engine analyzes text patterns, domain data, and known scam indicators in real-time." index={1} />
            <StepCard number={3} title="Get Results" description="Receive a detailed risk score with specific red flags and actionable recommendations." index={2} />
          </div>

          <ScrollReveal>
            <div className="text-center mt-16">
              <span className="btn-gradient-wrap btn-gradient-wrap-blue">
                <Link href="/analyze" className="btn-primary text-base px-8 py-4 group">
                  Try It Now
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </span>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Stats */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <ScrollReveal delay={0}>
              <div className="card p-8 text-center border border-blue-500/20 hover:border-blue-500/40 transition-all">
                <div className="text-3xl sm:text-4xl font-bold font-display mb-2 text-blue-400">
                  <CounterAnimation value="487" suffix="+" duration={2.5} delay={0} />
                </div>
                <div className="text-white/30 text-sm">Scams Detected</div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <div className="card p-8 text-center border border-blue-500/20 hover:border-blue-500/40 transition-all">
                <div className="text-3xl sm:text-4xl font-bold font-display mb-2 text-blue-400">
                  <CounterAnimation value="98" suffix="%" duration={2.5} delay={0.1} />
                </div>
                <div className="text-white/30 text-sm">Accuracy Rate</div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <div className="card p-8 text-center border border-blue-500/20 hover:border-blue-500/40 transition-all">
                <div className="text-3xl sm:text-4xl font-bold font-display mb-2 text-blue-400">
                  <CounterAnimation value="50" suffix="+" duration={2.5} delay={0.2} />
                </div>
                <div className="text-white/30 text-sm">Students Protected</div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.3}>
              <div className="card p-8 text-center border border-blue-500/20 hover:border-blue-500/40 transition-all">
                <div className="text-3xl sm:text-4xl font-bold font-display mb-2 text-blue-400">&lt; 3s</div>
                <div className="text-white/30 text-sm">Analysis Time</div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal>
            <div className="card p-16 relative overflow-hidden">
              <div className="absolute inset-0 bg-pattern opacity-30" />
              <div className="relative">
                <img src="/internslogo.jpeg" alt="InternShield" className="w-16 h-16 rounded-2xl object-cover mx-auto mb-8" />
                <h2 className="text-3xl sm:text-4xl font-bold font-display tracking-tight mb-4">
                  Don&apos;t fall for <span className="text-blue-400">scams.</span>
                </h2>
                <p className="text-white/40 text-lg mb-8 max-w-lg mx-auto">
                  Analyze any internship posting in seconds and make informed decisions about your career.
                </p>
                <span className="btn-gradient-wrap btn-gradient-wrap-blue">
                  <Link href="/analyze" className="btn-primary text-base px-8 py-4 group">
                    Start Analyzing
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </motion.div>
  )
}
