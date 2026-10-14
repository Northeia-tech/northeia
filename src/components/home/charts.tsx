import { useEffect, useState, type ReactNode } from "react";
import { performanceSeries, regionSeries } from "@/data/content";

function useRecharts() {
  const [lib, setLib] = useState<typeof import("recharts") | null>(null);
  useEffect(() => {
    let live = true;
    void import("recharts").then((mod) => {
      if (live) setLib(mod);
    });
    return () => {
      live = false;
    };
  }, []);
  return lib;
}

function ChartFrame({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="h-56 w-full min-w-0" role="img" aria-label={label}>
      {children}
    </div>
  );
}

function Tip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { value?: number | string }[];
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-md border border-line bg-ink px-3 py-2 text-xs text-paper">
      <p className="text-mist">{label}</p>
      <p className="tabular-nums">{payload[0]?.value}</p>
    </div>
  );
}

export function PerformanceChart() {
  const lib = useRecharts();
  if (!lib) return <div className="h-56 rounded-md bg-raised" aria-hidden="true" />;
  const { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } = lib;
  return (
    <ChartFrame label="Gráfico de demonstração: índice semanal fictício da semana 1 à semana 8">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={performanceSeries} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
          <XAxis dataKey="name" tick={{ fill: "var(--color-mist)", fontSize: 12 }} axisLine={false} tickLine={false} />
          <YAxis hide domain={[70, 120]} />
          <Tooltip content={<Tip />} cursor={{ stroke: "var(--color-line)" }} />
          <Area
            dataKey="valor"
            type="monotone"
            stroke="var(--color-emerald)"
            fill="var(--color-emerald)"
            fillOpacity={0.16}
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartFrame>
  );
}

export function RegionChart() {
  const lib = useRecharts();
  if (!lib) return <div className="h-56 rounded-md bg-raised" aria-hidden="true" />;
  const { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } = lib;
  return (
    <ChartFrame label="Gráfico de demonstração: percentual no prazo por unidade ilustrativa">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={regionSeries} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
          <XAxis dataKey="name" tick={{ fill: "var(--color-mist)", fontSize: 12 }} axisLine={false} tickLine={false} />
          <YAxis hide domain={[0, 100]} />
          <Tooltip content={<Tip />} cursor={{ fill: "var(--color-raised)" }} />
          <Bar dataKey="valor" fill="var(--color-emerald)" radius={[4, 4, 0, 0]} maxBarSize={48} />
        </BarChart>
      </ResponsiveContainer>
    </ChartFrame>
  );
}
