const fs = require('fs');
const path = require('path');

const BASE = __dirname;
console.log('BASE directory:', BASE);
console.log('Node version:', process.version);

// Copy logo to public folder
try {
  const logoSrc = path.join(BASE, 'WhatsApp Image 2026-03-13 at 4.50.15 PM.jpeg');
  const logoDest = path.join(BASE, 'public', 'logo.jpeg');
  fs.mkdirSync(path.join(BASE, 'public'), { recursive: true });
  if (fs.existsSync(logoSrc)) {
    fs.copyFileSync(logoSrc, logoDest);
    console.log('Copied logo to public/logo.jpeg');
  }
} catch (e) { console.log('Logo copy skipped:', e.message); }

function writeFile(filePath, content) {
  try {
    const fullPath = path.join(BASE, filePath);
    const dir = path.dirname(fullPath);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log('Created:', filePath);
  } catch (err) {
    console.error('ERROR creating', filePath, ':', err.message);
  }
}

// ============================================================
// PACKAGE.JSON
// ============================================================
writeFile('package.json', JSON.stringify({
  name: "internshield",
  version: "1.0.0",
  private: true,
  scripts: {
    dev: "next dev",
    build: "next build",
    start: "next start"
  },
  dependencies: {
    "framer-motion": "^11.0.0",
    "lucide-react": "^0.344.0",
    "next": "14.1.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  devDependencies: {
    "autoprefixer": "^10.4.17",
    "postcss": "^8.4.35",
    "tailwindcss": "^3.4.1"
  }
}, null, 2));

// ============================================================
// CONFIG FILES
// ============================================================
writeFile('next.config.js', `/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = nextConfig
`);

writeFile('jsconfig.json', JSON.stringify({
  compilerOptions: { paths: { "@/*": ["./*"] } }
}, null, 2));

writeFile('postcss.config.js', `module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
`);

writeFile('tailwind.config.js', `/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#ecfeff', 100: '#cffafe', 200: '#a5f3fc', 300: '#67e8f9',
          400: '#22d3ee', 500: '#06b6d4', 600: '#0891b2', 700: '#0e7490',
          800: '#155e75', 900: '#164e63',
        },
        accent: {
          50: '#f5f3ff', 100: '#ede9fe', 200: '#ddd6fe', 300: '#c4b5fd',
          400: '#a78bfa', 500: '#8b5cf6', 600: '#7c3aed', 700: '#6d28d9',
          800: '#5b21b6', 900: '#4c1d95',
        },
        dark: {
          800: '#1e293b', 900: '#0f172a', 950: '#020617',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'spin-slow': 'spin 3s linear infinite',
        'slide-up': 'slideUp 0.6s ease-out',
        'fade-in': 'fadeIn 0.8s ease-out',
        'scale-in': 'scaleIn 0.5s ease-out',
        'gradient-x': 'gradientX 3s ease infinite',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(6, 182, 212, 0.3)' },
          '100%': { boxShadow: '0 0 40px rgba(6, 182, 212, 0.6), 0 0 80px rgba(139, 92, 246, 0.3)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        slideUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        gradientX: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
    },
  },
  plugins: [],
}
`);

// ============================================================
// STYLES/GLOBALS.CSS
// ============================================================
writeFile('styles/globals.css', `@tailwind base;
@tailwind components;
@tailwind utilities;

@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600&display=swap');

:root {
  --color-primary: #06b6d4;
  --color-accent: #8b5cf6;
  --color-bg: #030712;
  --color-surface: #0f172a;
}

* { margin: 0; padding: 0; box-sizing: border-box; }
html { scroll-behavior: smooth; }

body {
  background: var(--color-bg);
  color: #f1f5f9;
  font-family: 'Inter', system-ui, sans-serif;
  overflow-x: hidden;
}

::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: #0f172a; }
::-webkit-scrollbar-thumb { background: linear-gradient(180deg, #06b6d4, #8b5cf6); border-radius: 3px; }

@layer components {
  .glass {
    @apply bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl;
  }
  .glass-hover {
    @apply bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl transition-all duration-500;
  }
  .glass-hover:hover {
    @apply bg-white/10 border-white/20 shadow-lg shadow-cyan-500/10;
  }
}

.gradient-text {
  background: linear-gradient(135deg, #06b6d4, #8b5cf6, #06b6d4);
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: shimmerText 3s linear infinite;
}

@keyframes shimmerText {
  0% { background-position: 0% center; }
  100% { background-position: 200% center; }
}

.glow-btn {
  position: relative;
  background: linear-gradient(135deg, #06b6d4, #8b5cf6);
  border: none;
  border-radius: 12px;
  padding: 14px 32px;
  color: white;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.4s ease;
  overflow: hidden;
}

.glow-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 0 30px rgba(6, 182, 212, 0.4), 0 0 60px rgba(139, 92, 246, 0.2);
}

.glow-btn::after {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.1) 50%, transparent 70%);
  transform: rotate(45deg) translateX(-100%);
  transition: all 0.6s ease;
}

.glow-btn:hover::after {
  transform: rotate(45deg) translateX(100%);
}

.bg-grid {
  background-image: 
    linear-gradient(rgba(6, 182, 212, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(6, 182, 212, 0.03) 1px, transparent 1px);
  background-size: 60px 60px;
}

.risk-meter-ring {
  transition: stroke-dashoffset 1.5s ease-in-out;
}

.section-divider {
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(6, 182, 212, 0.3), rgba(139, 92, 246, 0.3), transparent);
}

.page-transition {
  animation: pageIn 0.6s ease-out;
}

@keyframes pageIn {
  0% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
}

@keyframes particleRise {
  0% { transform: translateY(0) scale(1); opacity: 0; }
  10% { opacity: 0.6; }
  90% { opacity: 0; }
  100% { transform: translateY(-400px) scale(0); opacity: 0; }
}
`);

