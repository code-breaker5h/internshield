import { useState, useRef, useCallback, useEffect } from 'react'

export default function MagnifierEffect({ children, zoom = 1.8, size = 150 }) {
  const containerRef = useRef(null)
  const [visible, setVisible] = useState(false)
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [isDark, setIsDark] = useState(true)

  useEffect(() => {
    const check = () => {
      setIsDark(document.documentElement.getAttribute('data-theme') !== 'light')
    }
    check()
    const observer = new MutationObserver(check)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
    return () => observer.disconnect()
  }, [])

  const handleMouseMove = useCallback((e) => {
    const rect = containerRef.current.getBoundingClientRect()
    setPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }, [])

  const half = size / 2

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}

      {visible && (
        <div
          className={`pointer-events-none absolute z-50 rounded-full border-2 shadow-lg overflow-hidden ${
            isDark
              ? 'border-white/30 shadow-black/40'
              : 'border-black/20 shadow-black/15'
          }`}
          style={{
            width: size,
            height: size,
            left: pos.x - half,
            top: pos.y - half,
            background: isDark ? 'rgba(0,0,0,0.85)' : 'rgba(255,255,255,0.92)',
            backdropFilter: 'blur(1px)',
          }}
        >
          {/* Magnified clone */}
          <div
            className="absolute"
            style={{
              width: containerRef.current?.offsetWidth || 0,
              height: containerRef.current?.offsetHeight || 0,
              transform: `scale(${zoom})`,
              transformOrigin: `${pos.x}px ${pos.y}px`,
              left: -pos.x + half,
              top: -pos.y + half,
            }}
          >
            {children}
          </div>

          {/* Glass shine effect */}
          <div
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              background: isDark
                ? 'radial-gradient(circle at 35% 35%, rgba(255,255,255,0.15) 0%, transparent 60%)'
                : 'radial-gradient(circle at 35% 35%, rgba(255,255,255,0.5) 0%, transparent 60%)',
            }}
          />
        </div>
      )}
    </div>
  )
}
