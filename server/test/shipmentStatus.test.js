import test from 'node:test';
import assert from 'node:assert/strict';

const {
  estimatedDeliveryDays,
  mapShipmentStatus,
} = await import('../src/services/shiprocketService.js');

test('Shiprocket milestones normalize without treating undelivered as delivered', () => {
  assert.equal(mapShipmentStatus('PACKED'), 'PACKED');
  assert.equal(mapShipmentStatus('IN TRANSIT'), 'IN_TRANSIT');
  assert.equal(mapShipmentStatus('DELIVERED'), 'DELIVERED');
  assert.equal(mapShipmentStatus('UNDELIVERED'), 'IN_TRANSIT');
  assert.equal(mapShipmentStatus('CANCELLED'), 'CANCELLED');
});

test('Shiprocket delivery estimates handle day counts and ETD date strings', () => {
  assert.equal(estimatedDeliveryDays({ estimated_delivery_days: 3 }), 3);
  assert.equal(estimatedDeliveryDays({ etd: '5 days' }), 5);
  assert.equal(
    estimatedDeliveryDays({ etd: new Date(Date.now() + 4 * 86_400_000).toISOString() }),
    4
  );
  assert.equal(estimatedDeliveryDays({ etd: 'unknown' }), null);
});