// ============================================================
// PAGES/_APP.JS
// ============================================================
writeFile('pages/_app.js', `import '@/styles/globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { AnimatePresence } from 'framer-motion'
import Head from 'next/head'

export default function App({ Component, pageProps, router }) {
  return (
    <>
      <Head>
        <title>InternShield – Detect Fake Internships Instantly</title>
        <meta name="description" content="AI-powered protection for students against internship scams." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="min-h-screen flex flex-col bg-[#030712] bg-grid">
        <Navbar />
        <main className="flex-1">
          <AnimatePresence mode="wait">
            <Component key={router.route} {...pageProps} />
          </AnimatePresence>
        </main>
        <Footer />
      </div>
    </>
  )
}
`);

// ============================================================
// PAGES/_DOCUMENT.JS
// ============================================================
writeFile('pages/_document.js', `import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
`);

// ============================================================
// COMPONENTS/NAVBAR.JS
// ============================================================
writeFile('components/Navbar.js', `import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { Shield, Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Navbar() {
  const router = useRouter()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const links = [
    { href: '/', label: 'Home' },
    { href: '/analyze', label: 'Analyzer' },
    { href: '/how-it-works', label: 'How It Works' },
    { href: '/about', label: 'About' },
  ]

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={\`fixed top-0 left-0 right-0 z-50 transition-all duration-500 \${
        scrolled
          ? 'bg-[#030712]/80 backdrop-blur-2xl border-b border-white/10 shadow-lg shadow-cyan-500/5'
          : 'bg-transparent'
      }\`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative">
            <Shield className="w-8 h-8 text-cyan-400 transition-all duration-300 group-hover:text-cyan-300" />
            <div className="absolute inset-0 w-8 h-8 bg-cyan-400/20 rounded-full blur-xl group-hover:bg-cyan-400/40 transition-all duration-300" />
          </div>
          <span className="text-xl font-bold gradient-text">InternShield</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={\`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 \${
                router.pathname === link.href
                  ? 'text-cyan-400'
                  : 'text-slate-400 hover:text-white'
              }\`}
            >
              {router.pathname === link.href && (
                <motion.div
                  layoutId="navbar-indicator"
                  className="absolute inset-0 bg-white/5 border border-white/10 rounded-lg"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10">{link.label}</span>
            </Link>
          ))}
          <Link href="/analyze" className="ml-4">
            <button className="glow-btn text-sm !py-2.5 !px-5">
              Analyze Now
            </button>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-slate-400 hover:text-white transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#030712]/95 backdrop-blur-2xl border-b border-white/10"
          >
            <div className="px-6 py-4 flex flex-col gap-2">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={\`px-4 py-3 rounded-lg text-sm font-medium transition-all \${
                    router.pathname === link.href
                      ? 'text-cyan-400 bg-white/5'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }\`}
                >
                  {link.label}
                </Link>
              ))}
              <Link href="/analyze" onClick={() => setMobileOpen(false)}>
                <button className="glow-btn w-full text-sm mt-2">Analyze Now</button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
`);

// ============================================================
// COMPONENTS/FOOTER.JS
// ============================================================
writeFile('components/Footer.js', `import Link from 'next/link'
import { Shield, Github, Twitter, Mail } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-[#030712]">
      <div className="section-divider" />
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-7 h-7 text-cyan-400" />
              <span className="text-lg font-bold gradient-text">InternShield</span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed">
              AI-powered protection for students against internship scams. Stay safe, stay smart.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Navigation</h4>
            <div className="flex flex-col gap-3">
              {['Home', 'Analyzer', 'How It Works', 'About'].map((item) => (
                <Link
                  key={item}
                  href={item === 'Home' ? '/' : item === 'Analyzer' ? '/analyze' : \`/\${item.toLowerCase().replace(/ /g, '-')}\`}
                  className="text-slate-500 hover:text-cyan-400 text-sm transition-colors duration-300"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>

          {/* Features */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Features</h4>
            <div className="flex flex-col gap-3">
              {['AI Scam Detection', 'Domain Verification', 'Risk Score Analysis', 'Red Flag Detection'].map((item) => (
                <span key={item} className="text-slate-500 text-sm">{item}</span>
              ))}
            </div>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Connect</h4>
            <div className="flex gap-4">
              {[
                { icon: Github, href: '#' },
                { icon: Twitter, href: '#' },
                { icon: Mail, href: '#' },
              ].map(({ icon: Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-500 hover:text-cyan-400 hover:bg-white/10 hover:border-cyan-500/30 transition-all duration-300"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="section-divider mt-12 mb-8" />
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-600 text-sm">
            © 2026 InternShield. Built to protect students.
          </p>
          <p className="text-slate-700 text-xs">
            Powered by AI • Made with ❤️ for safer internships
          </p>
        </div>
      </div>
    </footer>
  )
}
`);

// ============================================================
// COMPONENTS/FEATURECARD.JS
// ============================================================
writeFile('components/FeatureCard.js', `import { motion } from 'framer-motion'

export default function FeatureCard({ icon: Icon, title, description, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
      className="group relative"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative glass-hover p-8 h-full">
        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-cyan-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
          <Icon className="w-7 h-7 text-cyan-400" />
        </div>
        <h3 className="text-xl font-semibold text-white mb-3">{title}</h3>
        <p className="text-slate-400 leading-relaxed text-sm">{description}</p>
      </div>
    </motion.div>
  )
}
`);

// ============================================================
// COMPONENTS/STEPCARD.JS
// ============================================================
writeFile('components/StepCard.js', `import { motion } from 'framer-motion'

export default function StepCard({ number, title, description, icon: Icon, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
      className="relative group"
    >
      <div className="glass-hover p-8 h-full relative overflow-hidden">
        {/* Step Number Background */}
        <div className="absolute -top-4 -right-4 text-[120px] font-black text-white/[0.02] leading-none select-none">
          {number}
        </div>
        
        <div className="flex items-start gap-5">
          <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-cyan-500/20 flex items-center justify-center">
            {Icon ? (
              <Icon className="w-6 h-6 text-cyan-400" />
            ) : (
              <span className="text-lg font-bold gradient-text">{number}</span>
            )}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
            <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
`);

