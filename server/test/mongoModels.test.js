import test from 'node:test';
import assert from 'node:assert/strict';
import Order from '../models/Order.js';
import Inquiry from '../models/Inquiry.js';
import { errorHandler } from '../src/errors.js';

test('Mongo order schema validates nested checkout and shipment data with timestamps', async () => {
  const order = new Order({
    orderNumber: 'HLD-8492',
    customer: {
      name: 'Example Customer',
      email: 'customer@example.com',
      phone: '9876543210',
    },
    shippingAddress: {
      street: '12 Park Road',
      city: 'Pune',
      state: 'Maharashtra',
      pincode: '411001',
    },
    items: [{
      productId: 'ngg-signature-turmeric',
      sku: 'ngg-signature-turmeric__250g',
      name: 'Pure Ground Turmeric',
      packSize: '250g',
      quantity: 1,
      price: 549,
      isSubscription: false,
    }],
    pricing: { subtotal: 549, discount: 0, shippingFee: 49, totalAmount: 598 },
    payment: { method: 'COD' },
  });

  await order.validate();
  assert.equal(order.payment.status, 'PENDING');
  assert.equal(order.shipment.status, 'PROCESSING');
  assert.equal(Order.schema.options.timestamps, true);
  assert.equal(Order.schema.path('orderNumber').options.unique, true);
});

test('Mongo inquiry schema accepts support types and rejects invalid types', async () => {
  const inquiry = new Inquiry({
    ticketId: 'SUP-5120',
    type: 'CONTACT_SUPPORT',
    name: 'Example Customer',
    email: 'customer@example.com',
    message: 'Please help with my order.',
  });

  await inquiry.validate();
  assert.equal(Inquiry.schema.options.timestamps, true);
  const invalidInquiry = new Inquiry({
    ticketId: 'BAD-0001',
    type: 'OTHER',
    name: 'Example Customer',
    email: 'customer@example.com',
    message: 'Question',
  });
  await assert.rejects(invalidInquiry.validate(), (error) => Boolean(error.errors.type));
});

test('Mongo order validation reports the exact missing item field', async () => {
  const order = new Order({
    orderNumber: 'HLD-8493',
    customer: {
      name: 'Example Customer',
      email: 'customer@example.com',
      phone: '9876543210',
    },
    shippingAddress: {
      street: '12 Park Road',
      city: 'Pune',
      state: 'Maharashtra',
      pincode: '411001',
    },
    items: [{
      sku: 'ngg-signature-turmeric__250g',
      name: 'Pure Ground Turmeric',
      packSize: '250g',
      quantity: 1,
      price: 549,
    }],
    pricing: { subtotal: 549, discount: 0, shippingFee: 49, totalAmount: 598 },
    payment: { method: 'COD' },
  });
  const error = await order.validate().then(() => null, (validationError) => validationError);
  const response = {
    headersSent: false,
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(body) {
      this.body = body;
    },
  };

  assert.ok(error);
  errorHandler(error, { method: 'POST', path: '/api/orders/checkout' }, response, () => {});
  assert.equal(response.statusCode, 400);
  assert.equal(response.body.error, 'Invalid data: productId is required.');
});
