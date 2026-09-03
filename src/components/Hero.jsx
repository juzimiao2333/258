import { useEffect, useRef, useState } from 'react'
import { gsap } from '../lib/gsap'

export default function Hero() {
  const sectionRef = useRef(null)
  const videoRef = useRef(null)
  const [videoReady, setVideoReady] = useState(false)
  const [useVideo, setUseVideo] = useState(true)

  useEffect(() => {
    // 多维度检测：移动端 / 触摸设备 / 减少运动偏好 / 弱网 → 降级到静态渐变
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isSmall = window.innerWidth < 768

    // 弱网检测（Network Information API）
    let isSlowNetwork = false
    if (navigator.connection) {
      const effectiveType = navigator.connection.effectiveType
      const saveData = navigator.connection.saveData
      isSlowNetwork = effectiveType === 'slow-2g' || effectiveType === '2g' || saveData
    }

    if (isTouch || prefersReduced || isSmall || isSlowNetwork) {
      setUseVideo(false)
    }
  }, [])

  // 视频加载超时保护：5 秒内未加载完成则降级
  useEffect(() => {
    if (!useVideo || videoReady) return

    const timeoutId = setTimeout(() => {
      if (!videoReady) {
        console.warn('[Hero] Video loading timeout, falling back to static bg')
        setUseVideo(false)
      }
    }, 5000)

    return () => clearTimeout(timeoutId)
  }, [useVideo, videoReady])

  // 视频加载失败处理
  const handleVideoError = () => {
    console.warn('[Hero] Video failed to load, falling back to static bg')
    setUseVideo(false)
  }

  // === GSAP Opening Animation ===
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const badge = el.querySelector('.hero-badge')
    const descLines = el.querySelectorAll('.hero-desc-line')
    const gridOverlay = el.querySelector('.hero-grid-overlay')

    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })

    // 0. Initial states
    if (gridOverlay) tl.set(gridOverlay, { opacity: 0 })
    tl.set(badge, { opacity: 0, y: -40, scale: 0.85 })
    tl.set(descLines, { opacity: 0, y: 30 })

    // 1. Grid overlay fades in
    if (gridOverlay) {
      tl.to(gridOverlay, { opacity: 1, duration: 0.8, ease: 'power2.out' }, 0)
    }

    // 2. Badge drops down from above
    tl.to(badge, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 1.0,
      ease: 'power4.out',
    }, 0.6)

    // 3. Description lines stagger in
    tl.to(descLines, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.12,
      ease: 'power4.out',
    }, 1.2)

    return () => tl.kill()
  }, [])

  const scrollToProjects = () => {
    document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="hero" className="hero" ref={sectionRef}>
      {/* Video Background */}
      {useVideo ? (
        <div className={`hero-video-wrapper ${videoReady ? 'loaded' : ''}`}>
          <video
            ref={videoRef}
            className="hero-video"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="/hero-poster.jpg"
            onLoadedData={() => setVideoReady(true)}
            onCanPlay={() => setVideoReady(true)}
            onError={handleVideoError}
          >
            <source src="/hero-bg.mp4" type="video/mp4" />
          </video>
          <div className="hero-video-overlay" />
          {!videoReady && <div className="hero-video-placeholder" />}
        </div>
      ) : (
        <div className="hero-static-bg" />
      )}

      <div className="hero-grid-overlay" />

      <div className="hero-content container">
        <div className="hero-badge">
          <span className="badge-aigc">AIGC</span> 视觉设计师
        </div>

        <div className="hero-desc-group">
          <p className="hero-desc-line">将人工智能与设计美学深度融合，</p>
          <p className="hero-desc-line">为品牌打造具有冲击力的视觉体验。</p>
          <p className="hero-desc-line hero-desc-accent">专属于 AIGC 驱动的视觉创意与品牌设计</p>
        </div>
      </div>

      {/* 底部轮播小模版 */}
      <div className="hero-marquee">
        <div className="hero-marquee-track">
          <div className="hero-marquee-set">
            {[
              { src: '/marquee/1.png', alt: '作品1' },
              { src: '/marquee/2.png', alt: '作品2' },
              { src: '/marquee/3.png', alt: '作品3' },
              { src: '/marquee/4.png', alt: '作品4' },
              { src: '/marquee/5.png', alt: '作品5' },
              { src: '/marquee/6.png', alt: '作品6' },
              { src: '/marquee/7.png', alt: '作品7' },
              { src: '/marquee/8.png', alt: '作品8' },
              { src: '/marquee/9.png', alt: '作品9' },
              { src: '/marquee/10.png', alt: '作品10' },
              { src: '/marquee/11.png', alt: '作品11' },
              { src: '/marquee/12.png', alt: '作品12' },
            ].map((item, idx) => (
              <div className="hero-marquee-card" key={`a-${idx}`}>
                <img src={item.src} alt={item.alt} className="marquee-card-img" />
              </div>
            ))}
          </div>
          <div className="hero-marquee-set">
            {[
              { src: '/marquee/1.png', alt: '作品1' },
              { src: '/marquee/2.png', alt: '作品2' },
              { src: '/marquee/3.png', alt: '作品3' },
              { src: '/marquee/4.png', alt: '作品4' },
              { src: '/marquee/5.png', alt: '作品5' },
              { src: '/marquee/6.png', alt: '作品6' },
              { src: '/marquee/7.png', alt: '作品7' },
              { src: '/marquee/8.png', alt: '作品8' },
              { src: '/marquee/9.png', alt: '作品9' },
              { src: '/marquee/10.png', alt: '作品10' },
              { src: '/marquee/11.png', alt: '作品11' },
              { src: '/marquee/12.png', alt: '作品12' },
            ].map((item, idx) => (
              <div className="hero-marquee-card" key={`b-${idx}`}>
                <img src={item.src} alt={item.alt} className="marquee-card-img" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}