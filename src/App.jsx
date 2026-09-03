import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import ExperienceSkills from './components/ExperienceSkills'
import Projects from './components/Projects'
import Strengths from './components/Strengths'
import Contact from './components/Contact'
import Galaxy from './components/Galaxy'
import MouseGlow from './components/MouseGlow'
import SectionDivider from './components/SectionDivider'
import './App.css'

export default function App() {
  return (
    <div className="app">
      <Galaxy
        density={1.0}
        starSpeed={0.3}
        hueShift={240}
        glowIntensity={0.4}
        saturation={0.4}
        twinkleIntensity={0.35}
        rotationSpeed={0.03}
        mouseRepulsion={false}
        mouseInteraction={false}
        transparent={true}
        className="page-bg-galaxy"
      />
      <MouseGlow />
      <Navbar />
      <main>
        <Hero />
        <About />
        <SectionDivider number={1} label="Experience" />
        <ExperienceSkills />
        <SectionDivider number={2} label="Projects" />
        <Projects />
        <SectionDivider number={3} label="Strengths" />
        <Strengths />
        <SectionDivider number={4} label="Contact" />
        <Contact />
      </main>
    </div>
  )
}