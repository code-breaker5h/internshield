import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { motion, AnimatePresence } from 'framer-motion'
import { Link2, FileText, Image, ArrowRight, Upload, LogIn, ChevronRight, ChevronLeft } from 'lucide-react'
import ScrollReveal from '@/components/ScrollReveal'
import LoadingAnimation from '@/components/LoadingAnimation'
import GradientBackground from '@/components/GradientBackground'
import CreditsDisplay from '@/components/CreditsDisplay'
import { createWorker } from 'tesseract.js'
import { useAuth } from '@/contexts/AuthContext'
import { hasGuestUsedFreeAnalysis, markGuestAnalysisUsed, getGuestCredits, getGuestCreditResetTime } from '@/lib/creditsManager'
import Link from 'next/link'

// Tutorial steps
const tutorialSteps = [
  {
    title: 'Welcome to InternShield! 🛡️',
    description: 'Let us show you how to analyze internship postings for potential scams.',
    highlight: null
  },
  {
    title: 'Step 1: Choose Input Method',
    description: 'You can analyze by URL, paste text description, or upload a screenshot of the posting.',
    highlight: 'tabs'
  },
  {
    title: 'Step 2: Enter Details',
    description: 'Paste the internship URL, copy the full job description, or upload a clear screenshot.',
    highlight: 'input'
  },
  {
    title: 'Step 3: Try Demo Examples',
    description: 'Click any demo example to see how different risk levels look. This is FREE!',
    highlight: 'demo'
  },
  {
    title: 'Step 4: Analyze',
    description: 'Click "Analyze Internship" to get your risk score and detailed report.',
    highlight: 'button'
  }
]

