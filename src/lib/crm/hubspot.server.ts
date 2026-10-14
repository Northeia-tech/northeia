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
import { env } from "../env.server";
import type { LeadInput } from "../lead";
import { normalizePhone, splitName } from "./phone";

const API = "https://api.hubapi.com";

const CONTACT_PROPS = [
  { name: "orbe_desafio", label: "Principal desafio", type: "string", fieldType: "text" },
  { name: "orbe_origem", label: "Origem do lead", type: "string", fieldType: "text" },
  { name: "orbe_detalhe", label: "Necessidade descrita", type: "string", fieldType: "textarea" },
  { name: "orbe_data_entrada", label: "Data de entrada do lead", type: "date", fieldType: "date" },
] as const;

export type CrmReceipt = {
  contactId: string;
  dealId: string;
  contactAction: "created" | "updated";
  dealAction: "created" | "updated";
  enteredAt: string;
};

type Config = { token: string; pipelineId: string; stageId: string };

export function readHubspotConfig(): Config | null {
  const token = env("HUBSPOT_ACCESS_TOKEN");
  if (!token) return null;
  return {
    token,
    pipelineId: env("HUBSPOT_PIPELINE_ID") || "default",
    stageId: env("HUBSPOT_DEAL_STAGE_ID") || "",
  };
}

export class HubSpotFailure extends Error {
  constructor(
    readonly publicMessage: string,
    readonly status = 0,
  ) {
    super(publicMessage);
  }
}

type PipelineStage = { id: string; displayOrder: number; closed: boolean };

let propertiesReady: Promise<boolean> | null = null;

export async function recordLead(
  lead: LeadInput & { challengeLabel: string },
  enteredAt: string,
): Promise<CrmReceipt> {
  const config = readHubspotConfig();
  if (!config) throw new HubSpotFailure("O registro no CRM não está ativo. Nenhum lead foi enviado.");

  const custom = await ensureContactProperties(config.token);
  const phone = normalizePhone(lead.phone);
  const email = lead.email.trim().toLowerCase();
  const { firstname, lastname } = splitName(lead.name);
  const entryDate = utcMidnight(enteredAt);

  const found = await findContact(config.token, email, phone);
  const properties: Record<string, string> = {
    email,
    firstname,
    phone,
    company: lead.company.trim(),
  };
  if (lastname) properties.lastname = lastname;
  if (custom) {
    properties.orbe_desafio = lead.challengeLabel;
    properties.orbe_origem = lead.source;
    properties.orbe_detalhe = lead.detail;
  }

  let contactId: string;
  let contactAction: "created" | "updated";
  if (found) {
    contactId = found.id;
    contactAction = "updated";
    if (found.email && found.email.toLowerCase() !== email) delete properties.email;
    await hs(config.token, `/crm/v3/objects/contacts/${contactId}`, {
      method: "PATCH",
      body: JSON.stringify({ properties }),
    });
  } else {
    if (custom) properties.orbe_data_entrada = entryDate;
    properties.lifecyclestage = "lead";
    try {
      const created = await hs<{ id: string }>(config.token, "/crm/v3/objects/contacts", {
        method: "POST",
        body: JSON.stringify({ properties }),
      });
      contactId = created.id;
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
        body: JSON.stringify({ properties }),
      });
    }
  }

  const stages = await pipelineStages(config.token, config.pipelineId);
  const entryStage = config.stageId || stages.find((stage) => !stage.closed)?.id;
  if (!entryStage) {
    throw new HubSpotFailure("O funil não tem uma etapa aberta para receber o lead.");
  }
  if (config.stageId && !stages.some((stage) => stage.id === config.stageId)) {
    throw new HubSpotFailure("A etapa do funil configurada não existe. O lead não entrou no funil.");
  }

  const closed = new Set(stages.filter((stage) => stage.closed).map((stage) => stage.id));
  const openDeal = await findOpenDeal(config.token, contactId, config.pipelineId, closed);
  const description = describe(lead, openDeal?.entry ?? enteredAt, openDeal ? enteredAt : undefined);

  let dealId: string;
  let dealAction: "created" | "updated";
  if (openDeal) {
    dealId = openDeal.id;
    dealAction = "updated";
    await hs(config.token, `/crm/v3/objects/deals/${dealId}`, {
      method: "PATCH",
      body: JSON.stringify({
        properties: {
          dealname: dealName(lead.company),
          description,
        },
      }),
    });
  } else {
    const created = await hs<{ id: string }>(config.token, "/crm/v3/objects/deals", {
      method: "POST",
      body: JSON.stringify({
        properties: {
          dealname: dealName(lead.company),
          pipeline: config.pipelineId,
          dealstage: entryStage,
          description,
        },
        associations: [
          {
            to: { id: contactId },
            types: [{ associationCategory: "HUBSPOT_DEFINED", associationTypeId: 3 }],
          },
        ],
      }),
    });
    dealId = created.id;
    dealAction = "created";
  }

  try {
    await createNote(config.token, contactId, dealId, describe(lead, enteredAt));
  } catch (error) {
    console.error("hubspot note skipped", error instanceof HubSpotFailure ? error.status : "error");
  }
  return { contactId, dealId, contactAction, dealAction, enteredAt };
}

