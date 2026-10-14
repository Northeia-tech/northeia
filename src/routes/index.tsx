import { createFileRoute } from "@tanstack/react-router";
import { Contact } from "@/components/home/contact";
import { Demos } from "@/components/home/demos";
import { Finder } from "@/components/home/finder";
import { Hero } from "@/components/home/hero";
import { Method } from "@/components/home/method";
import { Principles } from "@/components/home/principles";
import { Problems } from "@/components/home/problems";
import { Solutions } from "@/components/home/solutions";
import { SiteFrame } from "@/components/site/frame";
import { site } from "@/lib/site";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: site.name,
  description: site.description,
  areaServed: "BR",
  knowsAbout: [
    "Automação de processos",
    "Business intelligence",
    "Inteligência artificial aplicada a operações",
    "Desenvolvimento de software sob medida",
  ],
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${site.name} — Tecnologia para operações mais inteligentes` },
      { name: "description", content: site.description },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(jsonLd),
      },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <SiteFrame>
      <Hero />
      <Problems />
      <Solutions />
      <Finder />
      <Method />
      <Demos />
      <Principles />
      <Contact />
    </SiteFrame>
  );
}
