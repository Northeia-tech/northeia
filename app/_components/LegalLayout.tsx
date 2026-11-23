import Link from 'next/link'
import Brand from './Brand'
import { CookieSettingsButton } from './CookieConsent'
import type { ReactNode } from 'react'

// ---------------------------------------------------------------------------
// Dados editáveis das páginas legais
// ---------------------------------------------------------------------------
export const CONTACT_EMAIL = 'northeia.tech@gmail.com'
export const LAST_UPDATED = '23 de outubro de 2026'
// Preencha com o CNPJ quando quiser exibi-lo nas páginas (vazio = não aparece).
export const COMPANY_CNPJ = ''
// Foro eleito nos Termos de Uso.
export const FORO = 'São Paulo/SP'

// ---------------------------------------------------------------------------
// Logo (mesmo vetor usado no site)
// ---------------------------------------------------------------------------
const WORDMARK_FONT = 'font-[family-name:var(--font-wordmark),Georgia,serif]'

// ---------------------------------------------------------------------------
// Blocos de conteúdo
// ---------------------------------------------------------------------------
export function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-12 first:mt-0">
      <h2 className={`${WORDMARK_FONT} text-2xl leading-tight tracking-[-0.015em] text-[#102F32] md:text-3xl`}>
        {title}
      </h2>
      <div className="mt-4 space-y-4 leading-relaxed text-[#102F32]/75">{children}</div>
    </section>
  )
}

export function List({ items }: { items: ReactNode[] }) {
  return (
    <ul className="list-disc space-y-2 pl-5 marker:text-[#E28A44]">
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  )
}

export function MailLink() {
  return (
    <a
      href={`mailto:${CONTACT_EMAIL}`}
      className="border-b border-[#102F32]/40 text-[#102F32] transition-colors hover:border-[#E28A44] hover:text-[#B8651F]"
    >
      {CONTACT_EMAIL}
    </a>
  )
}

// ---------------------------------------------------------------------------
// Estrutura da página
// ---------------------------------------------------------------------------
export default function LegalLayout({
  title,
  intro,
  current,
  children,
}: {
  title: string
  intro: string
  current: 'privacidade' | 'termos'
  children: ReactNode
}) {
  return (
    <div className="min-h-screen bg-[#F6F6F1] text-[#102F32]">
      <header className="relative bg-[#0B171E] text-white">
        <div className="hero-grid absolute inset-0 opacity-35" aria-hidden="true" />
        <div className="relative mx-auto flex max-w-[1440px] items-center justify-between px-6 py-6 md:px-10 lg:px-16">
          <Link href="/" className="flex items-center gap-3 text-[#BCD2C9]" aria-label="Northeia — página inicial">
            <Brand priority />
          </Link>
          <Link
            href="/"
            className="rounded-full border border-white/25 px-4 py-2.5 text-sm text-white transition-all hover:border-[#C4E68B] hover:bg-[#C4E68B] hover:text-[#102F32] md:px-5"
          >
            Voltar ao site
          </Link>
        </div>

        <div className="relative mx-auto max-w-[1440px] px-6 pb-16 pt-14 md:px-10 md:pb-24 md:pt-20 lg:px-16">
          <div className="mb-6 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.2em] text-[#C4E68B]">
            <span className="h-px w-8 bg-[#C4E68B]" />
            Documento legal
          </div>
          <h1
            className={`${WORDMARK_FONT} max-w-4xl text-5xl font-normal leading-[0.98] tracking-[-0.03em] text-[#F6F6F1] md:text-7xl`}
          >
            {title}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/60 md:text-lg">{intro}</p>
          <p className="mt-6 text-[11px] uppercase tracking-[0.18em] text-white/40">
            Última atualização: {LAST_UPDATED}
          </p>
        </div>
      </header>

      <main className="px-6 py-16 md:px-10 md:py-24 lg:px-16">
        <article className="mx-auto max-w-3xl">{children}</article>
      </main>

      <footer className="bg-[#0B171E] px-6 py-10 text-white md:px-10 lg:px-16">
        <div className="mx-auto flex max-w-[1312px] flex-col items-center gap-5 text-center text-sm text-white/55 md:flex-row md:justify-between md:text-left">
          <p>© {new Date().getFullYear()} Northeia. Todos os direitos reservados.</p>
          <nav aria-label="Documentos legais" className="flex flex-wrap justify-center gap-6 text-white/75">
            <Link
              href="/politica-de-privacidade"
              aria-current={current === 'privacidade' ? 'page' : undefined}
              className={`border-b pb-1 transition-colors hover:border-white hover:text-white ${
                current === 'privacidade' ? 'border-[#C4E68B] text-white' : 'border-white/25'
              }`}
            >
              Política de Privacidade
            </Link>
            <Link
              href="/termos-de-uso"
              aria-current={current === 'termos' ? 'page' : undefined}
              className={`border-b pb-1 transition-colors hover:border-white hover:text-white ${
                current === 'termos' ? 'border-[#C4E68B] text-white' : 'border-white/25'
              }`}
            >
              Termos de Uso
            </Link>
            <CookieSettingsButton />
          </nav>
        </div>
      </footer>
    </div>
  )
}
