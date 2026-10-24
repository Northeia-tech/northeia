import Link from 'next/link'
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
const LOGO_BODY =
  'M189.7 67.5C209 74.8 226.2 90.5 235.8 109.5C254.1 146.1 243.1 191.8 209.9 216.8C187.6 233.6 155.8 237.7 127.6 227.2C113.9 222.1 99 210.4 90.3 197.8C83.6 188.1 80.6 181.9 77.3 171.3C74.9 163.3 74.6 161 74.6 147C74.6 132.8 74.9 130.8 77.4 123C86.5 95.3 105.7 75.4 132.2 66.6C141.8 63.4 145 63.2 144.3 66C144 67.1 142.6 68.3 141.1 68.6C115.7 74.2 93.8 92.9 83.9 117.6C73 144.7 78 175.7 96.8 199.2C107.1 211.9 120.2 220.7 136.5 225.6C144.4 228 147.2 228.4 159.5 228.4C171.5 228.5 174.6 228.2 181 226.2C208.3 217.6 227.3 199.3 236.1 173C240.3 160.6 241.3 142.8 238.5 130.4C232.1 101.1 209.6 77.1 181.5 69.5C177.1 68.3 175 67.2 174.7 65.9C174.4 64.9 174.4 63.9 174.7 63.7C175.4 63 182.3 64.8 189.7 67.5ZM142 79.3C142 81.2 141.2 81.9 137.8 82.9C125.1 86.7 110 98.3 102.2 110.2C93.6 123.4 89.9 139.5 91.8 155.1C92.8 163.4 96 174.4 97.9 176.3C98.4 176.8 101.8 173.3 105.8 168.1C117.6 153.3 130.2 139 131.5 139C133 139 133.8 139.8 138.9 145.6C140.8 147.7 142.5 148.9 142.7 148.3C143 147.6 145.6 143.1 148.7 138.3C151.8 133.5 155 128.3 155.9 126.8C159 121.4 159 121.4 169.4 136.3L174.2 143.2L178.9 136.6C181.4 133 184 130.1 184.7 130.3C185.3 130.4 189.6 135.8 194.2 142.2C198.7 148.7 206.3 159.3 211 165.9C215.7 172.5 219.8 177.9 220.1 177.9C220.5 178 222.1 174.1 223.6 169.2C226.2 161.3 226.5 159.2 226.5 146.5C226.5 133.8 226.2 131.8 223.8 125.2C219.9 114.4 215.4 107.4 207 99C199.3 91.4 190 85.5 181.3 82.9C177.9 81.9 177 81.2 177 79.4C177 77.3 177.2 77.2 180.7 78.2C196.8 82.6 212.8 95.3 222 110.8C228.2 121.4 231.3 133.2 231.3 147C231.4 160.9 229.8 167.8 223.4 181C219.5 189 217.3 191.9 210.1 199C195.5 213.5 179.8 220 159.7 220C148.1 220 138.5 217.9 129.3 213.6C118.1 208.3 108 200.6 108 197.5C108 195 109.8 195.8 116.8 201.2C125.1 207.6 133.1 211.4 144 214.1C160.5 218.3 180.9 215 195.1 205.9C202.1 201.3 213.5 190.3 216.2 185.4L218 182.2L204.9 164.4C197.8 154.5 190.3 144.4 188.4 141.7C186.5 139.1 184.6 137 184.2 137C183.8 137.1 180.6 141.4 177 146.8C162.3 168.8 143.7 183.3 123.5 188.5C115.8 190.5 114 190.4 114 188.2C114 186.8 115.5 186.1 121 184.8C136.5 181.1 155.4 168.9 164.7 156.5C172 146.9 171.9 147.5 165.4 138.1C160.8 131.4 159.5 130.1 158.5 131.2C157.9 131.9 154.7 136.8 151.5 142C148.3 147.2 145 152.6 144.2 153.9L142.7 156.4L140.2 153.4C138.8 151.8 136.4 148.9 134.7 147.1L131.7 143.6L128.3 147.6C126.4 149.7 119 158.8 111.8 167.8C104.6 176.7 98.2 183.9 97.6 183.7C95.7 183.2 91.1 172.9 89 164.6C84.9 148.2 87 130.7 95.1 114C98.5 107.2 101 103.8 107.9 96.9C117.1 87.8 124.2 83.2 134.9 79.4C138.5 78.1 141.6 77 141.8 77C141.9 77 142 78.1 142 79.3Z'
