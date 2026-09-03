import { useRef, useEffect, useState } from 'react'
import { gsap, ScrollTrigger } from '../lib/gsap'

const skills = [
  { label: 'AI 图片生成', short: 'AI图片', value: 0.92, desc: 'Stable Diffusion、Midjourney、即梦等主流模型精熟运用' },
  { label: 'AI 视频生成', short: 'AI视频', value: 0.88, desc: '可灵、即梦、Runway 等 AI 视频生成工具熟练运用' },
  { label: '视频剪辑', short: '剪辑', value: 0.90, desc: 'PR、剪映专业剪辑与特效合成' },
  { label: 'Skill 创建', short: 'Skill', value: 0.78, desc: 'AI Agent 技能开发与工作流自动化' },
  { label: 'API 调用', short: 'API', value: 0.80, desc: 'AI API 集成与工作流自动化' },
  { label: 'AI 信息流', short: '信息流', value: 0.82, desc: 'AI 驱动的信息流广告全案制作' },
]

const aiTools = [
  { icon: 'Lib', name: 'LiblibAI', desc: 'AI 绘画', url: 'https://www.liblib.art/?sourceid=040006&adacc=187244392&bing_customer_id=254888104&bing_account_id=187244392&kid=83015109487046&k=%E5%93%A9%E5%B8%83%E5%93%A9%E5%B8%83%E5%AE%98%E7%BD%91&utm_source=bing&utm_campaign=040006-%E3%80%90%E5%93%81%E7%89%8C%E8%AF%8D%E3%80%91-%E7%B2%BE%E7%A1%AE&campaignid=524428191&utm_medium=cpc&adgroupname=%5B%E5%93%81%E7%89%8C%E8%AF%8D%5D-%E6%BD%9C%E5%8A%9B&adgroupid=1328213018501966&utm_content=%E5%93%A9%E5%B8%83%E5%93%A9%E5%B8%83%E5%AE%98%E7%BD%91&adid=83013564779503&network=o&utm_term=%E5%93%A9%E5%B8%83%E5%93%A9%E5%B8%83%E5%AE%98%E7%BD%91&targetid=kwd-83015109487046:loc-39&matchtype=e&device=c&msclkid=123d20d738501ea4b5ae4aa209204a3a' },
  { icon: 'G', name: 'ChatGPT', desc: 'AI 对话', url: 'https://chatgpt.com/' },
  { icon: '梦', name: '即梦', desc: 'AI 绘画', url: 'https://jimeng.jianying.com/ai-tool/home' },
  { icon: '雀', name: '小云雀', desc: 'AI 视频', url: 'https://xyq.jianying.com/home?from_page=xiaoyunque_landing_page&tab_name=home' },
]

const designTools = [
  { icon: 'Ps', name: 'PS', desc: '图像处理' },
  { icon: 'Ag', name: 'Agent', desc: 'AI Agent' },
  { icon: 'AP', name: 'API', desc: '接口开发' },
  { icon: 'PR', name: 'PR', desc: '视频剪辑' },
]

