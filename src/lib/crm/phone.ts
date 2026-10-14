export function phoneDigits(value: string) {
  return value.replace(/\D/g, "");
}

export function isPhone(value: string) {
  const digits = phoneDigits(value);
  return digits.length >= 10 && digits.length <= 15;
}

/** E.164. Números com 10 ou 11 dígitos ganham o DDI 55. */
export function normalizePhone(value: string) {
  let digits = phoneDigits(value);
  if ((digits.length === 10 || digits.length === 11) && !digits.startsWith("55")) {
    digits = `55${digits}`;
  }
  return `+${digits}`;
}

export function splitName(name: string) {
  const parts = name.trim().split(/\s+/);
  return {
    firstname: parts[0] ?? "",
    lastname: parts.slice(1).join(" "),
  };
}

const MIN_FILL_MS = 1500;
const MAX_AGE_MS = 24 * 60 * 60 * 1000;

export function spamReason(input: { website: string; startedAt: number }, now = Date.now()) {
  if (input.website.trim() !== "") return "honeypot" as const;
  if (input.startedAt > now + 5_000) return "clock" as const;
  if (now - input.startedAt < MIN_FILL_MS) return "fast" as const;
  if (now - input.startedAt > MAX_AGE_MS) return "stale" as const;
  return null;
}
