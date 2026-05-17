import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { AlertTriangle, CheckCircle, XCircle, ArrowLeft, ArrowRight, Shield, Share2, Copy, Check, Globe, Mail, Building2, Database, ShieldAlert, ShieldCheck, Lock, LockOpen, Clock, Link2, ServerCrash } from 'lucide-react'
import RiskMeter from '@/components/RiskMeter'
import ScrollReveal from '@/components/ScrollReveal'
import LoadingAnimation from '@/components/LoadingAnimation'
import RedFlagTooltip from '@/components/RedFlagTooltip'

const getSeverityFromScore = (score) => {
  if (score >= 70) return 'high'
  if (score >= 40) return 'medium'
  return 'low'
}

const getSeverityConfig = (s) => {
  if (s === 'high') return { color: '#ef4444', bg: 'rgba(239,68,68,0.1)', border: 'rgba(239,68,68,0.2)', icon: XCircle }
  if (s === 'medium') return { color: '#f59e0b', bg: 'rgba(245,158,11,0.1)', border: 'rgba(245,158,11,0.2)', icon: AlertTriangle }
  return { color: '#22c55e', bg: 'rgba(34,197,94,0.1)', border: 'rgba(34,197,94,0.2)', icon: CheckCircle }
}

const getRecommendation = (score) => {
  if (score >= 70) return 'Proceed with extreme caution. This internship posting shows multiple red flags commonly associated with scam postings. We recommend verifying the company through official channels, never paying any fees, and checking reviews on trusted platforms before proceeding.'
  if (score >= 40) return 'This posting shows some warning signs. While it may be legitimate, we recommend doing additional research on the company, verifying contact information, and being cautious about sharing personal details.'
  return 'This internship posting appears to be mostly safe. However, always exercise standard caution when applying — verify the company details and never share sensitive information upfront.'
}

