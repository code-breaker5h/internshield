import { useState } from 'react'
import { Info, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const redFlagExplanations = {
  'Registration fee detected': {
    why: 'Legitimate companies never charge registration fees for internships',
    example: 'Scam: "Pay Rs 5000 registration fee" vs Legitimate: "No fees required"',
    severity: 'critical'
  },
  'Processing fee detected': {
    why: 'Processing fees are a common scam tactic to extract money',
    example: 'Scam: "Rs 2999 processing fee" vs Legitimate: "Free application process"',
    severity: 'critical'
  },
  'Guaranteed placement': {
    why: 'No company can guarantee job placement - it depends on performance',
    example: 'Scam: "100% guaranteed job" vs Legitimate: "Potential for full-time role based on performance"',
    severity: 'high'
  },
  'Limited seats': {
    why: 'Artificial scarcity creates pressure to make quick decisions',
    example: 'Scam: "Only 5 seats left!" vs Legitimate: "Applications open until [date]"',
    severity: 'medium'
  },
  'WhatsApp communication': {
    why: 'Professional companies use official email and portals, not WhatsApp',
    example: 'Scam: "Contact on WhatsApp" vs Legitimate: "Apply at careers@company.com"',
    severity: 'high'
  },
  'Gmail address': {
    why: 'Legitimate companies use corporate email domains',
    example: 'Scam: "hr@gmail.com" vs Legitimate: "hr@company.com"',
    severity: 'medium'
  },
  'No experience needed': {
    why: 'While some internships accept beginners, combined with other red flags it\'s suspicious',
    example: 'Context matters - legitimate companies specify skill requirements',
    severity: 'low'
  },
  'Unpaid training': {
    why: 'Requiring unpaid training before paid work is often exploitative',
    example: 'Scam: "1 month unpaid training required" vs Legitimate: "Paid training provided"',
    severity: 'medium'
  }
}

export default function RedFlagTooltip({ text }) {
  const [showModal, setShowModal] = useState(false)
  
  // Find matching explanation
  const explanation = Object.keys(redFlagExplanations).find(key => 
    text.toLowerCase().includes(key.toLowerCase())
  )
  
  const details = explanation ? redFlagExplanations[explanation] : null

  if (!details) return null

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="ml-2 p-1 rounded-full hover:bg-white/10 transition-all"
        title="Learn more"
      >
        <Info className="w-4 h-4 text-white/40 hover:text-white/60" />
      </button>

      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="card p-6 max-w-lg w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className={`inline-block px-2 py-1 rounded text-xs mb-2 ${
                    details.severity === 'critical' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                    details.severity === 'high' ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30' :
                    details.severity === 'medium' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' :
                    'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                  }`}>
                    {details.severity.toUpperCase()} RISK
                  </div>
                  <h3 className="text-lg font-semibold">{text}</h3>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 rounded-lg hover:bg-white/10 transition-all"
                >
                  <X className="w-5 h-5 text-white/40" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-white/60 mb-2">Why is this suspicious?</h4>
                  <p className="text-sm text-white/80">{details.why}</p>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-white/60 mb-2">Example</h4>
                  <p className="text-sm text-white/80">{details.example}</p>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <p className="text-xs text-white/40">
                    💡 Tip: Always verify company details through official channels and never pay any fees for internship applications.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
