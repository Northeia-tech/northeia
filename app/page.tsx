'use client'

import { useEffect } from 'react'
import { CookieSettingsButton } from './_components/CookieConsent'

const HUBSPOT_PORTAL_ID = '52168789'
const HUBSPOT_FORM_ID = 'a9d6c991-0dc6-408c-8f83-809ba9e81a6c'
const HUBSPOT_REGION = 'na1'
const HUBSPOT_SCRIPT_SRC = `https://js.hsforms.net/forms/embed/${HUBSPOT_PORTAL_ID}.js`

const ArrowUpRight = ({ className = '' }: { className?: string }) => (
  <svg
    aria-hidden="true"
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M7 17 17 7M7 7h10v10" />
  </svg>
)

// Logo da Northeia (vetor). O anel e a montanha usam currentColor; a seta é fixa em laranja.
const LOGO_BODY =
  'M189.7 67.5C209 74.8 226.2 90.5 235.8 109.5C254.1 146.1 243.1 191.8 209.9 216.8C187.6 233.6 155.8 237.7 127.6 227.2C113.9 222.1 99 210.4 90.3 197.8C83.6 188.1 80.6 181.9 77.3 171.3C74.9 163.3 74.6 161 74.6 147C74.6 132.8 74.9 130.8 77.4 123C86.5 95.3 105.7 75.4 132.2 66.6C141.8 63.4 145 63.2 144.3 66C144 67.1 142.6 68.3 141.1 68.6C115.7 74.2 93.8 92.9 83.9 117.6C73 144.7 78 175.7 96.8 199.2C107.1 211.9 120.2 220.7 136.5 225.6C144.4 228 147.2 228.4 159.5 228.4C171.5 228.5 174.6 228.2 181 226.2C208.3 217.6 227.3 199.3 236.1 173C240.3 160.6 241.3 142.8 238.5 130.4C232.1 101.1 209.6 77.1 181.5 69.5C177.1 68.3 175 67.2 174.7 65.9C174.4 64.9 174.4 63.9 174.7 63.7C175.4 63 182.3 64.8 189.7 67.5ZM142 79.3C142 81.2 141.2 81.9 137.8 82.9C125.1 86.7 110 98.3 102.2 110.2C93.6 123.4 89.9 139.5 91.8 155.1C92.8 163.4 96 174.4 97.9 176.3C98.4 176.8 101.8 173.3 105.8 168.1C117.6 153.3 130.2 139 131.5 139C133 139 133.8 139.8 138.9 145.6C140.8 147.7 142.5 148.9 142.7 148.3C143 147.6 145.6 143.1 148.7 138.3C151.8 133.5 155 128.3 155.9 126.8C159 121.4 159 121.4 169.4 136.3L174.2 143.2L178.9 136.6C181.4 133 184 130.1 184.7 130.3C185.3 130.4 189.6 135.8 194.2 142.2C198.7 148.7 206.3 159.3 211 165.9C215.7 172.5 219.8 177.9 220.1 177.9C220.5 178 222.1 174.1 223.6 169.2C226.2 161.3 226.5 159.2 226.5 146.5C226.5 133.8 226.2 131.8 223.8 125.2C219.9 114.4 215.4 107.4 207 99C199.3 91.4 190 85.5 181.3 82.9C177.9 81.9 177 81.2 177 79.4C177 77.3 177.2 77.2 180.7 78.2C196.8 82.6 212.8 95.3 222 110.8C228.2 121.4 231.3 133.2 231.3 147C231.4 160.9 229.8 167.8 223.4 181C219.5 189 217.3 191.9 210.1 199C195.5 213.5 179.8 220 159.7 220C148.1 220 138.5 217.9 129.3 213.6C118.1 208.3 108 200.6 108 197.5C108 195 109.8 195.8 116.8 201.2C125.1 207.6 133.1 211.4 144 214.1C160.5 218.3 180.9 215 195.1 205.9C202.1 201.3 213.5 190.3 216.2 185.4L218 182.2L204.9 164.4C197.8 154.5 190.3 144.4 188.4 141.7C186.5 139.1 184.6 137 184.2 137C183.8 137.1 180.6 141.4 177 146.8C162.3 168.8 143.7 183.3 123.5 188.5C115.8 190.5 114 190.4 114 188.2C114 186.8 115.5 186.1 121 184.8C136.5 181.1 155.4 168.9 164.7 156.5C172 146.9 171.9 147.5 165.4 138.1C160.8 131.4 159.5 130.1 158.5 131.2C157.9 131.9 154.7 136.8 151.5 142C148.3 147.2 145 152.6 144.2 153.9L142.7 156.4L140.2 153.4C138.8 151.8 136.4 148.9 134.7 147.1L131.7 143.6L128.3 147.6C126.4 149.7 119 158.8 111.8 167.8C104.6 176.7 98.2 183.9 97.6 183.7C95.7 183.2 91.1 172.9 89 164.6C84.9 148.2 87 130.7 95.1 114C98.5 107.2 101 103.8 107.9 96.9C117.1 87.8 124.2 83.2 134.9 79.4C138.5 78.1 141.6 77 141.8 77C141.9 77 142 78.1 142 79.3Z'
