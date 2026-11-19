import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateCart } from '../src/catalog.js';

test('cart totals use catalog prices rather than client-supplied prices', () => {
  const result = calculateCart([
    {
      sku: 'collection-heirloom-powder__250g',
      qty: 2,
      price: 1,
      title: 'Forged client title',
    },
  ]);

  assert.equal(result.subtotal, 1098);
  assert.equal(result.shippingFee, 0);
  assert.equal(result.totalAmount, 1098);
  assert.equal(result.items[0].price, 549);
  assert.equal(result.items[0].title, 'Heirloom Everyday Haldi Powder');
  assert.equal(result.items[0].productId, 'collection-heirloom-powder');
  assert.equal(result.items[0].variantId, '250g');
});

test('coupon, subscription price, and shipping are recalculated server-side', () => {
  const result = calculateCart([
    {
      productId: 'ngg-signature-turmeric',
      variantId: '100g',
      quantity: 1,
      purchaseType: 'subscribe',
    },
  ], 'PURE10');

  assert.equal(result.items[0].price, 219);
  assert.equal(result.subtotal, 219);
  assert.equal(result.discount, 22);
  assert.equal(result.shippingFee, 49);
  assert.equal(result.totalAmount, 246);
});

test('legacy cart item keys resolve to a trusted catalog SKU', () => {
  const result = calculateCart([
    {
      key: 'sample-crushed-black-pepper__pepper-50g__one-time',
      quantity: 1,
    },
  ]);

  assert.equal(result.items[0].sku, 'sample-crushed-black-pepper__pepper-50g');
  assert.equal(result.items[0].productId, 'sample-crushed-black-pepper');
  assert.equal(result.items[0].variantId, 'pepper-50g');
  assert.equal(result.totalAmount, 198);
});

test('unknown products, empty carts, and invalid quantities are rejected', () => {
  assert.throws(() => calculateCart([]), /between 1 and 50/);
  assert.throws(() => calculateCart([{ sku: 'untrusted__sku', qty: 1 }]), /Unknown cart item/);
  assert.throws(
    () => calculateCart([{ sku: 'collection-heirloom-powder__250g', qty: 1.5 }]),
    /quantity must be an integer/
  );
});
