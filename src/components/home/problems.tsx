import { challenges } from "@/data/content";
import { Section } from "@/components/site/section";

export function Problems() {
  return (
    <Section
      id="problemas"
      eyebrow="O que trava a operação"
      title="Seis sinais de que a rotina ainda depende de esforço demais."
      lede="Cada um abre uma melhoria concreta. Nenhum exige trocar todos os sistemas no primeiro dia."
    >
      <ol>
        {challenges.map((item, index) => (
          <li key={item.id} className="grid gap-3 border-t border-line py-6 md:grid-cols-12 md:items-start md:gap-8">
            <p className="font-display text-mist tabular-nums md:col-span-1">0{index + 1}</p>
            <h3 className="text-2xl text-paper md:col-span-5">{item.title}</h3>
            <div className="md:col-span-6">
              <p className="text-xs font-medium tracking-widest text-emerald uppercase">Oportunidade</p>
              <p className="mt-2 text-paper">{item.opportunity}</p>
            </div>
          </li>
        ))}
      </ol>
      <p className="border-t border-line pt-6 text-sm text-mist">
        Se algum desses descreve a semana da empresa,{" "}
        <a href="#diagnostico" className="text-paper underline decoration-line underline-offset-4 hover:decoration-emerald">
          marque os desafios e veja por onde começar
        </a>
        .
      </p>
    </Section>
  );
}
