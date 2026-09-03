import { useRef, useEffect } from 'react'
import { gsap, ScrollTrigger } from '../lib/gsap'
import { useSectionTitleReveal } from '../hooks/useSectionReveal'

const experiences = [
  {
    title: '众圣求我出世，我从洪荒苟道大唐',
    platform: '红果短剧',
    tags: ['穿越', '传统玄幻'],
    items: [
      '配合主剪辑完成AI素材筛选、粗剪与片段拼接。',
      '完成9:16竖屏后期包装：配音对齐、字幕花字、音效BGM、基础转场。',
      '替换崩坏镜头，按分镜脚本输出成片，根据反馈迭代修改，项目已上线。',
    ],
  },
  {
    title: '绝境求生，我用情报统治冰原',
    platform: '红果短剧',
    tags: ['末日', '生存科幻'],
    items: [
      '独立拆解剧本、规划分镜，完成AI镜头素材筛选与全片剪辑。',
      '把控叙事节奏，完成镜头调度、转场、配音字幕、音效配乐整套后期，输出9:16竖屏成片。',
      '主动处理AI画面瑕疵，规避审核风险，对接需求完成多集批量交付，项目已上线。',
    ],
  },
  {
    title: '考研失败，我只能去西游当国师了',
    platform: '红果短剧',
    tags: ['穿越', '东方仙侠'],
    items: [
      '参与前期剧本评估，结合题材爽点制定镜头策略，独立完成分镜规划与全剧剪辑。',
      '甄别重组海量AI素材，把控史诗叙事节奏，完成全链路后期，输出8K 9:16竖屏成片。',
      '优化镜头取舍逻辑，降低素材崩坏率，对齐团队需求完成长篇集数交付，沉淀剪辑复用经验，项目已上线。',
    ],
  },
]

export default function About() {
  const sectionRef = useRef(null)
  const statsRef = useRef(null)
  const contactRef = useRef(null)
  const descRef = useRef(null)

  useSectionTitleReveal({ sectionRef, labelSelector: '.section-label', titleSelector: '.section-title' })

  // Stats counter animation + text reveal in one timeline
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const paragraphs = el.querySelectorAll('.about-desc p')
    const stats = el.querySelectorAll('.stat-value')
    const contactItems = el.querySelectorAll('.contact-item')
    const expItems = el.querySelectorAll('.about-exp-item')

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: 'top 75%',
          once: true,
        },
      })

      // Paragraphs stagger
      if (paragraphs.length) {
        gsap.set(paragraphs, { opacity: 0, y: 40 })
        tl.to(paragraphs, {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power4.out',
          stagger: 0.2,
        }, 0)
      }

      // Stats counter
      if (stats.length) {
        stats.forEach((stat) => {
          const text = stat.textContent
          const num = parseInt(text)
          const suffix = text.replace(/[\d]/g, '')
          if (isNaN(num)) return
          tl.fromTo(stat,
            { textContent: 0 },
            {
              textContent: num,
              duration: 2,
              ease: 'power4.out',
              snap: { textContent: 1 },
              onUpdate: function () {
                stat.textContent = Math.round(this.targets()[0].textContent) + suffix
              },
            },
            0.3
          )
        })
      }

      // Contact items
      if (contactItems.length) {
        gsap.set(contactItems, { opacity: 0, x: -30 })
        tl.to(contactItems, {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power4.out',
          stagger: 0.1,
        }, 0.6)
      }

      // Experience items
      if (expItems.length) {
        gsap.set(expItems, { opacity: 0, y: 30 })
        tl.to(expItems, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power4.out',
          stagger: 0.15,
        }, 0.8)
      }
    }, el)

    return () => ctx.revert()
  }, [])

  const stats = [
    { value: '50+', label: '合作品牌' },
    { value: '200+', label: '完成项目' },
    { value: '8', label: '年设计经验' },
    { value: '15+', label: '行业奖项' },
  ]

  const contactItems = [
    { icon: 'qq', label: 'QQ：2584095757' },
    { icon: 'wechat', label: '微信：cl-5757' },
    { icon: 'phone', label: '手机：13592517549' },
  ]

  return (
    <section id="about" className="about-section" ref={sectionRef}>
      <div className="about-bg-line" />
      <div className="container">
        <div className="about-grid">
          <div className="about-left">
            <div className="about-card">
              <div className="about-card-image">
                <img src="/avatar.jpg" alt="AIGC 视觉设计师" className="about-card-img" />
              </div>
              <div className="about-card-info">
                <h3 className="about-card-name">AIGC 视觉设计师</h3>
                <p className="about-card-role">专注 AI 生成式视觉创作</p>
              </div>
            </div>

            <div className="about-contact-card">
              <h3 className="contact-heading">
                <span className="contact-heading-dot" />
                联系方式
              </h3>
              <div className="contact-list">
                {contactItems.map((item, i) => (
                  <a key={i} href="#" className="contact-item">
                    <span className="contact-icon">
                      {item.icon === 'qq' && (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10" />
                          <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                          <line x1="9" y1="9" x2="9.01" y2="9" />
                          <line x1="15" y1="9" x2="15.01" y2="9" />
                        </svg>
                      )}
                      {item.icon === 'wechat' && (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                        </svg>
                      )}
                      {item.icon === 'phone' && (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                        </svg>
                      )}
                    </span>
                    <span className="contact-text">{item.label}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="about-right">
            <div className="about-right-card">
              <span className="section-label">About</span>
              <h2 className="section-title">以 AI 为笔，<br />重新定义视觉设计</h2>

              <div className="about-desc">
                <p>
                  我是一名 AIGC 视觉设计师，专注于 AI 驱动的创意视觉内容创作。擅长 AI 短剧生成、AI 图片生成、AI 信息流制作、视频剪辑以及 AI 工具的 Skill 开发与 API 调用。
                </p>
                <p>
                  熟练掌握即梦、小云雀、Libtv、可灵等主流 AI 创作工具，能够根据项目需求灵活组合工具链，实现从创意构思到成品交付的全流程闭环。致力于用前沿 AI 技术赋能创意表达，让每一个想法都能以最高效、最惊艳的方式呈现。
                </p>
              </div>

              <div className="about-exp">
                <h3 className="about-exp-heading">
                  项目<span className="title-accent">经历</span>
                </h3>
                <div className="about-exp-timeline">
                  {experiences.map((exp, i) => (
                    <div key={i} className="about-exp-item">
                      <div className="about-exp-dot" />
                      {i < experiences.length - 1 && <div className="about-exp-line" />}
                      <div className="about-exp-content">
                        <div className="about-exp-meta">
                          <span className="about-exp-platform">{exp.platform}</span>
                          {exp.tags.map((tag) => (
                            <span key={tag} className="about-exp-tag">{tag}</span>
                          ))}
                        </div>
                        <h4 className="about-exp-title">《{exp.title}》</h4>
                        <ul className="about-exp-items">
                          {exp.items.map((item, j) => (
                            <li key={j} className="about-exp-point">
                              <span className="about-exp-point-num">{j + 1}</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}