import { motion } from 'framer-motion'

export default function FloatingAnimation({ children, delay = 0, duration = 5, className = '' }) {
  return (
    <motion.div
      className={className}
      animate={{ y: [0, -20, 0] }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'easeInOut'
      }}
    >
      {children}
    </motion.div>
  )
}