export default function Analyze() {
  const router = useRouter()
  const { isAuthenticated, credits, useCredit, saveAnalysis } = useAuth()
  const [activeTab, setActiveTab] = useState('url')
  const [url, setUrl] = useState('')
  const [description, setDescription] = useState('')
  const [fileName, setFileName] = useState('')
  const [imageFile, setImageFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [ocrProgress, setOcrProgress] = useState(0)
  const [showCreditsWarning, setShowCreditsWarning] = useState(false)
  const [showTutorial, setShowTutorial] = useState(false)
  const [tutorialStep, setTutorialStep] = useState(0)

  const tabs = [
    { id: 'url', label: 'URL', icon: Link2 },
    { id: 'text', label: 'Description', icon: FileText },
    { id: 'image', label: 'Screenshot', icon: Image },
  ]

  const [error, setError] = useState('')

  // Check if user is first time visitor
  useEffect(() => {
    const hasSeenTutorial = localStorage.getItem('hasSeenTutorial')
    if (!hasSeenTutorial) {
      setShowTutorial(true)
    }
  }, [])

  const completeTutorial = () => {
    localStorage.setItem('hasSeenTutorial', 'true')
    setShowTutorial(false)
  }

  const nextTutorialStep = () => {
    if (tutorialStep < tutorialSteps.length - 1) {
      setTutorialStep(tutorialStep + 1)
    } else {
      completeTutorial()
    }
  }

  const prevTutorialStep = () => {
    if (tutorialStep > 0) {
      setTutorialStep(tutorialStep - 1)
    }
  }

  // Demo examples
  const demoExamples = [
    {
      name: 'High Risk Scam',
      text: `🚨 URGENT INTERNSHIP OPPORTUNITY! 🚨

Amazing opportunity at Global Tech Solutions! 

✅ GUARANTEED JOB after internship
✅ 100% PLACEMENT RECORD
✅ Earn Rs 50,000/month from Day 1

⚡ LIMITED SEATS - Only 10 spots left!
⚡ Registration closes in 24 HOURS!

📋 Simple Process:
1. Pay Rs 5,000 registration fee
2. Pay Rs 3,000 training fee
3. Start immediately!

💰 REFUNDABLE after placement (guaranteed!)

📱 Contact us NOW on WhatsApp: +91-9876543210
📧 Email: opportunity@gmail.com

⏰ HURRY! Offer expires soon!
🎯 No experience needed!
🎓 No skills required!

Don't miss this GOLDEN OPPORTUNITY! Act FAST!`,
      risk: 'High'
    },
    {
      name: 'Medium Risk',
      text: `Digital Marketing Internship

Company: NextGen Solutions

We are looking for enthusiastic interns!

Duration: 3 months
Stipend: Performance-based (up to Rs 15,000)
Location: Remote

Responsibilities:
- Social media management
- Content creation
- Email marketing

Requirements:
- Good communication skills
- Basic computer knowledge
- No prior experience needed

Benefits:
- Flexible working hours
- Certificate of completion
- Potential for full-time role

Note: Training period of 1 month (unpaid)

To apply, send your resume to: careers@gmail.com
Or WhatsApp: +91-7654321098

Immediate joining available!`,
      risk: 'Medium'
    },
    {
      name: 'Low Risk Legitimate',
      text: `Software Development Internship

Company: TechCorp India Private Limited
Location: Bangalore, Karnataka
Website: www.techcorp.co.in

About Us:
TechCorp is a leading software development company with 500+ employees, established in 2010.

Internship Details:
Position: Full Stack Developer Intern
Duration: 6 months
Stipend: Rs 15,000 per month
Type: In-office (with hybrid option after 2 months)

Requirements:
- Currently pursuing B.Tech/MCA in Computer Science
- Knowledge of JavaScript, React, Node.js
- Good problem-solving skills
- Available for full-time internship (40 hours/week)

Responsibilities:
- Develop and maintain web applications
- Collaborate with senior developers
- Participate in code reviews
- Learn industry best practices

What We Offer:
- Mentorship from experienced developers
- Real-world project experience
- Certificate of completion
- Potential for pre-placement offer (PPO)

Application Process:
1. Submit your resume and portfolio
2. Online coding assessment
3. Technical interview
4. HR interview

How to Apply:
Send your resume to: careers@techcorp.co.in
Subject: "Full Stack Intern Application - [Your Name]"

Application Deadline: March 31, 2026

Note: We do not charge any fees for internship applications or placements.

Contact:
HR Department: +91-80-12345678
Office Address: Tech Park, Whitefield, Bangalore - 560066`,
      risk: 'Low'
    },
    {
      name: 'Payment Scam',
      text: `Software Development Internship - Work From Home

Company: TechVentures International

We are hiring interns for our new project!

Requirements:
- Any graduate
- No experience required
- Immediate joining

Benefits:
- Stipend: Rs 25,000/month (after training)
- Certificate provided
- Guaranteed placement in top companies

Process:
Step 1: Pay Rs 2,999 processing fee
Step 2: Pay Rs 1,999 for certificate
Step 3: Complete 2-week unpaid training
Step 4: Start earning!

Limited seats available! Only 5 positions left!

Contact: DM us on Telegram @techintern
Email: hr.techventures@yahoo.com

Apply now before seats fill up!`,
      risk: 'High'
    }
  ]

  const loadExample = (example) => {
    setActiveTab('text')
    setDescription(example.text)
    setError('')
  }

  const handleFileChange = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      setFileName(file.name)
      setImageFile(file)
      setError('')
    }
  }

  const extractTextFromImage = async (file) => {
    try {
      setOcrProgress(0)
      const worker = await createWorker('eng', 1, {
        logger: (m) => {
          if (m.status === 'recognizing text') {
            setOcrProgress(Math.round(m.progress * 100))
          }
        },
      })

      const { data: { text } } = await worker.recognize(file)
      await worker.terminate()
      
      if (!text || text.trim().length === 0) {
        throw new Error('No text found in image. Please try a clearer screenshot.')
      }
      
      return text.trim()
    } catch (err) {
      throw new Error('Failed to extract text from image: ' + err.message)
    }
  }

  const handleAnalyze = async () => {
    // Check credits before analyzing
    if (isAuthenticated) {
      if (credits <= 0) {
        setShowCreditsWarning(true);
        setError('You have no credits remaining. Credits will refresh in 24 hours.');
        return;
      }
    } else {
      // Guest user
      if (hasGuestUsedFreeAnalysis()) {
        setShowCreditsWarning(true);
        const resetInfo = getGuestCreditResetTime();
        if (resetInfo && resetInfo.hours > 0) {
          setError(`You have used your free analysis. Please wait ${resetInfo.hours}h ${resetInfo.minutes}m or login to get 5 more credits.`);
        } else {
          setError('You have used your free analysis. Please login to get 5 more credits per day.');
        }
        return;
      }
    }

    setLoading(true)
    setError('')
    setOcrProgress(0)
    setShowCreditsWarning(false)
    
    try {
      const body = {}
      
      if (activeTab === 'url') {
        if (!url.trim()) {
          throw new Error('Please enter a URL')
        }
        body.url = url.trim()
      } else if (activeTab === 'text') {
        if (!description.trim()) {
          throw new Error('Please enter internship description')
        }
        body.text = description.trim()
      } else if (activeTab === 'image') {
        if (!imageFile) {
          throw new Error('Please upload a screenshot')
        }
        // Extract text from image using OCR
        const extractedText = await extractTextFromImage(imageFile)
        body.text = extractedText
      }

      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Analysis failed')
      
      // Deduct credit after successful analysis
      if (isAuthenticated) {
        await useCredit();
        // Save to user's history
        await saveAnalysis({
          text: body.text || '',
          url: body.url || '',
          riskScore: data.riskScore,
          status: data.status,
          reasons: data.reasons,
        });
      } else {
        // Mark guest analysis as used
        markGuestAnalysisUsed();
      }
      
      // Save to local history
      const historyItem = {
        timestamp: new Date().toISOString(),
        preview: activeTab === 'url' ? url.substring(0, 50) : 
                 activeTab === 'text' ? body.text.substring(0, 50) + '...' :
                 'Screenshot Analysis',
        result: data,
        input: body
      }
      
      const history = JSON.parse(localStorage.getItem('analysisHistory') || '[]')
      history.unshift(historyItem) // Add to beginning
      if (history.length > 50) history.pop() // Keep last 50
      localStorage.setItem('analysisHistory', JSON.stringify(history))
      
      localStorage.setItem('analysisResult', JSON.stringify(data))
      router.push('/results')
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.')
      setLoading(false)
      setOcrProgress(0)
    }
  }

  const hasInput = activeTab === 'url' ? url.trim() : activeTab === 'text' ? description.trim() : imageFile

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <LoadingAnimation />
        {ocrProgress > 0 && ocrProgress < 100 && (
          <div className="mt-8 text-center">
            <p className="text-white/60 text-sm mb-2">Extracting text from image...</p>
            <div className="w-64 h-2 bg-white/10 rounded-full overflow-hidden">
              <div 
                className="h-full bg-white/40 transition-all duration-300"
                style={{ width: `${ocrProgress}%` }}
              />
            </div>
            <p className="text-white/40 text-xs mt-2">{ocrProgress}%</p>
          </div>
        )}
      </div>
    )
  }

  return (
    <>
      {/* Tutorial Modal */}
      <AnimatePresence>
        {showTutorial && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-2xl p-8 max-w-md w-full shadow-2xl"
            >
              {/* Progress dots */}
              <div className="flex justify-center gap-2 mb-6">
                {tutorialSteps.map((_, i) => (
                  <div
                    key={i}
                    className={`w-2 h-2 rounded-full transition-all ${
                      i === tutorialStep ? 'bg-white w-6' : 'bg-white/20'
                    }`}
                  />
                ))}
              </div>

              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-white mb-3">
                  {tutorialSteps[tutorialStep].title}
                </h2>
                <p className="text-white/60">
                  {tutorialSteps[tutorialStep].description}
                </p>
              </div>

              {/* Tutorial illustration */}
              <div className="bg-white/5 rounded-xl p-6 mb-8 text-center">
                {tutorialStep === 0 && <span className="text-6xl">🛡️</span>}
                {tutorialStep === 1 && (
                  <div className="flex justify-center gap-4">
                    <div className="flex flex-col items-center gap-2">
                      <Link2 className="w-8 h-8 text-violet-400" />
                      <span className="text-xs text-white/40">URL</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <FileText className="w-8 h-8 text-violet-400" />
                      <span className="text-xs text-white/40">Text</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <Image className="w-8 h-8 text-violet-400" />
                      <span className="text-xs text-white/40">Image</span>
                    </div>
                  </div>
                )}
                {tutorialStep === 2 && <span className="text-6xl">📝</span>}
                {tutorialStep === 3 && (
                  <div className="flex justify-center gap-2">
                    <span className="px-3 py-1 rounded bg-green-500/20 text-green-400 text-sm">Low Risk</span>
                    <span className="px-3 py-1 rounded bg-yellow-500/20 text-yellow-400 text-sm">Medium</span>
                    <span className="px-3 py-1 rounded bg-red-500/20 text-red-400 text-sm">High Risk</span>
                  </div>
                )}
                {tutorialStep === 4 && <span className="text-6xl">✨</span>}
              </div>

              <div className="flex gap-3">
                {tutorialStep > 0 && (
                  <button
                    onClick={prevTutorialStep}
                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-white/5 text-white/60 hover:bg-white/10 transition-all"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Back
                  </button>
                )}
                <button
                  onClick={nextTutorialStep}
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-white text-black font-medium hover:bg-white/90 transition-all"
                >
                  {tutorialStep === tutorialSteps.length - 1 ? 'Get Started' : 'Next'}
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={completeTutorial}
                className="w-full mt-4 py-2 text-white/40 hover:text-white/60 text-sm transition-all"
              >
                Skip tutorial
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-32 pb-24 px-6 min-h-screen relative"
    >
      <GradientBackground color="violet" />
      <div className="max-w-3xl mx-auto relative z-10">
        <ScrollReveal>
          <div className="text-center mb-12">
            <p className="text-white/30 text-sm font-medium uppercase tracking-wider mb-4">Analyzer</p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display tracking-tight mb-4">
              Analyze an
              <br />
              <span className="text-white/20">internship.</span>
            </h1>
            <p className="text-white/40 text-lg max-w-xl mx-auto mb-6">
              Paste a link, description, or upload a screenshot to get started.
            </p>
            <div className="flex justify-center">
              <CreditsDisplay />
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="card p-8">
            {/* Demo Examples */}
            <div className="mb-6 p-4 rounded-xl bg-white/[0.02] border border-white/5">
              <p className="text-white/40 text-xs font-medium uppercase tracking-wider mb-3">
                Try Demo Examples
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {demoExamples.map((example, i) => (
                  <button
                    key={i}
                    onClick={() => loadExample(example)}
                    className="px-3 py-2 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 hover:border-white/20 transition-all duration-200 text-xs text-white/60 hover:text-white/90"
                  >
                    <span className={`inline-block w-2 h-2 rounded-full mr-2 ${
                      example.risk === 'High' ? 'bg-red-500' : 
                      example.risk === 'Medium' ? 'bg-yellow-500' : 
                      'bg-green-500'
                    }`} />
                    {example.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-1 p-1 bg-white/[0.03] rounded-xl mb-8">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-white/10 text-white'
                      : 'text-white/30 hover:text-white/50'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </div>

            {/* URL */}
            {activeTab === 'url' && (
              <div>
                <label className="block text-white/30 text-xs font-medium uppercase tracking-wider mb-3">
                  Internship URL
                </label>
                <input
                  type="url"
                  value={url}
                  onChange={e => setUrl(e.target.value)}
                  placeholder="https://example.com/internship-posting"
                  className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-white/20 outline-none focus:border-white/20 transition-colors text-sm"
                />
              </div>
            )}

            {/* Text */}
            {activeTab === 'text' && (
              <div>
                <label className="block text-white/30 text-xs font-medium uppercase tracking-wider mb-3">
                  Internship Description
                </label>
                <textarea
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  placeholder="Paste the internship description here..."
                  rows={8}
                  className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-white/20 outline-none focus:border-white/20 transition-colors text-sm resize-none"
                />
              </div>
            )}

            {/* Screenshot */}
            {activeTab === 'image' && (
              <div>
                <label className="block text-white/30 text-xs font-medium uppercase tracking-wider mb-3">
                  Screenshot Upload
                </label>
                <label className="flex flex-col items-center justify-center py-16 border-2 border-dashed border-white/10 rounded-xl cursor-pointer hover:border-white/20 hover:bg-white/[0.02] transition-all duration-300">
                  <Upload className="w-8 h-8 text-white/20 mb-3" />
                  <span className="text-white/40 text-sm">{fileName || 'Click to upload screenshot'}</span>
                  <span className="text-white/20 text-xs mt-1">PNG, JPG up to 10MB</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </label>
                {fileName && (
                  <div className="mt-3 p-3 rounded-lg bg-white/[0.03] border border-white/10">
                    <p className="text-white/60 text-xs">
                      ✓ Selected: <span className="text-white/80">{fileName}</span>
                    </p>
                    <p className="text-white/40 text-xs mt-1">
                      Text will be extracted automatically using OCR
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Error */}
            {error && (
              <div className="mt-4 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                {error}
                {showCreditsWarning && !isAuthenticated && (
                  <Link href="/login">
                    <span className="btn-gradient-wrap-lg w-full mt-3 block">
                      <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-black text-white rounded-lg font-medium hover:bg-black/90 transition-all">
                        <LogIn className="w-4 h-4" />
                        Login to Get 5 Credits
                      </button>
                    </span>
                  </Link>
                )}
              </div>
            )}

            {/* Analyze */}
            <span className={`btn-gradient-wrap w-full mt-8 ${!hasInput ? 'opacity-50 cursor-not-allowed' : ''}`}>
              <button
                onClick={handleAnalyze}
                disabled={!hasInput}
                className={`w-full flex items-center justify-center gap-3 py-4 rounded-full text-base font-medium transition-all duration-300 group ${
                  hasInput
                    ? 'bg-black text-white hover:bg-black/90'
                    : 'bg-black/80 text-white/40 cursor-not-allowed'
                }`}
              >
                Analyze Internship
                <ArrowRight className={`w-4 h-4 transition-transform ${hasInput ? 'group-hover:translate-x-1' : ''}`} />
              </button>
            </span>
          </div>
        </ScrollReveal>

        {/* Info */}
        <ScrollReveal delay={0.2}>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
            {[
              { icon: '🔒', text: 'Your data is never stored' },
              { icon: '⚡', text: 'Results in under 3 seconds' },
              { icon: '🎯', text: '98% detection accuracy' },
            ].map((item, i) => (
              <div key={i} className="card p-4 flex items-center gap-3">
                <span className="text-lg">{item.icon}</span>
                <span className="text-white/40 text-sm">{item.text}</span>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </motion.div>
    </>
  )
}