// ============================================================
// COMPONENTS/RISKMETER.JS
// ============================================================
writeFile('components/RiskMeter.js', `import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function RiskMeter({ score = 72 }) {
  const [animatedScore, setAnimatedScore] = useState(0)
  
  useEffect(() => {
    const timer = setTimeout(() => setAnimatedScore(score), 300)
    return () => clearTimeout(timer)
  }, [score])

  const circumference = 2 * Math.PI * 88
  const offset = circumference - (animatedScore / 100) * circumference

  const getColor = (s) => {
    if (s <= 30) return { stroke: '#22c55e', text: 'text-green-400', bg: 'from-green-500/20', label: 'Low Risk', labelColor: 'text-green-400' }
    if (s <= 60) return { stroke: '#eab308', text: 'text-yellow-400', bg: 'from-yellow-500/20', label: 'Medium Risk', labelColor: 'text-yellow-400' }
    return { stroke: '#ef4444', text: 'text-red-400', bg: 'from-red-500/20', label: 'High Risk', labelColor: 'text-red-400' }
  }

  const colors = getColor(score)

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="flex flex-col items-center"
    >
      <div className="relative w-56 h-56">
        <svg className="w-56 h-56 transform -rotate-90" viewBox="0 0 200 200">
          {/* Background ring */}
          <circle
            cx="100" cy="100" r="88"
            stroke="rgba(255,255,255,0.05)"
            strokeWidth="12"
            fill="none"
          />
          {/* Glow ring */}
          <circle
            cx="100" cy="100" r="88"
            stroke={colors.stroke}
            strokeWidth="12"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="risk-meter-ring"
            style={{ filter: \`drop-shadow(0 0 8px \${colors.stroke}40)\` }}
          />
        </svg>
        
        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span
            key={animatedScore}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className={\`text-5xl font-black \${colors.text}\`}
          >
            {animatedScore}%
          </motion.span>
          <span className="text-slate-500 text-sm mt-1">Risk Score</span>
        </div>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className={\`mt-4 px-6 py-2 rounded-full bg-gradient-to-r \${colors.bg} to-transparent border border-white/10\`}
      >
        <span className={\`font-semibold \${colors.labelColor}\`}>{colors.label}</span>
      </motion.div>
    </motion.div>
  )
}
`);

// ============================================================
// COMPONENTS/LOADINGANIMATION.JS
// ============================================================
writeFile('components/LoadingAnimation.js', `import { motion } from 'framer-motion'
import { Shield, Scan, FileSearch } from 'lucide-react'

export default function LoadingAnimation() {
  const steps = [
    { icon: FileSearch, text: 'Collecting internship data...' },
    { icon: Scan, text: 'Running AI analysis...' },
    { icon: Shield, text: 'Generating risk score...' },
  ]

  return (
    <div className="fixed inset-0 z-50 bg-[#030712]/95 backdrop-blur-xl flex items-center justify-center">
      <div className="text-center">
        {/* Animated Shield */}
        <motion.div
          className="relative w-24 h-24 mx-auto mb-8"
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        >
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-cyan-400 border-r-purple-500" />
          <div className="absolute inset-2 rounded-full border-2 border-transparent border-b-cyan-400 border-l-purple-500" style={{ animationDirection: 'reverse' }} />
          <div className="absolute inset-0 flex items-center justify-center">
            <Shield className="w-8 h-8 text-cyan-400" />
          </div>
        </motion.div>

        {/* Scanning Text */}
        <motion.h3
          className="text-xl font-semibold text-white mb-6"
          animate={{ opacity: [1, 0.5, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Analyzing Internship...
        </motion.h3>

        {/* Steps */}
        <div className="flex flex-col gap-3 items-center">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.6 }}
              className="flex items-center gap-3 text-slate-400"
            >
              <motion.div
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.5 }}
              >
                <step.icon className="w-4 h-4 text-cyan-400" />
              </motion.div>
              <span className="text-sm">{step.text}</span>
            </motion.div>
          ))}
        </div>

        {/* Progress Bar */}
        <div className="mt-8 w-64 mx-auto h-1 bg-white/5 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 2.5, ease: 'easeInOut' }}
          />
        </div>
      </div>
    </div>
  )
}
`);

// ============================================================
// COMPONENTS/PARTICLEBG.JS
// ============================================================
writeFile('components/ParticleBg.js', `import { useEffect, useState } from 'react'

export default function ParticleBg() {
  const [particles, setParticles] = useState([])

  useEffect(() => {
    const items = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 8 + 6,
      delay: Math.random() * 5,
      opacity: Math.random() * 0.3 + 0.1,
    }))
    setParticles(items)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: p.left + '%',
            bottom: '-10px',
            width: p.size + 'px',
            height: p.size + 'px',
            background: p.id % 2 === 0 ? '#06b6d4' : '#8b5cf6',
            opacity: p.opacity,
            animation: \`particleRise \${p.duration}s linear \${p.delay}s infinite\`,
          }}
        />
      ))}
    </div>
  )
}
`);

