'use client'

import { useEffect, useState } from 'react'
import Brand from './_components/Brand'
import ScrollStory from './_components/ScrollStory'
import ScrollDirector from './_components/ScrollDirector'
import Words from './_components/Words'
import JourneyCompass from './_components/JourneyCompass'
import CompassGraphic from './_components/CompassGraphic'
import ContactForm from './_components/ContactForm'
import { CookieSettingsButton } from './_components/CookieConsent'

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
    text: 'Seu time trabalha muito, mas os mesmos problemas voltam? Mapeamos a operação para identificar gargalos e definir o que resolver primeiro.',
    outcome: 'Mais clareza sobre causas, prioridades e próximos passos.',
    tags: ['Dados', 'Processos', 'Estratégia'],
  },
  {
    index: '02',
    title: 'Inteligência de negócio',
    text: 'Planilhas e relatórios contam histórias diferentes? Conectamos dados e organizamos indicadores para você acompanhar o que importa.',
    outcome: 'Uma visão do negócio que ajuda a tomar decisões.',
    tags: ['BI', 'Indicadores', 'Decisão'],
  },
  {
    index: '03',
    title: 'Sistemas & automação',
    text: 'Sua equipe perde tempo copiando dados e repetindo tarefas? Desenvolvemos sistemas e integrações a partir da sua rotina real.',
    outcome: 'Menos trabalho manual e mais tempo para o que exige atenção.',
    tags: ['Tecnologia', 'Integrações', 'IA'],
  },
  {
    index: '04',
    title: 'Estrutura para crescer',
    text: 'Tudo precisa passar por você? Organizamos processos, responsabilidades e rotinas de gestão para reduzir a dependência de improvisos.',
    outcome: 'Uma operação mais organizada para sustentar o crescimento.',
    tags: ['Operação', 'Gestão', 'Escala'],
  },
]