function RadarChart({ highlightIndex, radarRef }) {
  const size = 380
  const cx = size / 2
  const cy = size / 2
  const radius = 100
  const levels = 4
  const angles = skills.map((_, i) => (Math.PI * 2 * i) / skills.length - Math.PI / 2)

  const getPoint = (angle, r) => [
    cx + Math.cos(angle) * r,
    cy + Math.sin(angle) * r,
  ]

  const gridLines = []
  for (let l = 1; l <= levels; l++) {
    const r = (radius / levels) * l
    const pts = angles.map((a) => getPoint(a, r))
    const d = pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p[0]} ${p[1]}`).join(' ') + ' Z'
    gridLines.push(d)
  }

  const axisLines = angles.map((a) => {
    const [x, y] = getPoint(a, radius)
    return `M ${cx} ${cy} L ${x} ${y}`
  })

  const dataPoints = skills.map((s, i) => getPoint(angles[i], radius * s.value))
  const dataPath = dataPoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p[0]} ${p[1]}`).join(' ') + ' Z'

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="radar-chart" ref={radarRef}>
      <defs>
        <radialGradient id="radarGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(168, 85, 247, 0.25)" />
          <stop offset="100%" stopColor="rgba(168, 85, 247, 0)" />
        </radialGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <circle cx={cx} cy={cy} r={radius + 45} fill="url(#radarGlow)" opacity="0.6" />

      {gridLines.map((d, i) => (
        <path key={i} d={d} fill="none" stroke="rgba(168,85,247,0.07)" strokeWidth="1" />
      ))}

      {axisLines.map((d, i) => (
        <path
          key={i}
          d={d}
          fill="none"
          stroke={highlightIndex === i ? 'rgba(168,85,247,0.7)' : 'rgba(168,85,247,0.1)'}
          strokeWidth={highlightIndex === i ? 1.5 : 1}
          style={{ transition: 'all 0.3s ease' }}
        />
      ))}

      <path
        className="radar-data-fill"
        d={dataPath}
        fill="rgba(168, 85, 247, 0.12)"
        stroke="#a855f7"
        strokeWidth="2"
        filter="url(#glow)"
      />

      {dataPoints.map((p, i) => (
        <g key={i}>
          <circle
            cx={p[0]}
            cy={p[1]}
            r={highlightIndex === i ? 6 : 4}
            fill="#a855f7"
            filter="url(#glow)"
            style={{ transition: 'all 0.3s ease' }}
          />
          {highlightIndex === i && (
            <circle cx={p[0]} cy={p[1]} r="10" fill="none" stroke="#a855f7" strokeWidth="1" opacity="0.5">
              <animate attributeName="r" from="4" to="14" dur="1.5s" repeatCount="indefinite" />
              <animate attributeName="opacity" from="0.6" to="0" dur="1.5s" repeatCount="indefinite" />
            </circle>
          )}
        </g>
      ))}

      {skills.map((s, i) => {
        const [x, y] = getPoint(angles[i], radius + 52)
        const value = Math.round(s.value * 100)
        return (
          <g key={i}>
            <text
              x={x}
              y={y - 9}
              textAnchor="middle"
              dominantBaseline="middle"
              fill={highlightIndex === i ? '#fff' : 'rgba(255,255,255,0.45)'}
              fontSize="10"
              fontWeight={highlightIndex === i ? '600' : '400'}
              style={{ transition: 'all 0.3s ease' }}
            >
              {value}%
            </text>
            <text
              x={x}
              y={y + 7}
              textAnchor="middle"
              dominantBaseline="middle"
              fill={highlightIndex === i ? '#c084fc' : 'rgba(255,255,255,0.55)'}
              fontSize="11"
              fontWeight={highlightIndex === i ? '500' : '400'}
              style={{ transition: 'all 0.3s ease' }}
            >
              {s.short}
            </text>
          </g>
        )
      })}
    </svg>
  )
}

function ToolCard({ tool, delay }) {
  const content = (
    <div className="tool-card" style={{ '--delay': `${delay}s` }}>
      <div className="tool-icon-wrap">
        <div className="tool-icon-front">{tool.icon}</div>
        <div className="tool-icon-back">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </svg>
        </div>
      </div>
      <span className="tool-name">{tool.name}</span>
      <span className="tool-desc">{tool.desc}</span>
    </div>
  )
  if (tool.url) {
    return (
      <a href={tool.url} target="_blank" rel="noopener noreferrer" className="tool-card-link">
        {content}
      </a>
    )
  }
  return content
}