// ============================================================
// PAGES/INDEX.JS (HOME PAGE)
// ============================================================
writeFile('pages/index.js', `import Link from 'next/link'
import { motion } from 'framer-motion'
import { Shield, Brain, Globe, BarChart3, ArrowRight, Sparkles, Lock, AlertTriangle, Search, CheckCircle } from 'lucide-react'
import FeatureCard from '@/components/FeatureCard'
import StepCard from '@/components/StepCard'
import ParticleBg from '@/components/ParticleBg'

export default function Home() {
  return (
    <div className="page-transition">
      <ParticleBg />

      {/* ===== HERO SECTION ===== */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        {/* Gradient Orbs */}
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[150px] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8"
          >
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="text-sm text-slate-400">AI-Powered Internship Verification</span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black leading-[1.1] mb-6"
          >
            <span className="text-white">Detect Fake</span>
            <br />
            <span className="gradient-text">Internships</span>
            <br />
            <span className="text-white">Instantly</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            AI-powered protection for students against internship scams. 
            Analyze any internship posting and get an instant risk assessment.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/analyze">
              <button className="glow-btn text-lg px-8 py-4 flex items-center gap-2 group">
                Analyze Internship
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
            <Link href="/how-it-works">
              <button className="px-8 py-4 rounded-xl border border-white/10 text-slate-400 hover:text-white hover:bg-white/5 hover:border-white/20 transition-all duration-300 text-lg">
                How It Works
              </button>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-20 grid grid-cols-3 gap-8 max-w-lg mx-auto"
          >
            {[
              { value: '10K+', label: 'Scams Detected' },
              { value: '99%', label: 'Accuracy Rate' },
              { value: '50K+', label: 'Students Protected' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl md:text-3xl font-bold gradient-text">{stat.value}</div>
                <div className="text-xs md:text-sm text-slate-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ===== FEATURES SECTION ===== */}
      <section className="py-32 relative">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-cyan-400 text-sm font-semibold uppercase tracking-wider">Features</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mt-4 mb-6">
              Powerful AI <span className="gradient-text">Protection</span>
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Our advanced AI engine analyzes internship postings across multiple dimensions 
              to identify potential scams before you apply.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FeatureCard
              icon={Brain}
              title="AI Scam Detection"
              description="Advanced natural language processing analyzes job descriptions for scam patterns, suspicious language, and manipulation tactics."
              delay={0}
            />
            <FeatureCard
              icon={Globe}
              title="Domain Verification"
              description="Automatically checks company websites for legitimacy, domain age, SSL certificates, and known scam indicators."
              delay={0.1}
            />
            <FeatureCard
              icon={BarChart3}
              title="Risk Score Analysis"
              description="Get a comprehensive 0-100 risk score with detailed breakdown of every red flag detected in the posting."
              delay={0.2}
            />
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ===== HOW IT WORKS PREVIEW ===== */}
      <section className="py-32 relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-cyan-400 text-sm font-semibold uppercase tracking-wider">Process</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mt-4 mb-6">
              How <span className="gradient-text">It Works</span>
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Three simple steps to verify any internship posting and protect yourself from scams.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StepCard
              number="01"
              icon={Search}
              title="Paste Internship Link or Description"
              description="Simply copy the internship URL or paste the job description text into our analyzer."
              delay={0}
            />
            <StepCard
              number="02"
              icon={Brain}
              title="AI Analyzes the Posting"
              description="Our AI engine scans for scam patterns, verifies the company, and checks for red flags."
              delay={0.1}
            />
            <StepCard
              number="03"
              icon={CheckCircle}
              title="Get Your Scam Risk Score"
              description="Receive a detailed risk assessment with actionable recommendations to stay safe."
              delay={0.2}
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link href="/how-it-works">
              <button className="px-6 py-3 rounded-xl border border-white/10 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/30 transition-all duration-300 inline-flex items-center gap-2">
                Learn More <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ===== CTA SECTION ===== */}
      <section className="py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent pointer-events-none" />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="glass p-12 md:p-16 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
              <Lock className="w-12 h-12 text-cyan-400 mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Don&apos;t Fall for <span className="gradient-text">Fake Internships</span>
              </h2>
              <p className="text-slate-400 mb-8 max-w-xl mx-auto">
                Join thousands of students who use InternShield to verify internship 
                postings before applying. It&apos;s free and takes seconds.
              </p>
              <Link href="/analyze">
                <button className="glow-btn text-lg px-8 py-4 inline-flex items-center gap-2 group">
                  <Shield className="w-5 h-5" />
                  Start Analyzing
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
`);

