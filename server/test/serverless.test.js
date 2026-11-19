import test from 'node:test';
import assert from 'node:assert/strict';
import { createHmac } from 'node:crypto';

process.env.VERCEL = '1';
process.env.NODE_ENV = 'production';
process.env.CLIENT_URL = 'https://store.example.com/';
process.env.CLIENT_ORIGINS = '';
process.env.PUBLIC_API_URL = 'https://api.example.com';
process.env.CASHFREE_RETURN_URL = 'https://store.example.com/checkout';
process.env.CASHFREE_SECRET_KEY = 'unit-cashfree-webhook-secret';
process.env.SHIPROCKET_WEBHOOK_TOKEN = 'unit-shiprocket-webhook-token';

const { default: app } = await import('../index.js');
const { connectDB, disconnectDB, mongoose } = await import('../config/db.js');
const Order = (await import('../models/Order.js')).default;

test('serverless entry exports the Express app and allows configured CORS origins', async (t) => {
  const server = app.listen(0);
  t.after(() => new Promise((resolve, reject) => {
    server.close((error) => (error ? reject(error) : resolve()));
  }));

  const address = server.address();
  const url = `http://127.0.0.1:${address.port}/api/orders/checkout`;
  for (const origin of ['http://localhost:5173', 'https://store.example.com']) {
    const response = await fetch(url, {
      method: 'OPTIONS',
      headers: {
        Origin: origin,
        'Access-Control-Request-Method': 'POST',
      },
    });

    assert.equal(response.status, 204);
    assert.equal(response.headers.get('access-control-allow-origin'), origin);
  }
});

