export function validateIndianPincode(pin) {
  const cleaned = (pin || '').trim();
  if (!/^[1-9][0-9]{5}$/.test(cleaned)) {
    return {
      valid: false,
      message: 'Please enter a valid 6-digit Indian PIN code (e.g., 400001).',
    };
  }

  return {
    valid: true,
    pincode: cleaned,
    message: `PIN ${cleaned} is serviceable (Demo Check). Live courier delivery estimates will connect here once logistics APIs are integrated.`,
  };
}
