import { i as challengeLabel } from "./content-DnRaTIIC.mjs";
import { a as normalizePhone, i as leadSchema, n as SPAM_MESSAGE, o as spamReason, r as UNCONFIGURED_MESSAGE, s as splitName, t as RATE_MESSAGE } from "./lead-dtl5Mlsf.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ingest.server-DL8YeU70.js
var WINDOW_MS = 6e5;
var MAX_HITS = 5;
var hits = /* @__PURE__ */ new Map();
function rateLimited(ip, now = Date.now()) {
	const key = ip.slice(0, 64) || "local";
	const recent = (hits.get(key) ?? []).filter((time) => now - time < WINDOW_MS);
	if (recent.length >= MAX_HITS) {
		hits.set(key, recent);
		return true;
	}
	recent.push(now);
	hits.set(key, recent);
	return false;
}
function hubspotConfigured() {
	return Boolean(process.env.HUBSPOT_ACCESS_TOKEN?.trim());
}
function env(key) {
	return process.env[key]?.trim() || void 0;
}
/**
* HubSpot CRM — só no servidor.
*
* Credenciais (nunca no frontend, nunca com prefixo VITE_):
* - HUBSPOT_ACCESS_TOKEN — token de aplicativo privado.
*   Escopos: crm.objects.contacts.read, crm.objects.contacts.write,
*   crm.objects.deals.read, crm.objects.deals.write,
*   crm.schemas.contacts.read, crm.schemas.contacts.write.
* - HUBSPOT_PIPELINE_ID — id do funil de negócios. Vazio usa "default".
* - HUBSPOT_DEAL_STAGE_ID — id interno da etapa de entrada. Vazio usa a
*   primeira etapa aberta do funil, na ordem do HubSpot.
* - LEAD_NOTIFY_WEBHOOK_URL — opcional, https. Recebe o lead depois que o
*   CRM confirma. Ponto para notificação ou automação futura.
*   WhatsApp Business entra como outro destino servidor quando houver
*   credencial própria; esta página não dispara mensagem fictícia.
*
* Defina as variáveis no ambiente do servidor publicado. Sem o token, o
* envio falha e nenhum lead é inventado.
*/
var API = "https://api.hubapi.com";
var CONTACT_PROPS = [
	{
		name: "orbe_desafio",
		label: "Principal desafio",
		type: "string",
		fieldType: "text"
	},
	{
		name: "orbe_origem",
		label: "Origem do lead",
		type: "string",
		fieldType: "text"
	},
	{
		name: "orbe_detalhe",
		label: "Necessidade descrita",
		type: "string",
		fieldType: "textarea"
	},
	{
		name: "orbe_data_entrada",
		label: "Data de entrada do lead",
		type: "date",
		fieldType: "date"
	}
];
function readHubspotConfig() {
	const token = env("HUBSPOT_ACCESS_TOKEN");
	if (!token) return null;
	return {
		token,
		pipelineId: env("HUBSPOT_PIPELINE_ID") || "default",
		stageId: env("HUBSPOT_DEAL_STAGE_ID") || ""
	};
}
var HubSpotFailure = class extends Error {
	publicMessage;
	status;
	constructor(publicMessage, status = 0) {
		super(publicMessage);
		this.publicMessage = publicMessage;
		this.status = status;
	}
};
var propertiesReady = null;
async function recordLead(lead, enteredAt) {
	const config = readHubspotConfig();
	if (!config) throw new HubSpotFailure("O registro no CRM não está ativo. Nenhum lead foi enviado.");
	const custom = await ensureContactProperties(config.token);
	const phone = normalizePhone(lead.phone);
	const email = lead.email.trim().toLowerCase();
	const { firstname, lastname } = splitName(lead.name);
	const entryDate = utcMidnight(enteredAt);
	const found = await findContact(config.token, email, phone);
	const properties = {
		email,
		firstname,
		phone,
		company: lead.company.trim()
	};
	if (lastname) properties.lastname = lastname;
	if (custom) {
		properties.orbe_desafio = lead.challengeLabel;
		properties.orbe_origem = lead.source;
		properties.orbe_detalhe = lead.detail;
	}
	let contactId;
	let contactAction;
	if (found) {
		contactId = found.id;
		contactAction = "updated";
		if (found.email && found.email.toLowerCase() !== email) delete properties.email;
		await hs(config.token, `/crm/v3/objects/contacts/${contactId}`, {
			method: "PATCH",
			body: JSON.stringify({ properties })
		});
	} else {
		if (custom) properties.orbe_data_entrada = entryDate;
		properties.lifecyclestage = "lead";
		try {
			contactId = (await hs(config.token, "/crm/v3/objects/contacts", {
				method: "POST",
				body: JSON.stringify({ properties })
			})).id;
			contactAction = "created";
		} catch (error) {
			if (!(error instanceof HubSpotFailure) || error.status !== 409) throw error;
			const again = await findContact(config.token, email, phone);
			if (!again) throw error;
			contactId = again.id;
			contactAction = "updated";
			delete properties.lifecyclestage;
			delete properties.orbe_data_entrada;
			await hs(config.token, `/crm/v3/objects/contacts/${contactId}`, {
				method: "PATCH",
				body: JSON.stringify({ properties })
			});
		}
	}
	const stages = await pipelineStages(config.token, config.pipelineId);
	const entryStage = config.stageId || stages.find((stage) => !stage.closed)?.id;
	if (!entryStage) throw new HubSpotFailure("O funil não tem uma etapa aberta para receber o lead.");
	if (config.stageId && !stages.some((stage) => stage.id === config.stageId)) throw new HubSpotFailure("A etapa do funil configurada não existe. O lead não entrou no funil.");
	const closed = new Set(stages.filter((stage) => stage.closed).map((stage) => stage.id));
	const openDeal = await findOpenDeal(config.token, contactId, config.pipelineId, closed);
	const description = describe(lead, openDeal?.entry ?? enteredAt, openDeal ? enteredAt : void 0);
	let dealId;
	let dealAction;
	if (openDeal) {
		dealId = openDeal.id;
		dealAction = "updated";
		await hs(config.token, `/crm/v3/objects/deals/${dealId}`, {
			method: "PATCH",
			body: JSON.stringify({ properties: {
				dealname: dealName(lead.company),
				description
			} })
		});
	} else {
		dealId = (await hs(config.token, "/crm/v3/objects/deals", {
			method: "POST",
			body: JSON.stringify({
				properties: {
					dealname: dealName(lead.company),
					pipeline: config.pipelineId,
					dealstage: entryStage,
					description
				},
				associations: [{
					to: { id: contactId },
					types: [{
						associationCategory: "HUBSPOT_DEFINED",
						associationTypeId: 3
					}]
				}]
			})
		})).id;
		dealAction = "created";
	}
	try {
		await createNote(config.token, contactId, dealId, describe(lead, enteredAt));
	} catch (error) {
		console.error("hubspot note skipped", error instanceof HubSpotFailure ? error.status : "error");
	}
	return {
		contactId,
		dealId,
		contactAction,
		dealAction,
		enteredAt
	};
}
async function notifyWebhook(receipt, lead) {
	const url = env("LEAD_NOTIFY_WEBHOOK_URL");
	if (!url || !url.startsWith("https://")) return;
	try {
		await fetch(url, {
			method: "POST",
			headers: { "content-type": "application/json" },
			body: JSON.stringify({
				source: "orbe-landing",
				enteredAt: receipt.enteredAt,
				contactId: receipt.contactId,
				dealId: receipt.dealId,
				contactAction: receipt.contactAction,
				dealAction: receipt.dealAction,
				name: lead.name,
				email: lead.email,
				phone: normalizePhone(lead.phone),
				company: lead.company,
				challenge: lead.challenge,
				detail: lead.detail,
				leadSource: lead.source
			}),
			signal: AbortSignal.timeout(8e3)
		});
	} catch (error) {
		console.error("lead webhook failed", error instanceof Error ? error.name : "error");
	}
}
function dealName(company) {
	return `Diagnóstico — ${company.trim()}`.slice(0, 120);
}
function describe(lead, entry, updated) {
	const lines = [
		`Entrada: ${entry}`,
		`Origem: ${lead.source}`,
		`Desafio: ${lead.challengeLabel}`,
		`Necessidade: ${lead.detail.trim() || "a combinar"}`,
		`E-mail: ${lead.email.trim().toLowerCase()}`,
		`Telefone: ${normalizePhone(lead.phone)}`
	];
	if (updated) lines.push(`Atualizado: ${updated}`);
	return lines.join("\n");
}
function utcMidnight(iso) {
	const date = new Date(iso);
	return String(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
}
async function ensureContactProperties(token) {
	if (!propertiesReady) propertiesReady = checkProperties(token).catch((error) => {
		propertiesReady = null;
		throw error;
	});
	return propertiesReady;
}
async function checkProperties(token) {
	for (const prop of CONTACT_PROPS) {
		const existing = await fetch(`${API}/crm/v3/properties/contacts/${prop.name}`, {
			headers: { Authorization: `Bearer ${token}` },
			signal: AbortSignal.timeout(12e3)
		});
		if (existing.ok) continue;
		if (existing.status === 403) return false;
		if (existing.status === 401) throw new HubSpotFailure(authMessage(), 401);
		if (existing.status !== 404) {
			console.error("hubspot property lookup", existing.status);
			throw new HubSpotFailure(genericMessage(), existing.status);
		}
		const created = await fetch(`${API}/crm/v3/properties/contacts`, {
			method: "POST",
			headers: jsonHeaders(token),
			body: JSON.stringify({
				...prop,
				groupName: "contactinformation"
			}),
			signal: AbortSignal.timeout(12e3)
		});
		if (created.status === 403) return false;
		if (!created.ok) {
			console.error("hubspot property create", created.status);
			throw new HubSpotFailure(statusMessage(created.status), created.status);
		}
	}
	return true;
}
async function findContact(token, email, phone) {
	const data = await hs(token, "/crm/v3/objects/contacts/search", {
		method: "POST",
		body: JSON.stringify({
			filterGroups: [{ filters: [{
				propertyName: "email",
				operator: "EQ",
				value: email
			}] }, { filters: [{
				propertyName: "phone",
				operator: "EQ",
				value: phone
			}] }],
			properties: ["email", "phone"],
			limit: 5
		})
	});
	const byEmail = data.results.find((item) => item.properties.email?.toLowerCase() === email);
	if (byEmail) return {
		id: byEmail.id,
		email: byEmail.properties.email ?? ""
	};
	const byPhone = data.results.find((item) => item.properties.phone === phone);
	if (!byPhone) return null;
	return {
		id: byPhone.id,
		email: byPhone.properties.email ?? ""
	};
}
async function pipelineStages(token, pipelineId) {
	const stages = (await hs(token, `/crm/v3/pipelines/deals/${encodeURIComponent(pipelineId)}/stages`)).results.map((stage) => ({
		id: stage.id,
		displayOrder: stage.displayOrder,
		closed: stage.metadata?.isClosed === true || stage.metadata?.isClosed === "true"
	}));
	stages.sort((a, b) => a.displayOrder - b.displayOrder);
	return stages;
}
async function findOpenDeal(token, contactId, pipelineId, closed) {
	const ids = ((await hs(token, `/crm/v4/objects/contacts/${contactId}/associations/deals`)).results ?? []).map((item) => String(item.toObjectId));
	if (ids.length === 0) return null;
	const deal = (await hs(token, "/crm/v3/objects/deals/batch/read", {
		method: "POST",
		body: JSON.stringify({
			properties: [
				"dealstage",
				"pipeline",
				"description",
				"createdate"
			],
			inputs: ids.map((id) => ({ id }))
		})
	})).results.filter((deal) => deal.properties.pipeline === pipelineId && !closed.has(deal.properties.dealstage ?? "")).sort((a, b) => (b.properties.createdate ?? "").localeCompare(a.properties.createdate ?? ""))[0];
	if (!deal) return null;
	const entry = deal.properties.description?.match(/^Entrada: (.+)$/m)?.[1];
	return {
		id: deal.id,
		entry
	};
}
async function createNote(token, contactId, dealId, body) {
	await hs(token, "/crm/v3/objects/notes", {
		method: "POST",
		body: JSON.stringify({
			properties: {
				hs_timestamp: (/* @__PURE__ */ new Date()).toISOString(),
				hs_note_body: body
			},
			associations: [{
				to: { id: contactId },
				types: [{
					associationCategory: "HUBSPOT_DEFINED",
					associationTypeId: 202
				}]
			}, {
				to: { id: dealId },
				types: [{
					associationCategory: "HUBSPOT_DEFINED",
					associationTypeId: 214
				}]
			}]
		})
	});
}
function jsonHeaders(token) {
	return {
		Authorization: `Bearer ${token}`,
		"Content-Type": "application/json"
	};
}
async function hs(token, path, init) {
	let response;
	try {
		response = await fetch(`${API}${path}`, {
			...init,
			headers: jsonHeaders(token),
			signal: AbortSignal.timeout(12e3)
		});
	} catch {
		throw new HubSpotFailure("Não foi possível falar com o HubSpot agora. Nenhum lead foi confirmado.");
	}
	const text = await response.text();
	if (!response.ok) {
		console.error("hubspot", response.status, path.split("?")[0]);
		if (response.status === 400 && text.toLowerCase().includes("dealstage")) throw new HubSpotFailure("A etapa do funil configurada não existe. O lead não entrou no funil.");
		throw new HubSpotFailure(statusMessage(response.status), response.status);
	}
	if (!text) return {};
	return JSON.parse(text);
}
function authMessage() {
	return "A credencial do HubSpot foi recusada. O lead não foi registrado.";
}
function genericMessage() {
	return "O HubSpot não registrou o lead. Nada foi confirmado.";
}
function statusMessage(status) {
	if (status === 401 || status === 403) return authMessage();
	if (status === 404) return "O funil configurado não existe no HubSpot. O lead não foi registrado.";
	if (status === 429) return "O HubSpot limitou os envios agora. Tente de novo em alguns minutos.";
	return genericMessage();
}
async function ingestLead(raw, ip) {
	const parsed = leadSchema.safeParse(raw);
	if (!parsed.success) {
		const fields = {};
		for (const issue of parsed.error.issues) {
			const key = issue.path[0];
			if (typeof key === "string" && !fields[key]) fields[key] = issue.message;
		}
		return {
			ok: false,
			message: "Revise os campos marcados. O lead não foi enviado.",
			fields
		};
	}
	if (spamReason(parsed.data)) return {
		ok: false,
		message: SPAM_MESSAGE
	};
	if (rateLimited(ip)) return {
		ok: false,
		message: RATE_MESSAGE
	};
	if (!hubspotConfigured()) return {
		ok: false,
		message: UNCONFIGURED_MESSAGE
	};
	const enteredAt = (/* @__PURE__ */ new Date()).toISOString();
	try {
		const receipt = await recordLead({
			...parsed.data,
			challengeLabel: challengeLabel(parsed.data.challenge)
		}, enteredAt);
		await notifyWebhook(receipt, parsed.data);
		return {
			ok: true,
			contactAction: receipt.contactAction,
			dealAction: receipt.dealAction,
			enteredAt: receipt.enteredAt
		};
	} catch (error) {
		if (error instanceof HubSpotFailure) return {
			ok: false,
			message: error.publicMessage
		};
		console.error("lead ingest failed");
		return {
			ok: false,
			message: "O HubSpot não registrou o lead. Nada foi confirmado."
		};
	}
}
//#endregion
export { ingestLead };
