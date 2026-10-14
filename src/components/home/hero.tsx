import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { OpsCenter } from "@/components/home/ops-center";

export function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden">
      <div className="hero-grid pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 py-16 md:py-24 lg:grid-cols-2 lg:py-28">
        <div className="motion-safe:animate-rise">
          <p className="text-xs font-medium tracking-widest text-emerald uppercase">Automação · Dados · Software</p>
          <h1 className="mt-4 text-4xl text-paper sm:text-5xl lg:text-6xl">
            Sua empresa pode <span className="italic text-emerald">operar melhor</span>.
            <span className="mt-2 block">A tecnologia certa mostra como.</span>
          </h1>
          <p className="mt-6 max-w-xl text-base text-mist sm:text-lg">
            Automatizamos processos, conectamos sistemas e transformamos dados dispersos em decisões que a operação consegue executar.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild>
              <a href="#diagnostico">
                Descobrir oportunidades de automação
                <ArrowRight className="size-4" aria-hidden="true" />
              </a>
            </Button>
            <Button asChild variant="secondary">
              <a href="#solucoes">Conhecer nossas soluções</a>
            </Button>
          </div>
          <ul className="mt-8 flex flex-col gap-2 text-sm text-mist sm:flex-row sm:gap-6">
            <li>Diagnóstico no tamanho do problema</li>
            <li>Integra com o que já existe</li>
            <li>Conversa direta, sem pacote fechado</li>
          </ul>
        </div>
        <OpsCenter />
      </div>
    </section>
  );
}
