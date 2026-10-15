'use client'


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

const CompassMark = () => (
  <svg aria-hidden="true" viewBox="0 0 32 32" className="h-8 w-8">
    <circle cx="16" cy="16" r="14.5" fill="none" stroke="currentColor" strokeWidth="1" opacity=".35" />
    <path d="m19.75 7.5-1.5 8.75-6 8.25 1.5-8.75 6-8.25Z" fill="currentColor" />
    <circle cx="16" cy="16" r="2" fill="#F4A259" />
  </svg>
)

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

  return (
    <div className="min-h-screen overflow-hidden bg-[#F3F0E9] text-[#102F32]">
      <header className="absolute inset-x-0 top-0 z-50">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-6 py-6 md:px-10 lg:px-16">
          <a href="#inicio" className="flex items-center gap-3 text-white" aria-label="Northeia — início">
            <CompassMark />
            <span className="text-xl font-medium tracking-[-0.03em]">Northeia</span>
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
              <div className="mt-8 grid gap-10 lg:grid-cols-[1.3fr_.7fr] lg:items-end">
                <h2 className="max-w-4xl text-5xl leading-[.95] tracking-[-0.06em] md:text-8xl">
                  Existe um caminho. Vamos encontrá-lo.
                </h2>
                <div className="lg:justify-self-end">
                  <p className="max-w-sm leading-relaxed text-[#102F32]/70">
                    Conte-nos o que parece sem saída. A primeira conversa pode revelar uma nova direção.
                  </p>
                  <a
                    href="mailto:contato@northeia.com.br"
                    className="group mt-8 flex w-fit items-center gap-6 rounded-full bg-[#102F32] py-2 pl-6 pr-2 text-sm text-white transition-transform hover:-translate-y-0.5"
                  >
                    Falar com a Northeia
                    <span className="grid h-11 w-11 place-items-center rounded-full bg-white text-[#102F32]">
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#0B292C] px-6 py-12 text-white md:px-10 lg:px-16">
        <div className="mx-auto max-w-[1312px]">
          <div className="flex flex-col gap-10 border-b border-white/10 pb-12 sm:flex-row sm:items-end sm:justify-between">
            <a href="#inicio" className="flex items-center gap-3">
              <CompassMark />
              <span className="text-2xl tracking-[-0.03em]">Northeia</span>
            </a>
            <div className="flex gap-6 text-sm text-white/50">
              <a href="#atuacao" className="hover:text-white">Atuação</a>
              <a href="#metodo" className="hover:text-white">Método</a>
              <a href="#manifesto" className="hover:text-white">Manifesto</a>
            </div>
          </div>
          <div className="flex flex-col gap-3 pt-6 text-[10px] uppercase tracking-[.16em] text-white/30 sm:flex-row sm:justify-between">
            <span>© {new Date().getFullYear()} Northeia. Todos os direitos reservados.</span>
            <span>Direção através da verdade.</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
import { useEffect } from 'react'
