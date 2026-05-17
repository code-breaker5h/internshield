import { useEffect, useState } from 'react'

export default function RiskMeter({ score = 72 }) {
  const [animatedScore, setAnimatedScore] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => setAnimatedScore(score), 300)
    return () => clearTimeout(timer)
  }, [score])

  const circumference = 2 * Math.PI * 90
  const offset = circumference - (animatedScore / 100) * circumference

  const getColor = (s) => {
    if (s <= 30) return '#22c55e'
    if (s <= 60) return '#f59e0b'
    return '#ef4444'
  }

  const getLabel = (s) => {
    if (s <= 30) return 'Low Risk'
    if (s <= 60) return 'Medium Risk'
    return 'High Risk'
  }

  const color = getColor(animatedScore)

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-56 h-56">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 200 200">
          <circle cx="100" cy="100" r="90" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
          <circle
            cx="100" cy="100" r="90"
            fill="none"
            stroke={color}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="risk-meter-ring"
            style={{ filter: `drop-shadow(0 0 12px ${color}40)` }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-5xl font-bold font-display" style={{ color }}>
            {animatedScore}
          </span>
          <span className="text-white/40 text-sm mt-1">out of 100</span>
        </div>
      </div>
      <div
        className="mt-4 px-4 py-2 rounded-full text-sm font-medium"
        style={{
          background: `${color}15`,
          color: color,
          border: `1px solid ${color}30`
        }}
      >
        {getLabel(score)}
      </div>
    </div>
  )
}
