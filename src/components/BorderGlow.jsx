import { useState, useRef, useEffect, useMemo, useCallback } from 'react'

function parseHSL(hslStr) {
  const match = hslStr.match(/([\d.]+)\s*([\d.]+)%?\s*([\d.]+)%?/)
  if (!match) return { h: 40, s: 80, l: 80 }
  return { h: parseFloat(match[1]), s: parseFloat(match[2]), l: parseFloat(match[3]) }
}

function buildBoxShadow(glowColor, intensity) {
  const { h, s, l } = parseHSL(glowColor)
  const base = `${h}deg ${s}% ${l}%`
  const layers = [
    [0, 0, 0, 1, 100, true],
    [0, 0, 1, 0, 60, true],
    [0, 0, 3, 0, 50, true],
    [0, 0, 6, 0, 40, true],
    [0, 0, 15, 0, 30, true],
    [0, 0, 25, 2, 20, true],
    [0, 0, 50, 2, 10, true],
    [0, 0, 1, 0, 60, false],
    [0, 0, 3, 0, 50, false],
    [0, 0, 6, 0, 40, false],
    [0, 0, 15, 0, 30, false],
    [0, 0, 25, 2, 20, false],
    [0, 0, 50, 2, 10, false],
  ]
  return layers
    .map(([x, y, blur, spread, alpha, inset]) => {
      const a = Math.min(alpha * intensity, 100)
      return `${inset ? 'inset ' : ''}${x}px ${y}px ${blur}px ${spread}px hsl(${base} / ${a}%)`
    })
    .join(', ')
}

function easeOutCubic(x) {
  return 1 - Math.pow(1 - x, 3)
}
function easeInCubic(x) {
  return x * x * x
}

const GRADIENT_POSITIONS = ['80% 55%', '69% 34%', '8% 6%', '41% 38%', '86% 85%', '82% 18%', '51% 4%']
const COLOR_MAP = [0, 1, 2, 0, 1, 2, 1]

function buildMeshGradients(colors) {
  const gradients = []
  for (let i = 0; i < 7; i++) {
    const c = colors[Math.min(COLOR_MAP[i], colors.length - 1)]
    gradients.push(`radial-gradient(at ${GRADIENT_POSITIONS[i]}, ${c} 0px, transparent 50%)`)
  }
  gradients.push(`linear-gradient(${colors[0]} 0 100%)`)
  return gradients
}

const defaultProps = {
  className: '',
  edgeSensitivity: 30,
  glowColor: '40 80 80',
  backgroundColor: 'rgba(15, 15, 28, 0.45)',
  borderRadius: 28,
  glowRadius: 40,
  glowIntensity: 1.0,
  coneSpread: 25,
  animated: false,
  colors: ['#c084fc', '#f472b6', '#38bdf8'],
  fillOpacity: 0.5,
  glass: true,
}

