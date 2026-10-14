import { useState } from "react";
import { opsNodes } from "@/data/content";
import { cn } from "@/lib/cn";

export function OpsCenter() {
  const [active, setActive] = useState<(typeof opsNodes)[number]["id"]>("pedidos");
  const node = opsNodes.find((item) => item.id === active) ?? opsNodes[0];

  return (
    <div className="panel rise-late motion-safe:animate-rise p-4 md:p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="flex items-center gap-2 text-sm text-paper">
            <span className="dot size-1.5 rounded-full bg-emerald" aria-hidden="true" />
            Centro de operações
          </p>
          <p className="mt-1 text-xs text-mist">Demonstração · dados fictícios</p>
        </div>
        <p className="text-right text-xs text-mist">
          4 sistemas
          <span className="mt-1 block text-paper">ligados</span>
        </p>
      </div>

      <dl className="mt-4 grid grid-cols-3 gap-2">
        {[
          ["64%", "fila automática"],
          ["7", "exceções"],
          ["18h", "ciclo médio"],
        ].map(([value, label]) => (
          <div key={label} className="rounded-md bg-raised px-3 py-2">
            <dt className="text-xs text-mist">{label}</dt>
            <dd className="mt-1 font-display text-xl text-paper tabular-nums">{value}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div role="tablist" aria-label="Processos conectados" className="flex flex-col gap-1">
          {opsNodes.map((item) => {
            const selected = item.id === node.id;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                id={`op-${item.id}`}
                aria-selected={selected}
                aria-controls="op-painel"
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(item.id)}
                onKeyDown={(event) => {
                  const index = opsNodes.findIndex((entry) => entry.id === item.id);
                  if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
                  event.preventDefault();
                  const next =
                    event.key === "ArrowDown"
                      ? opsNodes[(index + 1) % opsNodes.length]
                      : opsNodes[(index - 1 + opsNodes.length) % opsNodes.length];
                  setActive(next.id);
                  document.getElementById(`op-${next.id}`)?.focus();
                }}
                className={cn(
                  "flex min-h-11 items-center justify-between rounded-md px-3 text-left text-sm transition-colors duration-200",
                  selected ? "bg-emerald text-emerald-ink" : "text-mist hover:bg-raised hover:text-paper",
                )}
              >
                <span>{item.label}</span>
                <span className={cn("text-xs", selected ? "text-emerald-ink" : "text-mist")}>{item.system}</span>
              </button>
            );
          })}
        </div>

        <div id="op-painel" role="tabpanel" aria-labelledby={`op-${node.id}`} className="rounded-md bg-raised p-4">
          <p className="text-xs tracking-widest text-emerald uppercase">{node.system}</p>
          <p className="mt-2 font-display text-4xl text-paper tabular-nums">{node.metric}</p>
          <p className="text-sm text-mist">{node.unit}</p>
          <p className="mt-3 text-sm text-paper">{node.note}</p>
          <div className="mt-4 flex h-16 items-end gap-1" aria-hidden="true">
            {node.series.map((value, index) => (
              <span
                key={`${node.id}-${index}`}
                className="flex-1 rounded-sm bg-emerald/80"
                style={{ height: `${value}%` }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
