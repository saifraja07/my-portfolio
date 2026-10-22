import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Hero from './components/sections/Hero'
import EyeDivider from './components/sections/EyeDivider'
import About from './components/sections/About'
import Skills from './components/sections/Skills'
import Projects from './components/sections/Projects'
import Contact from './components/sections/Contact'
import ProjectDetail from './components/sections/ProjectDetail'
import { projects } from './data/projects'
import { useTheme } from './hooks/useTheme'

function RouteContent({ theme, toggleTheme }) {
  const location = useLocation()
  const isProjectPage = location.pathname.startsWith('/projects/')
  const projectId = isProjectPage ? decodeURIComponent(location.pathname.split('/')[2] || '') : ''
  const project = projects.find((item) => item.id === projectId)

  useEffect(() => {
    if (location.hash) {
      requestAnimationFrame(() => document.getElementById(location.hash.slice(1))?.scrollIntoView())
    } else {
      window.scrollTo({ top: 0, behavior: 'auto' })
    }
  }, [location.pathname, location.hash])

  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <Navbar theme={theme} onToggleTheme={toggleTheme} isProjectPage={isProjectPage} />
      {isProjectPage ? (
        <main id="main"><ProjectDetail project={project} /></main>
      ) : (
        <main id="main">
          <div id="home" />
          <Hero />
          <EyeDivider />
          <About />
          <Skills />
          <Projects />
          <Contact />
        </main>
      )}
      <Footer />
    </>
  )
}

export default function App() {
  const { theme, toggleTheme } = useTheme()
  return <Routes><Route path="*" element={<RouteContent theme={theme} toggleTheme={toggleTheme} />} /></Routes>
}