// ============================================================
// PAGES/ANALYZE.JS (INTERNSHIP ANALYZER)
// ============================================================
writeFile('pages/analyze.js', `import { useState } from 'react'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'
import { Link2, FileText, Upload, Search, Sparkles, AlertTriangle, Shield } from 'lucide-react'
import LoadingAnimation from '@/components/LoadingAnimation'
import ParticleBg from '@/components/ParticleBg'

export default function Analyze() {
  const router = useRouter()
  const [url, setUrl] = useState('')
  const [description, setDescription] = useState('')
  const [fileName, setFileName] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [activeTab, setActiveTab] = useState('url')

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFileName(e.target.files[0].name)
    }
  }

  const handleAnalyze = () => {
    if (!url && !description && !fileName) return
    setIsAnalyzing(true)
    
    // Simulate AI analysis for 2.5 seconds
    setTimeout(() => {
      // Generate simulated data and pass via query params
      const params = new URLSearchParams({
        score: '72',
        source: url || 'text-input',
      })
      router.push(\'/results?\' + params.toString())
    }, 2500)
  }

  const tabs = [
    { id: 'url', label: 'URL', icon: Link2 },
    { id: 'text', label: 'Description', icon: FileText },
    { id: 'upload', label: 'Screenshot', icon: Upload },
  ]

  if (isAnalyzing) return <LoadingAnimation />

  return (
    <div className="page-transition min-h-screen pt-28 pb-20">
      <ParticleBg />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
            <Search className="w-4 h-4 text-cyan-400" />
            <span className="text-sm text-slate-400">Internship Analyzer</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Analyze an <span className="gradient-text">Internship</span>
          </h1>
          <p className="text-slate-400 max-w-xl mx-auto">
            Paste a link, description, or upload a screenshot. Our AI will analyze it 
            and detect potential scam indicators.
          </p>
        </motion.div>

        {/* Analysis Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="glass p-8 md:p-10 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />

          {/* Tabs */}
          <div className="flex gap-2 mb-8 p-1 bg-white/5 rounded-xl w-fit">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={\`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 \${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-white border border-white/10'
                    : 'text-slate-500 hover:text-white'
                }\`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>

          {/* URL Input */}
          {activeTab === 'url' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <label className="block text-sm font-medium text-slate-400 mb-3">
                Internship URL
              </label>
              <div className="relative">
                <Link2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://example.com/internship-posting"
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-4 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all duration-300"
                />
              </div>
            </motion.div>
          )}

          {/* Description Input */}
          {activeTab === 'text' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <label className="block text-sm font-medium text-slate-400 mb-3">
                Internship Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Paste the internship description here..."
                rows={8}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all duration-300 resize-none"
              />
            </motion.div>
          )}

          {/* Upload Input */}
          {activeTab === 'upload' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <label className="block text-sm font-medium text-slate-400 mb-3">
                Upload Screenshot
              </label>
              <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-white/10 rounded-xl cursor-pointer hover:border-cyan-500/30 hover:bg-white/5 transition-all duration-300">
                <Upload className="w-10 h-10 text-slate-500 mb-3" />
                <span className="text-slate-500 text-sm">
                  {fileName || 'Click to upload or drag and drop'}
                </span>
                <span className="text-slate-600 text-xs mt-1">PNG, JPG up to 10MB</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
              {fileName && (
                <p className="text-cyan-400 text-sm mt-3 flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  {fileName}
                </p>
              )}
            </motion.div>
          )}

          {/* Analyze Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleAnalyze}
            disabled={!url && !description && !fileName}
            className={\`mt-8 w-full glow-btn text-lg py-4 flex items-center justify-center gap-3 \${
              !url && !description && !fileName ? 'opacity-50 cursor-not-allowed' : ''
            }\`}
          >
            <Sparkles className="w-5 h-5" />
            Analyze Internship
          </motion.button>

          {/* Info */}
          <div className="mt-6 flex items-start gap-3 p-4 bg-cyan-500/5 border border-cyan-500/10 rounded-xl">
            <AlertTriangle className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
            <p className="text-slate-500 text-sm">
              Your data is analyzed locally and never stored. We use AI pattern matching 
              to detect common scam indicators in internship postings.
            </p>
          </div>
        </motion.div>

        {/* Recent Scam Patterns */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-12 glass p-8"
        >
          <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-yellow-400" />
            Common Red Flags We Detect
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              'Registration or training fee requirements',
              'Suspicious or generic email domains',
              'Unrealistically high salary promises',
              'Urgency tactics ("Apply NOW!")',
              'Newly created company websites',
              'Vague job descriptions with no specifics',
              'Request for personal financial information',
              'No verifiable company information',
            ].map((flag, i) => (
              <div key={i} className="flex items-center gap-3 text-slate-400 text-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />
                {flag}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
`);

// ============================================================
// PAGES/RESULTS.JS (RESULTS PAGE)
// ============================================================
writeFile('pages/results.js', `import { useRouter } from 'next/router'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Shield, AlertTriangle, CheckCircle, XCircle, ExternalLink, ArrowLeft, Download, RefreshCw, Globe, Mail, DollarSign, Clock, FileWarning, Building } from 'lucide-react'
import RiskMeter from '@/components/RiskMeter'
import ParticleBg from '@/components/ParticleBg'

const simulatedData = {
  score: 72,
  riskLevel: 'High Risk',
  analyzedUrl: 'https://example-internship.com/apply',
  companyName: 'TechGrowth Solutions Pvt Ltd',
  redFlags: [
    {
      severity: 'high',
      icon: DollarSign,
      title: 'Internship requires training fee',
      description: 'The posting mentions a mandatory training fee of ₹5,000. Legitimate internships never ask for money upfront.',
    },
    {
      severity: 'high',
      icon: FileWarning,
      title: 'Suspicious marketing language detected',
      description: 'Phrases like "guaranteed placement", "100% job assurance", and "limited seats" are common in scam postings.',
    },
    {
      severity: 'medium',
      icon: Mail,
      title: 'Email uses generic domain',
      description: 'Contact email uses gmail.com instead of a company domain. Professional companies typically use corporate email addresses.',
    },
    {
      severity: 'medium',
      icon: Globe,
      title: 'Website domain recently created',
      description: 'The company website domain was registered only 45 days ago, which is a common indicator of fraudulent operations.',
    },
    {
      severity: 'low',
      icon: Clock,
      title: 'Urgency tactics detected',
      description: '"Apply within 24 hours" and "Only 5 seats remaining" are pressure tactics commonly used in scam postings.',
    },
    {
      severity: 'low',
      icon: Building,
      title: 'No verifiable office address',
      description: 'The posting does not include a verifiable physical office address or registered company information.',
    },
  ],
  positives: [
    'Job role description is somewhat detailed',
    'Company has a social media presence',
  ],
  recommendation: {
    level: 'caution',
    title: 'Proceed with Extreme Caution',
    text: 'This internship posting shows multiple red flags commonly associated with scam postings. We strongly recommend verifying the company details independently before applying or sharing any personal information.',
  },
}

export default function Results() {
  const router = useRouter()

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'text-red-400 bg-red-500/10 border-red-500/20'
      case 'medium': return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20'
      case 'low': return 'text-orange-400 bg-orange-500/10 border-orange-500/20'
      default: return 'text-slate-400 bg-white/5 border-white/10'
    }
  }

  const getSeverityLabel = (severity) => {
    switch (severity) {
      case 'high': return 'Critical'
      case 'medium': return 'Warning'
      case 'low': return 'Notice'
      default: return 'Info'
    }
  }

  return (
    <div className="page-transition min-h-screen pt-28 pb-20">
      <ParticleBg />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10"
        >
          <div>
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors mb-4 text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Analyzer
            </button>
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              Analysis <span className="gradient-text">Results</span>
            </h1>
          </div>
          <div className="flex gap-3">
            <Link href="/analyze">
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 text-slate-400 hover:text-white hover:bg-white/5 transition-all text-sm">
                <RefreshCw className="w-4 h-4" />
                New Analysis
              </button>
            </Link>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Risk Score */}
          <div className="lg:col-span-1 space-y-6">
            {/* Risk Score Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="glass p-8 text-center"
            >
              <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-6">Scam Risk Score</h3>
              <RiskMeter score={simulatedData.score} />
            </motion.div>

            {/* Company Info Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="glass p-6"
            >
              <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">Analyzed Source</h3>
              <div className="space-y-3">
                <div>
                  <span className="text-xs text-slate-600">Company</span>
                  <p className="text-white text-sm font-medium">{simulatedData.companyName}</p>
                </div>
                <div>
                  <span className="text-xs text-slate-600">URL</span>
                  <p className="text-cyan-400 text-sm truncate">{simulatedData.analyzedUrl}</p>
                </div>
              </div>
            </motion.div>

            {/* Positive Signals */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="glass p-6"
            >
              <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">Positive Signals</h3>
              <div className="space-y-3">
                {simulatedData.positives.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-400 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column - Red Flags & Recommendation */}
          <div className="lg:col-span-2 space-y-6">
            {/* Recommendation Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="glass p-6 border-l-4 border-l-red-500 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-full blur-3xl pointer-events-none" />
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="w-5 h-5 text-red-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">{simulatedData.recommendation.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{simulatedData.recommendation.text}</p>
                </div>
              </div>
            </motion.div>

            {/* Red Flags */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="glass p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
                  Detected Red Flags ({simulatedData.redFlags.length})
                </h3>
              </div>

              <div className="space-y-4">
                {simulatedData.redFlags.map((flag, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                    className={\`p-4 rounded-xl border \${getSeverityColor(flag.severity)} bg-opacity-50\`}
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 mt-0.5">
                        <flag.icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <h4 className="font-semibold text-white text-sm">{flag.title}</h4>
                          <span className={\`text-xs px-2 py-0.5 rounded-full border \${getSeverityColor(flag.severity)}\`}>
                            {getSeverityLabel(flag.severity)}
                          </span>
                        </div>
                        <p className="text-slate-400 text-sm">{flag.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link href="/analyze" className="flex-1">
                <button className="glow-btn w-full py-4 flex items-center justify-center gap-2">
                  <Shield className="w-5 h-5" />
                  Analyze Another Internship
                </button>
              </Link>
              <button className="flex-1 py-4 rounded-xl border border-white/10 text-slate-400 hover:text-white hover:bg-white/5 transition-all flex items-center justify-center gap-2">
                <Download className="w-5 h-5" />
                Download Report
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
`);

