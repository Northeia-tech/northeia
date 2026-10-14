import type { ReactNode } from "react";

export function Section({
  id,
  eyebrow,
  title,
  lede,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  lede?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-titulo`} className="scroll-mt-24 border-t border-line py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5">
        <div className="max-w-2xl">
          <p className="text-xs font-medium tracking-widest text-emerald uppercase">{eyebrow}</p>
          <h2 id={`${id}-titulo`} className="mt-3 text-3xl text-paper md:text-5xl">
            {title}
          </h2>
          {lede ? <p className="mt-4 max-w-xl text-mist">{lede}</p> : null}
        </div>
        <div className="mt-12">{children}</div>
      </div>
    </section>
  );
}