const LOGO_ARROW =
  'M160.8 44C162.4 53.3 170 90.2 170.6 91.1C172.2 93.7 169.6 91.3 164.7 85.5L159.2 79L154 85.1C151.1 88.4 148.6 90.9 148.5 90.8C148.3 90.6 150 82.2 152.2 72C154.3 61.8 156.9 49.8 157.8 45.3C158.7 40.7 159.6 37.4 159.7 37.8C159.8 38.2 160.4 41 160.8 44Z'
const LOGO_TICK =
  'M160.9 104.5C161 114.2 160.8 116 159.5 116C158.2 116 158 114.1 158 104.5C158 95.3 158.3 93 159.4 93C160.5 93 160.8 95.3 160.9 104.5Z'

const LogoMark = ({ className = 'h-9 w-auto' }: { className?: string }) => (
  <svg aria-hidden="true" viewBox="72.6 35.8 174 199.2" className={className}>
    <path fill="currentColor" d={LOGO_BODY} />
    <path fill="#F6863C" d={LOGO_ARROW} />
    <path fill="#F6863C" d={LOGO_TICK} />
  </svg>
)

// Fonte serifada do nome da marca (carregada no layout.tsx via next/font)
const WORDMARK_FONT = 'font-[family-name:var(--font-wordmark),Georgia,serif]'

const PrincipleIcon = ({ type }: { type: 'truth' | 'system' | 'build' }) => {
  if (type === 'truth') {
    return (
      <svg aria-hidden="true" viewBox="0 0 32 32" className="h-8 w-8" fill="none">
        <circle cx="16" cy="16" r="10" stroke="currentColor" />
        <circle cx="16" cy="16" r="4" fill="currentColor" />
        <path d="M16 2v4M16 26v4M2 16h4M26 16h4" stroke="currentColor" />
      </svg>
    )
  }
  if (type === 'system') {
    return (
      <svg aria-hidden="true" viewBox="0 0 32 32" className="h-8 w-8" fill="none" stroke="currentColor">
        <circle cx="8" cy="9" r="3" />
        <circle cx="24" cy="8" r="3" />
        <circle cx="17" cy="24" r="3" />
        <path d="m10.7 10.4 4.6 10.2M21.4 10.5l-3 10.6M11 8.8l10-.6" />
      </svg>
    )
  }
  return (
    <svg aria-hidden="true" viewBox="0 0 32 32" className="h-8 w-8" fill="none" stroke="currentColor">
      <path d="M5 26 16 6l11 20H5Z" />
      <path d="m10.5 26 5.5-10 5.5 10M16 6v10" />
    </svg>
  )
}

