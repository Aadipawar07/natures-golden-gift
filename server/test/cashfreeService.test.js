import assert from 'node:assert/strict';
import test from 'node:test';
import axios from 'axios';

process.env.CASHFREE_ENV = 'SANDBOX';
process.env.CASHFREE_APP_ID = 'unit-cashfree-app';
process.env.CASHFREE_SECRET_KEY = 'unit-cashfree-secret';

const { createCashfreeOrder } = await import('../src/services/cashfreeService.js');

test('Cashfree order failures log safe provider diagnostics and keep the client error generic', async () => {
  const originalPost = axios.post;
  const originalConsoleError = console.error;
  let logArguments;
  axios.post = async () => {
    const error = new Error('Cashfree rejected the request.');
    error.response = {
      status: 401,
      data: {
        code: 'authentication_failed',
        type: 'authentication_error',
        message: 'Rejected unit-cashfree-app unit-cashfree-secret',
      },
    };
    throw error;
  };
  console.error = (...args) => {
    logArguments = args;
  };

  try {
    await assert.rejects(
      createCashfreeOrder({
        _id: 'order-doc',
        id: 'customer-id',
        orderNumber: '#HLD-1234',
        pricing: { totalAmount: 500 },
        customer: {
          name: 'Test Customer',
          email: 'customer@example.com',
          phone: '9876543210',
        },
      }),
      (error) => error.status === 502 &&
        error.message === 'Could not create a Cashfree checkout session.'
    );

    assert.equal(logArguments[0], '[cashfree] order creation failed.');
    assert.equal(logArguments[1].status, 401);
    assert.equal(logArguments[1].code, 'authentication_failed');
    assert.equal(logArguments[1].type, 'authentication_error');
    assert.equal(logArguments[1].message, 'Rejected [redacted] [redacted]');
  } finally {
    axios.post = originalPost;
    console.error = originalConsoleError;
  }
});
