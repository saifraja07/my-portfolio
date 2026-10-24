<<<<<<< HEAD
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import WorkSection from "./components/WorkSection";
import AboutSection from "./components/AboutSection";
import SkillsSection from "./components/SkillsSection";
import ExperienceSection from "./components/ExperienceSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen bg-bg text-ink">
      <Navbar />
      <main>
        <Hero />
        <WorkSection />
        <AboutSection />
        <SkillsSection />
        <ExperienceSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
=======
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
import ThreeBackground from './components/background/ThreeBackground'
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
  return (
    <>
      <ThreeBackground />
      <Routes><Route path="*" element={<RouteContent theme={theme} toggleTheme={toggleTheme} />} /></Routes>
    </>
  )
>>>>>>> 6eaa3711bcdcf3c7b95d5a1ee15c09f0b7515fee
}