// ============================================================
// PAGES/HOW-IT-WORKS.JS
// ============================================================
writeFile('pages/how-it-works.js', `import { motion } from 'framer-motion'
import Link from 'next/link'
import { Database, Brain, Search, BarChart3, ArrowRight, Shield, Cpu, Network, FileSearch, Scan, AlertTriangle, CheckCircle } from 'lucide-react'
import ParticleBg from '@/components/ParticleBg'

const steps = [
  {
    number: '01',
    icon: Database,
    title: 'Internship Data Collection',
    description: 'Our system collects and processes the internship posting data you provide — whether it\\u2019s a URL, text description, or screenshot. The data is parsed and structured for analysis.',
    details: [
      'URL content extraction and parsing',
      'Text analysis and structuring',
      'OCR processing for screenshots',
      'Metadata extraction from web pages',
    ],
    color: 'cyan',
  },
  {
    number: '02',
    icon: Brain,
    title: 'AI Text Analysis',
    description: 'Advanced NLP algorithms analyze the posting content for suspicious patterns, manipulative language, and scam-related keywords that are commonly found in fraudulent listings.',
    details: [
      'Natural language processing',
      'Sentiment and tone analysis',
      'Keyword pattern matching',
      'Language manipulation detection',
    ],
    color: 'purple',
  },
  {
    number: '03',
    icon: Search,
    title: 'Scam Pattern Detection',
    description: 'The posting is compared against our database of known scam patterns, suspicious domains, and reported fraudulent companies. Multiple verification checks are performed.',
    details: [
      'Domain age and reputation check',
      'Company registry verification',
      'Email domain analysis',
      'Known scam database matching',
    ],
    color: 'cyan',
  },
  {
    number: '04',
    icon: BarChart3,
    title: 'Risk Score Generation',
    description: 'All analysis results are compiled into a comprehensive risk score from 0-100, with detailed breakdown of each red flag and actionable recommendations.',
    details: [
      'Weighted risk calculation',
      'Red flag severity classification',
      'Recommendation generation',
      'Detailed report creation',
    ],
    color: 'purple',
  },
]

export default function HowItWorks() {
  return (
    <div className="page-transition min-h-screen pt-28 pb-20">
      <ParticleBg />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
            <Cpu className="w-4 h-4 text-cyan-400" />
            <span className="text-sm text-slate-400">Our Process</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            How <span className="gradient-text">InternShield</span> Works
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Our AI-powered system uses a multi-layered approach to analyze and verify 
            internship postings in real-time.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="space-y-8">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
              className="glass p-8 md:p-10 relative overflow-hidden group"
            >
              {/* Step number background */}
              <div className="absolute -top-8 -right-4 text-[180px] font-black text-white/[0.015] leading-none select-none group-hover:text-white/[0.03] transition-all duration-700">
                {step.number}
              </div>

              {/* Top gradient line */}
              <div className={\`absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent \${step.color === 'cyan' ? 'via-cyan-500/30' : 'via-purple-500/30'} to-transparent\`} />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <div className={\`w-14 h-14 rounded-xl bg-gradient-to-br \${step.color === 'cyan' ? 'from-cyan-500/20 to-cyan-500/5 border-cyan-500/20' : 'from-purple-500/20 to-purple-500/5 border-purple-500/20'} border flex items-center justify-center\`}>
                      <step.icon className={\`w-7 h-7 \${step.color === 'cyan' ? 'text-cyan-400' : 'text-purple-400'}\`} />
                    </div>
                    <div>
                      <span className={\`text-xs font-mono \${step.color === 'cyan' ? 'text-cyan-400' : 'text-purple-400'}\`}>STEP {step.number}</span>
                      <h3 className="text-2xl font-bold text-white">{step.title}</h3>
                    </div>
                  </div>
                  <p className="text-slate-400 leading-relaxed">{step.description}</p>
                </div>
                <div className="flex items-center">
                  <div className="w-full space-y-3">
                    {step.details.map((detail, j) => (
                      <motion.div
                        key={j}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 + j * 0.1 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/5"
                      >
                        <CheckCircle className={\`w-4 h-4 flex-shrink-0 \${step.color === 'cyan' ? 'text-cyan-400' : 'text-purple-400'}\`} />
                        <span className="text-slate-300 text-sm">{detail}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Risk Score Explanation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-20 glass p-8 md:p-10"
        >
          <h2 className="text-2xl font-bold text-white mb-8 text-center">
            Understanding the <span className="gradient-text">Risk Score</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { range: '0 – 30', label: 'Low Risk', color: 'green', desc: 'The posting appears legitimate. Standard verification is still recommended.' },
              { range: '30 – 60', label: 'Medium Risk', color: 'yellow', desc: 'Some suspicious indicators found. Research the company thoroughly before applying.' },
              { range: '60 – 100', label: 'High Risk', color: 'red', desc: 'Multiple red flags detected. High probability of being a scam. Avoid applying.' },
            ].map((level, i) => (
              <div key={i} className={\`p-6 rounded-xl border bg-\${level.color}-500/5 border-\${level.color}-500/20\`}
                style={{
                  backgroundColor: level.color === 'green' ? 'rgba(34,197,94,0.05)' : level.color === 'yellow' ? 'rgba(234,179,8,0.05)' : 'rgba(239,68,68,0.05)',
                  borderColor: level.color === 'green' ? 'rgba(34,197,94,0.2)' : level.color === 'yellow' ? 'rgba(234,179,8,0.2)' : 'rgba(239,68,68,0.2)',
                }}
              >
                <div className="text-3xl font-bold mb-2"
                  style={{ color: level.color === 'green' ? '#4ade80' : level.color === 'yellow' ? '#facc15' : '#f87171' }}
                >
                  {level.range}
                </div>
                <h4 className="font-semibold text-white mb-2">{level.label}</h4>
                <p className="text-slate-400 text-sm">{level.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <Link href="/analyze">
            <button className="glow-btn text-lg px-8 py-4 inline-flex items-center gap-2 group">
              <Shield className="w-5 h-5" />
              Try It Now
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
`);

