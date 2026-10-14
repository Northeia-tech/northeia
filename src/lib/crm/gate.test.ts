import assert from "node:assert/strict";
import test from "node:test";
import { normalizePhone, spamReason } from "./phone.ts";
import { hubspotConfigured, rateLimited } from "./gate.ts";

test("normalizePhone adds Brazil code to local numbers", () => {
  assert.equal(normalizePhone("(81) 98888-7777"), "+5581988887777");
  assert.equal(normalizePhone("+55 81 98888-7777"), "+5581988887777");
});

test("spam honeypot and fast submit are rejected", () => {
  const now = 10_000;
  assert.equal(spamReason({ website: "http://spam.test", startedAt: now - 5_000 }, now), "honeypot");
  assert.equal(spamReason({ website: "", startedAt: now - 200 }, now), "fast");
  assert.equal(spamReason({ website: "", startedAt: now - 5_000 }, now), null);
});

test("missing HubSpot token is not treated as configured", () => {
  const previous = process.env.HUBSPOT_ACCESS_TOKEN;
  delete process.env.HUBSPOT_ACCESS_TOKEN;
  assert.equal(hubspotConfigured(), false);
  if (previous) process.env.HUBSPOT_ACCESS_TOKEN = previous;
});

test("rate limit blocks the sixth hit", () => {
  const ip = `test-${Date.now()}`;
  for (let i = 0; i < 5; i += 1) assert.equal(rateLimited(ip, 1_000 + i), false);
  assert.equal(rateLimited(ip, 1_010), true);
});
