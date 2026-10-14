import { Link } from "@tanstack/react-router";
import { nav } from "@/data/content";
import { site } from "@/lib/site";
import { Logo } from "@/components/site/logo";

export function Footer() {
  const whatsappReady = site.whatsappE164.replace(/\D/g, "").length >= 10;
  const emailReady = site.email.includes("@");

  return (
    <footer className="border-t border-line py-14">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 md:grid-cols-4">
        <div className="md:col-span-2">
          <Logo />
          <p className="mt-4 max-w-sm text-sm text-mist">
            Automação, inteligência de dados e software sob medida para operações que precisam de menos esforço manual e mais clareza.
          </p>
        </div>
        <div>
          <p className="text-xs font-medium tracking-widest text-mist uppercase">Navegação</p>
          <ul className="mt-4 space-y-2">
            {nav.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="text-sm text-paper hover:text-emerald">
                  {item.label}
                </a>
              </li>
            ))}
              <li>
                <Link to="/privacidade" className="text-sm text-paper hover:text-emerald">
                  Política de privacidade
                </Link>
              </li>
          </ul>
        </div>
        <div>
          <p className="text-xs font-medium tracking-widest text-mist uppercase">Contato</p>
          <ul className="mt-4 space-y-2 text-sm text-paper">
            <li>
              <a href="#contato" className="hover:text-emerald">
                Pedir um diagnóstico
              </a>
            </li>
            {whatsappReady ? <li>WhatsApp comercial ativo</li> : null}
            {emailReady ? (
              <li>
                <a href={`mailto:${site.email}`} className="hover:text-emerald">
                  {site.email}
                </a>
              </li>
            ) : null}
          </ul>
          {whatsappReady && emailReady ? null : (
            <p className="mt-4 text-sm text-mist">
              WhatsApp, e-mail e redes profissionais entram nesta página quando forem os canais oficiais.
            </p>
          )}
        </div>
      </div>
      <div className="mx-auto mt-12 flex max-w-6xl flex-col gap-2 border-t border-line px-5 pt-6 text-xs text-mist sm:flex-row sm:justify-between">
        <p>© 2026 {site.name}. Marca desta página.</p>
        <p>Demonstrações usam dados fictícios. Não há clientes, métricas ou certificações publicados aqui.</p>
      </div>
    </footer>
  );
}