export default function ExperienceSkills() {
  const sectionRef = useRef(null)
  const radarRef = useRef(null)
  const [highlightIndex, setHighlightIndex] = useState(-1)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: 'top 75%',
          once: true,
        },
      })

      gsap.set(el.querySelectorAll('.section-label, .section-title, .section-subtitle'), {
        opacity: 0,
        y: 30,
      })
      gsap.set(el.querySelectorAll('.skills-panel, .tools-panel'), {
        opacity: 0,
        y: 40,
      })
      gsap.set(el.querySelectorAll('.skill-item, .tool-card'), {
        opacity: 0,
        y: 20,
      })

      // Section header
      tl.to('.section-label', {
        opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
      }, 0)
      tl.to('.section-title', {
        opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
      }, 0.1)
      tl.to('.section-subtitle', {
        opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
      }, 0.25)

      // Skills panel
      tl.to('.skills-panel', {
        opacity: 1, y: 0, duration: 0.9, ease: 'power4.out',
      }, 0.4)

      // Radar chart stroke animation
      const fillPath = el.querySelector('.radar-data-fill')
      if (fillPath) {
        const len = fillPath.getTotalLength()
        gsap.set(fillPath, { strokeDasharray: len, strokeDashoffset: len, fillOpacity: 0 })
        tl.to(fillPath, {
          strokeDashoffset: 0,
          fillOpacity: 0.12,
          duration: 1.6,
          ease: 'power2.out',
        }, 0.6)
      }

      // Skill items stagger
      tl.to('.skill-item', {
        opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', stagger: 0.07,
      }, 0.7)

      // Tools panel
      tl.to('.tools-panel', {
        opacity: 1, y: 0, duration: 0.9, ease: 'power4.out',
      }, 0.9)

      tl.to('.tool-card', {
        opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'back.out(1.5)', stagger: 0.04,
      }, 1.1)

      tl.to('.tools-more-btn', {
        opacity: 1, y: 0, duration: 0.6, ease: 'power3.out',
      }, 1.4)
    }, el)

    return () => ctx.revert()
  }, [])

  return (
    <section id="experience" className="experience-skills-section" ref={sectionRef}>
      <div className="container">
        <div className="section-header skills-header">
          <div>
            <span className="section-label">Capabilities</span>
            <h2 className="section-title">能力 & 工具</h2>
          </div>
          <p className="section-subtitle">
            从 AI 生成到专业设计，构建完整的视觉创作能力矩阵
          </p>
        </div>

        {/* Skills Panel */}
        <div className="skills-panel">
          <div className="panel-header">
            <h3 className="panel-title">
              <span className="panel-title-accent" />
              能力说明
            </h3>
            <p className="panel-desc">六大核心能力维度，覆盖 AI 视觉创作全流程</p>
          </div>
          <div className="skills-content">
            <div className="radar-wrapper">
              <RadarChart highlightIndex={highlightIndex} radarRef={radarRef} />
            </div>
            <div className="skills-list">
              {skills.map((skill, i) => (
                <div
                  key={i}
                  className={`skill-item ${highlightIndex === i ? 'active' : ''}`}
                  onMouseEnter={() => setHighlightIndex(i)}
                  onMouseLeave={() => setHighlightIndex(-1)}
                >
                  <div className="skill-header">
                    <span className="skill-name">{skill.label}</span>
                    <span className="skill-value">{Math.round(skill.value * 100)}%</span>
                  </div>
                  <div className="skill-bar">
                    <div
                      className="skill-bar-fill"
                      style={{ '--fill-width': `${skill.value * 100}%` }}
                    />
                  </div>
                  <p className="skill-desc">{skill.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tools Panel */}
        <div className="tools-panel">
          <div className="panel-header">
            <h3 className="panel-title">
              <span className="panel-title-accent" />
              工具链接
            </h3>
            <p className="panel-desc">日常使用的 AI 创作与专业设计工具</p>
          </div>

          <div className="tools-groups">
            <div className="tools-group">
              <div className="tools-group-label">
                <span className="tools-group-dot" />
                AI 创作工具
              </div>
              <div className="tools-grid">
                {aiTools.map((tool, i) => (
                  <ToolCard key={i} tool={tool} delay={i * 0.05} />
                ))}
              </div>
            </div>

            <div className="tools-group">
              <div className="tools-group-label">
                <span className="tools-group-dot" />
                专业设计工具
              </div>
              <div className="tools-grid">
                {designTools.map((tool, i) => (
                  <ToolCard key={i} tool={tool} delay={(i + 4) * 0.05} />
                ))}
              </div>
            </div>
          </div>

          <a href="#" className="tools-more-btn">
            <span>查看更多工具</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