const services = [
  {
    index: '01',
    title: 'Diagnóstico profundo',
    text: 'Investigamos além dos sintomas para revelar causas, gargalos e oportunidades que ainda não estão visíveis.',
    tags: ['Dados', 'Processos', 'Estratégia'],
  },
  {
    index: '02',
    title: 'Inteligência de negócio',
    text: 'Transformamos informações dispersas em uma visão clara do negócio — pronta para orientar decisões melhores.',
    tags: ['BI', 'Indicadores', 'Decisão'],
  },
  {
    index: '03',
    title: 'Sistemas & automação',
    text: 'Construímos soluções que eliminam atrito, conectam operações e ampliam a capacidade das pessoas.',
    tags: ['Tecnologia', 'Integrações', 'IA'],
  },
  {
    index: '04',
    title: 'Estrutura para crescer',
    text: 'Desenhamos processos e mecanismos de gestão que tornam o crescimento sustentável e replicável.',
    tags: ['Operação', 'Gestão', 'Escala'],
  },
]

const process = [
  ['Investigar', 'Escutamos, observamos e conectamos dados para compreender a realidade por inteiro.'],
  ['Revelar', 'Tornamos visíveis as causas e os padrões que explicam os resultados atuais.'],
  ['Direcionar', 'Traduzimos entendimento em prioridades, decisões e um caminho claro.'],
  ['Construir', 'Implementamos as mudanças e acompanhamos a evolução lado a lado.'],
]

