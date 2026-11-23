import type { Metadata, Viewport } from 'next'
import { DM_Sans, Instrument_Serif, Newsreader } from 'next/font/google'
import CookieConsent from './_components/CookieConsent'
import './globals.css'

const sans = DM_Sans({ subsets: ['latin'], variable: '--font-dm-sans', display: 'swap' })
const editorial = Instrument_Serif({ subsets: ['latin'], weight: '400', variable: '--font-editorial', display: 'swap' })

// Fonte serifada do nome "Northeia" (usada via var(--font-wordmark) no page.tsx)
const wordmark = Newsreader({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-wordmark',
  display: 'swap',
})

const siteUrl = 'https://northeia.com.br'
const title = 'Northeia — Menos gargalos. Mais clareza para crescer.'
const description =
  'Sua empresa perde tempo com tarefas manuais e informações espalhadas? Conectamos consultoria, dados e automação para melhorar sua operação. Converse sobre seu desafio com a Northeia.'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: '%s | Northeia',
  },
  description,
  applicationName: 'Northeia',
  keywords: [
    'Northeia',
    'consultoria estratégica',
    'inteligência de negócio',
    'business intelligence',
    'automação',
    'sistemas',
    'dados',
    'diagnóstico empresarial',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    url: siteUrl,
    siteName: 'Northeia',
    title,
    description,
    locale: 'pt_BR',
    // Coloque um arquivo opengraph-image.png (1200x630) na pasta app/
    // e o Next.js o usa automaticamente aqui.
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  themeColor: '#0B171E',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className={`${wordmark.variable} ${sans.variable} ${editorial.variable}`}>
      <body>
        {children}
        <CookieConsent />
      </body>
    </html>
  )
}
