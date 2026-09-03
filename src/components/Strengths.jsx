import { useRef, useEffect } from 'react'
import { gsap, ScrollTrigger } from '../lib/gsap'
import { useSectionTitleReveal } from '../hooks/useSectionReveal'

const STRENGTHS = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
      </svg>
    ),
    title: '专业提示词工程能力',
    desc: '精准拆解创作需求，将创意转化为标准化 AI 生成指令。适配图片、视频各类创作场景，精准把控画面风格与细节，高效提升出图质量与效率。',
    stat: '95%',
    statLabel: '出图准确率',
    accent: '#6366f1',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
    title: '精准模型选型与生成能力',
    desc: '针对国风、二次元、3D、影视、广告等不同场景，精准匹配最优 AI 模型。通过智能控图技术锁定画面结构，快速批量产出优质原创初稿。',
    stat: '20+',
    statLabel: '熟练模型',
    accent: '#8b5cf6',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a4 4 0 0 1 4 4v2a4 4 0 0 1-8 0V6a4 4 0 0 1 4-4z" />
        <path d="M2 22c0-4.97 4.03-9 10-9s10 4.03 10 9" />
      </svg>
    ),
    title: '画面精修与迭代优化能力',
    desc: '修复 AI 画面畸形、透视、细节缺陷，通过局部精修、高清超分、多轮迭代，优化画面质感，达标商用视觉效果。',
    stat: '4K',
    statLabel: '高清输出',
    accent: '#06b6d4',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <path d="M21 15l-5-5L5 21" />
      </svg>
    ),
    title: 'AI 后期合成与二次创作能力',
    desc: '打通 AI 素材后期全流程，支持抠图、调色、光影优化、画面拓展等二次编辑，联动专业设计工具，快速输出海报、分镜、短视频成品。',
    stat: '100+',
    statLabel: '交付作品',
    accent: '#a855f7',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5" />
        <line x1="12" y1="22" x2="12" y2="15.5" />
        <polyline points="22 8.5 12 15.5 2 8.5" />
      </svg>
    ),
    title: '视觉一致性管控能力',
    desc: '通过参数固化、模型定制、参考锁定等技术，统一人设、IP、风格与色调，解决 AI 画面不稳定问题，适配批量系列化创作。',
    stat: '50+',
    statLabel: '系列项目',
    accent: '#10b981',
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 12l2 2 4-4" />
        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
      </svg>
    ),
    title: '合规校验与标准化交付能力',
    desc: '全维度合规筛查，规避版权与内容风险。统一商用输出标准，规范尺寸、画质与格式，实现 AI 视觉创作一站式合规交付。',
    stat: '0',
    statLabel: '版权纠纷',
    accent: '#f43f5e',
  },
]

export default function Strengths() {
  const sectionRef = useRef(null)
  const gridRef = useRef(null)

  useSectionTitleReveal({ sectionRef, labelSelector: '.section-label', titleSelector: '.section-title', subtitleSelector: '.section-subtitle' })

  // Card stagger
  useEffect(() => {
    const grid = gridRef.current
    if (!grid) return
    const cards = grid.querySelectorAll('.strength-card')
    if (!cards.length) return

    const ctx = gsap.context(() => {
      gsap.set(cards, {
        opacity: 0,
        rotationY: 15,
        xPercent: (i) => (i % 2 === 0 ? -15 : 15),
        transformPerspective: 800,
      })

      gsap.to(cards, {
        opacity: 1,
        rotationY: 0,
        xPercent: 0,
        duration: 1.1,
        ease: 'power3.out',
        stagger: {
          each: 0.12,
          from: 'random',
        },
        scrollTrigger: {
          trigger: grid,
          start: 'top 80%',
          once: true,
        },
      })
    }, grid)

    return () => ctx.revert()
  }, [])

  return (
    <section id="strengths" className="strengths-section" ref={sectionRef}>
      <div className="container">
        <div className="section-header">
          <div>
            <span className="section-label">Strengths</span>
            <h2 className="section-title">核心能力</h2>
          </div>
          <p className="section-subtitle">
            覆盖 AIGC 视觉创作全流程的六大核心能力
          </p>
        </div>

        <div className="strengths-grid" ref={gridRef}>
          {STRENGTHS.map((item, i) => (
            <div key={i} className="strength-card" style={{ '--card-accent': item.accent }}>
              <div className="strength-card-bg" />
              <div className="strength-icon-wrap" style={{ color: item.accent }}>
                {item.icon}
              </div>
              <h3 className="strength-title">{item.title}</h3>
              <p className="strength-desc">{item.desc}</p>
              <div className="strength-number">0{i + 1}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}