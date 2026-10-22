import type { Metadata, Viewport } from 'next'
import './globals.css'
// @ts-expect-error - Tell the compiler to ignore the CSS module missing error
import "./index.css";

const siteUrl = 'https://northeia.com.br'
const title = 'Northeia — Estratégia, dados & tecnologia'
const description =
  'Revelamos as causas por trás dos resultados e construímos o caminho para empresas crescerem com direção, inteligência e confiança. Diagnóstico, inteligência de negócio, sistemas e automação.'

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
  themeColor: '#0B292C',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}