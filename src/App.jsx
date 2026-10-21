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

export default function App() {
  const { theme, toggleTheme } = useTheme()
  const projectMatch = window.location.pathname.match(/^\/projects\/([^/]+)\/?$/)

  if (projectMatch) {
    const projectId = decodeURIComponent(projectMatch[1])
    const project = projects.find((item) => item.id === projectId)
    return <ProjectDetail project={project} theme={theme} onToggleTheme={toggleTheme} />
  }

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <div id="home" />
      <Navbar theme={theme} onToggleTheme={toggleTheme} />
      <main id="main">
        <Hero />
        <EyeDivider />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
