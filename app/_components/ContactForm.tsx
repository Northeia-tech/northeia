'use client'

import { useEffect, useState } from 'react'

const SCRIPT_SRC = 'https://js.hsforms.net/forms/embed/52168789.js'
const FORM_ID = 'a9d6c991-0dc6-408c-8f83-809ba9e81a6c'

export default function ContactForm() {
  const [enabled, setEnabled] = useState(false)
  const [status, setStatus] = useState<'idle' | 'loading' | 'ready' | 'error'>('idle')

  useEffect(() => {
    if (!enabled) return
    const ready = (event: Event) => {
      if ((event as CustomEvent<{ formId?: string }>).detail?.formId === FORM_ID) {
        clearTimeout(timeout)
        setStatus('ready')
      }
    }
    const failed = () => setStatus('error')
    const timeout = window.setTimeout(failed, 15000)
    window.addEventListener('hs-form-event:on-ready', ready)
    let script = document.querySelector<HTMLScriptElement>(`script[src="${SCRIPT_SRC}"]`)
    if (!script) {
      script = document.createElement('script')
      script.src = SCRIPT_SRC
      script.async = true
      script.addEventListener('error', failed)
      document.body.appendChild(script)
    } else {
      script.addEventListener('error', failed)
    }
    return () => {
      clearTimeout(timeout)
      window.removeEventListener('hs-form-event:on-ready', ready)
      script.removeEventListener('error', failed)
    }
  }, [enabled])

  return (
    <div>
      {!enabled && (
        <button type="button" onClick={() => { setStatus('loading'); setEnabled(true) }} className="contact-open">
          Quero conversar sobre meu negócio <span aria-hidden="true">↗</span>
        </button>
      )}
      {enabled && <div className="hs-form-frame" data-region="na1" data-form-id={FORM_ID} data-portal-id="52168789" />}
      <p role="status" className="mt-4 text-sm leading-relaxed text-[#102F32]/70">
        {status === 'loading' && 'Carregando o formulário…'}
        {status === 'error' && 'O formulário está demorando para carregar. Você também pode falar conosco por e-mail abaixo.'}
      </p>
      <a className="mt-5 inline-block border-b border-[#102F32]/40 pb-1 text-sm" href="mailto:northeia.tech@gmail.com?subject=Quero%20conversar%20sobre%20meu%20neg%C3%B3cio">Prefiro conversar por e-mail ↗</a>
      <p className="mt-5 text-xs leading-relaxed text-[#102F32]/65">Ao abrir o formulário, você acessa nosso serviço de contato do HubSpot. Veja como seus dados são tratados na <a href="/politica-de-privacidade" className="underline underline-offset-4">Política de Privacidade</a>.</p>
    </div>
  )
}
