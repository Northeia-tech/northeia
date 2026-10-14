import { r as challengeIds } from "./content-DnRaTIIC.mjs";
import { a as string, i as object, r as number, t as _enum } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/lead-dtl5Mlsf.js
function phoneDigits(value) {
	return value.replace(/\D/g, "");
}
function isPhone(value) {
	const digits = phoneDigits(value);
	return digits.length >= 10 && digits.length <= 15;
}
/** E.164. Números com 10 ou 11 dígitos ganham o DDI 55. */
function normalizePhone(value) {
	let digits = phoneDigits(value);
	if ((digits.length === 10 || digits.length === 11) && !digits.startsWith("55")) digits = `55${digits}`;
	return `+${digits}`;
}
function splitName(name) {
	const parts = name.trim().split(/\s+/);
	return {
		firstname: parts[0] ?? "",
		lastname: parts.slice(1).join(" ")
	};
}
var MIN_FILL_MS = 1500;
var MAX_AGE_MS = 864e5;
function spamReason(input, now = Date.now()) {
	if (input.website.trim() !== "") return "honeypot";
	if (input.startedAt > now + 5e3) return "clock";
	if (now - input.startedAt < MIN_FILL_MS) return "fast";
	if (now - input.startedAt > MAX_AGE_MS) return "stale";
	return null;
}
function isEmail(value) {
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}
var leadSchema = object({
	name: string().trim().min(2, "Informe seu nome.").max(80, "Use no máximo 80 caracteres."),
	email: string().trim().max(120, "Use no máximo 120 caracteres.").refine(isEmail, "Informe um e-mail válido."),
	phone: string().trim().max(30, "Use no máximo 30 caracteres.").refine(isPhone, "Informe um telefone com DDD."),
	company: string().trim().min(2, "Informe a empresa.").max(120, "Use no máximo 120 caracteres."),
	challenge: _enum(challengeIds, "Escolha o principal desafio."),
	detail: string().trim().max(800, "Use no máximo 800 caracteres."),
	source: string().trim().regex(/^(site|diagnostico|solucao:[a-z]{2,20})$/, "Origem inválida."),
	website: string().max(200),
	startedAt: number().int()
});
var UNCONFIGURED_MESSAGE = "O registro no CRM não está ativo. Nenhum lead foi enviado.";
var SPAM_MESSAGE = "Não foi possível enviar agora. Espere um instante e tente de novo.";
var RATE_MESSAGE = "Muitos envios a partir desta rede. Tente de novo em alguns minutos.";
//#endregion
export { normalizePhone as a, leadSchema as i, SPAM_MESSAGE as n, spamReason as o, UNCONFIGURED_MESSAGE as r, splitName as s, RATE_MESSAGE as t };
