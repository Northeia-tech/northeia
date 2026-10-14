import { challengeLabel } from "@/data/content";
import { leadSchema, RATE_MESSAGE, SPAM_MESSAGE, UNCONFIGURED_MESSAGE } from "@/lib/lead";
import { spamReason } from "@/lib/crm/phone";
import { hubspotConfigured, rateLimited } from "./gate";
import { HubSpotFailure, notifyWebhook, recordLead } from "./hubspot.server";

export type SubmitResult =
  | {
      ok: true;
      contactAction: "created" | "updated";
      dealAction: "created" | "updated";
      enteredAt: string;
    }
  | { ok: false; message: string; fields?: Record<string, string> };

export async function ingestLead(raw: unknown, ip: string): Promise<SubmitResult> {
  const parsed = leadSchema.safeParse(raw);
  if (!parsed.success) {
    const fields: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0];
      if (typeof key === "string" && !fields[key]) fields[key] = issue.message;
    }
    return { ok: false, message: "Revise os campos marcados. O lead não foi enviado.", fields };
  }

  if (spamReason(parsed.data)) return { ok: false, message: SPAM_MESSAGE };
  if (rateLimited(ip)) return { ok: false, message: RATE_MESSAGE };
  if (!hubspotConfigured()) return { ok: false, message: UNCONFIGURED_MESSAGE };

  const enteredAt = new Date().toISOString();
  try {
    const receipt = await recordLead(
      { ...parsed.data, challengeLabel: challengeLabel(parsed.data.challenge) },
      enteredAt,
    );
    await notifyWebhook(receipt, parsed.data);
    return {
      ok: true,
      contactAction: receipt.contactAction,
      dealAction: receipt.dealAction,
      enteredAt: receipt.enteredAt,
    };
  } catch (error) {
    if (error instanceof HubSpotFailure) return { ok: false, message: error.publicMessage };
    console.error("lead ingest failed");
    return { ok: false, message: "O HubSpot não registrou o lead. Nada foi confirmado." };
  }
}
