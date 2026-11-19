import test from 'node:test';
import assert from 'node:assert/strict';
import { createHmac } from 'node:crypto';
import {
  verifyCashfreeSignature,
  verifySharedToken,
} from '../src/services/webhookSecurity.js';

test('Cashfree webhook verification binds timestamp and exact raw body', () => {
  const rawBody = Buffer.from('{"type":"PAYMENT_SUCCESS_WEBHOOK"}');
  const secret = 'local-test-secret';
  const timestamp = String(Math.floor(Date.now() / 1000));
  const signature = createHmac('sha256', secret)
    .update(Buffer.concat([Buffer.from(timestamp), rawBody]))
    .digest('base64');

  assert.equal(
    verifyCashfreeSignature({ rawBody, signature, timestamp, secret }),
    true
  );
  assert.equal(
    verifyCashfreeSignature({
      rawBody: Buffer.from(`${rawBody.toString()} `),
      signature,
      timestamp,
      secret,
    }),
    false
  );
});

test('Cashfree rejects stale signatures and Shiprocket tokens compare securely', () => {
  const rawBody = Buffer.from('{}');
  const timestamp = '1000';
  const secret = 'local-test-secret';
  const signature = createHmac('sha256', secret)
    .update(Buffer.concat([Buffer.from(timestamp), rawBody]))
    .digest('base64');

  assert.equal(
    verifyCashfreeSignature({
      rawBody,
      signature,
      timestamp,
      secret,
      now: 10_000_000,
    }),
    false
  );
  assert.equal(verifySharedToken('configured-token', 'configured-token'), true);
  assert.equal(verifySharedToken('configured-token', 'wrong-token'), false);
});
