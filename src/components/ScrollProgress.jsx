import { useEffect, useRef, useState } from 'react'

const SECTIONS = [
  { id: 'hero', label: '首页' },
  { id: 'about', label: '关于' },
  { id: 'projects', label: '作品' },
  { id: 'strengths', label: '优势' },
  { id: 'experience', label: '能力' },
  { id: 'contact', label: '联系' },
]

export default function ScrollProgress() {
  const progressRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    if (isTouch) {
      if (progressRef.current) progressRef.current.style.display = 'none'
      return
    }

    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
      setProgress(pct)

      // Find active section
      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        const el = document.getElementById(SECTIONS[i].id)
        if (el && el.offsetTop - 200 <= scrollTop) {
          setActiveIndex(i)
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleClick = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="scroll-progress" ref={progressRef}>
      <div className="scroll-progress-track">
        <div className="scroll-progress-fill" style={{ height: `${progress}%` }} />
      </div>
      <div className="scroll-progress-dots">
        {SECTIONS.map((section, i) => (
          <button
            key={section.id}
            className={`scroll-dot ${activeIndex === i ? 'active' : ''}`}
            onClick={() => handleClick(section.id)}
            aria-label={`跳转到${section.label}`}
            title={section.label}
          >
            <span className="scroll-dot-label">{section.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