const processSteps = [
  ['Investigar', 'Escutamos, observamos e conectamos dados para compreender a realidade por inteiro.'],
  ['Revelar', 'Tornamos visíveis as causas e os padrões que explicam os resultados atuais.'],
  ['Direcionar', 'Traduzimos entendimento em prioridades, decisões e um caminho claro.'],
  ['Construir', 'Implementamos as mudanças e acompanhamos a evolução lado a lado.'],
]

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  useEffect(() => {
    if (!menuOpen) return
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
        document.querySelector<HTMLButtonElement>('.mobile-menu')?.focus()
      }
    }
    document.addEventListener('keydown', closeOnEscape)
    return () => document.removeEventListener('keydown', closeOnEscape)
  }, [menuOpen])

  return (
    <div className="home-page min-h-screen overflow-hidden bg-[#F6F6F1] text-[#102F32]">
      <a href="#conteudo" className="skip-link">Pular para o conteúdo</a>
      <ScrollDirector />
      <JourneyCompass />
      <header className="absolute inset-x-0 top-0 z-50">
        <div className="mx-auto flex max-w-[1320px] items-center justify-between px-6 py-6 md:px-10 lg:px-16">
          <a href="#inicio" className="flex items-center gap-3 text-[#BCD2C9]" aria-label="Northeia — início" onClick={() => setMenuOpen(false)}>
            <Brand priority />
          </a>
          <nav id="main-navigation" className={`main-navigation ${menuOpen ? 'is-open' : ''}`} aria-label="Navegação principal" onClick={() => setMenuOpen(false)}>
            <a href="#projetos">Projetos</a>
            <a className="transition-colors hover:text-white" href="#atuacao">
              Atuação
            </a>
            <a className="transition-colors hover:text-white" href="#metodo">
              Método
            </a>
            <a className="transition-colors hover:text-white" href="#duvidas">
              Dúvidas
            </a>
          </nav>
          <button type="button" className="mobile-menu" aria-controls="main-navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? 'Fechar −' : 'Menu +'}</button>
          <a
            href="#contato"
            data-magnetic
            onClick={() => setMenuOpen(false)}
            className="header-contact group flex items-center gap-2 rounded-full border border-white/25 px-4 py-2.5 text-sm text-white transition-all hover:border-[#C4E68B] hover:bg-[#C4E68B] hover:text-[#102F32] md:px-5"
          >
            <span className="hidden sm:inline">Vamos conversar</span>
            <span className="sm:hidden">Contato</span>
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </header>

      <main id="conteudo" tabIndex={-1}>
        <section id="inicio" className="hero-section relative bg-[#0B171E] pt-28 text-white">
          <div className="hero-grid absolute inset-0 opacity-35" />
          <div className="absolute left-1/2 top-[13%] h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-[#174A49]/30 blur-[120px]" />
          <div className="relative mx-auto grid max-w-[1320px] px-6 md:px-10 lg:grid-cols-[1.12fr_.88fr] lg:px-16">
            <div className="hero-copy z-10 flex flex-col justify-center pb-10 pt-16 lg:pb-28 lg:pt-24">
              <div className="mb-8 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.2em] text-[#C4E68B]">
                <span className="h-px w-8 bg-[#C4E68B]" />
                Consultoria, dados e automação para empresas
              </div>
              <h1 className="max-w-4xl text-[clamp(3.25rem,5.8vw,5.5rem)] font-medium leading-[1.06] tracking-[-0.065em]">
                Menos gargalos.<br />Mais clareza para <span className="hero-north">crescer.</span>
              </h1>
              <p className="mt-7 max-w-[490px] text-base leading-[1.85] text-white/65 md:text-lg">
                Sua operação depende de planilhas, tarefas manuais e decisões no escuro? A Northeia conecta estratégia,
                dados e tecnologia para ajudar você a entender o problema e colocar a solução em prática.
              </p>
              <div className="hero-actions mt-10 flex flex-wrap items-center gap-5">
                <a
                  href="#contato"
                  data-magnetic
                  className="group flex items-center gap-4 rounded-full bg-[#C4E68B] py-2 pl-6 pr-2 text-sm font-medium text-[#102F32] transition-transform hover:-translate-y-0.5"
                >
                  Conversar sobre meu negócio
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#102F32] text-white">
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </a>
                <a href="#abordagem" className="border-b border-white/30 pb-1 text-sm text-white/70 hover:text-white">
                  Veja como podemos ajudar
                </a>
              </div>
              <p className="mt-5 max-w-md text-xs leading-relaxed text-white/55">Conte o que está travando sua operação. Você não precisa chegar com a solução pronta.</p>
            </div>

            <div className="hero-visual relative flex items-center justify-center" aria-hidden="true">
              <div className="compass-visual relative aspect-square w-[min(40vw,580px)]" data-compass-slot data-compass-tone="dark">
                <CompassGraphic className="compass-static" />
                <span className="absolute bottom-[3%] left-1/2 -translate-x-1/2 text-xs tracking-[0.3em] text-white/30">S</span>
                <span className="absolute left-[3%] top-1/2 -translate-y-1/2 text-xs tracking-[0.3em] text-white/30">O</span>
                <span className="absolute right-[3%] top-1/2 -translate-y-1/2 text-xs tracking-[0.3em] text-white/30">L</span>
                <span className="compass-coordinate">01 / DIREÇÃO</span>
                <div className="compass-purpose"><span>Nosso propósito</span>Ver além. Decidir melhor.<br />Transformar com direção.</div>
              </div>
            </div>
          </div>
          <div className="hero-ticker relative border-t border-white/10">
            <div className="mx-auto flex max-w-[1320px] justify-between px-6 py-5 text-[10px] uppercase tracking-[0.2em] text-white/35 md:px-10 lg:px-16">
              <span>Direção através da verdade</span>
              <span className="hidden sm:block">Olhar profundo. Decisões precisas.</span>
              <span>Role para explorar ↓</span>
            </div>
          </div>
        </section>

        <ScrollStory />

        <section id="atuacao" className="px-6 py-24 md:px-10 md:py-32 lg:px-16">
          <div className="mx-auto max-w-[1192px]">
            <div data-reveal className="relative grid gap-8 md:grid-cols-2 md:items-end">
              <div>
                <p className="section-label">Como ajudamos</p>
                <h2 className="mt-6 text-5xl leading-none tracking-[-0.055em] md:text-7xl">O que está travando o seu próximo passo?</h2>
              </div>
              <div className="atuacao-compass compass-slot-optional" data-compass-slot data-compass-tone="light" aria-hidden="true" />
              <p className="max-w-md text-base leading-relaxed text-[#102F32]/60 md:justify-self-end">
                Do diagnóstico à implementação, o trabalho parte do seu desafio. Estas são algumas das situações em que podemos ajudar.
              </p>
            </div>
            <div className="services-grid mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {services.map((service) => (
                <article
                  key={service.index}
                  data-reveal
                  style={{ '--reveal-delay': `${(Number(service.index) - 1) * 90}ms` } as React.CSSProperties}
                  className="service-card group min-h-[320px] rounded-2xl border border-[#102F32]/15 bg-white/70 p-7 hover:-translate-y-1 hover:bg-[#102F32] hover:text-white"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs tracking-[0.18em] text-[#718B70]">{service.index}</span>
                    <ArrowUpRight className="h-5 w-5 opacity-35 transition-all group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:opacity-100" />
                  </div>
                  <h3 className="mt-12 text-2xl leading-tight tracking-[-0.035em]">{service.title}</h3>
                  <p className="mt-4 max-w-md text-sm leading-relaxed text-[#102F32]/65 group-hover:text-white/70">{service.text}</p>
                  <p className="mt-5 border-t border-current/15 pt-4 text-sm font-medium leading-relaxed">{service.outcome}</p>
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

        <section id="projetos" className="border-t border-[#102F32]/15 px-6 py-20 md:px-10 lg:px-16">
          <div className="mx-auto max-w-[1192px]">
            <p className="section-label">Da ideia à aplicação</p>
            <div className="mt-6 grid gap-6 md:grid-cols-2 md:items-end">
              <h2>Conheça o trabalho na prática.</h2>
              <p className="max-w-md text-sm leading-relaxed text-[#102F32]/70 md:justify-self-end">Projetos autorais do fundador da Northeia: conheça as aplicações, os desafios e as decisões de desenvolvimento.</p>
            </div>
            <div className="mt-10 grid gap-5 md:grid-cols-2">
              <article data-reveal className="project-card rounded-xl border border-[#102F32]/15 bg-white/70 p-7 md:p-9">
                <p className="section-label">Software para clínicas</p>
                <h3 className="mt-6 text-3xl tracking-tight">OdontoPRO</h3>
                <p className="mt-4 text-sm leading-relaxed text-[#102F32]/75">Aplicação de agendamento com página para pacientes e painel de gestão. Inclui horários conforme o serviço e o expediente, autenticação e assinaturas.</p>
                <a href="https://odontopro-coral.vercel.app" target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex items-center gap-3 border-b border-[#102F32]/35 pb-2 text-sm font-medium">Explorar o projeto <ArrowUpRight className="h-4 w-4" /></a>
              </article>
              <article data-reveal className="project-card rounded-xl border border-[#102F32]/15 bg-white/70 p-7 md:p-9">
                <p className="section-label">Dados e IA aplicada</p>
                <h3 className="mt-6 text-3xl tracking-tight">Site Services Copilot</h3>
                <p className="mt-4 text-sm leading-relaxed text-[#102F32]/75">Dashboard operacional com perguntas de negócio em linguagem natural. Combina dados agregados, gráficos e um copiloto de IA, com publicação no Google Cloud Run.</p>
                <a href="https://gustav-stack.github.io/Portfolio/#projetos" target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex items-center gap-3 border-b border-[#102F32]/35 pb-2 text-sm font-medium">Ver detalhes no portfólio <ArrowUpRight className="h-4 w-4" /></a>
              </article>
            </div>
          </div>
        </section>

        <section id="quem-somos" className="px-6 pb-20 md:px-10 lg:px-16">
          <div data-reveal className="mx-auto grid max-w-[1192px] gap-8 rounded-xl bg-[#E8EEE6] p-7 md:grid-cols-[.7fr_1.3fr] md:p-12">
            <div>
              <p className="section-label">Quem está por trás</p>
              <h2 className="mt-6">Gustavo Lucena.</h2>
              <p className="mt-3 text-sm text-[#102F32]/70">Fundador da Northeia · Engenharia de Software</p>
            </div>
            <div>
              <p className="text-lg leading-relaxed text-[#102F32]/80">Minha experiência com vendas e gestão de loja aproxima o desenvolvimento dos desafios de uma operação. Trabalho com aplicações, APIs, integrações e dados.</p>
              <div className="mt-7 flex flex-wrap gap-6">
                <a href="https://gustav-stack.github.io/Portfolio/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 border-b border-[#102F32]/35 pb-2 text-sm font-medium">Conheça minha trajetória <ArrowUpRight className="h-4 w-4" /></a>
                <a href="#contato" className="inline-flex items-center gap-2 border-b border-[#102F32]/35 pb-2 text-sm font-medium">Vamos falar do seu desafio <ArrowUpRight className="h-4 w-4" /></a>
              </div>
            </div>
          </div>
        </section>

        <section id="metodo" className="bg-[#E8EEE6] px-6 py-24 md:px-10 md:py-32 lg:px-16">
          <div className="mx-auto max-w-[1192px]">
            <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr]">
              <div data-reveal data-reveal-direction="right" className="lg:sticky lg:top-28 lg:self-start">
                <p className="section-label">Como trabalhamos</p>
                <h2 className="mt-6 max-w-md text-5xl leading-[.98] tracking-[-0.055em] md:text-7xl">
                  Primeiro entender.<br />Depois construir.
                </h2>
                <p className="mt-7 max-w-sm text-base leading-relaxed text-[#102F32]/70">Alinhamos o problema, as prioridades e o escopo antes de começar a implementação. Você entende o que será feito e por quê.</p>
                <div className="section-compass compass-slot-optional mt-12" data-compass-slot data-compass-tone="light" aria-hidden="true" />
              </div>
              <div className="process-steps relative border-t border-[#102F32]/20">
                <span className="process-rail" aria-hidden="true"><span className="process-rail-fill" /></span>
                {processSteps.map(([title, text], index) => (
                  <div
                    key={title}
                    data-reveal
                    data-reveal-direction="left"
                    style={{ '--reveal-delay': `${index * 70}ms` } as React.CSSProperties}
                    className="process-step grid gap-4 border-b border-[#102F32]/20 py-8 sm:grid-cols-[50px_180px_1fr] sm:items-start"
                  >
                    <span className="process-index text-xs text-[#102F32]/45">0{index + 1}</span>
                    <h3 className="text-2xl tracking-[-0.03em]">{title}</h3>
                    <p className="max-w-lg leading-relaxed text-[#102F32]/60">{text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="manifesto" className="relative bg-[#0B171E] px-6 py-24 text-white md:px-10 md:py-36 lg:px-16">
          <div className="manifesto-glow absolute right-[-10%] top-[10%] h-[500px] w-[500px] rounded-full" />
          <div className="relative mx-auto max-w-[1192px]">
            <div className="grid gap-14 lg:grid-cols-[.6fr_1.4fr]">
              <div data-reveal data-reveal-direction="right">
                <p className="section-label !text-[#C4E68B]">Manifesto</p>
                <p className="mt-8 max-w-xs text-sm leading-relaxed text-white/45">
                  Uma organização construída para investigar, compreender e transformar.
                </p>
                <div className="section-compass compass-slot-optional mt-12" data-compass-slot data-compass-tone="dark" aria-hidden="true" />
              </div>
              <div>
                <blockquote className="manifesto-quote max-w-4xl font-serif text-4xl leading-[1.16] tracking-[-0.035em] text-[#E7E9DF] md:text-6xl">
                  <Words text="“A ferramenta certa começa com uma boa compreensão do problema.”" />
                </blockquote>
                <div data-reveal className="mt-16 grid gap-6 border-t border-white/15 pt-8 sm:grid-cols-3">
                  {[
                    ['truth', 'Verdade', 'Enxergar a realidade como ela é.'],
                    ['system', 'Integração', 'Conectar o que parece isolado.'],
                    ['build', 'Construção', 'Transformar visão em evolução.'],
                  ].map(([type, title, text]) => (
                    <div key={title}>
                      <div className="text-[#C4E68B]">
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

        <section id="duvidas" className="px-6 py-24 md:px-10 md:py-32 lg:px-16">
          <div className="mx-auto max-w-[1192px]">
            <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
              <div data-reveal data-reveal-direction="right">
                <p className="section-label">Antes de conversar</p>
                <h2 className="mt-6">Você não precisa ter todas as respostas.</h2>
                <p className="mt-6 max-w-sm leading-relaxed text-[#102F32]/70">Começamos pelo que você já sabe sobre o negócio. As perguntas certas fazem parte do nosso trabalho.</p>
                <a href="#contato" className="mt-8 inline-flex items-center gap-3 border-b border-[#102F32]/40 pb-2 text-sm font-medium">Quero explicar meu desafio <ArrowUpRight className="h-4 w-4" /></a>
              </div>
              <div className="border-t border-[#102F32]/15">
                {[
                  ['Ainda não sei exatamente qual é o problema. Posso entrar em contato?', 'Sim. Conte os sintomas: atrasos, retrabalho, falta de visibilidade ou decisões difíceis. A conversa inicial ajuda a entender o contexto e avaliar por onde começar.'],
                  ['Preciso trocar todos os meus sistemas?', 'A necessidade de mudanças depende do diagnóstico. Primeiro entendemos as ferramentas e os processos atuais para avaliar o que pode ser aproveitado, integrado ou melhorado.'],
                  ['Vocês só fazem o diagnóstico ou também implementam?', 'Atuamos nas duas frentes. Conforme o escopo, podemos trabalhar no diagnóstico, nos indicadores, nos processos e no desenvolvimento de sistemas e automações.'],
                  ['Quanto custa e quanto tempo leva?', 'O investimento e o prazo dependem do desafio, das integrações e do escopo. Essas condições são definidas em uma proposta antes do início do projeto.'],
                ].map(([question, answer]) => (
                  <details key={question} className="faq-item border-b border-[#102F32]/15 py-6">
                    <summary className="cursor-pointer text-lg font-medium leading-snug">{question}</summary>
                    <p className="mt-4 max-w-xl text-sm leading-relaxed text-[#102F32]/70">{answer}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="contato" className="px-3 pb-3 md:px-5 md:pb-5">
          <div className="contact-panel relative overflow-hidden rounded-[2rem] bg-[#C4E68B] px-6 py-20 text-[#102F32] md:px-12 md:py-28 lg:px-20">
            <div className="cta-lines absolute inset-0 opacity-30" />
            <div data-reveal className="relative mx-auto max-w-[1200px]">
              <p className="text-xs font-medium uppercase tracking-[.18em]">O próximo passo</p>
              <div className="mt-8 grid gap-12 lg:grid-cols-[1.05fr_.95fr] lg:items-start">
                <div>
                  <h2 className="max-w-4xl text-5xl leading-[.95] tracking-[-0.06em] md:text-7xl lg:text-8xl">
                    O que está impedindo seu negócio de avançar?
                  </h2>
                  <p className="mt-8 max-w-sm leading-relaxed text-[#102F32]/70">
                    Conte o que acontece hoje e o que você gostaria de mudar. A primeira conversa serve para entender seu contexto e avaliar como podemos ajudar.
                  </p>
                  <ol className="mt-7 space-y-3 text-sm leading-relaxed text-[#102F32]/80">
                    <li><strong>01.</strong> Você compartilha o desafio e o momento da empresa.</li>
                    <li><strong>02.</strong> Conversamos para entender as necessidades e as prioridades.</li>
                    <li><strong>03.</strong> Se houver alinhamento, definimos um próximo passo com escopo claro.</li>
                  </ol>
                  <a
                    href="mailto:northeia.tech@gmail.com?subject=Quero%20conversar%20sobre%20meu%20neg%C3%B3cio"
                    className="mt-6 inline-block border-b border-[#102F32]/40 pb-1 text-sm text-[#102F32]/80 transition-colors hover:border-[#102F32] hover:text-[#102F32]"
                  >
                    Ou escreva para northeia.tech@gmail.com
                  </a>
                  <div className="section-compass compass-slot-optional mt-12" data-compass-slot data-compass-tone="light" aria-hidden="true" />
                </div>

                {/* Formulário HubSpot */}
                <div className="contact-form rounded-[1.5rem] bg-[#F6F6F1] p-6 shadow-[0_30px_80px_-30px_rgba(16,47,50,.45)] md:p-8">
                  <p className="section-label">Vamos conversar</p>
                  <h3 className="mt-4 text-2xl tracking-tight">Qual desafio trouxe você até aqui?</h3>
                  <p className="mb-7 mt-3 text-sm leading-relaxed">Não precisa preparar um briefing. Uma descrição do que você quer melhorar já é um começo.</p>
                  <ContactForm />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#0B171E] px-6 py-12 text-white md:px-10 lg:px-16">
        <div className="mx-auto max-w-[1192px]">
          <div className="grid items-center gap-10 border-b border-white/10 pb-12 md:grid-cols-[1fr_auto_1fr]">
            <a
              href="#inicio"
              aria-label="Northeia — voltar ao início"
              className="order-1 flex flex-col items-center text-center text-[#BCD2C9] md:order-2"
            >
              <Brand footer />
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
            <div className="footer-compass compass-slot-optional" data-compass-slot data-compass-tone="dark" aria-hidden="true" />
            <span>Direção através da verdade.</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
