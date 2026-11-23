'use client'

import { useEffect, useRef } from 'react'
import Words from './Words'
import CompassGraphic from './CompassGraphic'
import { MEDIA, isConstrained, loadGsap } from './motion'

const chapters = [
  { number: '01', label: 'Enxergar', title: 'Informação existe.\nClareza, nem sempre.', text: 'Planilhas, processos e sistemas contam partes da história. Primeiro, conectamos os pontos para entender o que está travando sua operação.', detail: 'Do sintoma à causa.' },
  { number: '02', label: 'Direcionar', title: 'Quando os pontos se conectam,\no norte aparece.', text: 'Transformamos dados em entendimento. O que importa fica visível, e as prioridades deixam de disputar a sua atenção.', detail: 'Da informação à decisão.' },
  { number: '03', label: 'Construir', title: 'Direção só faz sentido\nquando vira movimento.', text: 'Sistemas, integrações e automações colocam a estratégia em prática. Uma mudança de cada vez, conectada ao seu negócio.', detail: 'Da decisão à execução.' },
]

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

        // The travelling compass (JourneyCompass) tells the three beats; this panel tracks progress.
        const instrument = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: { trigger: q('.story-chapters')[0], start: 'top center', end: 'bottom center', scrub: 0.6, invalidateOnRefresh: true },
        })
        instrument.fromTo(q('.story-progress-fill'), { scaleX: 0 }, { scaleX: 1, duration: 3 }, 0)
        if (full && desktop) {
          // Depth: halo and coordinate drift at different speeds from the compass.
          instrument.fromTo(q('.story-halo'), { y: -40, scale: 0.9 }, { y: 50, scale: 1.15, duration: 3 }, 0)
          instrument.fromTo(q('.story-coordinate'), { y: 30 }, { y: -30, duration: 3 }, 0)
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
            <div className="story-intro-compass compass-slot-optional" data-compass-slot data-compass-tone="dark" aria-hidden="true" />
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
          <div className="story-instrument" data-compass-slot data-compass-tone="dark">
            <CompassGraphic className="compass-static" />
          </div>
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