export default function App() {
  // Animações de entrada (reveal)
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>('[data-reveal]')
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) {
      elements.forEach((element) => element.classList.add('is-revealed'))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.14, rootMargin: '0px 0px -7% 0px' },
    )

    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [])

  // Carrega o script do formulário do HubSpot (uma única vez).
  // Um <script> dentro do JSX não é executado pelo React, por isso é injetado aqui.
  useEffect(() => {
    if (document.querySelector(`script[src="${HUBSPOT_SCRIPT_SRC}"]`)) return

    const script = document.createElement('script')
    script.src = HUBSPOT_SCRIPT_SRC
    script.defer = true
    document.body.appendChild(script)
  }, [])

  return (
    <div className="min-h-screen overflow-hidden bg-[#F3F0E9] text-[#102F32]">
      <header className="absolute inset-x-0 top-0 z-50">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-6 py-6 md:px-10 lg:px-16">
          <a href="#inicio" className="flex items-center gap-3 text-[#BCD2C9]" aria-label="Northeia — início">
            <LogoMark className="h-10 w-auto" />
            <span className={`${WORDMARK_FONT} text-[1.75rem] font-normal leading-none tracking-[-0.01em] text-[#F3F0E9]`}>
              Northeia
            </span>
          </a>
          <nav className="hidden items-center gap-8 text-sm text-white/70 md:flex" aria-label="Navegação principal">
            <a className="transition-colors hover:text-white" href="#atuacao">
              Atuação
            </a>
            <a className="transition-colors hover:text-white" href="#metodo">
              Método
            </a>
            <a className="transition-colors hover:text-white" href="#manifesto">
              Manifesto
            </a>
          </nav>
          <a
            href="#contato"
            className="group flex items-center gap-2 rounded-full border border-white/25 px-4 py-2.5 text-sm text-white transition-all hover:border-[#F4A259] hover:bg-[#F4A259] hover:text-[#102F32] md:px-5"
          >
            <span className="hidden sm:inline">Iniciar conversa</span>
            <span className="sm:hidden">Contato</span>
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </header>

      <main>
        <section id="inicio" className="relative min-h-[820px] bg-[#0B292C] pt-36 text-white md:min-h-[900px]">
          <div className="hero-grid absolute inset-0 opacity-35" />
          <div className="absolute left-1/2 top-[13%] h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-[#174A49]/30 blur-[120px]" />
          <div className="relative mx-auto grid max-w-[1440px] px-6 md:px-10 lg:grid-cols-[1.12fr_.88fr] lg:px-16">
            <div className="z-10 flex flex-col justify-center pb-20 pt-16 lg:pb-32 lg:pt-24">
              <div className="mb-8 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.2em] text-[#F4A259]">
                <span className="h-px w-8 bg-[#F4A259]" />
                Estratégia, dados & tecnologia
              </div>
              <h1 className="max-w-4xl text-[clamp(4rem,8vw,8.7rem)] font-normal leading-[0.82] tracking-[-0.065em]">
                Clareza para
                <span className="mt-2 block font-serif font-normal italic text-[#BCD2C9]">encontrar o norte.</span>
              </h1>
              <p className="mt-10 max-w-xl text-lg leading-relaxed text-white/62 md:text-xl">
                Revelamos as causas por trás dos resultados e construímos o caminho para empresas crescerem com
                direção, inteligência e confiança.
              </p>
              <div className="mt-10 flex flex-col items-start gap-5 sm:flex-row sm:items-center">
                <a
                  href="#contato"
                  className="group flex items-center gap-4 rounded-full bg-[#F4A259] py-2 pl-6 pr-2 text-sm font-medium text-[#102F32] transition-transform hover:-translate-y-0.5"
                >
                  Descobrir um novo caminho
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-[#102F32] text-white">
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </a>
                <a href="#manifesto" className="border-b border-white/30 pb-1 text-sm text-white/70 hover:text-white">
                  Conheça nossa visão
                </a>
              </div>
            </div>

            <div className="relative hidden min-h-[650px] items-center justify-center lg:flex" aria-hidden="true">
              <div className="compass-visual relative aspect-square w-[min(40vw,580px)]">
                <div className="absolute inset-[8%] animate-[spin_70s_linear_infinite] rounded-full border border-white/15" />
                <div className="absolute inset-[20%] rounded-full border border-dashed border-white/16" />
                <div className="absolute inset-[32%] rounded-full border border-white/15" />
                <div className="absolute left-1/2 top-0 h-full w-px bg-gradient-to-b from-transparent via-white/30 to-transparent" />
                <div className="absolute left-0 top-1/2 h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                <div className="absolute left-1/2 top-1/2 h-[45%] w-20 origin-bottom -translate-x-1/2 -translate-y-full rotate-[28deg]">
                  <div className="h-full w-full [clip-path:polygon(50%_0,100%_100%,50%_78%,0_100%)] bg-[#F4A259]" />
                </div>
                <div className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-[#F4A259] bg-[#0B292C]" />
                <span className="absolute left-1/2 top-[3%] -translate-x-1/2 text-xs tracking-[0.3em] text-white/50">N</span>
                <span className="absolute bottom-[3%] left-1/2 -translate-x-1/2 text-xs tracking-[0.3em] text-white/30">S</span>
                <span className="absolute left-[3%] top-1/2 -translate-y-1/2 text-xs tracking-[0.3em] text-white/30">O</span>
                <span className="absolute right-[3%] top-1/2 -translate-y-1/2 text-xs tracking-[0.3em] text-white/30">L</span>
                <div className="absolute right-2 top-[22%] rounded-full border border-white/15 bg-[#0B292C]/80 px-4 py-2 text-[10px] uppercase tracking-[0.18em] text-[#BCD2C9] backdrop-blur">
                  Verdade revelada
                </div>
                <div className="absolute bottom-[17%] left-0 flex items-center gap-2 rounded-full border border-white/15 bg-[#0B292C]/80 px-4 py-2 text-[10px] uppercase tracking-[0.18em] text-[#BCD2C9] backdrop-blur">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#F4A259]" />
                  Direção encontrada
                </div>
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 border-t border-white/10">
            <div className="mx-auto flex max-w-[1440px] justify-between px-6 py-5 text-[10px] uppercase tracking-[0.2em] text-white/35 md:px-10 lg:px-16">
              <span>São Paulo · Brasil</span>
              <span className="hidden sm:block">Olhar profundo. Decisões precisas.</span>
              <span>Role para explorar ↓</span>
            </div>
          </div>
        </section>

        <section className="border-b border-[#102F32]/15">
          <div className="mx-auto grid max-w-[1440px] md:grid-cols-[.8fr_1.2fr]">
            <div
              data-reveal
              data-reveal-direction="right"
              className="border-b border-[#102F32]/15 px-6 py-16 md:border-b-0 md:border-r md:px-10 md:py-24 lg:px-16"
            >
              <p className="section-label">Por que existimos</p>
              <div className="mt-14 flex items-end gap-2 text-[#E28A44]">
                <span className="text-7xl font-light tracking-[-0.08em]">+</span>
                <span className="mb-2 text-sm uppercase tracking-[0.16em]">profundidade</span>
              </div>
            </div>
            <div data-reveal data-reveal-direction="left" className="px-6 py-16 md:px-12 md:py-24 lg:px-20">
              <p className="max-w-4xl text-3xl leading-[1.2] tracking-[-0.035em] md:text-5xl">
                Os maiores problemas raramente são aqueles que conseguimos enxergar à primeira vista.
              </p>
              <p className="mt-8 max-w-2xl text-base leading-relaxed text-[#102F32]/65 md:text-lg">
                Empresas trabalham arduamente, mas muitas ainda decidem com informações incompletas. Nós conectamos
                perspectivas, dados e pessoas para chegar ao que realmente importa.
              </p>
            </div>
          </div>
        </section>

        <section id="atuacao" className="px-6 py-24 md:px-10 md:py-32 lg:px-16">
          <div className="mx-auto max-w-[1312px]">
            <div data-reveal className="grid gap-8 md:grid-cols-2 md:items-end">
              <div>
                <p className="section-label">Como ajudamos</p>
                <h2 className="mt-6 text-5xl leading-none tracking-[-0.055em] md:text-7xl">Da complexidade à clareza.</h2>
              </div>
              <p className="max-w-md text-base leading-relaxed text-[#102F32]/60 md:justify-self-end">
                Não entregamos respostas prontas. Construímos entendimento, direção e capacidade para a mudança
                acontecer de verdade.
              </p>
            </div>
            <div className="mt-16 grid border-l border-t border-[#102F32]/15 md:grid-cols-2">
              {services.map((service) => (
                <article
                  key={service.index}
                  data-reveal
                  style={{ '--reveal-delay': `${(Number(service.index) - 1) * 90}ms` } as React.CSSProperties}
                  className="group min-h-[350px] border-b border-r border-[#102F32]/15 p-7 transition-colors hover:bg-[#102F32] hover:text-white md:p-10"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs tracking-[0.18em] text-[#E28A44]">{service.index}</span>
                    <ArrowUpRight className="h-5 w-5 opacity-35 transition-all group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:opacity-100" />
                  </div>
                  <h3 className="mt-20 text-3xl tracking-[-0.035em] md:text-4xl">{service.title}</h3>
                  <p className="mt-5 max-w-md leading-relaxed text-[#102F32]/60 group-hover:text-white/60">{service.text}</p>
                  <div className="mt-8 flex flex-wrap gap-2">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-[#102F32]/20 px-3 py-1 text-[10px] uppercase tracking-[0.12em] group-hover:border-white/25 group-hover:text-white/65"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="metodo" className="bg-[#C7D6CD] px-6 py-24 md:px-10 md:py-32 lg:px-16">
          <div className="mx-auto max-w-[1312px]">
            <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr]">
              <div data-reveal data-reveal-direction="right">
                <p className="section-label">Nosso método</p>
                <h2 className="mt-6 max-w-md text-5xl leading-[.98] tracking-[-0.055em] md:text-7xl">
                  Ver.
                  <br />
                  Entender.
                  <br />
                  Transformar.
                </h2>
              </div>
              <div className="border-t border-[#102F32]/20">
                {process.map(([title, text], index) => (
                  <div
                    key={title}
                    data-reveal
                    data-reveal-direction="left"
                    style={{ '--reveal-delay': `${index * 70}ms` } as React.CSSProperties}
                    className="grid gap-4 border-b border-[#102F32]/20 py-8 sm:grid-cols-[50px_180px_1fr] sm:items-start"
                  >
                    <span className="text-xs text-[#102F32]/45">0{index + 1}</span>
                    <h3 className="text-2xl tracking-[-0.03em]">{title}</h3>
                    <p className="max-w-lg leading-relaxed text-[#102F32]/60">{text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="manifesto" className="relative bg-[#0B292C] px-6 py-24 text-white md:px-10 md:py-36 lg:px-16">
          <div className="manifesto-glow absolute right-[-10%] top-[10%] h-[500px] w-[500px] rounded-full" />
          <div className="relative mx-auto max-w-[1312px]">
            <div className="grid gap-14 lg:grid-cols-[.6fr_1.4fr]">
              <div data-reveal data-reveal-direction="right">
                <p className="section-label !text-[#F4A259]">Manifesto</p>
                <p className="mt-8 max-w-xs text-sm leading-relaxed text-white/45">
                  Uma organização construída para investigar, compreender e transformar.
                </p>
              </div>
              <div data-reveal data-reveal-direction="left">
                <blockquote className="max-w-4xl font-serif text-4xl leading-[1.16] tracking-[-0.035em] text-[#E7E9DF] md:text-6xl">
                  “Crescimento não deveria ser uma aposta. Com a clareza certa, ele se torna uma consequência.”
                </blockquote>
                <div className="mt-16 grid gap-6 border-t border-white/15 pt-8 sm:grid-cols-3">
                  {[
                    ['truth', 'Verdade', 'Enxergar a realidade como ela é.'],
                    ['system', 'Integração', 'Conectar o que parece isolado.'],
                    ['build', 'Construção', 'Transformar visão em evolução.'],
                  ].map(([type, title, text]) => (
                    <div key={title}>
                      <div className="text-[#F4A259]">
                        <PrincipleIcon type={type as 'truth' | 'system' | 'build'} />
                      </div>
                      <h3 className="mt-6 text-lg">{title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-white/45">{text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 py-24 md:px-10 md:py-32 lg:px-16">
          <div className="mx-auto max-w-[1312px]">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <div
                data-reveal
                data-reveal-direction="right"
                className="relative aspect-square max-w-xl overflow-hidden rounded-full border border-[#102F32]/15"
              >
                <div className="absolute inset-[12%] rounded-full border border-[#102F32]/15" />
                <div className="absolute inset-[26%] rounded-full border border-[#102F32]/15" />
                <div className="absolute left-1/2 top-0 h-full w-px bg-[#102F32]/15" />
                <div className="absolute left-0 top-1/2 h-px w-full bg-[#102F32]/15" />
                <div className="absolute left-[30%] top-[24%] h-3 w-3 rounded-full bg-[#E28A44] shadow-[0_0_0_12px_rgba(226,138,68,.12)]" />
                <div className="absolute bottom-[22%] right-[24%] h-2 w-2 rounded-full bg-[#102F32]" />
                <div className="absolute left-1/2 top-1/2 w-[55%] -translate-x-1/2 -translate-y-1/2 rotate-[-38deg] border-t border-dashed border-[#102F32]/35" />
                <span className="absolute left-[29%] top-[30%] text-[10px] uppercase tracking-[.16em] text-[#102F32]/55">
                  Hoje
                </span>
                <span className="absolute bottom-[16%] right-[17%] text-[10px] uppercase tracking-[.16em] text-[#102F32]/55">
                  Futuro
                </span>
              </div>
              <div data-reveal data-reveal-direction="left" className="lg:pl-16">
                <p className="section-label">Visão de futuro</p>
                <h2 className="mt-6 text-5xl leading-[1] tracking-[-0.055em] md:text-7xl">Começamos ajudando empresas.</h2>
                <p className="mt-8 max-w-lg text-lg leading-relaxed text-[#102F32]/60">
                  Nossa direção vai além. Queremos reunir diferentes conhecimentos para enfrentar problemas cada vez
                  maiores — onde clareza, ciência e tecnologia possam gerar impacto real para a humanidade.
                </p>
                <div className="mt-10 flex flex-wrap gap-2">
                  {['Ciência', 'Medicina', 'Robótica', 'Astronomia'].map((item) => (
                    <span key={item} className="rounded-full border border-[#102F32]/20 px-4 py-2 text-xs uppercase tracking-[.12em]">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="contato" className="px-3 pb-3 md:px-5 md:pb-5">
          <div className="relative overflow-hidden rounded-[2rem] bg-[#E99A55] px-6 py-20 text-[#102F32] md:px-12 md:py-28 lg:px-20">
            <div className="cta-lines absolute inset-0 opacity-30" />
            <div data-reveal className="relative mx-auto max-w-[1200px]">
              <p className="text-xs font-medium uppercase tracking-[.18em]">O próximo passo</p>
              <div className="mt-8 grid gap-12 lg:grid-cols-[1.05fr_.95fr] lg:items-start">
                <div>
                  <h2 className="max-w-4xl text-5xl leading-[.95] tracking-[-0.06em] md:text-7xl lg:text-8xl">
                    Existe um caminho. Vamos encontrá-lo.
                  </h2>
                  <p className="mt-8 max-w-sm leading-relaxed text-[#102F32]/70">
                    Conte-nos o que parece sem saída. A primeira conversa pode revelar uma nova direção.
                  </p>
                  <a
                    href="mailto:northeia.tech@gmail.com"
                    className="mt-6 inline-block border-b border-[#102F32]/40 pb-1 text-sm text-[#102F32]/80 transition-colors hover:border-[#102F32] hover:text-[#102F32]"
                  >
                    Ou escreva para northeia.tech@gmail.com
                  </a>
                </div>

                {/* Formulário HubSpot */}
                <div className="rounded-[1.5rem] bg-[#F3F0E9] p-6 shadow-[0_30px_80px_-30px_rgba(16,47,50,.45)] md:p-8">
                  <div
                    className="hs-form-frame"
                    data-region={HUBSPOT_REGION}
                    data-form-id={HUBSPOT_FORM_ID}
                    data-portal-id={HUBSPOT_PORTAL_ID}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#0B292C] px-6 py-12 text-white md:px-10 lg:px-16">
        <div className="mx-auto max-w-[1312px]">
          <div className="grid items-center gap-10 border-b border-white/10 pb-12 md:grid-cols-[1fr_auto_1fr]">
            <a
              href="#inicio"
              aria-label="Northeia — voltar ao início"
              className="order-1 flex flex-col items-center text-center text-[#BCD2C9] md:order-2"
            >
              <LogoMark className="h-24 w-auto" />
              <span className={`${WORDMARK_FONT} mt-5 text-5xl font-normal leading-none tracking-[-0.015em] text-[#F3F0E9]`}>
                Northeia
              </span>
              <span className="mt-4 flex items-center gap-3 text-[11px] uppercase tracking-[.28em] text-[#BCD2C9]">
                Norte
                <span aria-hidden="true" className="h-1 w-1 rounded-full bg-[#F6863C]" />
                Aletheia
                <span aria-hidden="true" className="h-1 w-1 rounded-full bg-[#F6863C]" />
                Essência
              </span>
            </a>

            <p className="order-2 text-center text-sm text-white/55 md:order-1 md:text-left">
              © {new Date().getFullYear()} Northeia. Todos os direitos reservados.
            </p>

            <nav
              aria-label="Documentos legais"
              className="order-3 flex justify-center gap-6 text-sm text-white/75 md:justify-self-end"
            >
              <a
                href="/politica-de-privacidade"
                className="border-b border-white/25 pb-1 transition-colors hover:border-white hover:text-white"
              >
                Política de Privacidade
              </a>
              <a
                href="/termos-de-uso"
                className="border-b border-white/25 pb-1 transition-colors hover:border-white hover:text-white"
              >
                Termos de Uso
              </a>
              <CookieSettingsButton className="border-b border-white/25 pb-1 transition-colors hover:border-white hover:text-white" />
            </nav>
          </div>
          <div className="pt-6 text-center text-[10px] uppercase tracking-[.16em] text-white/30">
            <span>Direção através da verdade.</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
