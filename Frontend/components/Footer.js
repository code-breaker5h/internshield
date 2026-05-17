import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-black">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img src="/internslogo.jpeg" alt="InternShield" className="w-10 h-10 rounded-lg object-cover" />
              <span className="text-xl font-bold">InternShield</span>
            </div>
            <p className="text-white/40 text-sm leading-relaxed max-w-md">
              AI-powered protection for students against internship scams.
              Verify before you apply.
            </p>
          </div>

          <div>
            <h4 className="text-white/30 text-xs font-semibold uppercase tracking-wider mb-4">Pages</h4>
            <div className="space-y-3">
              {[
                { href: '/', label: 'Home' },
                { href: '/analyze', label: 'Analyzer' },
                { href: '/how-it-works', label: 'How It Works' },
                { href: '/about', label: 'About' },
              ].map(link => (
                <Link key={link.href} href={link.href} className="block text-sm text-white/50 hover:text-white transition-colors">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white/30 text-xs font-semibold uppercase tracking-wider mb-4">Connect</h4>
            <div className="space-y-3">
              {['GitHub', 'Twitter', 'LinkedIn', 'Email'].map(item => (
                <span key={item} className="block text-sm text-white/50 hover:text-white transition-colors cursor-pointer">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="section-divider mt-12 mb-8" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-xs">
            © 2026 InternShield. Built for safer internship experiences.
          </p>
          <p className="text-white/30 text-xs">
            Made with purpose.
          </p>
        </div>
      </div>
    </footer>
  )
}