// ============================================================
// PAGES/ABOUT.JS
// ============================================================
writeFile('pages/about.js', `import { motion } from 'framer-motion'
import Link from 'next/link'
import { Shield, Users, Target, Lightbulb, ArrowRight, Heart, AlertTriangle, GraduationCap, TrendingUp, Globe } from 'lucide-react'
import ParticleBg from '@/components/ParticleBg'

export default function About() {
  return (
    <div className="page-transition min-h-screen pt-28 pb-20">
      <ParticleBg />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
            <Heart className="w-4 h-4 text-cyan-400" />
            <span className="text-sm text-slate-400">Our Mission</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            About <span className="gradient-text">InternShield</span>
          </h1>
          <p className="text-slate-400 max-w-3xl mx-auto text-lg leading-relaxed">
            InternShield aims to protect students from internship scams by providing a fast 
            and intelligent verification tool powered by artificial intelligence.
          </p>
        </motion.div>

        {/* Mission Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="glass p-8 md:p-12 mb-12 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-cyan-400 text-sm font-semibold uppercase tracking-wider">The Problem</span>
              <h2 className="text-3xl font-bold text-white mt-3 mb-6">
                Fake Internships Are a <span className="gradient-text">Growing Threat</span>
              </h2>
              <p className="text-slate-400 leading-relaxed mb-4">
                Every year, thousands of students fall victim to fake internship scams. 
                These fraudulent postings often ask for registration fees, collect personal 
                data for identity theft, or promise unrealistic opportunities that never materialize.
              </p>
              <p className="text-slate-400 leading-relaxed">
                Students, eager to build their careers, are particularly vulnerable to these 
                scams. The emotional and financial impact can be devastating, and many victims 
                are too embarrassed to report these incidents.
              </p>
            </div>
            <div className="space-y-4">
              {[
                { icon: AlertTriangle, stat: '72%', text: 'of students have encountered suspicious internship postings' },
                { icon: DollarSign, stat: '₹500Cr+', text: 'lost annually to internship and job scams in India' },
                { icon: TrendingUp, stat: '3x', text: 'increase in fake internship postings since 2020' },
                { icon: GraduationCap, stat: '45%', text: 'of scam victims are first-year college students' },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5"
                >
                  <item.icon className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                  <div>
                    <span className="text-xl font-bold gradient-text">{item.stat}</span>
                    <p className="text-slate-500 text-sm">{item.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* How AI Helps */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="glass p-8 md:p-12 mb-12 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/5 rounded-full blur-[100px] pointer-events-none" />

          <div className="text-center mb-10">
            <span className="text-purple-400 text-sm font-semibold uppercase tracking-wider">The Solution</span>
            <h2 className="text-3xl font-bold text-white mt-3">
              How <span className="gradient-text">AI Can Help</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Lightbulb,
                title: 'Pattern Recognition',
                desc: 'AI can identify scam patterns that humans might miss, analyzing thousands of data points in seconds.',
              },
              {
                icon: Globe,
                title: 'Real-time Verification',
                desc: 'Instantly verify company legitimacy, domain age, and cross-reference with known scam databases.',
              },
              {
                icon: Shield,
                title: 'Proactive Protection',
                desc: 'Get warned before you apply, not after. Prevention is always better than recovery.',
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 }}
                viewport={{ once: true }}
                className="p-6 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-all duration-300 text-center group"
              >
                <div className="w-12 h-12 mx-auto rounded-xl bg-gradient-to-br from-purple-500/20 to-cyan-500/20 border border-purple-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <item.icon className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-slate-400 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Our Values */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="glass p-8 md:p-12 mb-12"
        >
          <div className="text-center mb-10">
            <span className="text-cyan-400 text-sm font-semibold uppercase tracking-wider">Our Values</span>
            <h2 className="text-3xl font-bold text-white mt-3">
              What We <span className="gradient-text">Stand For</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { icon: Shield, title: 'Student Safety First', desc: 'Every feature is designed with student protection as the top priority. Your safety is our mission.' },
              { icon: Users, title: 'Community Driven', desc: 'Built by students, for students. We understand the challenges because we\\u2019ve faced them ourselves.' },
              { icon: Target, title: 'Accuracy Matters', desc: 'We continuously improve our AI models to minimize false positives and ensure reliable analysis.' },
              { icon: Heart, title: 'Free & Accessible', desc: 'InternShield is and will always be free for students. Financial barriers should never prevent safety.' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="flex items-start gap-4 p-6 rounded-xl bg-white/5 border border-white/5"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-cyan-500/20 flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">{item.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-2xl font-bold text-white mb-4">
            Ready to verify an internship?
          </h2>
          <p className="text-slate-400 mb-8">
            Start protecting yourself today with our free AI-powered analyzer.
          </p>
          <Link href="/analyze">
            <button className="glow-btn text-lg px-8 py-4 inline-flex items-center gap-2 group">
              <Shield className="w-5 h-5" />
              Start Analyzing
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
        </motion.div>
      </div>
    </div>
  )
}

function DollarSign(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <line x1="12" x2="12" y1="2" y2="22" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  )
}

function TrendingUp(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" /><polyline points="16 7 22 7 22 13" />
    </svg>
  )
}

function GraduationCap(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c0 2 6 3 6 3s6-1 6-3v-5" />
    </svg>
  )
}
`);

