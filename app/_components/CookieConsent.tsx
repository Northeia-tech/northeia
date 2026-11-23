'use client'

import Link from 'next/link'
import { useCallback, useEffect, useState } from 'react'

// ---------------------------------------------------------------------------
// Configuração
// ---------------------------------------------------------------------------
const HUBSPOT_PORTAL_ID = '52168789'
// Opcional: coloque o ID do Google Analytics (ex.: 'G-XXXXXXXXXX'). Vazio = não carrega.
const GA_MEASUREMENT_ID = ''

const STORAGE_KEY = 'northeia-cookie-consent'
const OPEN_EVENT = 'northeia:open-cookie-settings'

type Choice = 'accepted' | 'declined'

function readChoice(): Choice | null {
  try {
    const value = window.localStorage.getItem(STORAGE_KEY)
    return value === 'accepted' || value === 'declined' ? value : null
  } catch {
    return null
  }
}

function saveChoice(choice: Choice) {
  try {
    window.localStorage.setItem(STORAGE_KEY, choice)
  } catch {
    // Navegador bloqueou o armazenamento: a escolha vale só nesta visita.
  }
}

function loadScript(id: string, src: string) {
  if (document.getElementById(id)) return
  const script = document.createElement('script')
  script.id = id
  script.src = src
  script.async = true
  script.defer = true
  document.body.appendChild(script)
}

function loadTracking() {
  // Rastreamento do HubSpot (analytics + reconhecimento de contatos do formulário)
  loadScript('hs-script-loader', `https://js.hs-scripts.com/${HUBSPOT_PORTAL_ID}.js`)

  if (GA_MEASUREMENT_ID) {
    loadScript('ga-loader', `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`)
    const w = window as unknown as { dataLayer?: unknown[]; gtag?: (...args: unknown[]) => void }
    w.dataLayer = w.dataLayer || []
    w.gtag =
      w.gtag ||
      function gtag(...args: unknown[]) {
        w.dataLayer!.push(args)
      }
    w.gtag('js', new Date())
    w.gtag('config', GA_MEASUREMENT_ID, { anonymize_ip: true })
  }
}

// ---------------------------------------------------------------------------
// Componente
// ---------------------------------------------------------------------------
export default function CookieConsent() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const choice = readChoice()
    if (choice === 'accepted') loadTracking()
    if (choice === null) setOpen(true)

    const reopen = () => setOpen(true)
    window.addEventListener(OPEN_EVENT, reopen)
    return () => window.removeEventListener(OPEN_EVENT, reopen)
  }, [])

  const decide = useCallback((choice: Choice) => {
    const previous = readChoice()
    saveChoice(choice)
    setOpen(false)

    if (choice === 'accepted') {
      loadTracking()
    } else if (previous === 'accepted') {
      // Scripts já carregados só param de verdade após recarregar a página.
      window.location.reload()
    }
  }, [])

  if (!open) return null

  return (
    <div
      role="dialog"
      aria-labelledby="cookie-title"
      aria-describedby="cookie-desc"
      className="cookie-banner fixed inset-x-3 bottom-3 z-[100] mx-auto max-w-3xl rounded-2xl border border-white/10 bg-[#0B171E]/95 p-5 text-white shadow-[0_20px_60px_-15px_rgba(0,0,0,.6)] backdrop-blur md:inset-x-5 md:bottom-5 md:p-6"
    >
      <div className="flex flex-col gap-5 md:flex-row md:items-center md:gap-8">
        <div className="flex-1">
          <h2 id="cookie-title" className="text-base font-medium">
            Cookies e privacidade
          </h2>
          <p id="cookie-desc" className="mt-2 text-sm leading-relaxed text-white/65">
            Usamos cookies essenciais para o site funcionar e, se você permitir, cookies de análise para entender como
            ele é usado e reconhecer seu contato. Você pode mudar de ideia quando quiser. Saiba mais na nossa{' '}
            <Link
              href="/politica-de-privacidade"
              className="border-b border-white/30 text-white/85 transition-colors hover:border-[#C4E68B] hover:text-white"
            >
              Política de Privacidade
            </Link>
            .
          </p>
        </div>
        <div className="flex shrink-0 flex-col gap-2 sm:flex-row md:flex-col lg:flex-row">
          <button
            type="button"
            onClick={() => decide('declined')}
            className="rounded-full border border-white/25 px-5 py-2.5 text-sm text-white transition-colors hover:border-white/60"
          >
            Apenas essenciais
          </button>
          <button
            type="button"
            onClick={() => decide('accepted')}
            className="rounded-full bg-[#C4E68B] px-5 py-2.5 text-sm font-medium text-[#102F32] transition-transform hover:-translate-y-0.5"
          >
            Aceitar todos
          </button>
        </div>
      </div>
    </div>
  )
}

// Botão para reabrir as preferências (use no rodapé).
export function CookieSettingsButton({ className = '' }: { className?: string }) {
  return (
    <button type="button" className={className} onClick={() => window.dispatchEvent(new Event(OPEN_EVENT))}>
      Preferências de cookies
    </button>
  )
}
