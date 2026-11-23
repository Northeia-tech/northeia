'use client'

import { useEffect, useRef } from 'react'
import Words from './Words'
import { MEDIA, isConstrained, loadGsap } from './motion'

const chapters = [
  { number: '01', label: 'Enxergar', title: 'Informação existe.\nClareza, nem sempre.', text: 'Planilhas, processos e sistemas contam partes da história. Primeiro, conectamos os pontos para entender o que está travando sua operação.', detail: 'Do sintoma à causa.' },
  { number: '02', label: 'Direcionar', title: 'Quando os pontos se conectam,\no norte aparece.', text: 'Transformamos dados em entendimento. O que importa fica visível, e as prioridades deixam de disputar a sua atenção.', detail: 'Da informação à decisão.' },
  { number: '03', label: 'Construir', title: 'Direção só faz sentido\nquando vira movimento.', text: 'Sistemas, integrações e automações colocam a estratégia em prática. Uma mudança de cada vez, conectada ao seu negócio.', detail: 'Da decisão à execução.' },
]

// Deterministic, rounded positions keep server and client markup identical.
const round = (n: number) => Math.round(n * 100) / 100
const points = Array.from({ length: 18 }, (_, i) => {
  const angle = (i / 18) * Math.PI * 2
  return { x: round(300 + Math.cos(angle) * 170), y: round(300 + Math.sin(angle) * 170), dx: round(Math.sin(i * 7.3) * 120), dy: round(Math.cos(i * 4.7) * 110) }
})

