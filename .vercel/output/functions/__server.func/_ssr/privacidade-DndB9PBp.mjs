import { n as site } from "./site-C40jewS1.mjs";
import { y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as SiteFrame } from "./frame-ET7Rstte.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/privacidade-DndB9PBp.js
var import_jsx_runtime = require_jsx_runtime();
function Privacy() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFrame, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "mx-auto max-w-3xl px-5 py-16 md:py-24",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-medium tracking-widest text-emerald uppercase",
				children: "Institucional"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-3 text-4xl text-paper md:text-5xl",
				children: "Política de privacidade"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 space-y-6 text-mist",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
						"Esta página apresenta a ",
						site.name,
						". O formulário de diagnóstico envia nome, e-mail, telefone, empresa, desafio, descrição, origem e data de entrada para o HubSpot, o CRM que organiza o contato e a oportunidade no funil comercial."
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "O envio só acontece no servidor, com uma credencial que não aparece no navegador. Se o CRM não estiver configurado, a página avisa e não registra o lead em lugar nenhum — não há envio simulado." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "O HubSpot pode criar ou atualizar o contato pelo e-mail ou telefone, para não duplicar a mesma pessoa, e guardar a oportunidade na etapa inicial do funil configurado. A política do HubSpot passa a valer para esses dados." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Abrir o WhatsApp ou o e-mail é uma ação separada, no aplicativo que você escolher. Se esses canais não estiverem publicados, nada é enviado por eles." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Não usamos anúncios nem pixels de rastreamento. As demonstrações da página são interfaces com dados fictícios: não são clientes, depoimentos ou resultados. Um campo invisível e um limite de envios ajudam a barrar spam; isso não cria um perfil de navegação." })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-10",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: "text-sm text-paper underline decoration-line underline-offset-4 hover:decoration-emerald",
					children: "Voltar ao início"
				})
			})
		]
	}) });
}
//#endregion
export { Privacy as component };
