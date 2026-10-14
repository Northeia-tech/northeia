//#region node_modules/.nitro/vite/services/ssr/assets/site-C40jewS1.js
/**
* Identidade e canais comerciais.
*
* whatsappE164 — somente dígitos, com DDI. Exemplo: "5581999990000".
*   Vazio = o WhatsApp ainda não está ativo. O botão avisa e não abre um número falso.
* email — caixa que alguém da empresa realmente lê.
*   Vazio = o atalho de e-mail fica oculto.
*/
var site = {
	name: "Orbe",
	description: "A Orbe automatiza processos, conecta sistemas e transforma dados em decisões para operações que precisam funcionar melhor.",
	whatsappE164: "",
	email: ""
};
function whatsappUrl(message) {
	const digits = site.whatsappE164.replace(/\D/g, "");
	if (digits.length < 10) return null;
	return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}
function mailUrl(subject, body) {
	if (!site.email.includes("@")) return null;
	return `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
//#endregion
export { site as n, whatsappUrl as r, mailUrl as t };
