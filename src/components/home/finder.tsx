import { useState } from "react";
import { challengeLabel, challenges, recommend, type ChallengeId } from "@/data/content";
import { useIntent } from "@/lib/intent";
import { cn } from "@/lib/cn";
import { Section } from "@/components/site/section";
import { Button } from "@/components/ui/button";

export function Finder() {
  const [selected, setSelected] = useState<ChallengeId[]>([]);
  const [hint, setHint] = useState("");
  const matches = recommend(selected);

  function toggle(id: ChallengeId) {
    setHint("");
    setSelected((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]));
  }

  return (
    <Section
      id="diagnostico"
      eyebrow="Encontre oportunidades"
      title="Marque o que mais pesa hoje."
      lede="A sugestão aparece na hora, a partir do que você selecionar. Sem cadastro nesta etapa."
    >
      <fieldset>
        <legend className="sr-only">Desafios da empresa</legend>
        <ul className="grid gap-3 md:grid-cols-2">
          {challenges.map((item) => {
            const checked = selected.includes(item.id);
            return (
              <li key={item.id}>
                <label
                  className={cn(
                    "flex min-h-11 cursor-pointer items-center gap-3 rounded-md border px-4 py-3 transition-colors duration-200",
                    checked ? "border-emerald bg-raised text-paper" : "border-line text-mist hover:border-mist hover:text-paper",
                  )}
                >
                  <input
                    type="checkbox"
                    className="size-4 accent-emerald"
                    checked={checked}
                    onChange={() => toggle(item.id)}
                  />
                  <span className="text-sm">{item.label}</span>
                </label>
              </li>
            );
          })}
        </ul>
      </fieldset>

      <div className="mt-8" aria-live="polite">
        {matches.length === 0 ? (
          <p className="text-sm text-mist">Nada selecionado ainda. Escolha um ou mais desafios para ver caminhos possíveis.</p>
        ) : (
          <ul className="grid gap-3">
            {matches.map(({ solution, because }) => (
              <li key={solution.id} className="rounded-md border border-line bg-surface p-4">
                <p className="text-paper">{solution.name}</p>
                <p className="mt-1 text-sm text-mist">{solution.summary}</p>
                <p className="mt-3 text-xs text-emerald">
                  Relacionado a {because.map((id) => challengeLabel(id).toLowerCase()).join(", ")}.
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="mt-8 flex flex-col items-start gap-3">
        <Button
          disabled={selected.length === 0}
          onClick={() => {
            const first = selected[0];
            if (!first) {
              setHint("Selecione ao menos um desafio.");
              return;
            }
            const labels = selected.map((id) => challengeLabel(id)).join(", ");
            useIntent.getState().setIntent(
              first,
              `Desafios marcados: ${labels}. Quero um diagnóstico do que vale atacar primeiro.`,
              "diagnostico",
            );
            const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
            document.getElementById("contato")?.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
            window.setTimeout(() => document.getElementById("campo-detalhe")?.focus(), reduce ? 0 : 400);
          }}
        >
          Solicitar diagnóstico personalizado
        </Button>
        <p className="text-sm text-mist" role="status">
          {hint || (selected.length === 0 ? "O botão libera quando houver ao menos um desafio marcado." : `${selected.length} desafio(s) na leitura.`)}
        </p>
      </div>
    </Section>
  );
}
