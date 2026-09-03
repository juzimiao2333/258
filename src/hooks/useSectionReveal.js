import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '../lib/gsap'

const EASE = 'power4.out'
const DURATION_SLOW = 1.6
const DURATION_MED = 1.2

/**
 * Animate section label + title with dramatic entrance on scroll.
 * @param {Object} opts
 * @param {React.RefObject} opts.sectionRef - The section container ref
 * @param {string} opts.labelSelector - CSS selector for the English label
 * @param {string} opts.titleSelector - CSS selector for the Chinese title
 * @param {string} opts.subtitleSelector - CSS selector for the subtitle
 */
export function useSectionTitleReveal({
  sectionRef,
  labelSelector = '.section-label',
  titleSelector = '.section-title',
  subtitleSelector = '.section-subtitle',
  start = 'top 85%',
}) {
  const ctx = useRef(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    ctx.current = gsap.context(() => {
      const label = el.querySelector(labelSelector)
      const title = el.querySelector(titleSelector)
      const subtitle = el.querySelector(subtitleSelector)

      // Set initial state
      if (label) {
        gsap.set(label, { opacity: 0, x: -80, scale: 1.4 })
      }
      if (title) {
        gsap.set(title, { opacity: 0, clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)', y: 40 })
      }
      if (subtitle) {
        gsap.set(subtitle, { opacity: 0, y: 40 })
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start,
          once: true,
        },
      })

      // Label: dramatic entrance
      if (label) {
        tl.to(label, {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 1.4,
          ease: 'power4.out',
        }, 0)
      }

      // Title: clip-path reveal from left
      if (title) {
        tl.to(title, {
          opacity: 1,
          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
          y: 0,
          duration: DURATION_SLOW,
          ease: EASE,
        }, 0.15)
      }

      // Subtitle: fade up
      if (subtitle) {
        tl.to(subtitle, {
          opacity: 1,
          y: 0,
          duration: DURATION_MED,
          ease: EASE,
        }, 0.4)
      }
    }, [el])

    return () => ctx.current?.revert()
  }, [sectionRef, labelSelector, titleSelector, subtitleSelector, start])
}

/**
 * Stagger reveal for a list of cards/items inside a grid.
 * @param {Object} opts
 * @param {React.RefObject} opts.sectionRef
 * @param {string} opts.itemsSelector - CSS selector for each card item
 * @param {number} opts.stagger - delay between each item (default 0.12)
 * @param {string} opts.start - ScrollTrigger start
 */
export function useCardStagger({
  sectionRef,
  itemsSelector,
  stagger = 0.12,
  start = 'top 82%',
  fromVars = { y: 80, opacity: 0, scale: 0.92 },
}) {
  const ctx = useRef(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const items = el.querySelectorAll(itemsSelector)
    if (!items.length) return

    ctx.current = gsap.context(() => {
      gsap.set(items, fromVars)

      gsap.to(items, {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: 'power4.out',
        stagger,
        scrollTrigger: {
          trigger: el,
          start,
          once: true,
        },
      })
    }, [el])

    return () => ctx.current?.revert()
  }, [sectionRef, itemsSelector, stagger, start])
}

/**
 * Reveal text blocks with a split entrance.
 * @param {Object} opts
 * @param {React.RefObject} opts.sectionRef
 * @param {string} opts.textSelector
 * @param {string} opts.start
 */
export function useTextReveal({
  sectionRef,
  textSelector = '.reveal-text',
  start = 'top 82%',
}) {
  const ctx = useRef(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const blocks = el.querySelectorAll(textSelector)
    if (!blocks.length) return

    ctx.current = gsap.context(() => {
      gsap.set(blocks, { opacity: 0, y: 40 })

      gsap.to(blocks, {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: 'power4.out',
        stagger: 0.2,
        scrollTrigger: {
          trigger: el,
          start,
          once: true,
        },
      })
    }, [el])

    return () => ctx.current?.revert()
  }, [sectionRef, textSelector, start])
}

export { gsap, ScrollTrigger }