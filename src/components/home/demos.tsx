import { useState } from "react";
import { assistantPrompts, orderStages } from "@/data/content";
import { cn } from "@/lib/cn";
import { Section } from "@/components/site/section";
import { PerformanceChart, RegionChart } from "@/components/home/charts";

const tabs = [
  { id: "painel", label: "Desempenho" },
  { id: "pedidos", label: "Pedidos" },
  { id: "integracao", label: "Integração" },
  { id: "assistente", label: "Assistente" },
  { id: "vendas", label: "Vendas" },
] as const;

type TabId = (typeof tabs)[number]["id"];

const kpis = [
  ["R$ 1,28 mi", "receita do período"],
  ["91%", "pedidos no prazo"],
  ["14", "exceções abertas"],
  ["18 h", "ciclo até faturar"],
];

const units = [
  ["Norte", "94%", "3"],
  ["Centro", "88%", "8"],
  ["Sul", "91%", "3"],
];

export function Demos() {
  const [tab, setTab] = useState<TabId>("painel");
  const [step, setStep] = useState(0);
  const [synced, setSynced] = useState(false);
  const [promptId, setPromptId] = useState<(typeof assistantPrompts)[number]["id"]>("prazo");
  const prompt = assistantPrompts.find((item) => item.id === promptId) ?? assistantPrompts[0];

  return (
    <Section
      id="demonstracoes"
      eyebrow="Demonstrações"
      title="Como uma solução dessas pode parecer."
      lede="Interfaces ilustrativas de uma operação imaginária. Nenhum número desta seção é resultado de cliente."
    >
      <div role="tablist" aria-label="Exemplos de aplicação" className="flex gap-2 overflow-x-auto pb-1">
        {tabs.map((item) => {
          const selected = item.id === tab;
          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              id={`demo-${item.id}`}
              aria-selected={selected}
              aria-controls="demo-conteudo"
              onClick={() => setTab(item.id)}
              className={cn(
                "min-h-11 shrink-0 rounded-md px-4 text-sm transition-colors duration-200",
                selected ? "bg-emerald text-emerald-ink" : "border border-line text-mist hover:text-paper",
              )}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      <div id="demo-conteudo" role="tabpanel" aria-labelledby={`demo-${tab}`} className="panel mt-4 p-5 md:p-6">
        <p className="text-xs font-medium tracking-widest text-mist uppercase">Dados fictícios · demonstração</p>

        {tab === "painel" ? (
          <div>
            <h3 className="mt-3 text-2xl text-paper">Desempenho da operação</h3>
            <dl className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
              {kpis.map(([value, label]) => (
                <div key={label} className="rounded-md bg-raised px-3 py-3">
                  <dt className="text-xs text-mist">{label}</dt>
                  <dd className="mt-1 font-display text-2xl text-paper tabular-nums">{value}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-5">
              <PerformanceChart />
            </div>
            <table className="mt-4 w-full text-left text-sm">
              <caption className="mb-2 text-left text-xs text-mist">Unidades ilustrativas, não clientes.</caption>
              <thead className="text-mist">
                <tr>
                  <th className="py-2 font-medium">Unidade</th>
                  <th className="py-2 font-medium">No prazo</th>
                  <th className="py-2 font-medium">Exceções</th>
                </tr>
              </thead>
              <tbody>
                {units.map((row) => (
                  <tr key={row[0]} className="border-t border-line text-paper">
                    {row.map((cell) => (
                      <td key={cell} className="py-2 tabular-nums">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}

        {tab === "pedidos" ? (
          <div>
            <div className="mt-3 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <h3 className="text-2xl text-paper">Fluxo de um pedido</h3>
              <button
                type="button"
                className="min-h-11 rounded-md bg-emerald px-4 text-sm font-medium text-emerald-ink hover:bg-paper"
                onClick={() => setStep((current) => (current >= orderStages.length - 1 ? 0 : current + 1))}
              >
                {step >= orderStages.length - 1 ? "Reiniciar demonstração" : "Avançar pedido"}
              </button>
            </div>
            <ol className="mt-6 space-y-3" aria-live="polite">
              {orderStages.map((stage, index) => {
                const state = index < step ? "feito" : index === step ? "agora" : "à frente";
                return (
                  <li key={stage.title} className="grid grid-cols-[auto_1fr] gap-3 border-t border-line pt-3">
                    <span
                      className={cn(
                        "mt-0.5 inline-flex size-6 items-center justify-center rounded-full text-xs tabular-nums",
                        index <= step ? "bg-emerald text-emerald-ink" : "bg-raised text-mist",
                      )}
                    >
                      {index + 1}
                    </span>
                    <div>
                      <p className="text-paper">
                        {stage.title}
                        <span className="ml-2 text-xs text-mist">{state}</span>
                      </p>
                      {index <= step ? <p className="mt-1 text-sm text-mist">{stage.detail}</p> : null}
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        ) : null}

        {tab === "integracao" ? (
          <div>
            <div className="mt-3 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <h3 className="text-2xl text-paper">CRM, financeiro e relatório</h3>
              <button
                type="button"
                className="min-h-11 rounded-md bg-emerald px-4 text-sm font-medium text-emerald-ink hover:bg-paper"
                onClick={() => setSynced(true)}
                aria-pressed={synced}
              >
                {synced ? "Sincronizado na demonstração" : "Sincronizar demonstração"}
              </button>
            </div>
            <ul className="mt-6 grid gap-3 md:grid-cols-3" aria-live="polite">
              {[
                ["CRM", "PED-1042", "Origem do pedido"],
                ["Financeiro", synced ? "PED-1042" : "Aguardando", synced ? "Título ligado" : "Ainda não refletido"],
                ["Relatório", synced ? "PED-1042" : "Aguardando", synced ? "Linha atualizada" : "Fecha manual depois"],
              ].map(([name, code, status]) => (
                <li key={name} className="rounded-md bg-raised p-4">
                  <p className="text-xs tracking-widest text-mist uppercase">{name}</p>
                  <p className="mt-3 font-display text-2xl text-paper">{code}</p>
                  <p className="mt-2 text-sm text-mist">{status}</p>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {tab === "assistente" ? (
          <div className="mt-3 grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="text-2xl text-paper">Consulta interna</h3>
              <p className="mt-2 text-sm text-mist">Perguntas prontas. As respostas são texto fixo de demonstração, não um modelo ao vivo.</p>
              <div className="mt-4 flex flex-col gap-2">
                {assistantPrompts.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    aria-pressed={item.id === prompt.id}
                    onClick={() => setPromptId(item.id)}
                    className={cn(
                      "min-h-11 rounded-md border px-3 text-left text-sm transition-colors duration-200",
                      item.id === prompt.id ? "border-emerald text-paper" : "border-line text-mist hover:text-paper",
                    )}
                  >
                    {item.ask}
                  </button>
                ))}
              </div>
            </div>
            <div className="rounded-md bg-raised p-4" aria-live="polite">
              <p className="text-xs tracking-widest text-emerald uppercase">Resposta ilustrativa</p>
              <p className="mt-3 text-paper">{prompt.answer}</p>
              <p className="mt-4 text-xs text-mist">{prompt.source}</p>
            </div>
          </div>
        ) : null}

        {tab === "vendas" ? (
          <div>
            <h3 className="mt-3 text-2xl text-paper">Vendas e operação</h3>
            <p className="mt-2 max-w-xl text-sm text-mist">
              Percentual de pedidos no prazo por unidade ilustrativa. Serve para mostrar o tipo de leitura, não um resultado real.
            </p>
            <div className="mt-5">
              <RegionChart />
            </div>
          </div>
        ) : null}
      </div>
    </Section>
  );
}
