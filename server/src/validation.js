import { HttpError } from './errors.js';

const INDIAN_STATES = new Map(
  [
    'Andhra Pradesh',
    'Arunachal Pradesh',
    'Assam',
    'Bihar',
    'Chhattisgarh',
    'Goa',
    'Gujarat',
    'Haryana',
    'Himachal Pradesh',
    'Jharkhand',
    'Karnataka',
    'Kerala',
    'Madhya Pradesh',
    'Maharashtra',
    'Manipur',
    'Meghalaya',
    'Mizoram',
    'Nagaland',
    'Odisha',
    'Punjab',
    'Rajasthan',
    'Sikkim',
    'Tamil Nadu',
    'Telangana',
    'Tripura',
    'Uttar Pradesh',
    'Uttarakhand',
    'West Bengal',
    'Andaman and Nicobar Islands',
    'Chandigarh',
    'Dadra and Nagar Haveli and Daman and Diu',
    'Delhi',
    'Jammu and Kashmir',
    'Ladakh',
    'Lakshadweep',
    'Puducherry',
  ].map((state) => [state.toLowerCase(), state])
);

export function requiredText(value, label, maxLength = 200) {
  if (typeof value !== 'string') throw new HttpError(400, `${label} is required.`);
  const normalized = value.trim();
  if (!normalized || normalized.length > maxLength) {
    throw new HttpError(400, `${label} must be between 1 and ${maxLength} characters.`);
  }
  return normalized;
}

export function optionalText(value, label, maxLength = 500) {
  if (value === undefined || value === null || value === '') return null;
  if (typeof value !== 'string' || value.trim().length > maxLength) {
    throw new HttpError(400, `${label} must be at most ${maxLength} characters.`);
  }
  return value.trim() || null;
}

export function validEmail(value) {
  const email = requiredText(value, 'Email', 254).toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new HttpError(400, 'Enter a valid email address.');
  }
  return email;
}

export function validPhone(value) {
  const phone = requiredText(value, 'Phone number', 20).replace(/[\s()-]/g, '');
  if (!/^(?:\+?91)?[6-9]\d{9}$/.test(phone)) {
    throw new HttpError(400, 'Enter a valid Indian mobile number.');
  }
  return phone.replace(/^\+?91/, '');
}

export function phoneMatches(storedPhone, expectedPhone) {
  try {
    return validPhone(String(storedPhone)) === expectedPhone;
  } catch {
    return false;
  }
}

export function validIndianState(value) {
  const state = requiredText(value, 'State', 100);
  const canonicalState = INDIAN_STATES.get(state.toLowerCase());
  if (!canonicalState) {
    throw new HttpError(400, 'Select a valid Indian state or union territory.');
  }
  return canonicalState;
}

export function validPincode(value) {
  const pincode = requiredText(value, 'Pincode', 6);
  if (!/^[1-9]\d{5}$/.test(pincode)) {
    throw new HttpError(400, 'Enter a valid 6-digit Indian pincode.');
  }
  return pincode;
}

export function parseAddress(address) {
  if (!address || typeof address !== 'object' || Array.isArray(address)) {
    throw new HttpError(400, 'A complete delivery address is required.');
  }

  return {
    street: requiredText(address.street || address.addressLine1, 'Street address', 300),
    city: requiredText(address.city, 'City', 100),
    state: validIndianState(address.state),
    pincode: validPincode(address.pincode || address.postalCode),
  };
}