export default function BorderGlow(props) {
  const {
    className = defaultProps.className,
    edgeSensitivity = defaultProps.edgeSensitivity,
    glowColor = defaultProps.glowColor,
    backgroundColor = defaultProps.backgroundColor,
    borderRadius = defaultProps.borderRadius,
    glowRadius = defaultProps.glowRadius,
    glowIntensity = defaultProps.glowIntensity,
    coneSpread = defaultProps.coneSpread,
    animated = defaultProps.animated,
    colors = defaultProps.colors,
    fillOpacity = defaultProps.fillOpacity,
    glass = defaultProps.glass,
    children,
  } = props

  const cardRef = useRef(null)
  const [isHovered, setIsHovered] = useState(false)
  const [cursorAngle, setCursorAngle] = useState(45)
  const [edgeProximity, setEdgeProximity] = useState(0)
  const [sweepActive, setSweepActive] = useState(false)

  const getCenterOfElement = useCallback((el) => {
    const { width, height } = el.getBoundingClientRect()
    return [width / 2, height / 2]
  }, [])

  const getEdgeProximity = useCallback((el, x, y) => {
    const [cx, cy] = getCenterOfElement(el)
    const dx = x - cx
    const dy = y - cy
    let kx = Infinity
    let ky = Infinity
    if (dx !== 0) kx = cx / Math.abs(dx)
    if (dy !== 0) ky = cy / Math.abs(dy)
    return Math.min(Math.max(1 / Math.min(kx, ky), 0), 1)
  }, [getCenterOfElement])

  const getCursorAngle = useCallback((el, x, y) => {
    const [cx, cy] = getCenterOfElement(el)
    const dx = x - cx
    const dy = y - cy
    if (dx === 0 && dy === 0) return 0
    const radians = Math.atan2(dy, dx)
    let degrees = radians * (180 / Math.PI) + 90
    if (degrees < 0) degrees += 360
    return degrees
  }, [getCenterOfElement])

  const handlePointerMove = useCallback((e) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    setEdgeProximity(getEdgeProximity(card, x, y))
    setCursorAngle(getCursorAngle(card, x, y))
  }, [getEdgeProximity, getCursorAngle])

  useEffect(() => {
    if (!animated) return
    const angleStart = 110
    const angleEnd = 465
    setSweepActive(true)
    setCursorAngle(angleStart)

    let rafIds = []
    let timeoutIds = []

    const animateValue = ({ start = 0, end = 100, duration = 1000, delay = 0, ease = easeOutCubic, onUpdate, onEnd }) => {
      const t0 = performance.now() + delay
      const tick = () => {
        const elapsed = performance.now() - t0
        const t = Math.min(elapsed / duration, 1)
        onUpdate(start + (end - start) * ease(t))
        if (t < 1) {
          rafIds.push(requestAnimationFrame(tick))
        } else if (onEnd) {
          onEnd()
        }
      }
      const id = setTimeout(() => rafIds.push(requestAnimationFrame(tick)), delay)
      timeoutIds.push(id)
    }

    animateValue({ duration: 500, onUpdate: (v) => setEdgeProximity(v / 100) })
    animateValue({
      ease: easeInCubic,
      duration: 1500,
      end: 50,
      onUpdate: (v) => {
        setCursorAngle((angleEnd - angleStart) * (v / 100) + angleStart)
      },
    })
    animateValue({
      ease: easeOutCubic,
      delay: 1500,
      duration: 2250,
      start: 50,
      end: 100,
      onUpdate: (v) => {
        setCursorAngle((angleEnd - angleStart) * (v / 100) + angleStart)
      },
    })
    animateValue({
      ease: easeInCubic,
      delay: 2500,
      duration: 1500,
      start: 100,
      end: 0,
      onUpdate: (v) => setEdgeProximity(v / 100),
      onEnd: () => setSweepActive(false),
    })

    return () => {
      rafIds.forEach((id) => cancelAnimationFrame(id))
      timeoutIds.forEach((id) => clearTimeout(id))
    }
  }, [animated])

  const colorSensitivity = useMemo(() => edgeSensitivity + 20, [edgeSensitivity])
  const isVisible = useMemo(() => isHovered || sweepActive, [isHovered, sweepActive])
  const borderOpacity = useMemo(
    () =>
      isVisible
        ? Math.max(0, (edgeProximity * 100 - colorSensitivity) / (100 - colorSensitivity))
        : 0,
    [isVisible, edgeProximity, colorSensitivity]
  )
  const glowOpacity = useMemo(
    () =>
      isVisible
        ? Math.max(0, (edgeProximity * 100 - edgeSensitivity) / (100 - edgeSensitivity))
        : 0,
    [isVisible, edgeProximity, edgeSensitivity]
  )

  const meshGradients = useMemo(() => buildMeshGradients(colors), [colors])
  const borderBg = useMemo(() => meshGradients.map((g) => `${g} border-box`), [meshGradients])
  const fillBg = useMemo(() => meshGradients.map((g) => `${g} padding-box`), [meshGradients])
  const angleDeg = useMemo(() => `${cursorAngle.toFixed(3)}deg`, [cursorAngle])

  const transition = isVisible ? 'opacity 0.25s ease-out' : 'opacity 0.75s ease-in-out'
  const conePct = coneSpread
  const conePct2 = coneSpread + 15

  const maskImage = `conic-gradient(from ${angleDeg} at center, black ${conePct}%, transparent ${conePct2}%, transparent ${100 - conePct2}%, black ${100 - conePct}%)`

  return (
    <div
      ref={cardRef}
      onPointerMove={handlePointerMove}
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => setIsHovered(false)}
      className={className}
      style={{
        position: 'relative',
        display: 'grid',
        isolation: 'isolate',
        border: '1px solid rgba(168, 85, 247, 0.12)',
        background: backgroundColor,
        borderRadius: `${borderRadius}px`,
        transform: 'translate3d(0, 0, 0.01px)',
        backdropFilter: glass ? 'blur(16px) saturate(1.3)' : 'none',
        WebkitBackdropFilter: glass ? 'blur(16px) saturate(1.3)' : 'none',
        boxShadow:
          'rgba(0,0,0,0.15) 0 2px 8px, rgba(0,0,0,0.12) 0 4px 16px, rgba(0,0,0,0.1) 0 8px 32px',
      }}
    >
      {/* mesh gradient border */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: -1,
          borderRadius: 'inherit',
          border: '1px solid transparent',
          background: [
            `linear-gradient(${backgroundColor} 0 100%) padding-box`,
            'linear-gradient(rgb(255 255 255 / 0%) 0% 100%) border-box',
            ...borderBg,
          ].join(', '),
          opacity: borderOpacity,
          maskImage,
          WebkitMaskImage: maskImage,
          transition,
        }}
      />

      {/* mesh gradient fill */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: -1,
          borderRadius: 'inherit',
          border: '1px solid transparent',
          background: fillBg.join(', '),
          maskImage: [
            'linear-gradient(to bottom, black, black)',
            'radial-gradient(ellipse at 50% 50%, black 40%, transparent 65%)',
            'radial-gradient(ellipse at 66% 66%, black 5%, transparent 40%)',
            'radial-gradient(ellipse at 33% 33%, black 5%, transparent 40%)',
            'radial-gradient(ellipse at 66% 33%, black 5%, transparent 40%)',
            'radial-gradient(ellipse at 33% 66%, black 5%, transparent 40%)',
            `conic-gradient(from ${angleDeg} at center, transparent 5%, black 15%, black 85%, transparent 95%)`,
          ].join(', '),
          WebkitMaskImage: [
            'linear-gradient(to bottom, black, black)',
            'radial-gradient(ellipse at 50% 50%, black 40%, transparent 65%)',
            'radial-gradient(ellipse at 66% 66%, black 5%, transparent 40%)',
            'radial-gradient(ellipse at 33% 33%, black 5%, transparent 40%)',
            'radial-gradient(ellipse at 66% 33%, black 5%, transparent 40%)',
            'radial-gradient(ellipse at 33% 66%, black 5%, transparent 40%)',
            `conic-gradient(from ${angleDeg} at center, transparent 5%, black 15%, black 85%, transparent 95%)`,
          ].join(', '),
          maskComposite: 'subtract, add, add, add, add, add',
          WebkitMaskComposite: 'source-out, source-over, source-over, source-over, source-over, source-over',
          opacity: borderOpacity * fillOpacity,
          mixBlendMode: 'soft-light',
          transition,
        }}
      />

      {/* outer glow */}
      <span
        style={{
          position: 'absolute',
          zIndex: 1,
          borderRadius: 'inherit',
          pointerEvents: 'none',
          inset: `-${glowRadius}px`,
          maskImage: `conic-gradient(from ${angleDeg} at center, black 2.5%, transparent 10%, transparent 90%, black 97.5%)`,
          WebkitMaskImage: `conic-gradient(from ${angleDeg} at center, black 2.5%, transparent 10%, transparent 90%, black 97.5%)`,
          opacity: glowOpacity,
          mixBlendMode: 'plus-lighter',
          transition,
        }}
      >
        <span
          style={{
            position: 'absolute',
            borderRadius: 'inherit',
            inset: `${glowRadius}px`,
            boxShadow: buildBoxShadow(glowColor, glowIntensity),
          }}
        />
      </span>

      {/* content */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'auto',
        }}
      >
        {children}
      </div>
    </div>
  )
}