export default function Results() {
  const router = useRouter()
  const [result, setResult] = useState(null)
  const [copied, setCopied] = useState(false)
  const [showShare, setShowShare] = useState(false)
  const [reported, setReported] = useState(false)

  useEffect(() => {
    // Get result from localStorage
    const stored = localStorage.getItem('analysisResult')
    if (stored) {
      setResult(JSON.parse(stored))
    } else {
      router.push('/analyze')
    }
  }, [router])

  const shareText = result ? `I checked an internship on InternShield and got a risk score of ${result.riskScore}/95 (${result.status}). Check your internships too!` : ''
  const shareUrl = typeof window !== 'undefined' ? window.location.origin : ''

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`${shareText}\n\n${shareUrl}`)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const shareToWhatsApp = () => {
    const text = encodeURIComponent(shareText + '\n\n' + shareUrl)
    window.open(`https://wa.me/?text=${text}`, '_blank')
  }

  const shareToTwitter = () => {
    const text = encodeURIComponent(shareText)
    const url = encodeURIComponent(shareUrl)
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank')
  }

  const shareToLinkedIn = () => {
    const url = encodeURIComponent(shareUrl)
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank')
  }

  const reportAsScam = async () => {
    try {
      const stored = localStorage.getItem('analysisResult')
      if (!stored) return
      const parsed = JSON.parse(stored)
      const text = parsed._originalText || parsed.summary || ''
      if (!text) return
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001'
      await fetch(`${backendUrl}/api/analyze/report-scam`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      })
      setReported(true)
    } catch {
      setReported(true)
    }
  }

  if (!result) return <LoadingAnimation />

  const riskScore = result.riskScore ?? 0
  const overallSeverity = getSeverityFromScore(riskScore)
  const reasons = (result.reasons || []).map((r) => ({
    text: typeof r === 'string' ? r : r.text || r.reason || String(r),
    severity: overallSeverity,
  }))

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-32 pb-24 px-6 min-h-screen"
    >
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16">
            <p className="text-white/30 text-sm font-medium uppercase tracking-wider mb-4">Analysis Complete</p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display tracking-tight mb-4">
              Risk
              <br />
              <span className="text-white/20">Assessment.</span>
            </h1>
          </div>
        </ScrollReveal>

        {/* Risk Score */}
        <ScrollReveal delay={0.1}>
          <div className="card p-12 text-center mb-6">
            <RiskMeter score={riskScore} />
            
            {/* Share Button */}
            <div className="mt-8 flex justify-center">
              <span className="btn-gradient-wrap">
                <button
                  onClick={() => setShowShare(!showShare)}
                  className="btn-outline px-6 py-3 inline-flex items-center gap-2"
                >
                  <Share2 className="w-4 h-4" />
                  Share Results
                </button>
              </span>
            </div>

            {/* Share Options */}
            {showShare && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-4 rounded-xl bg-white/[0.03] border border-white/10"
              >
                <p className="text-white/40 text-sm mb-3">Share via:</p>
                <div className="flex flex-wrap items-center justify-center gap-2">
                  <button
                    onClick={shareToWhatsApp}
                    className="px-4 py-2 rounded-lg bg-green-500/10 hover:bg-green-500/20 border border-green-500/20 text-green-400 text-sm transition-all"
                  >
                    WhatsApp
                  </button>
                  <button
                    onClick={shareToTwitter}
                    className="px-4 py-2 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 text-blue-400 text-sm transition-all"
                  >
                    Twitter
                  </button>
                  <button
                    onClick={shareToLinkedIn}
                    className="px-4 py-2 rounded-lg bg-blue-600/10 hover:bg-blue-600/20 border border-blue-600/20 text-blue-400 text-sm transition-all"
                  >
                    LinkedIn
                  </button>
                  <button
                    onClick={copyToClipboard}
                    className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white/60 text-sm transition-all inline-flex items-center gap-2"
                  >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    {copied ? 'Copied!' : 'Copy Link'}
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </ScrollReveal>

        {/* Red Flags */}
        <ScrollReveal delay={0.2}>
          <div className="card p-8 mb-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center">
                <AlertTriangle className="w-4 h-4 text-red-500" />
              </div>
              <h3 className="text-lg font-semibold">Detected Red Flags</h3>
              <span className="ml-auto px-3 py-1 rounded-full bg-red-500/10 text-red-400 text-xs font-medium border border-red-500/20">
                {reasons.length} found
              </span>
            </div>
            <div className="space-y-3">
              {reasons.map((flag, i) => {
                const config = getSeverityConfig(flag.severity)
                const Icon = config.icon
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="flex items-start gap-3 p-4 rounded-xl"
                    style={{ background: config.bg, border: `1px solid ${config.border}` }}
                  >
                    <Icon className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: config.color }} />
                    <span className="text-sm text-white/80 flex-1">{flag.text}</span>
                    <RedFlagTooltip text={flag.text} />
                    <span
                      className="ml-2 text-xs font-medium px-2 py-1 rounded-full capitalize flex-shrink-0"
                      style={{ color: config.color, background: `${config.color}15` }}
                    >
                      {flag.severity}
                    </span>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </ScrollReveal>

        {/* Website Safety */}
        {result.websiteSafety && (
          <ScrollReveal delay={0.22}>
            <div className="card p-8 mb-6">
              <div className="flex items-center gap-3 mb-6">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${result.websiteSafety.overallSafe ? 'bg-green-500/10' : 'bg-red-500/10'}`}>
                  <Globe className={`w-4 h-4 ${result.websiteSafety.overallSafe ? 'text-green-500' : 'text-red-500'}`} />
                </div>
                <h3 className="text-lg font-semibold">Website Safety</h3>
                <span className={`ml-auto px-3 py-1 rounded-full text-xs font-medium border ${
                  result.websiteSafety.overallSafe
                    ? 'bg-green-500/10 text-green-400 border-green-500/20'
                    : 'bg-red-500/10 text-red-400 border-red-500/20'
                }`}>
                  {result.websiteSafety.overallSafe ? 'Safe' : 'Suspicious'}
                </span>
              </div>
              <div className="space-y-3">
                {Object.entries(result.websiteSafety.checks).map(([key, check]) => {
                  const icons = { ssl: Lock, domainAge: Clock, securityHeaders: ShieldCheck, urlStructure: Link2 }
                  const labels = { ssl: 'SSL Certificate', domainAge: 'Domain Age', securityHeaders: 'Security Headers', urlStructure: 'URL Structure' }
                  const CheckIcon = icons[key] || Globe
                  return (
                    <div key={key} className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/5">
                      <div className={`w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5 ${check.passed ? 'bg-green-500/10' : 'bg-red-500/10'}`}>
                        {check.passed ? <CheckCircle className="w-3.5 h-3.5 text-green-500" /> : <XCircle className="w-3.5 h-3.5 text-red-500" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-white/80 font-medium">{labels[key] || key}</p>
                        <p className="text-xs text-white/40 mt-0.5">{check.details}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </ScrollReveal>
        )}

        {/* Company Verification */}
        {result.companyVerification && (
          <ScrollReveal delay={0.24}>
            <div className="card p-8 mb-6">
              <div className="flex items-center gap-3 mb-6">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  result.companyVerification.isVerifiable ? 'bg-green-500/10' : 'bg-amber-500/10'
                }`}>
                  <Building2 className={`w-4 h-4 ${
                    result.companyVerification.isVerifiable ? 'text-green-500' : 'text-amber-500'
                  }`} />
                </div>
                <h3 className="text-lg font-semibold">Company Verification</h3>
                <span className={`ml-auto px-3 py-1 rounded-full text-xs font-medium border ${
                  result.companyVerification.confidence === 'high'
                    ? 'bg-green-500/10 text-green-400 border-green-500/20'
                    : result.companyVerification.confidence === 'medium'
                    ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                    : 'bg-red-500/10 text-red-400 border-red-500/20'
                }`}>
                  {result.companyVerification.confidence} confidence
                </span>
              </div>
              {result.companyVerification.companyName && (
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 mb-4">
                  <p className="text-xs text-white/40 uppercase tracking-wider mb-1">Company Name</p>
                  <p className="text-sm text-white/80 font-medium">{result.companyVerification.companyName}</p>
                </div>
              )}
              <p className="text-sm text-white/60 leading-relaxed mb-4">{result.companyVerification.details}</p>
              {result.companyVerification.flags && result.companyVerification.flags.length > 0 && (
                <div className="space-y-2">
                  {result.companyVerification.flags.map((flag, i) => (
                    <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-amber-500/5 border border-amber-500/10">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
                      <span className="text-xs text-white/60">{flag}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </ScrollReveal>
        )}

        {/* Email Verification */}
        {result.emailVerification && result.emailVerification.emailsFound && result.emailVerification.emailsFound.length > 0 && (
          <ScrollReveal delay={0.26}>
            <div className="card p-8 mb-6">
              <div className="flex items-center gap-3 mb-6">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  result.emailVerification.overallRisk === 'low' ? 'bg-green-500/10'
                    : result.emailVerification.overallRisk === 'medium' ? 'bg-amber-500/10' : 'bg-red-500/10'
                }`}>
                  <Mail className={`w-4 h-4 ${
                    result.emailVerification.overallRisk === 'low' ? 'text-green-500'
                      : result.emailVerification.overallRisk === 'medium' ? 'text-amber-500' : 'text-red-500'
                  }`} />
                </div>
                <h3 className="text-lg font-semibold">Email Verification</h3>
                <span className={`ml-auto px-3 py-1 rounded-full text-xs font-medium border ${
                  result.emailVerification.overallRisk === 'low'
                    ? 'bg-green-500/10 text-green-400 border-green-500/20'
                    : result.emailVerification.overallRisk === 'medium'
                    ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                    : 'bg-red-500/10 text-red-400 border-red-500/20'
                }`}>
                  {result.emailVerification.overallRisk} risk
                </span>
              </div>
              <p className="text-sm text-white/60 mb-4">{result.emailVerification.details}</p>
              <div className="space-y-2">
                {result.emailVerification.emailsFound.map((entry, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/5">
                    <div className={`w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0 ${
                      entry.isFreeProvider ? 'bg-amber-500/10' : 'bg-green-500/10'
                    }`}>
                      <Mail className={`w-3.5 h-3.5 ${entry.isFreeProvider ? 'text-amber-500' : 'text-green-500'}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-white/80 font-mono truncate">{entry.email}</p>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {entry.isFreeProvider && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">Free Provider</span>
                        )}
                        {entry.matchesCompany === false && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-red-500/10 text-red-400 border border-red-500/20">Domain Mismatch</span>
                        )}
                        {entry.matchesCompany === true && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-green-500/10 text-green-400 border border-green-500/20">Domain Match</span>
                        )}
                        {!entry.hasMxRecord && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-red-500/10 text-red-400 border border-red-500/20">No MX Record</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        )}

        {/* Pattern Matches */}
        {result.patternMatches && result.patternMatches.length > 0 && (
          <ScrollReveal delay={0.28}>
            <div className="card p-8 mb-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center">
                  <Database className="w-4 h-4 text-purple-500" />
                </div>
                <h3 className="text-lg font-semibold">Known Scam Patterns</h3>
                <span className="ml-auto px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 text-xs font-medium border border-purple-500/20">
                  {result.patternMatches.length} matched
                </span>
              </div>
              <p className="text-xs text-white/40 mb-4">These phrases matched our database of known scam patterns learned from previously detected scams.</p>
              <div className="flex flex-wrap gap-2">
                {result.patternMatches.map((pattern, i) => (
                  <div key={i} className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-purple-500/5 border border-purple-500/10">
                    <span className="text-xs text-white/70 font-mono">&quot;{pattern.phrase}&quot;</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-400 capitalize">{pattern.category.replace(/_/g, ' ')}</span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        )}

        {/* Recommendation */}
        <ScrollReveal delay={0.3}>
          <div className="card p-8 mb-6" style={{ borderColor: riskScore >= 70 ? 'rgba(239,68,68,0.2)' : riskScore >= 40 ? 'rgba(245,158,11,0.2)' : 'rgba(34,197,94,0.2)' }}>
            <div className="flex items-start gap-4 mb-6">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                riskScore >= 70 ? 'bg-red-500/10' : riskScore >= 40 ? 'bg-amber-500/10' : 'bg-green-500/10'
              }`}>
                <Shield className={`w-5 h-5 ${
                  riskScore >= 70 ? 'text-red-500' : riskScore >= 40 ? 'text-amber-500' : 'text-green-500'
                }`} />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-2">Our Recommendation</h3>
                <p className="text-white/60 text-sm leading-relaxed mb-4">
                  {result.summary || getRecommendation(riskScore)}
                </p>
              </div>
            </div>

            {/* Why Section */}
            <div className="border-t border-white/10 pt-6 mb-6">
              <h4 className="text-sm font-semibold text-white/80 mb-3">
                {riskScore >= 70 ? '🚨 Why This is Likely a Scam:' : 
                 riskScore >= 40 ? '⚠️ Why You Should Be Cautious:' : 
                 '✅ Why This Appears Legitimate:'}
              </h4>
              <ul className="space-y-2">
                {riskScore >= 70 ? (
                  <>
                    <li className="text-sm text-white/60 flex items-start gap-2">
                      <span className="text-red-400 mt-1">•</span>
                      <span>Multiple red flags detected that are commonly associated with scam postings</span>
                    </li>
                    <li className="text-sm text-white/60 flex items-start gap-2">
                      <span className="text-red-400 mt-1">•</span>
                      <span>Patterns match known fraudulent internship schemes</span>
                    </li>
                    <li className="text-sm text-white/60 flex items-start gap-2">
                      <span className="text-red-400 mt-1">•</span>
                      <span>High probability of financial loss or data theft</span>
                    </li>
                  </>
                ) : riskScore >= 40 ? (
                  <>
                    <li className="text-sm text-white/60 flex items-start gap-2">
                      <span className="text-yellow-400 mt-1">•</span>
                      <span>Some suspicious elements detected that warrant investigation</span>
                    </li>
                    <li className="text-sm text-white/60 flex items-start gap-2">
                      <span className="text-yellow-400 mt-1">•</span>
                      <span>May be legitimate but lacks professional standards</span>
                    </li>
                    <li className="text-sm text-white/60 flex items-start gap-2">
                      <span className="text-yellow-400 mt-1">•</span>
                      <span>Additional verification recommended before proceeding</span>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="text-sm text-white/60 flex items-start gap-2">
                      <span className="text-green-400 mt-1">•</span>
                      <span>Few or no red flags detected in the posting</span>
                    </li>
                    <li className="text-sm text-white/60 flex items-start gap-2">
                      <span className="text-green-400 mt-1">•</span>
                      <span>Follows professional internship posting standards</span>
                    </li>
                    <li className="text-sm text-white/60 flex items-start gap-2">
                      <span className="text-green-400 mt-1">•</span>
                      <span>Appears to be from a legitimate organization</span>
                    </li>
                  </>
                )}
              </ul>
            </div>

            {/* What to Do Section */}
            <div className="border-t border-white/10 pt-6">
              <h4 className="text-sm font-semibold text-white/80 mb-3">
                {riskScore >= 70 ? '🛡️ What You Should Do:' : 
                 riskScore >= 40 ? '🔍 Steps to Verify:' : 
                 '✓ Recommended Next Steps:'}
              </h4>
              <div className="space-y-3">
                {riskScore >= 70 ? (
                  <>
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-red-500/5 border border-red-500/10">
                      <span className="text-lg">❌</span>
                      <div>
                        <p className="text-sm font-medium text-white/80 mb-1">Do NOT proceed with this internship</p>
                        <p className="text-xs text-white/50">Avoid sharing personal information or making any payments</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-white/5">
                      <span className="text-lg">📢</span>
                      <div>
                        <p className="text-sm font-medium text-white/80 mb-1">Report this scam</p>
                        <p className="text-xs text-white/50">Help others by reporting to cybercrime.gov.in or local authorities</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-white/5">
                      <span className="text-lg">🔍</span>
                      <div>
                        <p className="text-sm font-medium text-white/80 mb-1">Look for legitimate alternatives</p>
                        <p className="text-xs text-white/50">Use verified platforms like LinkedIn, Internshala, or company career pages</p>
                      </div>
                    </div>
                  </>
                ) : riskScore >= 40 ? (
                  <>
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-yellow-500/5 border border-yellow-500/10">
                      <span className="text-lg">🔍</span>
                      <div>
                        <p className="text-sm font-medium text-white/80 mb-1">Research the company thoroughly</p>
                        <p className="text-xs text-white/50">Check company website, LinkedIn, Glassdoor reviews, and registration details</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-white/5">
                      <span className="text-lg">📧</span>
                      <div>
                        <p className="text-sm font-medium text-white/80 mb-1">Verify contact information</p>
                        <p className="text-xs text-white/50">Ensure they use official company email, not Gmail/Yahoo</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-white/5">
                      <span className="text-lg">💰</span>
                      <div>
                        <p className="text-sm font-medium text-white/80 mb-1">Never pay any fees</p>
                        <p className="text-xs text-white/50">Legitimate internships don't require registration or processing fees</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-white/5">
                      <span className="text-lg">👥</span>
                      <div>
                        <p className="text-sm font-medium text-white/80 mb-1">Ask for references</p>
                        <p className="text-xs text-white/50">Request to speak with current or past interns</p>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-green-500/5 border border-green-500/10">
                      <span className="text-lg">✅</span>
                      <div>
                        <p className="text-sm font-medium text-white/80 mb-1">Proceed with standard caution</p>
                        <p className="text-xs text-white/50">This appears legitimate, but always verify before sharing sensitive information</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-white/5">
                      <span className="text-lg">📄</span>
                      <div>
                        <p className="text-sm font-medium text-white/80 mb-1">Review the offer letter carefully</p>
                        <p className="text-xs text-white/50">Check for clear terms, responsibilities, and compensation details</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-white/5">
                      <span className="text-lg">🌐</span>
                      <div>
                        <p className="text-sm font-medium text-white/80 mb-1">Verify company details</p>
                        <p className="text-xs text-white/50">Visit official website and check social media presence</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-white/5">
                      <span className="text-lg">📞</span>
                      <div>
                        <p className="text-sm font-medium text-white/80 mb-1">Confirm through official channels</p>
                        <p className="text-xs text-white/50">Contact HR through company's official phone number or email</p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Additional Resources */}
            <div className="border-t border-white/10 pt-6 mt-6">
              <p className="text-xs text-white/40 mb-2">📚 Additional Resources:</p>
              <div className="flex flex-wrap gap-2">
                <a 
                  href="https://cybercrime.gov.in" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-xs px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-white/50 hover:text-white/70 border border-white/10 transition-all"
                >
                  Report Cybercrime
                </a>
                <a 
                  href="https://www.linkedin.com/jobs" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-xs px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-white/50 hover:text-white/70 border border-white/10 transition-all"
                >
                  LinkedIn Jobs
                </a>
                <a 
                  href="https://internshala.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-xs px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-white/50 hover:text-white/70 border border-white/10 transition-all"
                >
                  Internshala
                </a>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Analysis Details */}
        <ScrollReveal delay={0.4}>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            {[
              { label: 'Risk Score', value: `${riskScore}/100`, status: riskScore >= 70 ? 'danger' : riskScore >= 40 ? 'warning' : 'safe' },
              { label: 'Status', value: result.status || 'N/A', status: result.status === 'High Risk' ? 'danger' : result.status === 'Medium Risk' ? 'warning' : 'safe' },
              { label: 'AI Analysis', value: result.aiAvailable ? 'Available' : 'Keyword Only', status: result.aiAvailable ? 'safe' : 'warning' },
            ].map((item, i) => (
              <div key={i} className="card p-6">
                <p className="text-white/30 text-xs font-medium uppercase tracking-wider mb-2">{item.label}</p>
                <p className={`text-lg font-semibold ${
                  item.status === 'danger' ? 'text-red-400' : item.status === 'safe' ? 'text-green-400' : 'text-amber-400'
                }`}>{item.value}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* Actions */}
        <ScrollReveal delay={0.5}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <span className="btn-gradient-wrap">
              <Link href="/analyze" className="btn-outline px-8 py-4 group">
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Analyze Another
              </Link>
            </span>
            {riskScore >= 40 && (
              <span className="btn-gradient-wrap">
                <button
                  onClick={reportAsScam}
                  disabled={reported}
                  className={`px-8 py-4 rounded-full text-sm font-medium transition-all inline-flex items-center gap-2 ${
                    reported
                      ? 'bg-green-900 text-green-400 cursor-default'
                      : 'bg-red-900 text-red-400 hover:bg-red-800'
                  }`}
                >
                  <ShieldAlert className="w-4 h-4" />
                  {reported ? 'Reported — Thank you!' : 'Report as Scam'}
                </button>
              </span>
            )}
            <span className="btn-gradient-wrap">
              <Link href="/" className="btn-primary px-8 py-4 group">
                Back to Home
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </span>
          </div>
        </ScrollReveal>
      </div>
    </motion.div>
  )
}
