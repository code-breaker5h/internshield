import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Heart, Users, Target, Lightbulb } from 'lucide-react'
import ScrollReveal from '@/components/ScrollReveal'
import MagnifierEffect from '@/components/MagnifierEffect'

export default function About() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-32 pb-24 px-6 min-h-screen"
    >
      <MagnifierEffect zoom={1.8} size={160}>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <ScrollReveal>
          <div className="text-center mb-20">
            <p className="text-white/30 text-sm font-medium uppercase tracking-wider mb-4">About</p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display tracking-tight mb-6">
              Protecting student
              <br />
              <span className="text-white/20">futures.</span>
            </h1>
            <p className="text-white/40 text-lg max-w-2xl mx-auto leading-relaxed">
              InternShield was built with a mission to protect students from the growing epidemic
              of fake internship scams that prey on young job seekers.
            </p>
          </div>
        </ScrollReveal>

        {/* Mission */}
        <ScrollReveal delay={0.1}>
          <div className="card p-12 mb-6">
            <div className="flex items-start gap-6">
              <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                <Target className="w-6 h-6 text-white/60" />
              </div>
              <div>
                <h2 className="text-2xl font-bold font-display mb-4">Our Mission</h2>
                <p className="text-white/40 leading-relaxed">
                  Every year, thousands of students fall victim to internship scams — losing money,
                  personal data, and precious time. These scams often disguise themselves as legitimate
                  opportunities, making them difficult to spot. InternShield aims to change this by
                  providing an intelligent, accessible tool that empowers students to make informed
                  decisions before applying.
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Problem / Solution */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <ScrollReveal delay={0.15}>
            <div className="card p-8 h-full" style={{ borderColor: 'rgba(239,68,68,0.15)' }}>
              <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center mb-6">
                <span className="text-red-400 text-lg">⚠</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">The Problem</h3>
              <ul className="space-y-3">
                {[
                  'Fake companies collecting registration fees',
                  'Personal data harvesting through fake applications',
                  'Non-existent companies with professional-looking websites',
                  'Urgency tactics pressuring quick decisions',
                  'Unrealistic salary and benefit promises',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-white/40">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500/50 mt-2 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="card p-8 h-full" style={{ borderColor: 'rgba(34,197,94,0.15)' }}>
              <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center mb-6">
                <span className="text-green-400 text-lg">✓</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Our Solution</h3>
              <ul className="space-y-3">
                {[
                  'AI-powered text analysis for scam language detection',
                  'Domain verification and website age checking',
                  'Pattern matching against known scam databases',
                  'Comprehensive risk scoring system',
                  'Actionable recommendations for students',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-white/40">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500/50 mt-2 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        </div>

        {/* Values */}
        <ScrollReveal delay={0.25}>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-16">
            {[
              { icon: Heart, title: 'Student First', desc: 'Built by students, for students. Every feature prioritizes user safety.' },
              { icon: Lightbulb, title: 'Smart Detection', desc: 'Leveraging cutting-edge AI to stay ahead of evolving scam tactics.' },
              { icon: Users, title: 'Community Driven', desc: 'Growing database powered by community reports and feedback.' },
            ].map((item, i) => (
              <div key={i} className="card-hover p-8 text-center">
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-5 h-5 text-white/60" />
                </div>
                <h4 className="font-semibold mb-2">{item.title}</h4>
                <p className="text-white/40 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* Tech Stack */}
        <ScrollReveal>
          <div className="card p-12 mb-6">
            <h3 className="text-2xl font-bold font-display text-center mb-8">Built With</h3>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {['Next.js', 'React', 'Tailwind CSS', 'Framer Motion', 'Lucide Icons', 'AI/ML'].map((tech, i) => (
                <span key={i} className="px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-sm text-white/50 font-medium">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Co-Founders */}
        <ScrollReveal delay={0.1}>
          <div className="card p-12 mb-16">
            <div className="text-center mb-10">
              <h3 className="text-2xl font-bold font-display mb-3">Meet the Team</h3>
              <p className="text-white/40 text-sm">
                Built by students who understand the challenges of finding legitimate internships
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { name: 'Naman Verma', role: 'Co-Founder', initial: 'NV' },
                { name: 'Rishav Singh', role: 'Co-Founder', initial: 'RS' },
                { name: 'Rishit Manglotra', role: 'Co-Founder', initial: 'RM' },
                { name: 'Pratyaksh Saxena', role: 'Co-Founder', initial: 'PS' },
              ].map((member, i) => (
                <div key={i} className="card-hover p-6 text-center">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-white/10 to-white/5 border border-white/10 flex items-center justify-center mx-auto mb-4">
                    <span className="text-xl font-bold text-white/60">{member.initial}</span>
                  </div>
                  <h4 className="font-semibold text-white mb-1">{member.name}</h4>
                  <p className="text-white/40 text-sm">{member.role}</p>
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
                Try InternShield
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </span>
          </div>
        </ScrollReveal>
      </div>
      </MagnifierEffect>
    </motion.div>
  )
}