export async function notifyWebhook(receipt: CrmReceipt, lead: LeadInput) {
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
        leadSource: lead.source,
      }),
      signal: AbortSignal.timeout(8_000),
    });
  } catch (error) {
    console.error("lead webhook failed", error instanceof Error ? error.name : "error");
  }
}

function dealName(company: string) {
  return `Diagnóstico — ${company.trim()}`.slice(0, 120);
}

function describe(
  lead: LeadInput & { challengeLabel: string },
  entry: string,
  updated?: string,
) {
  const lines = [
    `Entrada: ${entry}`,
    `Origem: ${lead.source}`,
    `Desafio: ${lead.challengeLabel}`,
    `Necessidade: ${lead.detail.trim() || "a combinar"}`,
    `E-mail: ${lead.email.trim().toLowerCase()}`,
    `Telefone: ${normalizePhone(lead.phone)}`,
  ];
  if (updated) lines.push(`Atualizado: ${updated}`);
  return lines.join("\n");
}

function utcMidnight(iso: string) {
  const date = new Date(iso);
  return String(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
}

async function ensureContactProperties(token: string) {
  if (!propertiesReady) {
    propertiesReady = checkProperties(token).catch((error) => {
      propertiesReady = null;
      throw error;
    });
  }
  return propertiesReady;
}

async function checkProperties(token: string) {
  for (const prop of CONTACT_PROPS) {
    const existing = await fetch(`${API}/crm/v3/properties/contacts/${prop.name}`, {
      headers: { Authorization: `Bearer ${token}` },
      signal: AbortSignal.timeout(12_000),
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
      body: JSON.stringify({ ...prop, groupName: "contactinformation" }),
      signal: AbortSignal.timeout(12_000),
    });
    if (created.status === 403) return false;
    if (!created.ok) {
      console.error("hubspot property create", created.status);
      throw new HubSpotFailure(statusMessage(created.status), created.status);
    }
  }
  return true;
}

async function findContact(token: string, email: string, phone: string) {
  const data = await hs<{ results: { id: string; properties: Record<string, string | null> }[] }>(
    token,
    "/crm/v3/objects/contacts/search",
    {
      method: "POST",
      body: JSON.stringify({
        filterGroups: [
          { filters: [{ propertyName: "email", operator: "EQ", value: email }] },
          { filters: [{ propertyName: "phone", operator: "EQ", value: phone }] },
        ],
        properties: ["email", "phone"],
        limit: 5,
      }),
    },
  );
  const byEmail = data.results.find((item) => item.properties.email?.toLowerCase() === email);
  if (byEmail) return { id: byEmail.id, email: byEmail.properties.email ?? "" };
  const byPhone = data.results.find((item) => item.properties.phone === phone);
  if (!byPhone) return null;
  return { id: byPhone.id, email: byPhone.properties.email ?? "" };
}

async function pipelineStages(token: string, pipelineId: string) {
  const data = await hs<{ results: { id: string; displayOrder: number; metadata?: { isClosed?: string | boolean } }[] }>(
    token,
    `/crm/v3/pipelines/deals/${encodeURIComponent(pipelineId)}/stages`,
  );
  const stages: PipelineStage[] = data.results.map((stage) => ({
    id: stage.id,
    displayOrder: stage.displayOrder,
    closed: stage.metadata?.isClosed === true || stage.metadata?.isClosed === "true",
  }));
  stages.sort((a, b) => a.displayOrder - b.displayOrder);
  return stages;
}

async function findOpenDeal(token: string, contactId: string, pipelineId: string, closed: Set<string>) {
  const links = await hs<{ results: { toObjectId: number | string }[] }>(
    token,
    `/crm/v4/objects/contacts/${contactId}/associations/deals`,
  );
  const ids = (links.results ?? []).map((item) => String(item.toObjectId));
  if (ids.length === 0) return null;
  const data = await hs<{ results: { id: string; properties: Record<string, string | null> }[] }>(
    token,
    "/crm/v3/objects/deals/batch/read",
    {
      method: "POST",
      body: JSON.stringify({
        properties: ["dealstage", "pipeline", "description", "createdate"],
        inputs: ids.map((id) => ({ id })),
      }),
    },
  );
  const open = data.results
    .filter((deal) => deal.properties.pipeline === pipelineId && !closed.has(deal.properties.dealstage ?? ""))
    .sort((a, b) => (b.properties.createdate ?? "").localeCompare(a.properties.createdate ?? ""));
  const deal = open[0];
  if (!deal) return null;
  const entry = deal.properties.description?.match(/^Entrada: (.+)$/m)?.[1];
  return { id: deal.id, entry };
}

async function createNote(token: string, contactId: string, dealId: string, body: string) {
  await hs(token, "/crm/v3/objects/notes", {
    method: "POST",
    body: JSON.stringify({
      properties: {
        hs_timestamp: new Date().toISOString(),
        hs_note_body: body,
      },
      associations: [
        {
          to: { id: contactId },
          types: [{ associationCategory: "HUBSPOT_DEFINED", associationTypeId: 202 }],
        },
        {
          to: { id: dealId },
          types: [{ associationCategory: "HUBSPOT_DEFINED", associationTypeId: 214 }],
        },
      ],
    }),
  });
}

function jsonHeaders(token: string) {
  return { Authorization: `Bearer ${token}`, "Content-Type": "application/json" };
}

async function hs<T>(token: string, path: string, init?: RequestInit): Promise<T> {
  let response: Response;
  try {
    response = await fetch(`${API}${path}`, {
      ...init,
      headers: jsonHeaders(token),
      signal: AbortSignal.timeout(12_000),
    });
  } catch {
    throw new HubSpotFailure("Não foi possível falar com o HubSpot agora. Nenhum lead foi confirmado.");
  }
  const text = await response.text();
  if (!response.ok) {
    console.error("hubspot", response.status, path.split("?")[0]);
    if (response.status === 400 && text.toLowerCase().includes("dealstage")) {
      throw new HubSpotFailure("A etapa do funil configurada não existe. O lead não entrou no funil.");
    }
    throw new HubSpotFailure(statusMessage(response.status), response.status);
  }
  if (!text) return {} as T;
  return JSON.parse(text) as T;
}

function authMessage() {
  return "A credencial do HubSpot foi recusada. O lead não foi registrado.";
}

function genericMessage() {
  return "O HubSpot não registrou o lead. Nada foi confirmado.";
}

function statusMessage(status: number) {
  if (status === 401 || status === 403) return authMessage();
  if (status === 404) return "O funil configurado não existe no HubSpot. O lead não foi registrado.";
  if (status === 429) return "O HubSpot limitou os envios agora. Tente de novo em alguns minutos.";
  return genericMessage();
}
