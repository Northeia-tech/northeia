'use client'

import { useEffect, useRef } from 'react'
import CompassGraphic, { compassPoints } from './CompassGraphic'
import { MEDIA, isConstrained, loadGsap } from './motion'

const BASE = 600 // intrinsic size of the travelling element; it is only ever scaled by transform

const TONES = {
  dark: { '--cm': '#c4e68b', '--cd': '#8ba798', '--na': '#e5f6c9', '--nb': '#789b79', '--ns': '#416258', '--hub': '#0b171e' },
  light: { '--cm': '#496b45', '--cd': '#718b70', '--na': '#4f7d68', '--nb': '#102f32', '--ns': '#a9bdb0', '--hub': '#f6f6f1' },
} as const
type Tone = keyof typeof TONES
type Rect = { x: number; y: number; size: number }

const clamp01 = (n: number) => Math.min(1, Math.max(0, n))
const ease = (t: number) => t * t * (3 - 2 * t) // smoothstep: departures and arrivals settle softly
const mix = (a: Rect, b: Rect, t: number): Rect => ({ x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t, size: a.size + (b.size - a.size) * t })

/**
 * One compass for the whole page. Sections declare where it should sit with `data-compass-slot`;
 * this layer flies the same instrument between those slots as you scroll, docking as a small
 * badge between stops. Everything is derived from live layout, so it tracks the real scroll
 * position in both directions. Without JS or with reduced motion, static copies in the slots show.
 */
