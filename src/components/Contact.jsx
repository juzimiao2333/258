import { useRef, useEffect, useState } from 'react'
import { gsap, ScrollTrigger } from '../lib/gsap'

export default function Contact() {
  const sectionRef = useRef(null)
  const socialRef = useRef(null)
  const formRef = useRef(null)
  const [formState, setFormState] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const title = el.querySelector('.contact-title')
    const desc = el.querySelector('.contact-desc')
    const btn = el.querySelector('.contact-btn')
    const particles = el.querySelectorAll('.contact-particle')
    const links = socialRef.current?.querySelectorAll('.social-link')
    const form = formRef.current

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: 'top 75%',
          once: true,
        },
      })

      // Particles fade in
      if (particles.length) {
        gsap.set(particles, { opacity: 0, scale: 0 })
        tl.to(particles, {
          opacity: 0.15,
          scale: 1,
          duration: 1.5,
          ease: 'power4.out',
          stagger: 0.05,
        }, 0)
      }

      // Title: clip-path reveal
      gsap.set(title, { opacity: 0, clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)', y: 40 })
      tl.to(title, {
        opacity: 1,
        clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
        y: 0,
        duration: 1.6,
        ease: 'power4.out',
      }, 0.1)

      // Desc
      gsap.set(desc, { opacity: 0, y: 30 })
      tl.to(desc, {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: 'power4.out',
      }, 0.5)

      // Form + Button row
      if (form) {
        gsap.set(form, { opacity: 0, y: 40, scale: 0.98 })
        tl.to(form, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          ease: 'power4.out',
        }, 0.7)
      }

      if (btn) {
        gsap.set(btn, { opacity: 0, y: 30 })
        tl.to(btn, {
          opacity: 1,
          y: 0,
          duration: 1.0,
          ease: 'power4.out',
        }, 0.85)
      }

      // Social links
      if (links?.length) {
        gsap.set(links, { opacity: 0, y: 20 })
        tl.to(links, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power4.out',
          stagger: 0.1,
        }, 1.0)
      }
    }, el)

    return () => ctx.revert()
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleInput = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Simulate submission
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormState({ name: '', email: '', message: '' })
    }, 3000)
  }

  return (
    <section id="contact" className="contact-section" ref={sectionRef}>
      <div className="contact-particles">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="contact-particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
            }}
          />
        ))}
      </div>

      <div className="contact-glow-orb" />

      <div className="contact-content container">
        <div className="contact-top">
          <span className="section-label">Contact</span>
          <h2 className="contact-title">
            一起探索
            <br />
            <span className="contact-title-accent">
              视觉的无限可能
              <span className="title-cursor">_</span>
            </span>
          </h2>
          <p className="contact-desc">
            无论你是品牌方、创意机构，还是对 AI 视觉创作感兴趣的同仁，
            都欢迎随时与我联系。让我们共同探讨下一个激动人心的项目。
          </p>
        </div>

        <div className="contact-main" ref={formRef}>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-field">
                <label className="form-label" htmlFor="name">你的称呼</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="form-input"
                  placeholder="请输入你的名字"
                  value={formState.name}
                  onChange={handleInput}
                  required
                />
              </div>
              <div className="form-field">
                <label className="form-label" htmlFor="email">联系邮箱</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-input"
                  placeholder="your@email.com"
                  value={formState.email}
                  onChange={handleInput}
                  required
                />
              </div>
            </div>
            <div className="form-field">
              <label className="form-label" htmlFor="message">项目描述</label>
              <textarea
                id="message"
                name="message"
                className="form-textarea"
                placeholder="简单描述一下你的项目需求或合作想法..."
                rows={4}
                value={formState.message}
                onChange={handleInput}
                required
              />
            </div>
            <button type="submit" className="btn-primary contact-form-btn" disabled={submitted}>
              {submitted ? (
                <>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  已发送，感谢！
                </>
              ) : (
                <>
                  发送消息
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="22" y1="2" x2="11" y2="13" />
                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                </>
              )}
            </button>
          </form>

          <div className="contact-direct">
            <h4 className="contact-direct-title">或直接联系</h4>
            <a href="mailto:2584095757@qq.com" className="contact-email-btn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              2584095757@qq.com
            </a>
            <p className="contact-direct-hint">通常在 24 小时内回复</p>
          </div>
        </div>

        <div className="contact-bottom">
          <div className="contact-social" ref={socialRef}>
            <a href="#" className="social-link">Behance</a>
            <a href="#" className="social-link">LinkedIn</a>
            <a href="#" className="social-link">Dribbble</a>
            <a href="#" className="social-link">GitHub</a>
          </div>

          <div className="contact-divider" />

          <div className="contact-footer">
            <span className="contact-copyright">
              &copy; {new Date().getFullYear()} AIGC Designer. All rights reserved.
            </span>
            <button className="back-to-top" onClick={scrollToTop}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="19" x2="12" y2="5" />
                <polyline points="5 12 12 5 19 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