const LOGO_ARROW =
  'M160.8 44C162.4 53.3 170 90.2 170.6 91.1C172.2 93.7 169.6 91.3 164.7 85.5L159.2 79L154 85.1C151.1 88.4 148.6 90.9 148.5 90.8C148.3 90.6 150 82.2 152.2 72C154.3 61.8 156.9 49.8 157.8 45.3C158.7 40.7 159.6 37.4 159.7 37.8C159.8 38.2 160.4 41 160.8 44Z'
const LOGO_TICK =
  'M160.9 104.5C161 114.2 160.8 116 159.5 116C158.2 116 158 114.1 158 104.5C158 95.3 158.3 93 159.4 93C160.5 93 160.8 95.3 160.9 104.5Z'

const WORDMARK_FONT = 'font-[family-name:var(--font-wordmark),Georgia,serif]'

const LogoMark = ({ className = 'h-10 w-auto' }: { className?: string }) => (
  <svg aria-hidden="true" viewBox="72.6 35.8 174 199.2" className={className}>
    <path fill="currentColor" d={LOGO_BODY} />
    <path fill="#F6863C" d={LOGO_ARROW} />
    <path fill="#F6863C" d={LOGO_TICK} />
  </svg>
)

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
    <div className="min-h-screen bg-[#F3F0E9] text-[#102F32]">
      <header className="relative bg-[#0B292C] text-white">
        <div className="hero-grid absolute inset-0 opacity-35" aria-hidden="true" />
        <div className="relative mx-auto flex max-w-[1440px] items-center justify-between px-6 py-6 md:px-10 lg:px-16">
          <Link href="/" className="flex items-center gap-3 text-[#BCD2C9]" aria-label="Northeia — página inicial">
            <LogoMark className="h-10 w-auto" />
            <span className={`${WORDMARK_FONT} text-[1.75rem] font-normal leading-none tracking-[-0.01em] text-[#F3F0E9]`}>
              Northeia
            </span>
          </Link>
          <Link
            href="/"
            className="rounded-full border border-white/25 px-4 py-2.5 text-sm text-white transition-all hover:border-[#F4A259] hover:bg-[#F4A259] hover:text-[#102F32] md:px-5"
          >
            Voltar ao site
          </Link>
        </div>

        <div className="relative mx-auto max-w-[1440px] px-6 pb-16 pt-14 md:px-10 md:pb-24 md:pt-20 lg:px-16">
          <div className="mb-6 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.2em] text-[#F4A259]">
            <span className="h-px w-8 bg-[#F4A259]" />
            Documento legal
          </div>
          <h1
            className={`${WORDMARK_FONT} max-w-4xl text-5xl font-normal leading-[0.98] tracking-[-0.03em] text-[#F3F0E9] md:text-7xl`}
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

      <footer className="bg-[#0B292C] px-6 py-10 text-white md:px-10 lg:px-16">
        <div className="mx-auto flex max-w-[1312px] flex-col items-center gap-5 text-center text-sm text-white/55 md:flex-row md:justify-between md:text-left">
          <p>© {new Date().getFullYear()} Northeia. Todos os direitos reservados.</p>
          <nav aria-label="Documentos legais" className="flex gap-6 text-white/75">
            <Link
              href="/politica-de-privacidade"
              aria-current={current === 'privacidade' ? 'page' : undefined}
              className={`border-b pb-1 transition-colors hover:border-white hover:text-white ${
                current === 'privacidade' ? 'border-[#F4A259] text-white' : 'border-white/25'
              }`}
            >
              Política de Privacidade
            </Link>
            <Link
              href="/termos-de-uso"
              aria-current={current === 'termos' ? 'page' : undefined}
              className={`border-b pb-1 transition-colors hover:border-white hover:text-white ${
                current === 'termos' ? 'border-[#F4A259] text-white' : 'border-white/25'
              }`}
            >
              Termos de Uso
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}
