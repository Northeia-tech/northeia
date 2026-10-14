import { principles } from "@/data/content";
import { Section } from "@/components/site/section";

export function Principles() {
  return (
    <Section
      id="diferenciais"
      eyebrow="Jeito de trabalhar"
      title="Tecnologia só entra se mudar a forma de operar."
      lede="Resultados de clientes só entram nesta página quando forem reais e puderem ser contados. Até lá, o critério de trabalho é este."
    >
      <ol className="divide-y divide-line border-y border-line">
        {principles.map((item, index) => (
          <li key={item.title} className="grid gap-2 py-6 md:grid-cols-12 md:gap-8">
            <p className="font-display text-mist tabular-nums md:col-span-1">0{index + 1}</p>
            <h3 className="text-2xl text-paper md:col-span-4">{item.title}</h3>
            <p className="text-mist md:col-span-7">{item.body}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
