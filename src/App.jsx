import { useState, useCallback, useEffect } from 'react'
import Cursor from './components/Cursor'
import Loader from './components/Loader'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import CurrentlyBuilding from './components/CurrentlyBuilding'
import HowIBuild from './components/HowIBuild'
import Projects from './components/Projects'
import WhyHireMe from './components/WhyHireMe'
import Experience from './components/Experience'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  const [loaded, setLoaded] = useState(false)
  const handleLoaded = useCallback(() => setLoaded(true), [])

  useEffect(() => {
    if (!loaded) return
    const bar = document.getElementById('page-progress')
    const onScroll = () => {
      const pct = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight) * 100
      if (bar) bar.style.width = Math.min(pct, 100) + '%'
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [loaded])

  return (
    <>
      <Cursor />
      <Loader onDone={handleLoaded} />
      <div id="page-progress" />
      <div
        className={`relative min-h-screen noise-overlay transition-opacity duration-700 ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="ambient-top" />
        <div className="ambient-br" />
        <div className="ambient-bl" />

        <div className="relative z-10">
          <Navbar />
          <main>
            <Hero />
            <About />
            <Skills />
            <CurrentlyBuilding />
            <HowIBuild />
            <Projects />
            <WhyHireMe />
            <Experience />
            <Contact />
          </main>
          <Footer />
        </div>
      </div>
    </>
  )
}
