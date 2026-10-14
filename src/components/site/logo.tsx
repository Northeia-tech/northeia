import { cn } from "@/lib/cn";
import { site } from "@/lib/site";

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5 text-paper", className)}>
      <svg viewBox="0 0 32 32" className="size-7" aria-hidden="true">
        <circle cx="16" cy="16" r="9.25" fill="none" stroke="currentColor" strokeWidth="1.75" className="text-mist" />
        <circle cx="16" cy="16" r="4.6" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-paper" />
        <circle cx="23.6" cy="11.4" r="2.15" fill="currentColor" className="text-emerald" />
      </svg>
      <span className="font-display text-xl tracking-tight">{site.name}</span>
    </span>
  );
}
