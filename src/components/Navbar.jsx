import { useState, useEffect, useRef } from 'react'

const NAV_LINKS = [
  { label: '作品', href: '#projects' },
  { label: '经历', href: '#about' },
  { label: '优势', href: '#strengths' },
  { label: '联系我', href: '#contact' },
]

export default function Navbar() {
  const [heroPassed, setHeroPassed] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const sentinelRef = useRef(null)

  useEffect(() => {
    const sentinel = document.createElement('div')
    sentinel.style.position = 'absolute'
    sentinel.style.top = '1px'
    sentinel.style.left = '0'
    sentinel.style.width = '1px'
    sentinel.style.height = '1px'
    sentinel.style.pointerEvents = 'none'
    sentinel.style.opacity = '0'
    document.body.prepend(sentinel)
    sentinelRef.current = sentinel

    const observer = new IntersectionObserver(
      ([entry]) => setHeroPassed(!entry.isIntersecting),
      { threshold: 0 }
    )
    observer.observe(sentinel)

    return () => {
      observer.disconnect()
      sentinel.remove()
    }
  }, [])

  const scrollTo = (href) => {
    setMenuOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav className={`navbar ${heroPassed ? 'fixed' : ''}`}>
      <div className="navbar-inner container">
        <a className="navbar-logo" href="#hero" onClick={(e) => { e.preventDefault(); scrollTo('#hero') }}>
          <span className="logo-dot" />
          <span className="logo-text">成龙</span>
        </a>

        <div className={`navbar-links ${menuOpen ? 'open' : ''}`}>
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="nav-link"
              onClick={(e) => { e.preventDefault(); scrollTo(link.href) }}
            >
              {link.label}
            </a>
          ))}
        </div>

        <button className="nav-cta" onClick={() => scrollTo('#contact')}>
          开始合作
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </button>

        <button
          className={`menu-toggle ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="菜单"
        >
          <span /><span /><span />
        </button>
      </div>
    </nav>
  )
}