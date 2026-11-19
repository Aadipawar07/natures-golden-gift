import test from 'node:test';
import assert from 'node:assert/strict';
import { parseShiprocketOrderResponse } from '../src/services/shiprocketService.js';

test('Shiprocket order response parser accepts documented flat responses', () => {
  assert.deepEqual(
    parseShiprocketOrderResponse({
      order_id: 16161616,
      shipment_id: 15151515,
      status: 'NEW',
      status_code: 1,
      awb_code: null,
      courier_name: null,
    }),
    {
      orderId: '16161616',
      shipmentId: 15151515,
      awbCode: null,
      courierName: null,
    }
  );
});

test('Shiprocket order response parser accepts a nested data envelope', () => {
  assert.deepEqual(
    parseShiprocketOrderResponse({
      data: {
        order_id: 16161616,
        shipment_id: 15151515,
        awb_code: '1234567890',
        courier_name: 'Courier',
      },
    }),
    {
      orderId: '16161616',
      shipmentId: 15151515,
      awbCode: '1234567890',
      courierName: 'Courier',
    }
  );
});

test('Shiprocket order response parser surfaces provider rejection details', () => {
  assert.throws(
    () => parseShiprocketOrderResponse({
      message: 'Pickup location is invalid',
      status_code: 400,
    }),
    /Shiprocket rejected the order: Pickup location is invalid/
  );
});

test('Shiprocket order response parser rejects incomplete responses with a useful message', () => {
  assert.throws(
    () => parseShiprocketOrderResponse({ message: 'Order ID already exists' }),
    /Shiprocket did not confirm the order: Order ID already exists/
  );
});
