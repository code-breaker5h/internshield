import '@/styles/globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { AnimatePresence } from 'framer-motion'
import Head from 'next/head'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { AuthProvider } from '@/contexts/AuthContext'
import dynamic from 'next/dynamic'

const SplashCursor = dynamic(() => import('@/components/SplashCursor'), { ssr: false })

export default function App({ Component, pageProps, router }) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Head>
          <title>InternShield – Detect Fake Internships Instantly</title>
          <meta name="description" content="AI-powered protection for students against internship scams." />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/internslogo.jpeg" />
        </Head>
        <SplashCursor />
        <div className="min-h-screen flex flex-col bg-black">
          <Navbar />
          <main className="flex-1">
            <AnimatePresence mode="wait">
              <Component key={router.route} {...pageProps} />
            </AnimatePresence>
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </ThemeProvider>
  )
}
