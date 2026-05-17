import { motion, useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'

export default function CounterAnimation({ value, suffix = '', duration = 2.5, delay = 0 }) {
  const ref = useRef(null)
  const [displayValue, setDisplayValue] = useState(0)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  useEffect(() => {
    if (!isInView) return

    const numValue = parseInt(value.toString().replace(/\D/g, ''))
    let start = 0
    const increment = numValue / (duration * 60)

    const timer = setInterval(() => {
      start += increment
      if (start >= numValue) {
        setDisplayValue(numValue)
        clearInterval(timer)
      } else {
        setDisplayValue(Math.floor(start))
      }
    }, 1000 / 60)

    return () => clearInterval(timer)
  }, [isInView, value, duration])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay }}
    >
      {displayValue}
      {suffix}
    </motion.div>
  )
}
