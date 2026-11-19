import { HttpError } from '../errors.js';
import { validPhone } from '../validation.js';

function splitName(name) {
  const parts = String(name || '').trim().split(/\s+/).filter(Boolean);
  return {
    firstName: parts.shift() || 'Customer',
    lastName: parts.join(' ') || 'Customer',
  };
}

export function buildShiprocketOrderPayload(order, pickupLocation) {
  if (!Array.isArray(order.items)) {
    throw new HttpError(500, 'Stored order items are invalid.');
  }

  const address = order.shippingAddress || order.address;
  const customer = order.customer || {
    name: order.customerName,
    email: order.email,
    phone: order.phone,
  };
  const pricing = order.pricing || order;
  const items = order.items;
  const { firstName, lastName } = splitName(customer.name);
  const phone = validPhone(customer.phone);
  const street = String(address?.street || '').trim();
  const billingAddress = street.length >= 10
    ? street
    : [street, address?.city, address?.state].filter(Boolean).join(', ');
  if (billingAddress.length < 10) {
    throw new HttpError(400, 'Enter a complete street address before placing the order.');
  }

  const orderDate = new Date(order.createdAt || Date.now());
  if (Number.isNaN(orderDate.valueOf())) {
    throw new HttpError(400, 'The order date is invalid.');
  }
  const packageWeightGrams = items.reduce((total, item) => {
    const units = Number(item.quantity ?? item.units ?? item.qty);
    const itemWeightGrams = Number(item.shippingWeightGrams) || 250;
    return total + itemWeightGrams * units;
  }, 0);

  return {
    order_id: String(order.orderNumber).replace(/^#/, ''),
    order_date: orderDate.toISOString().slice(0, 16).replace('T', ' '),
    pickup_location: pickupLocation,
    billing_customer_name: firstName,
    billing_last_name: lastName,
    billing_address: billingAddress,
    billing_city: address.city,
    billing_state: address.state,
    billing_pincode: address.pincode,
    billing_country: 'India',
    billing_email: customer.email,
    billing_phone: phone,
    shipping_is_billing: true,
    order_items: items.map((item) => ({
      name: item.name || item.title,
      sku: item.sku,
      units: Number(item.quantity ?? item.units ?? item.qty),
      selling_price: Number(item.price ?? item.selling_price),
      discount: 0,
      tax: 0,
      hsn: '',
    })),
    payment_method: (order.payment?.method || order.paymentMethod) === 'COD' ? 'COD' : 'Prepaid',
    shipping_charges: Number(pricing.shippingFee),
    giftwrap_charges: 0,
    transaction_charges: 0,
    total_discount: Number(pricing.discount),
    sub_total: Number(pricing.subtotal),
    length: 15,
    breadth: 12,
    height: 10,
    weight: Number(Math.max(0.25, packageWeightGrams / 1000).toFixed(3)),
  };
}