// ============================================================
// PUBLIC/.GITKEEP (empty placeholder)
// ============================================================
writeFile('public/.gitkeep', '');

// ============================================================
// .GITIGNORE
// ============================================================
writeFile('.gitignore', `node_modules/
.next/
out/
.env
.env.local
.DS_Store
*.tsbuildinfo
`);

// ============================================================
// README.MD
// ============================================================
writeFile('README.md', `# 🛡️ InternShield

> AI-powered protection for students against internship scams.

![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38bdf8?logo=tailwindcss)
![License](https://img.shields.io/badge/License-MIT-green)

## 📋 Overview

**InternShield** is an AI-powered tool designed to help students detect fake internship postings and scam listings. Many students fall victim to fraudulent internship offers that require registration fees, collect personal data, or promise unrealistic opportunities.

InternShield analyzes internship postings and generates a **Scam Risk Score** with detailed explanations of detected red flags.

## ✨ Features

- 🤖 **AI Scam Detection** — NLP-powered analysis of job descriptions for scam patterns
- 🌐 **Domain Verification** — Checks company websites for legitimacy and domain age
- 📊 **Risk Score Analysis** — Comprehensive 0-100 risk score with severity breakdown
- 🚩 **Red Flag Detection** — Identifies payment requirements, suspicious emails, urgency tactics
- 📱 **Responsive Design** — Beautiful UI that works on all devices
- 🎨 **Futuristic UI** — Dark theme with glassmorphism, glowing gradients, and smooth animations

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **Next.js 14** | React framework with Pages Router |
| **Tailwind CSS** | Utility-first CSS styling |
| **Framer Motion** | Smooth animations and transitions |
| **Lucide React** | Beautiful icon library |
| **JavaScript** | Programming language |

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn

### Installation

\`\`\`bash
# Clone the repository
git clone https://github.com/your-username/internshield.git

# Navigate to the project
cd internshield

# Install dependencies
npm install

# Start the development server
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

\`\`\`
internshield/
├── components/
│   ├── Navbar.js          # Navigation bar
│   ├── Footer.js          # Footer component
│   ├── FeatureCard.js     # Reusable feature card
│   ├── StepCard.js        # Process step card
│   ├── RiskMeter.js       # Visual risk score gauge
│   ├── LoadingAnimation.js # AI analysis loading screen
│   └── ParticleBg.js      # Animated particle background
├── pages/
│   ├── _app.js            # App wrapper
│   ├── _document.js       # Document head
│   ├── index.js           # Home page
│   ├── analyze.js         # Internship analyzer
│   ├── results.js         # Analysis results dashboard
│   ├── how-it-works.js    # Process explanation
│   └── about.js           # About & mission
├── styles/
│   └── globals.css        # Global styles & animations
├── public/                # Static assets
├── tailwind.config.js     # Tailwind configuration
├── next.config.js         # Next.js configuration
└── package.json           # Dependencies
\`\`\`

## 📄 Pages

| Page | Route | Description |
|------|-------|-------------|
| **Home** | \`/\` | Hero section, features, how it works preview |
| **Analyzer** | \`/analyze\` | Input form for URL, text, or screenshot |
| **Results** | \`/results\` | AI analysis dashboard with risk meter |
| **How It Works** | \`/how-it-works\` | 4-step process explanation |
| **About** | \`/about\` | Mission, problem statement, values |

## 🔮 Future Improvements

- [ ] **Real AI Backend** — Integrate actual NLP models for analysis
- [ ] **Database** — Store analysis history and scam reports
- [ ] **Browser Extension** — Analyze postings directly on job portals
- [ ] **Community Reports** — Allow users to report scam postings
- [ ] **API** — Public API for third-party integrations
- [ ] **Multi-language Support** — Analyze postings in multiple languages
- [ ] **Company Directory** — Database of verified legitimate companies
- [ ] **Email Alerts** — Notify users of new scam patterns

## 📝 Note

This is a **frontend prototype** built for hackathon demonstration purposes. The analysis results are simulated. A real backend with AI/ML models would be integrated in a production version.

## 📜 License

MIT License — feel free to use this project for your hackathon or portfolio.

---

**Built with ❤️ to protect students from internship scams.**
`);

console.log('\\n✅ All project files created successfully!');
console.log('\\nNext steps:');
console.log('1. Run: npm install');
console.log('2. Run: npm run dev');
console.log('3. Open: http://localhost:3000');
