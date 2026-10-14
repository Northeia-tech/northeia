import { useState } from "react";
import { solutions, type SolutionId } from "@/data/content";
import { useIntent } from "@/lib/intent";
import { cn } from "@/lib/cn";
import { Section } from "@/components/site/section";
import { Button } from "@/components/ui/button";

function focusDetail() {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.setTimeout(() => document.getElementById("campo-detalhe")?.focus(), reduce ? 0 : 400);
}

export function Solutions() {
  const [active, setActive] = useState<SolutionId>("automacao");
  const current = solutions.find((item) => item.id === active) ?? solutions[0];

  return (
    <Section
      id="solucoes"
      eyebrow="Soluções"
      title="O que a Orbe faz, na prática."
      lede="Cinco frentes. A empresa não precisa de todas. O diagnóstico indica por onde começar."
    >
      <div className="grid gap-8 lg:grid-cols-12">
        <div role="tablist" aria-label="Categorias de solução" className="flex flex-col gap-1 lg:col-span-4">
          {solutions.map((item, index) => {
            const selected = item.id === current.id;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                id={`sol-${item.id}`}
                aria-selected={selected}
                aria-controls="sol-painel"
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(item.id)}
                onKeyDown={(event) => {
                  if (event.key !== "ArrowDown" && event.key !== "ArrowUp" && event.key !== "Home" && event.key !== "End") {
                    return;
                  }
                  event.preventDefault();
                  const nextIndex =
                    event.key === "Home"
                      ? 0
                      : event.key === "End"
                        ? solutions.length - 1
                        : event.key === "ArrowDown"
                          ? (index + 1) % solutions.length
                          : (index - 1 + solutions.length) % solutions.length;
                  const next = solutions[nextIndex];
                  setActive(next.id);
                  document.getElementById(`sol-${next.id}`)?.focus();
                }}
                className={cn(
                  "min-h-11 rounded-md px-3 text-left text-sm transition-colors duration-200",
                  selected ? "bg-raised text-paper" : "text-mist hover:bg-raised hover:text-paper",
                )}
              >
                <span className={cn("mr-2 text-xs tabular-nums", selected ? "text-emerald" : "text-mist")}>0{index + 1}</span>
                {item.name}
              </button>
            );
          })}
        </div>

        <div id="sol-painel" role="tabpanel" aria-labelledby={`sol-${current.id}`} className="panel p-6 lg:col-span-8 md:p-8">
          <h3 className="text-3xl text-paper">{current.name}</h3>
          <p className="mt-4 max-w-xl text-mist">{current.summary}</p>
          <ul className="mt-6 space-y-3">
            {current.examples.map((example) => (
              <li key={example} className="border-t border-line pt-3 text-sm text-paper">
                {example}
              </li>
            ))}
          </ul>
          <Button asChild className="mt-8">
            <a
              href="#contato"
              onClick={() => {
                useIntent.getState().setIntent(current.challenge, current.detail, `solucao:${current.id}`);
                focusDetail();
              }}
            >
              {current.cta}
            </a>
          </Button>
        </div>
      </div>
    </Section>
  );
}
