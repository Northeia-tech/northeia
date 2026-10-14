const WINDOW_MS = 10 * 60 * 1000;
const MAX_HITS = 5;
const hits = new Map<string, number[]>();

export function rateLimited(ip: string, now = Date.now()) {
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

export function hubspotConfigured() {
  return Boolean(process.env.HUBSPOT_ACCESS_TOKEN?.trim());
}
