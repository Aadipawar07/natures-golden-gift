import test from 'node:test';
import assert from 'node:assert/strict';

process.env.VERCEL = '1';
process.env.NODE_ENV = 'production';
process.env.CLIENT_URL = 'https://store.example.com/';
process.env.CLIENT_ORIGINS = '';
process.env.PUBLIC_API_URL = 'https://api.example.com';
process.env.CASHFREE_RETURN_URL = 'https://store.example.com/checkout';

const { default: app } = await import('../index.js');
const { connectDB, disconnectDB, mongoose } = await import('../config/db.js');

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

test('MongoDB connections are reused across concurrent serverless requests', async () => {
  const originalConnect = mongoose.connect;
  let connectCount = 0;
  const connection = { host: 'test', name: 'test', readyState: 1 };
  mongoose.connect = async () => {
    connectCount += 1;
    await new Promise((resolve) => setTimeout(resolve, 10));
    return { connection };
  };

  try {
    const [first, second] = await Promise.all([
      connectDB('mongodb://unit-test'),
      connectDB('mongodb://unit-test'),
    ]);

    assert.strictEqual(first, connection);
    assert.strictEqual(second, connection);
    assert.strictEqual(await connectDB('mongodb://unit-test'), connection);
    assert.equal(connectCount, 1);
  } finally {
    await disconnectDB();
    mongoose.connect = originalConnect;
  }
});
