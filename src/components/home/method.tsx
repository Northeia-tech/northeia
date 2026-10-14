import { steps } from "@/data/content";
import { Section } from "@/components/site/section";

export function Method() {
  return (
    <Section
      id="metodo"
      eyebrow="Como funciona"
      title="Quatro etapas, do cenário ao que a operação passa a usar."
      lede="O desenho acompanha a realidade de cada empresa: time, ferramentas atuais e o tamanho do problema."
    >
      <ol className="grid gap-px overflow-hidden rounded-lg bg-line md:grid-cols-4">
        {steps.map((step) => (
          <li key={step.n} className="bg-ink p-6">
            <p className="text-xs tracking-widest text-emerald tabular-nums">{step.n}</p>
            <h3 className="mt-4 text-2xl text-paper">{step.title}</h3>
            <p className="mt-3 text-sm text-mist">{step.body}</p>
          </li>
        ))}
      </ol>
      <p className="mt-6 max-w-2xl text-sm text-mist">
        Não há um pacote único. Uma integração pequena pode ser o passo certo; um sistema novo só entra se o processo justificar.
      </p>
    </Section>
  );
}