export default function ScrollStory() {
  const root = useRef<HTMLElement>(null)

  useEffect(() => {
    const element = root.current
    if (!element) return
    let disposed = false
    let cleanup = () => {}

    Promise.all([loadGsap(), isConstrained()]).then(([{ gsap, ScrollTrigger }, constrained]) => {
      if (disposed) return
      const media = gsap.matchMedia()
      // matchMedia only runs when a condition matches; `motion` and `reduced` together cover every device.
      media.add({ desktop: MEDIA.desktop, reduced: MEDIA.reduced, motion: MEDIA.motion }, (context) => {
        const { desktop, reduced } = context.conditions!
        const level = reduced ? 'static' : constrained ? 'simple' : 'full'
        element.dataset.motion = level
        if (reduced) return () => { delete element.dataset.motion }
        const full = level === 'full'
        const q = gsap.utils.selector(element)

        // Act I — the statement lights up word by word while the stage is held by CSS sticky.
        const intro = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: { trigger: q('.story-intro')[0], start: 'top 35%', end: 'bottom bottom', scrub: 0.5 },
        })
        intro.fromTo(q('.story-statement .word'), { opacity: 0.12 }, { opacity: 1, stagger: 0.08, duration: 0.3 }, 0)
        if (full) {
          intro.fromTo(q('.story-intro-rings'), { scale: 0.45, rotation: -40, opacity: 0 }, { scale: 1, rotation: 0, opacity: 1, duration: 1.3 }, 0)
          intro.fromTo(q('.story-intro-copy'), { y: 60 }, { y: 0, duration: 1 }, 0)
        }
        // Exit: the statement recedes so the chapters don't arrive on top of it.
        intro.to(q('.story-intro-copy'), { opacity: 0.2, scale: 0.94, y: full ? -50 : 0, duration: 0.5 }, '>+0.25')
        if (full) intro.to(q('.story-intro-rings'), { scale: 1.6, opacity: 0, duration: 0.5 }, '<')

        // Act II — each chapter comes into focus as it reaches the reading line, then steps back.
        q('.story-chapter').forEach((chapter, index) => {
          const focus = gsap.timeline({ defaults: { ease: 'none' }, scrollTrigger: { trigger: chapter, start: 'top 85%', end: 'bottom 15%', scrub: 0.4 } })
          focus.fromTo(chapter, { opacity: 0.22 }, { opacity: 1, duration: 0.3 }, 0).to(chapter, { opacity: 0.22, duration: 0.3 }, 0.7)
          if (full) focus.fromTo(chapter.querySelectorAll('h2 > span'), { y: 40 }, { y: 0, stagger: 0.06, duration: 0.3 }, 0)
          ScrollTrigger.create({ trigger: chapter, start: 'top center', end: 'bottom center', toggleClass: { targets: q('.story-readout span')[index], className: 'is-active' } })
        })

        // The instrument tells the same three beats: scattered signals → north → path.
        const instrument = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: desktop
            ? { trigger: q('.story-chapters')[0], start: 'top center', end: 'bottom center', scrub: 0.6, invalidateOnRefresh: true }
            : { trigger: q('.story-visual')[0], start: 'top 85%', end: 'bottom 15%', scrub: 0.6, invalidateOnRefresh: true },
        })
        instrument.fromTo(q('.story-progress-fill'), { scaleX: 0 }, { scaleX: 1, duration: 3 }, 0)
        if (full) {
          // Pivot both around the compass centre (300,300 in the viewBox).
          gsap.set(q('.story-orbits'), { transformOrigin: '50% 50%' })
          gsap.set(q('.story-needle'), { transformOrigin: '50% 54.55%' })
          instrument.fromTo(q('.story-point'), { x: (i: number) => points[i].dx, y: (i: number) => points[i].dy, opacity: 0.3 }, { x: 0, y: 0, opacity: 1, duration: 1.1 }, 0)
          instrument.fromTo(q('.story-orbits'), { rotation: -35, scale: 0.78, opacity: 0.2 }, { rotation: 0, scale: 1, opacity: 1, duration: 1.1 }, 0)
          instrument.fromTo(q('.story-needle'), { rotation: -125, opacity: 0, scale: 0.65 }, { rotation: 0, opacity: 1, scale: 1, duration: 0.8 }, 1)
          instrument.to(q('.story-orbits'), { scale: 1.08, rotation: 35, opacity: 0.35, duration: 1 }, 2)
          instrument.to(q('.story-point'), { opacity: 0.2, duration: 0.8 }, 2)
          instrument.to(q('.story-needle'), { scale: 0.5, y: -100, duration: 0.9 }, 2)
          instrument.fromTo(q('.story-path'), { strokeDashoffset: 1, opacity: 0 }, { strokeDashoffset: 0, opacity: 1, duration: 0.9 }, 2.05)
          instrument.fromTo(q('.story-milestone'), { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, stagger: 0.15, duration: 0.4, transformOrigin: 'center' }, 2.15)
          // Depth: halo and coordinate drift at different speeds from the instrument.
          instrument.fromTo(q('.story-halo'), { y: -40, scale: 0.9 }, { y: 50, scale: 1.15, duration: 3 }, 0)
          instrument.fromTo(q('.story-coordinate'), { y: 30 }, { y: -30, duration: 3 }, 0)
        } else {
          instrument.fromTo(q('.story-orbits'), { opacity: 0.25 }, { opacity: 0.9, duration: 3 }, 0)
        }

        // Act III — the conclusion grows into place, then lingers while the next section slides over it.
        gsap.fromTo(q('.story-outro-inner'), { scale: 0.86, opacity: 0.15 }, { scale: 1, opacity: 1, ease: 'none', scrollTrigger: { trigger: q('.story-outro')[0], start: 'top 90%', end: 'center 55%', scrub: 0.5 } })
        if (full) gsap.to(q('.story-outro-inner'), { yPercent: 35, ease: 'none', scrollTrigger: { trigger: q('.story-outro')[0], start: 'center 55%', end: 'bottom top', scrub: true } })

        return () => { delete element.dataset.motion }
      }, element)
      cleanup = () => media.revert()
      document.fonts.ready.then(() => { if (!disposed) ScrollTrigger.refresh() })
    }).catch(() => { /* Static content remains complete if the optional animation chunk fails. */ })
    return () => { disposed = true; cleanup() }
  }, [])

  return (
    <section id="abordagem" className="scroll-story" ref={root} aria-label="Da complexidade à direção">
      <div className="story-intro">
        <div className="story-intro-stage">
          <div className="story-intro-rings" aria-hidden="true"><span /><span /><span /></div>
          <div className="story-intro-copy">
            <p className="section-label">A perspectiva muda tudo</p>
            <p className="story-statement">
              <Words text="Seu negócio tem um próximo passo." />
              <Words className="story-statement-accent" text="Vamos encontrar a direção." />
            </p>
            <a href="#atuacao" className="story-skip">Ir direto às soluções <span aria-hidden="true">↘</span></a>
          </div>
        </div>
      </div>
      <div className="story-layout">
        <div className="story-visual" aria-hidden="true">
          <div className="story-halo" />
          <span className="story-coordinate">N / 01 — 03</span>
          <svg className="story-instrument" viewBox="0 0 600 600" fill="none">
            <defs>
              <linearGradient id="story-needle-gradient" x1="270" y1="150" x2="320" y2="400" gradientUnits="userSpaceOnUse"><stop stopColor="#e5f6c9" /><stop offset="1" stopColor="#789b79" /></linearGradient>
            </defs>
            <g className="story-orbits" stroke="#c4e68b">
              <circle cx="300" cy="300" r="235" strokeOpacity=".13" />
              <circle cx="300" cy="300" r="210" strokeOpacity=".4" strokeDasharray="1 12" />
              <circle cx="300" cy="300" r="170" strokeOpacity=".25" />
              <circle cx="300" cy="300" r="112" strokeOpacity=".3" />
              <path d="M300 45v510M45 300h510" strokeOpacity=".16" strokeDasharray="3 8" />
              <path d="M65 300a235 235 0 0 1 235-235" strokeOpacity=".8" />
            </g>
            {points.map((point, i) => <circle className="story-point" key={i} cx={point.x} cy={point.y} r={i % 3 === 0 ? 4 : 2} fill={i % 3 === 0 ? '#c4e68b' : '#8ba798'} />)}
            <path className="story-path" d="M150 460H240V340H360V220H450" pathLength="1" strokeDasharray="1" stroke="#c4e68b" strokeWidth="2" />
            {[{ x: 150, y: 460 }, { x: 240, y: 340 }, { x: 360, y: 220 }, { x: 450, y: 220 }].map(({ x, y }, i) => <g key={i} className="story-milestone"><circle cx={x} cy={y} r="12" fill="#0b171e" stroke="#c4e68b" /><circle cx={x} cy={y} r="3" fill="#c4e68b" /></g>)}
            <g className="story-needle">
              <path d="M300 150 330 300 300 280 270 300Z" fill="url(#story-needle-gradient)" />
              <path d="M300 425 330 300 300 320 270 300Z" fill="#416258" />
              <circle cx="300" cy="300" r="8" fill="#e5f6c9" />
            </g>
            <text x="300" y="35" textAnchor="middle" fill="#c4e68b" fontSize="12" letterSpacing="3">N</text>
          </svg>
          <div className="story-readout">{chapters.map((chapter) => <span key={chapter.number}>{chapter.label}</span>)}</div>
          <div className="story-progress"><div className="story-progress-fill" /></div>
        </div>
        <div className="story-chapters">
          {chapters.map((chapter) => (
            <article className="story-chapter" key={chapter.number}>
              <p className="story-kicker"><span>{chapter.number}</span> {chapter.label}</p>
              <h2>{chapter.title.split('\n').map((line, i) => <span key={line} className={i === 1 ? 'story-emphasis' : undefined}>{line}</span>)}</h2>
              <p className="story-description">{chapter.text}</p>
              <p className="story-detail">{chapter.detail}</p>
            </article>
          ))}
        </div>
      </div>
      <div className="story-outro">
        <div className="story-outro-inner">
          <p>Clareza para decidir.<br /><span>Estrutura para avançar.</span></p>
          <a href="#atuacao">Explore como podemos ajudar <span aria-hidden="true">↓</span></a>
        </div>
      </div>
    </section>
  )
}