test('webhook probes and test pings return 200 without connecting to MongoDB', async (t) => {
  const originalConnect = mongoose.connect;
  let connectCount = 0;
  mongoose.connect = async () => {
    connectCount += 1;
    throw new Error('Webhook probes must not connect to MongoDB.');
  };
  const server = app.listen(0);
  t.after(async () => {
    await new Promise((resolve, reject) => {
      server.close((error) => (error ? reject(error) : resolve()));
    });
    await disconnectDB();
    mongoose.connect = originalConnect;
  });

  const baseUrl = `http://127.0.0.1:${server.address().port}`;
  const webhookPaths = [
    '/api/webhooks/cashfree',
    '/webhooks/cashfree',
    '/api/webhooks/shiprocket',
    '/api/webhooks/courier-updates',
  ];
  for (const webhookPath of webhookPaths) {
    for (const method of ['GET', 'HEAD']) {
      const response = await fetch(`${baseUrl}${webhookPath}`, { method });
      assert.equal(response.status, 200);
      if (method === 'GET') assert.deepEqual(await response.json(), { ok: true });
      else assert.equal(await response.text(), '');
    }
  }

  const post = (webhookPath, body) => fetch(`${baseUrl}${webhookPath}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body,
  });
  for (const body of [
    '',
    '{}',
    '{"type":"TEST"}',
    '{"type":"PAYMENT","data":{}}',
    '{"data":{"order":{"order_id":"order_test_dashboard"}}}',
  ]) {
    const response = await post('/api/webhooks/cashfree', body);
    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), {
      ok: true,
      message: 'Webhook test acknowledged',
    });
  }

  for (const webhookPath of ['/api/webhooks/shiprocket', '/api/webhooks/courier-updates']) {
    for (const body of [
      '',
      '{}',
      '{"test":"dashboard"}',
      JSON.stringify({
        awb: 59629792084,
        current_status: 'Delivered',
        order_id: '13905312',
        channel_order_id: 'enter your channel order id',
        channel: 'enter your channel name',
        courier_name: 'enter courier_name',
      }),
    ]) {
      const response = await post(webhookPath, body);
      assert.equal(response.status, 200);
      assert.deepEqual(await response.json(), { ok: true });
    }
  }
  assert.equal(connectCount, 0);
});

test('Cashfree acknowledges unknown IDs but requires signatures for stored orders', async (t) => {
  const originalConnect = mongoose.connect;
  const originalFindOne = Order.findOne;
  const originalFindOneAndUpdate = Order.findOneAndUpdate;
  const originalFindById = Order.findById;
  let connectCount = 0;
  let paymentUpdate;
  const existingOrder = {
    _id: 'known-order-doc',
    pricing: { totalAmount: 500 },
    shipment: { shiprocketOrderId: 'already-booked' },
  };
  mongoose.connect = async () => {
    connectCount += 1;
    return { connection: { host: 'test', name: 'test', readyState: 1 } };
  };
  Order.findOne = (query) => ({
    exec: async () => query['payment.cashfreeOrderId'] === 'known-order-123'
      ? existingOrder
      : null,
  });
  Order.findOneAndUpdate = (query, update) => {
    paymentUpdate = update;
    return { exec: async () => ({}) };
  };
  Order.findById = () => ({
    exec: async () => ({
      ...existingOrder,
      payment: { status: 'PAID' },
    }),
  });
  const server = app.listen(0);
  t.after(async () => {
    await new Promise((resolve, reject) => {
      server.close((error) => (error ? reject(error) : resolve()));
    });
    await disconnectDB();
    mongoose.connect = originalConnect;
    Order.findOne = originalFindOne;
    Order.findOneAndUpdate = originalFindOneAndUpdate;
    Order.findById = originalFindById;
  });

  const baseUrl = `http://127.0.0.1:${server.address().port}/api/webhooks`;
  const makeCashfreeBody = (orderId) => Buffer.from(JSON.stringify({
    type: 'PAYMENT_FAILED_WEBHOOK',
    data: { order: { order_id: orderId, order_amount: 500 } },
  }));
  const unknownOrderResponse = await fetch(`${baseUrl}/cashfree`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: makeCashfreeBody('unknown-order-123'),
  });
  assert.equal(unknownOrderResponse.status, 200);
  assert.deepEqual(await unknownOrderResponse.json(), {
    ok: true,
    message: 'Webhook test acknowledged',
  });

  const knownOrderBody = makeCashfreeBody('known-order-123');
  const unsignedResponse = await fetch(`${baseUrl}/cashfree`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: knownOrderBody,
  });
  assert.equal(unsignedResponse.status, 401);

  const successBody = Buffer.from(JSON.stringify({
    type: 'PAYMENT_SUCCESS_WEBHOOK',
    data: {
      order: { order_id: 'known-order-123', order_amount: 500 },
      payment: { payment_status: 'SUCCESS', cf_payment_id: 'payment-123' },
    },
  }));
  const timestamp = String(Math.floor(Date.now() / 1000));
  const signature = createHmac('sha256', process.env.CASHFREE_SECRET_KEY)
    .update(Buffer.concat([Buffer.from(timestamp), successBody]))
    .digest('base64');
  const cashfreeResponse = await fetch(`${baseUrl}/cashfree`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-webhook-signature': signature,
      'x-webhook-timestamp': timestamp,
    },
    body: successBody,
  });
  assert.equal(cashfreeResponse.status, 200);
  assert.deepEqual(await cashfreeResponse.json(), { received: true, updated: true });
  assert.equal(paymentUpdate.$set['payment.status'], 'PAID');
  assert.equal(paymentUpdate.$set.status, 'CONFIRMED');

  const shiprocketResponse = await fetch(
    `http://127.0.0.1:${server.address().port}/api/webhooks/courier-updates`,
    {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.SHIPROCKET_WEBHOOK_TOKEN,
    },
    body: JSON.stringify({ order_id: 'unmatched-123' }),
    }
  );
  assert.equal(shiprocketResponse.status, 200);
  assert.deepEqual(await shiprocketResponse.json(), { ok: true });
  assert.equal(connectCount, 1);
});

test('MongoDB connections are reused across concurrent serverless requests', async () => {
  const originalConnect = mongoose.connect;
  let connectCount = 0;
  let connectOptions;
  const connection = { host: 'test', name: 'test', readyState: 1 };
  mongoose.connect = async (uri, options) => {
    connectCount += 1;
    connectOptions = { uri, options };
    await new Promise((resolve) => setTimeout(resolve, 10));
    return { connection };
  };

  try {
    const [first, second] = await Promise.all([
      connectDB('  "mongodb://unit-test"  '),
      connectDB('  "mongodb://unit-test"  '),
    ]);

    assert.strictEqual(first, connection);
    assert.strictEqual(second, connection);
    assert.strictEqual(await connectDB('  "mongodb://unit-test"  '), connection);
    assert.equal(connectCount, 1);
    assert.equal(connectOptions.uri, 'mongodb://unit-test');
    assert.equal(connectOptions.options.family, 4);
    assert.equal(connectOptions.options.serverSelectionTimeoutMS, 10000);
  } finally {
    await disconnectDB();
    mongoose.connect = originalConnect;
  }
});
