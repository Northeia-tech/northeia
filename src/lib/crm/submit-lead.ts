import { createServerFn } from "@tanstack/react-start";
import type { LeadInput } from "@/lib/lead";

export const submitLead = createServerFn({ method: "POST" })
  .validator((data: LeadInput) => data)
  .handler(async ({ data }) => {
    const { getRequest } = await import("@tanstack/react-start/server");
    const { ingestLead } = await import("./ingest.server");
    const forwarded = getRequest().headers.get("x-forwarded-for") ?? "";
    const ip = forwarded.split(",")[0]?.trim() || "local";
    return ingestLead(data, ip);
  });
