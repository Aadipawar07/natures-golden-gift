import { createHmac, timingSafeEqual } from 'node:crypto';

const MAX_WEBHOOK_AGE_MS = 15 * 60 * 1000;

export function verifyCashfreeSignature({
  rawBody,
  signature,
  timestamp,
  secret,
  now = Date.now(),
}) {
  if (!Buffer.isBuffer(rawBody) || !signature || !timestamp || !secret) return false;

  const timestampNumber = Number(timestamp);
  if (!Number.isFinite(timestampNumber)) return false;
  const timestampMs = timestampNumber < 1e12 ? timestampNumber * 1000 : timestampNumber;
  if (Math.abs(now - timestampMs) > MAX_WEBHOOK_AGE_MS) return false;

  const expected = createHmac('sha256', secret)
    .update(Buffer.concat([Buffer.from(String(timestamp)), rawBody]))
    .digest();
  let actual;
  try {
    actual = Buffer.from(signature, 'base64');
  } catch {
    return false;
  }
  return actual.length === expected.length && timingSafeEqual(actual, expected);
}

export function verifySharedToken(expectedToken, receivedToken) {
  if (!expectedToken || !receivedToken) return false;
  const expected = Buffer.from(expectedToken);
  const received = Buffer.from(receivedToken);
  return expected.length === received.length && timingSafeEqual(expected, received);
}