export default function JourneyCompass() {
  const shell = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = shell.current
    const page = el?.closest<HTMLElement>('.home-page')
    if (!el || !page) return
    let disposed = false
    let cleanup = () => {}

    Promise.all([loadGsap(), isConstrained()]).then(([{ gsap, ScrollTrigger }, constrained]) => {
      if (disposed) return
      const media = gsap.matchMedia()
      media.add({ motion: MEDIA.motion, desktop: MEDIA.desktop, wide: '(min-width: 1024px)' }, (context) => {
        const { motion, desktop, wide } = context.conditions!
        if (!motion) return
        page.dataset.journey = ''
        const q = gsap.utils.selector(el)
        const tilt = q('.journey-compass-tilt')[0]
        const disc = q('.journey-compass-disc')[0]
        const slots = Array.from(page.querySelectorAll<HTMLElement>('[data-compass-slot]'))
        const tones = slots.map((slot) => (slot.dataset.compassTone as Tone) || 'dark')
        const toneMixers = Object.fromEntries(Object.keys(TONES.dark).map((key) => [key, gsap.utils.interpolate(TONES.dark[key as keyof typeof TONES.dark], TONES.light[key as keyof typeof TONES.light])]))

        // Where the compass waits between stops: centred in the right gutter on wide screens,
        // a bottom-right badge elsewhere.
        const dock = (): Rect => {
          const vw = document.documentElement.clientWidth
          const vh = window.innerHeight
          if (wide) {
            const size = 48
            const gutter = Math.max(64, (vw - 1192) / 2)
            return { x: Math.min(vw - size - 10, vw - gutter / 2 - size / 2), y: vh / 2 - size / 2, size }
          }
          return { x: vw - 44 - 14, y: vh - 44 - 14, size: 44 }
        }

        let lastTone = -1
        let lastLine = 0
        const render = () => {
          const vh = window.innerHeight
          const maxScroll = document.documentElement.scrollHeight - vh
          const rects = slots.map((slot) => slot.getBoundingClientRect())
          // A slot has "arrived" once its top reaches 55% of the viewport, or the furthest it can
          // reach at the bottom of the page (so the final stop always completes).
          const arrivedTop = rects.map((r) => Math.max(vh * 0.55, r.top - (maxScroll - window.scrollY) + 1))
          let i = 0
          rects.forEach((r, index) => { if (r.top <= arrivedTop[index] + 0.5) i = index })
          const toRect = (r: DOMRect): Rect => { const size = Math.min(r.width, r.height); return { x: r.left + (r.width - size) / 2, y: r.top + (r.height - size) / 2, size } }

          const current = toRect(rects[i])
          const leave = ease(clamp01(-rects[i].top / (rects[i].height * 0.9)))
          let target = mix(current, dock(), leave)
          let arrive = 0
          const n = i + 1
          if (n < slots.length) {
            arrive = ease(clamp01((vh - rects[n].top) / Math.max(1, vh - arrivedTop[n])))
            target = mix(target, toRect(rects[n]), arrive)
          }

          const scale = target.size / BASE
          el.style.transform = `translate3d(${target.x}px, ${target.y}px, 0) scale(${scale})`
          // Keep hairlines at least ~0.8px on screen however small the compass gets.
          const line = Math.max(1, 0.8 / scale)
          if (Math.abs(line - lastLine) / line > 0.04) { el.style.setProperty('--line', line.toFixed(2)); lastLine = line }
          const docked = leave * (1 - arrive)
          disc.style.opacity = docked.toFixed(3)

          // Colour follows the stop it is leaving/approaching; the dock badge is always dark.
          const fromLight = tones[i] === 'light' ? 1 - leave : 0
          const toLight = n < slots.length && tones[n] === 'light' ? 1 : 0
          const light = Math.round((fromLight + (toLight - fromLight) * arrive) * 100) / 100
          if (light !== lastTone) {
            for (const key in toneMixers) el.style.setProperty(key, toneMixers[key](light))
            lastTone = light
          }
        }

        // Render on every frame while scrolling or while scrubbed layouts are still settling.
        let idleFrames = 0
        const tick = () => { render(); if (++idleFrames > 90) gsap.ticker.remove(tick) }
        const wake = () => { if (idleFrames > 90) gsap.ticker.add(tick); idleFrames = 0 }
        idleFrames = 91
        wake()
        window.addEventListener('scroll', wake, { passive: true })
        window.addEventListener('resize', wake)
        ScrollTrigger.addEventListener('refresh', wake)

        // ——— The instrument's inner states, one chapter of the story per scroll range ———
        const needle = q('.compass-needle'), orbits = q('.compass-orbits'), points = q('.compass-point'), path = q('.compass-path'), stones = q('.compass-milestone')
        gsap.set(needle, { transformOrigin: '50% 54.55%', rotation: 28, scale: 1, y: 0 })
        gsap.set(orbits, { transformOrigin: '50% 50%', rotation: 0, scale: 1, opacity: 1 })
        gsap.set(points, { x: 0, y: 0, opacity: 1 })
        gsap.set(path, { strokeDashoffset: 1, opacity: 0 })
        gsap.set(stones, { opacity: 0, scale: 0.6, transformOrigin: 'center' })
        const no = { immediateRender: false }
        // Section triggers live outside this component's GSAP scope, so resolve them from the page.
        const section = (selector: string) => page.querySelector<HTMLElement>(selector)
        const full = !constrained

        // Intro: "vamos encontrar a direção" — the needle searches, signals scatter.
        const search = gsap.timeline({ defaults: { ease: 'none' }, scrollTrigger: { trigger: section('.story-intro'), start: 'top bottom', end: 'bottom bottom', scrub: 0.6 } })
        search.fromTo(needle, { rotation: 28 }, { rotation: -130, ...no }, 0)
        if (full) search.fromTo(points, { x: 0, y: 0, opacity: 1 }, { x: (k: number) => compassPoints[k].dx, y: (k: number) => compassPoints[k].dy, opacity: 0.35, ...no }, 0)
        search.fromTo(orbits, { rotation: 0, scale: 1, opacity: 1 }, { rotation: -35, scale: 0.8, opacity: 0.3, ...no }, 0)

        // Chapters: signals converge → needle finds north → the path is drawn.
        const story = gsap.timeline({ defaults: { ease: 'none' }, scrollTrigger: { trigger: section('.story-chapters'), start: 'top center', end: 'bottom center', scrub: 0.6 } })
        if (full) story.fromTo(points, { x: (k: number) => compassPoints[k].dx, y: (k: number) => compassPoints[k].dy, opacity: 0.35 }, { x: 0, y: 0, opacity: 1, duration: 1.1, ...no }, 0)
        story.fromTo(orbits, { rotation: -35, scale: 0.8, opacity: 0.3 }, { rotation: 0, scale: 1, opacity: 1, duration: 1.1, ...no }, 0)
        story.fromTo(needle, { rotation: -130 }, { rotation: 0, duration: 0.8, ...no }, 1)
        story.fromTo(orbits, { rotation: 0, scale: 1, opacity: 1 }, { rotation: 35, scale: 1.08, opacity: 0.35, duration: 1, ...no }, 2)
        story.fromTo(points, { opacity: 1 }, { opacity: 0.2, duration: 0.8, ...no }, 2)
        story.fromTo(needle, { scale: 1, y: 0 }, { scale: 0.5, y: -100, duration: 0.9, ...no }, 2)
        story.fromTo(path, { strokeDashoffset: 1, opacity: 0 }, { strokeDashoffset: 0, opacity: 1, duration: 0.9, ...no }, 2.05)
        story.fromTo(stones, { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, stagger: 0.15, duration: 0.4, ...no }, 2.15)

        // After the story: the compass resets to its clean form and travels with the visitor.
        const settle = gsap.timeline({ defaults: { ease: 'none' }, scrollTrigger: { trigger: section('.story-outro'), start: 'top center', end: 'bottom center', scrub: 0.6 } })
        settle.fromTo(needle, { scale: 0.5, y: -100 }, { scale: 1, y: 0, ...no }, 0)
        settle.fromTo(orbits, { rotation: 35, scale: 1.08, opacity: 0.35 }, { rotation: 0, scale: 1, opacity: 1, ...no }, 0)
        settle.fromTo(points, { opacity: 0.2 }, { opacity: 1, ...no }, 0)
        settle.fromTo([path, stones], { opacity: 1 }, { opacity: 0, ...no }, 0)

        // The rest of the page: one full sweep, so the needle lands back on north at the footer.
        gsap.timeline({ defaults: { ease: 'none' }, scrollTrigger: { trigger: section('#atuacao'), start: 'top center', endTrigger: page, end: 'bottom bottom', scrub: 0.6 } })
          .fromTo(needle, { rotation: 0 }, { rotation: 360, ...no }, 0)
          .fromTo(orbits, { rotation: 0 }, { rotation: -90, ...no }, 0)

        // Pointer tilt while the compass is in the hero.
        const listeners: Array<() => void> = []
        const hero = page.querySelector<HTMLElement>('#inicio')
        if (desktop && full && hero) {
          gsap.set(tilt, { transformPerspective: 900 })
          const tiltX = gsap.quickTo(tilt, 'rotationX', { duration: 0.8, ease: 'power3.out' })
          const tiltY = gsap.quickTo(tilt, 'rotationY', { duration: 0.8, ease: 'power3.out' })
          const move = (event: PointerEvent) => {
            const rect = hero.getBoundingClientRect()
            tiltY(((event.clientX - rect.left) / rect.width - 0.5) * 16)
            tiltX(-((event.clientY - rect.top) / rect.height - 0.5) * 16)
          }
          const reset = () => { tiltX(0); tiltY(0) }
          const onScroll = () => { if (window.scrollY > hero.offsetHeight * 0.3) reset() }
          hero.addEventListener('pointermove', move)
          hero.addEventListener('pointerleave', reset)
          window.addEventListener('scroll', onScroll, { passive: true })
          listeners.push(() => { hero.removeEventListener('pointermove', move); hero.removeEventListener('pointerleave', reset); window.removeEventListener('scroll', onScroll) })
        }

        ScrollTrigger.refresh()
        return () => {
          listeners.forEach((remove) => remove())
          gsap.ticker.remove(tick)
          window.removeEventListener('scroll', wake)
          window.removeEventListener('resize', wake)
          ScrollTrigger.removeEventListener('refresh', wake)
          delete page.dataset.journey
          el.removeAttribute('style')
        }
      }, el)
      cleanup = () => media.revert()
    }).catch(() => { /* Static compasses remain in place if the motion chunk fails. */ })

    return () => { disposed = true; cleanup() }
  }, [])

  return (
    <div ref={shell} className="journey-compass" aria-hidden="true">
      <div className="journey-compass-disc" />
      <div className="journey-compass-tilt"><CompassGraphic /></div>
    </div>
  )
}
