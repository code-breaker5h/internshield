import { useEffect, useState } from 'react'

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
            animation: `particleRise ${p.duration}s linear ${p.delay}s infinite`,
          }}
        />
      ))}
    </div>
  )
}
