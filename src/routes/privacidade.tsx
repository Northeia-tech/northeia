import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteFrame } from "@/components/site/frame";
import { site } from "@/lib/site";

export const Route = createFileRoute("/privacidade")({
  head: () => ({
    meta: [
      { title: `Privacidade — ${site.name}` },
      {
        name: "description",
        content: `Como a página da ${site.name} trata os dados que você escreve no formulário de contato.`,
      },
    ],
  }),
  component: Privacy,
});

function Privacy() {
  return (
    <SiteFrame>
      <article className="mx-auto max-w-3xl px-5 py-16 md:py-24">
        <p className="text-xs font-medium tracking-widest text-emerald uppercase">Institucional</p>
        <h1 className="mt-3 text-4xl text-paper md:text-5xl">Política de privacidade</h1>
        <div className="mt-8 space-y-6 text-mist">
          <p>
            Esta página apresenta a {site.name}. O formulário de diagnóstico envia nome, e-mail, telefone, empresa, desafio, descrição, origem e data de entrada para o HubSpot, o CRM que organiza o contato e a oportunidade no funil comercial.
          </p>
          <p>
            O envio só acontece no servidor, com uma credencial que não aparece no navegador. Se o CRM não estiver configurado, a página avisa e não registra o lead em lugar nenhum — não há envio simulado.
          </p>
          <p>
            O HubSpot pode criar ou atualizar o contato pelo e-mail ou telefone, para não duplicar a mesma pessoa, e guardar a oportunidade na etapa inicial do funil configurado. A política do HubSpot passa a valer para esses dados.
          </p>
          <p>
            Abrir o WhatsApp ou o e-mail é uma ação separada, no aplicativo que você escolher. Se esses canais não estiverem publicados, nada é enviado por eles.
          </p>
          <p>
            Não usamos anúncios nem pixels de rastreamento. As demonstrações da página são interfaces com dados fictícios: não são clientes, depoimentos ou resultados. Um campo invisível e um limite de envios ajudam a barrar spam; isso não cria um perfil de navegação.
          </p>
        </div>
        <p className="mt-10">
          <Link to="/" className="text-sm text-paper underline decoration-line underline-offset-4 hover:decoration-emerald">
            Voltar ao início
          </Link>
        </p>
      </article>
    </SiteFrame>
  );
}
