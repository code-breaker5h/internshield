import Link from 'next/link'
import { motion } from 'framer-motion'
import { Database, Brain, Search, BarChart3, ArrowRight } from 'lucide-react'
import ScrollReveal from '@/components/ScrollReveal'

const steps = [
  {
    icon: Database,
    title: 'Data Collection',
    description: 'The system collects data from the internship posting — URL metadata, text content, domain information, and visual elements.',
  },
  {
    icon: Brain,
    title: 'AI Text Analysis',
    description: 'Natural language processing algorithms analyze the posting text for suspicious patterns, manipulative language, and common scam phrases.',
  },
  {
    icon: Search,
    title: 'Pattern Detection',
    description: 'Machine learning models compare the posting against known scam patterns, checking domain age, company existence, and payment requests.',
  },
  {
    icon: BarChart3,
    title: 'Score Generation',
    description: 'All signals are combined into a comprehensive risk score with detailed explanations of each detected red flag.',
  },
]

export default function HowItWorks() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-32 pb-24 px-6 min-h-screen"
    >
      <div className="max-w-5xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-20">
            <p className="text-white/30 text-sm font-medium uppercase tracking-wider mb-4">Our Process</p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display tracking-tight mb-6">
              How it
              <br />
              <span className="text-white/20">works.</span>
            </h1>
            <p className="text-white/40 text-lg max-w-xl mx-auto">
              InternShield uses a multi-layered analysis pipeline to detect scam internship postings.
            </p>
          </div>
        </ScrollReveal>

        {/* Steps */}
        <div className="space-y-6 mb-24">
          {steps.map((step, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <div className="card-hover p-8 flex flex-col md:flex-row items-start gap-6 group">
                <div className="flex items-center gap-6 flex-shrink-0">
                  <span className="text-5xl font-bold text-white/[0.04] font-display w-16">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 transition-all duration-500">
                    <step.icon className="w-6 h-6 text-white/60" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-white/40 text-sm leading-relaxed">{step.description}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Pipeline */}
        <ScrollReveal>
          <div className="card p-12 text-center mb-16">
            <h3 className="text-2xl font-bold font-display mb-8">Analysis Pipeline</h3>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
              {['Input', 'NLP Engine', 'Pattern DB', 'ML Model', 'Risk Score'].map((label, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-sm font-medium text-white/60">
                    {label}
                  </div>
                  {i < 4 && <ArrowRight className="w-4 h-4 text-white/20 hidden md:block" />}
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* What We Check */}
        <ScrollReveal>
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold font-display mb-2">What We Analyze</h3>
            <p className="text-white/40 text-sm">Comprehensive checks across multiple dimensions.</p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
          {[
            'Payment requirements',
            'Domain age & validity',
            'Company registration',
            'Email domain analysis',
            'Salary claim verification',
            'Urgency language patterns',
            'Social media presence',
            'Contact information',
            'SSL & website security',
          ].map((item, i) => (
            <ScrollReveal key={i} delay={i * 0.05}>
              <div className="card p-5 flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-white/20" />
                <span className="text-sm text-white/50">{item}</span>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Risk Score Explanation */}
        <ScrollReveal>
          <div className="card p-12 mb-16">
            <h3 className="text-2xl font-bold font-display text-center mb-8">Understanding Risk Levels</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { range: '0 – 30', label: 'Low Risk', color: '#22c55e', desc: 'The posting appears legitimate. Standard verification is still recommended.' },
                { range: '30 – 60', label: 'Medium Risk', color: '#f59e0b', desc: 'Some suspicious indicators found. Research the company thoroughly before applying.' },
                { range: '60 – 100', label: 'High Risk', color: '#ef4444', desc: 'Multiple red flags detected. High probability of being a scam. Avoid applying.' },
              ].map((level, i) => (
                <div
                  key={i}
                  className="p-6 rounded-xl"
                  style={{
                    backgroundColor: `${level.color}08`,
                    border: `1px solid ${level.color}25`,
                  }}
                >
                  <div className="text-3xl font-bold mb-2" style={{ color: level.color }}>
                    {level.range}
                  </div>
                  <h4 className="font-semibold mb-2">{level.label}</h4>
                  <p className="text-white/40 text-sm">{level.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* CTA */}
        <ScrollReveal>
          <div className="text-center">
            <span className="btn-gradient-wrap">
              <Link href="/analyze" className="btn-primary text-base px-8 py-4 group">
                Try It Now
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </span>
          </div>
        </ScrollReveal>
      </div>
    </motion.div>
  )
}
