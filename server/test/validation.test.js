import test from 'node:test';
import assert from 'node:assert/strict';
import { phoneMatches, validIndianState, validPhone, validPincode } from '../src/validation.js';

test('Indian mobile numbers normalize to ten digits and match stored legacy numbers', () => {
  assert.equal(validPhone('9876543210'), '9876543210');
  assert.equal(validPhone('+91 98765-43210'), '9876543210');
  assert.equal(validPhone('(+91) 987-654-3210'), '9876543210');
  assert.equal(phoneMatches('+919876543210', '9876543210'), true);
  assert.throws(() => validPhone('12345'), /valid Indian mobile number/);
});

test('pincodes must be six digits and cannot start with zero', () => {
  assert.equal(validPincode('400001'), '400001');
  assert.throws(() => validPincode('000000'), /valid 6-digit/);
});

test('state names normalize to canonical Indian state and union territory names', () => {
  assert.equal(validIndianState('maharashtra'), 'Maharashtra');
  assert.equal(validIndianState('Dadra and Nagar Haveli and Daman and Diu'), 'Dadra and Nagar Haveli and Daman and Diu');
  assert.throws(() => validIndianState('California'), /valid Indian state/);
});
