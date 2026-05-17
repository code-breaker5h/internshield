import { motion } from 'framer-motion'

export default function GradientBackground({ color = 'orange' }) {
  // Color configurations
  const colors = {
    orange: {
      main: 'rgba(255,180,80,0.4)',
      secondary: 'rgba(255,150,60,0.3)',
      tertiary: 'rgba(255,120,40,0.2)',
      light: 'rgba(255,100,30,0.1)',
      bright: 'rgba(255,220,120,0.5)',
      particle: 'rgba(255,180,80,0.5)',
      particleBg: 'bg-orange-300/40',
      streak: 'rgba(255,200,100,0.6)',
    },
    violet: {
      main: 'rgba(147,51,234,0.4)',      // Purple-600
      secondary: 'rgba(126,34,206,0.3)',  // Purple-700
      tertiary: 'rgba(107,33,168,0.2)',   // Purple-800
      light: 'rgba(88,28,135,0.1)',       // Purple-900
      bright: 'rgba(196,181,253,0.5)',    // Purple-300
      particle: 'rgba(167,139,250,0.5)',  // Purple-400
      particleBg: 'bg-purple-400/40',
      streak: 'rgba(196,181,253,0.6)',    // Purple-300
    }
  }

  const c = colors[color]

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Main intense gradient arrow from right */}
      <motion.div
        className="absolute top-0 right-0 w-[1200px] h-full"
        style={{
          background: `linear-gradient(to left, ${c.main} 0%, ${c.secondary} 20%, ${c.tertiary} 40%, ${c.light} 60%, transparent 100%)`,
          filter: 'blur(80px)',
        }}
        animate={{
          opacity: [0.6, 0.9, 0.6],
          x: [0, -30, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Secondary intense layer */}
      <motion.div
        className="absolute top-1/4 right-0 w-[1000px] h-3/4"
        style={{
          background: `linear-gradient(to left, ${c.main.replace('0.4', '0.35')} 0%, ${c.secondary.replace('0.3', '0.25')} 25%, ${c.tertiary.replace('0.2', '0.15')} 50%, ${c.light.replace('0.1', '0.08')} 75%, transparent 100%)`,
          filter: 'blur(60px)',
        }}
        animate={{
          opacity: [0.5, 0.8, 0.5],
          x: [0, -20, 0],
          scaleX: [1, 1.1, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />

      {/* Bright core glow */}
      <motion.div
        className="absolute top-1/3 right-0 w-[800px] h-[600px]"
        style={{
          background: `radial-gradient(ellipse at right, ${c.bright} 0%, ${c.main.replace('0.4', '0.3')} 30%, ${c.secondary.replace('0.3', '0.15')} 60%, transparent 100%)`,
          filter: 'blur(70px)',
        }}
        animate={{
          opacity: [0.7, 1, 0.7],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5
        }}
      />

      {/* Sharp arrow-like gradient */}
      <div
        className="absolute top-0 right-0 w-full h-full"
        style={{
          background: `linear-gradient(100deg, transparent 0%, transparent 40%, ${c.light.replace('0.1', '0.08')} 60%, ${c.secondary.replace('0.3', '0.15')} 80%, ${c.main.replace('0.4', '0.25')} 100%)`,
          clipPath: 'polygon(40% 0%, 100% 0%, 100% 100%, 40% 100%, 60% 50%)',
        }}
      />

      {/* Intense light rays */}
      <motion.div
        className="absolute top-0 right-0 w-full h-full"
        style={{
          background: `linear-gradient(110deg, transparent 0%, transparent 50%, ${c.light} 70%, ${c.secondary.replace('0.3', '0.2')} 90%, ${c.main.replace('0.4', '0.3')} 100%)`,
        }}
        animate={{
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Bright particles with more intensity */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-2 h-2 ${c.particleBg} rounded-full`}
            style={{
              top: `${Math.random() * 100}%`,
              right: `${Math.random() * 40}%`,
              boxShadow: `0 0 10px ${c.particle}`,
            }}
            animate={{
              opacity: [0, 0.8, 0],
              scale: [0, 1.5, 0],
              x: [-50, -100, -150],
              y: [0, (Math.random() - 0.5) * 100],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeOut"
            }}
          />
        ))}
      </div>

      {/* Intense glow streaks */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={`streak-${i}`}
          className="absolute right-0 w-[600px] h-1"
          style={{
            top: `${20 + i * 15}%`,
            background: `linear-gradient(to left, ${c.streak} 0%, ${c.secondary.replace('0.3', '0.3')} 50%, transparent 100%)`,
            filter: 'blur(3px)',
          }}
          animate={{
            opacity: [0, 0.8, 0],
            scaleX: [0, 1, 0],
            x: [0, -200, -400],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.4,
            ease: "easeOut"
          }}
        />
      ))}

      {/* Vignette - lighter to show more gradient */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.2) 100%)',
        }}
      />
    </div>
  )
}
