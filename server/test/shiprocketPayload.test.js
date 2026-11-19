import test from 'node:test';
import assert from 'node:assert/strict';
import { buildShiprocketOrderPayload } from '../src/services/shiprocketPayload.js';

const baseOrder = {
  orderNumber: '#HLD-8492',
  createdAt: new Date('2026-11-19T06:00:00.000Z'),
  customerName: 'Aadi',
  email: 'aadi@example.com',
  phone: '+91 98765-43210',
  address: {
    street: '12 Park',
    city: 'Pune',
    state: 'Maharashtra',
    pincode: '411001',
  },
  items: [{
    sku: 'haldi-250',
    name: 'Everyday Haldi',
    packSize: '250g',
    units: 1,
    selling_price: 549,
    shippingWeightGrams: 300,
  }],
  subtotal: 549,
  discount: 0,
  shippingFee: 49,
  totalAmount: 598,
  paymentMethod: 'COD',
};

test('Shiprocket order payload normalizes required customer, address, item, and package fields', () => {
  const payload = buildShiprocketOrderPayload(baseOrder, 'Primary');

  assert.equal(payload.order_id, 'HLD-8492');
  assert.match(payload.order_date, /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/);
  assert.equal(payload.pickup_location, 'Primary');
  assert.equal(payload.billing_customer_name, 'Aadi');
  assert.equal(payload.billing_last_name, 'Customer');
  assert.equal(payload.billing_address, '12 Park, Pune, Maharashtra');
  assert.equal(payload.billing_phone, '9876543210');
  assert.equal(payload.payment_method, 'COD');
  assert.equal(payload.order_items[0].name, 'Everyday Haldi');
  assert.equal(payload.order_items[0].units, 1);
  assert.equal(payload.order_items[0].selling_price, 549);
  assert.equal(payload.weight, 0.3);
  assert.deepEqual([payload.length, payload.breadth, payload.height], [15, 12, 10]);
});

test('Shiprocket order payload uses a real surname and enforces the minimum package weight', () => {
  const payload = buildShiprocketOrderPayload({
    ...baseOrder,
    customerName: 'Aadi Kumar',
    paymentMethod: 'PREPAID',
    items: [{ ...baseOrder.items[0], shippingWeightGrams: 100 }],
  }, 'Primary');

  assert.equal(payload.billing_customer_name, 'Aadi');
  assert.equal(payload.billing_last_name, 'Kumar');
  assert.equal(payload.payment_method, 'Prepaid');
  assert.equal(payload.weight, 0.25);
});
