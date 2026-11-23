'use client'

import { useEffect } from 'react'
import { MEDIA, isConstrained, loadGsap } from './motion'

/**
 * Page-wide choreography around the main story: hero parallax, scroll-linked reveals,
 * section hand-offs and pointer micro-interactions. Content is complete without it.
 */
export default function ScrollDirector() {
  useEffect(() => {
    const page = document.querySelector<HTMLElement>('.home-page')
    if (!page) return
    let disposed = false
    let cleanup = () => {}

    Promise.all([loadGsap(), isConstrained()]).then(([{ gsap, ScrollTrigger }, constrained]) => {
      if (disposed) return
      const media = gsap.matchMedia()

      media.add({ desktop: MEDIA.desktop, motion: MEDIA.motion }, (context) => {
        const { desktop, motion } = context.conditions!
        if (!motion) return
        const full = !constrained
        const q = gsap.utils.selector(page)
        const scrub = { scrub: 0.4 }

        // Hero exit: three layers leave at three speeds — copy fastest, compass slower, grid slowest.
        if (full) {
          const hero = gsap.timeline({ defaults: { ease: 'none' }, scrollTrigger: { trigger: '#inicio', start: 'top top', end: 'bottom top', scrub: true } })
          hero.to(q('.hero-copy'), { y: desktop ? -140 : -60, opacity: 0, duration: 1 }, 0)
          hero.to(q('.hero-visual'), { y: desktop ? 120 : 50, duration: 1 }, 0)
          hero.to(q('.compass-visual'), { rotation: 50, scale: 1.18, duration: 1 }, 0)
          hero.to(q('.hero-grid'), { y: 180, duration: 1 }, 0)
          hero.to(q('.hero-ticker'), { opacity: 0, duration: 0.4 }, 0)
        }

        // Scroll-linked reveals: progress follows the scroll position in both directions.
        q('[data-reveal]').forEach((item) => {
          const direction = item.dataset.revealDirection
          const delay = parseFloat(getComputedStyle(item).getPropertyValue('--reveal-delay')) || 0
          const offset = delay / 30 // 90ms → 3% later start, a stagger expressed in scroll distance
          const distance = full ? 56 : 24
          const from = direction === 'left' ? { x: distance } : direction === 'right' ? { x: -distance } : { y: distance }
          gsap.fromTo(item, { opacity: 0, ...from }, {
            opacity: 1, x: 0, y: 0, ease: 'power1.out',
            scrollTrigger: { trigger: item, start: `top ${94 - offset}%`, end: `top ${70 - offset}%`, ...scrub },
          })
        })

        // Hand-off from the dark story into the light services: a sheet rises and squares off.
        gsap.fromTo('#atuacao', { borderTopLeftRadius: 48, borderTopRightRadius: 48 }, { borderTopLeftRadius: 0, borderTopRightRadius: 0, ease: 'none', scrollTrigger: { trigger: '#atuacao', start: 'top bottom', end: 'top top', scrub: true } })
        if (full) gsap.fromTo(q('#atuacao h2'), { scale: 0.92, transformOrigin: 'left bottom' }, { scale: 1, ease: 'none', scrollTrigger: { trigger: '#atuacao', start: 'top 90%', end: 'top 30%', ...scrub } })

        // Method: a rail fills as you read and the step at the reading line takes focus.
        gsap.fromTo(q('.process-rail-fill'), { scaleY: 0 }, { scaleY: 1, ease: 'none', scrollTrigger: { trigger: q('.process-steps')[0], start: 'top 60%', end: 'bottom 60%', scrub: true } })
        q('.process-step').forEach((step) => {
          ScrollTrigger.create({ trigger: step, start: 'top 60%', end: 'bottom 60%', toggleClass: 'is-active' })
        })

        // Manifesto: the sentence is read into existence.
        gsap.fromTo(q('.manifesto-quote .word'), { opacity: 0.14 }, { opacity: 1, stagger: 0.1, ease: 'none', scrollTrigger: { trigger: q('.manifesto-quote')[0], start: 'top 80%', end: 'bottom 45%', ...scrub } })
        if (full) gsap.fromTo(q('.manifesto-glow'), { yPercent: -30 }, { yPercent: 40, ease: 'none', scrollTrigger: { trigger: '#manifesto', start: 'top bottom', end: 'bottom top', scrub: true } })

        // Contact: the lime panel grows to fill the frame as it arrives.
        gsap.fromTo(q('.contact-panel'), { scale: 0.9, borderRadius: 64 }, { scale: 1, borderRadius: 32, ease: 'none', scrollTrigger: { trigger: '#contato', start: 'top bottom', end: 'top 25%', ...scrub } })

        // Pointer micro-interactions — only where a precise pointer exists and the device has headroom.
        const listeners: Array<() => void> = []
        if (desktop && full) {
          const heroEl = document.querySelector<HTMLElement>('#inicio')
          const compass = q('.compass-visual')[0]
          if (heroEl && compass) {
            gsap.set(compass, { transformPerspective: 900 })
            const tiltX = gsap.quickTo(compass, 'rotationX', { duration: 0.8, ease: 'power3.out' })
            const tiltY = gsap.quickTo(compass, 'rotationY', { duration: 0.8, ease: 'power3.out' })
            const move = (event: PointerEvent) => {
              const rect = heroEl.getBoundingClientRect()
              tiltY(((event.clientX - rect.left) / rect.width - 0.5) * 14)
              tiltX(-((event.clientY - rect.top) / rect.height - 0.5) * 14)
            }
            const leave = () => { tiltX(0); tiltY(0) }
            heroEl.addEventListener('pointermove', move)
            heroEl.addEventListener('pointerleave', leave)
            listeners.push(() => { heroEl.removeEventListener('pointermove', move); heroEl.removeEventListener('pointerleave', leave) })
          }
          (q('[data-magnetic]') as HTMLElement[]).forEach((target) => {
            const x = gsap.quickTo(target, 'x', { duration: 0.5, ease: 'power3.out' })
            const y = gsap.quickTo(target, 'y', { duration: 0.5, ease: 'power3.out' })
            const move = (event: PointerEvent) => {
              const rect = target.getBoundingClientRect()
              x((event.clientX - rect.left - rect.width / 2) * 0.22)
              y((event.clientY - rect.top - rect.height / 2) * 0.3)
            }
            const leave = () => { x(0); y(0) }
            target.addEventListener('pointermove', move)
            target.addEventListener('pointerleave', leave)
            listeners.push(() => { target.removeEventListener('pointermove', move); target.removeEventListener('pointerleave', leave) })
          })
        }
        return () => listeners.forEach((remove) => remove())
      }, page)

      cleanup = () => media.revert()
      document.fonts.ready.then(() => { if (!disposed) ScrollTrigger.refresh() })
      window.addEventListener('load', () => { if (!disposed) ScrollTrigger.refresh() }, { once: true })
    }).catch(() => { /* Optional enhancement: the page is complete without it. */ })

    return () => { disposed = true; cleanup() }
  }, [])

  return null
}
