import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, Trash2, Calendar, AlertTriangle, CheckCircle, XCircle } from 'lucide-react'
import ScrollReveal from '@/components/ScrollReveal'

export default function History() {
  const [history, setHistory] = useState([])

  useEffect(() => {
    const stored = localStorage.getItem('analysisHistory')
    if (stored) {
      setHistory(JSON.parse(stored))
    }
  }, [])

  const deleteItem = (index) => {
    const newHistory = history.filter((_, i) => i !== index)
    setHistory(newHistory)
    localStorage.setItem('analysisHistory', JSON.stringify(newHistory))
  }

  const clearAll = () => {
    if (confirm('Are you sure you want to clear all history?')) {
      setHistory([])
      localStorage.removeItem('analysisHistory')
    }
  }

  const viewResult = (item) => {
    localStorage.setItem('analysisResult', JSON.stringify(item.result))
    window.location.href = '/results'
  }

  const getRiskColor = (score) => {
    if (score >= 70) return 'text-red-400'
    if (score >= 40) return 'text-yellow-400'
    return 'text-green-400'
  }

  const getRiskIcon = (score) => {
    if (score >= 70) return XCircle
    if (score >= 40) return AlertTriangle
    return CheckCircle
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-32 pb-24 px-6 min-h-screen"
    >
      <div className="max-w-5xl mx-auto">
        <ScrollReveal>
          <div className="flex items-center justify-between mb-12">
            <div>
              <p className="text-white/30 text-sm font-medium uppercase tracking-wider mb-4">History</p>
              <h1 className="text-4xl sm:text-5xl font-bold font-display tracking-tight">
                Analysis
                <br />
                <span className="text-white/20">History.</span>
              </h1>
            </div>
            {history.length > 0 && (
              <button
                onClick={clearAll}
                className="px-4 py-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 text-sm transition-all"
              >
                Clear All
              </button>
            )}
          </div>
        </ScrollReveal>

        {history.length === 0 ? (
          <ScrollReveal delay={0.1}>
            <div className="card p-16 text-center">
              <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-6">
                <Calendar className="w-8 h-8 text-white/30" />
              </div>
              <h3 className="text-xl font-semibold mb-3">No Analysis History</h3>
              <p className="text-white/40 mb-8">
                Your analyzed internships will appear here
              </p>
              <span className="btn-gradient-wrap">
                <Link href="/analyze" className="btn-primary inline-flex items-center gap-2">
                  Start Analyzing
                </Link>
              </span>
            </div>
          </ScrollReveal>
        ) : (
          <div className="space-y-4">
            {history.map((item, index) => {
              const Icon = getRiskIcon(item.result.riskScore)
              return (
                <ScrollReveal key={index} delay={index * 0.05}>
                  <div className="card p-6 hover:border-white/20 transition-all cursor-pointer group">
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 ${getRiskColor(item.result.riskScore)}`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      
                      <div className="flex-1 min-w-0" onClick={() => viewResult(item)}>
                        <div className="flex items-start justify-between gap-4 mb-2">
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-white/90 mb-1 truncate">
                              {item.preview || 'Internship Analysis'}
                            </h3>
                            <p className="text-white/40 text-sm">
                              {new Date(item.timestamp).toLocaleString()}
                            </p>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <div className={`text-2xl font-bold ${getRiskColor(item.result.riskScore)}`}>
                              {item.result.riskScore}
                            </div>
                            <div className="text-white/40 text-xs">/ 95</div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className={`px-2 py-1 rounded text-xs ${
                            item.result.riskScore >= 70 
                              ? 'bg-red-500/10 text-red-400 border border-red-500/20'
                              : item.result.riskScore >= 40
                              ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
                              : 'bg-green-500/10 text-green-400 border border-green-500/20'
                          }`}>
                            {item.result.status}
                          </span>
                          <span className="text-white/30 text-xs">
                            {item.result.reasons?.length || 0} red flags
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          deleteItem(index)
                        }}
                        className="p-2 rounded-lg hover:bg-red-500/10 text-white/30 hover:text-red-400 transition-all flex-shrink-0"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </ScrollReveal>
              )
            })}
          </div>
        )}

        <ScrollReveal delay={0.2}>
          <div className="mt-8 text-center">
            <Link href="/" className="text-white/40 hover:text-white/60 text-sm inline-flex items-center gap-2 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </motion.div>
  )
}
