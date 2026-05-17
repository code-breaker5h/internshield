import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { Menu, X, ArrowRight, Sun, Moon } from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'
import { useAuth } from '@/contexts/AuthContext'
import UserProfile from './UserProfile'
import GoogleLoginButton from './GoogleLoginButton'
import CreditsDisplay from './CreditsDisplay'

const links = [
  { href: '/', label: 'Home' },
  { href: '/analyze', label: 'Analyze' },
  { href: '/history', label: 'History' },
  { href: '/how-it-works', label: 'How It Works' },
  { href: '/about', label: 'About' },
]

export default function Navbar() {
  const router = useRouter()
  const { theme, toggleTheme } = useTheme()
  const { isAuthenticated, user } = useAuth()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const isHome = router.pathname === '/'

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled ? 'bg-black/80 backdrop-blur-xl border-b border-white/5' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <img src="/internslogo.jpeg" alt="InternShield" className="w-10 h-10 rounded-lg object-cover" />
          <span className="text-xl font-bold tracking-tight">InternShield</span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {links.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                router.pathname === link.href
                  ? 'bg-white/10 text-white'
                  : 'text-white/50 hover:text-white hover:bg-white/5'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <CreditsDisplay showDetails={false} isHome={isHome} />
          
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full text-white/50 hover:text-white hover:bg-white/5 transition-all"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          
          {isAuthenticated ? (
            <UserProfile />
          ) : (
            <span className={`btn-gradient-wrap ${isHome ? 'btn-gradient-wrap-gold' : ''}`}>
              <Link href="/login" className="btn-primary text-sm">
                Sign In
                <ArrowRight className="w-4 h-4" />
              </Link>
            </span>
          )}
        </div>

        <button onClick={() => setOpen(!open)} className="md:hidden text-white/70 hover:text-white transition-colors">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-black/95 backdrop-blur-xl border-t border-white/5 px-6 py-6 space-y-2">
          {links.map(link => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={`block px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                router.pathname === link.href
                  ? 'bg-white/10 text-white'
                  : 'text-white/50 hover:text-white hover:bg-white/5'
              }`}
            >
              {link.label}
            </Link>
          ))}
          
          {isAuthenticated ? (
            <div className="pt-4 border-t border-white/10">
              <div className="flex items-center gap-3 px-4 py-3">
                <img src={user?.avatar} alt={user?.name} className="w-10 h-10 rounded-full" />
                <div>
                  <p className="text-white font-medium">{user?.name}</p>
                  <p className="text-white/50 text-sm">{user?.email}</p>
                </div>
              </div>
            </div>
          ) : (
            <span className={`btn-gradient-wrap w-full ${isHome ? 'btn-gradient-wrap-gold' : ''}`}>
              <Link href="/login" onClick={() => setOpen(false)} className="btn-primary text-sm w-full justify-center">
                Sign In
              </Link>
            </span>
          )}
        </div>
      )}
    </nav>
  )
}
