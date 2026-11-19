import { createHash, randomInt } from 'node:crypto';
import express from 'express';
import { connectDB } from '../../config/db.js';
import Order from '../../models/Order.js';
import { calculateCart } from '../catalog.js';
import { config } from '../config.js';
import { asyncRoute, HttpError } from '../errors.js';
import {
  optionalText,
  parseAddress,
  phoneMatches,
  requiredText,
  validEmail,
  validPhone,
} from '../validation.js';
import {
  createCashfreeOrder,
  fetchCashfreeOrderStatus,
} from '../services/cashfreeService.js';
import { createShiprocketOrder } from '../services/shiprocketService.js';
import { verifyCashfreeSignature } from '../services/webhookSecurity.js';

const router = express.Router();
const webhookRouter = express.Router();

function webhookProbe(req, res) {
  res.status(200).json({ ok: true });
}

function normalizeCheckout(body, idempotencyKey) {
  const customer = body.customer && typeof body.customer === 'object' ? body.customer : body;
  const customerName = requiredText(
    body.customerName || customer.name,
    'Customer name',
    120
  );
  const email = validEmail(body.email || customer.email);
  const phone = validPhone(body.phone || customer.phone);
  const address = parseAddress(body.address);
  address.landmark = optionalText(body.address?.landmark, 'Landmark', 160) || '';
  const paymentMethod = body.paymentMethod;
  if (!['PREPAID', 'COD'].includes(paymentMethod)) {
    throw new HttpError(400, 'paymentMethod must be PREPAID or COD.');
  }
  const couponCode = optionalText(body.couponCode, 'Coupon code', 32) || '';
  let pricing;
  try {
    pricing = calculateCart(body.items, couponCode);
  } catch (error) {
    throw new HttpError(400, error.message);
  }

  const fingerprint = createHash('sha256')
    .update(JSON.stringify({
      customerName,
      email,
      phone,
      address,
      paymentMethod,
      couponCode: couponCode.toUpperCase(),
      items: pricing.items,
      subtotal: pricing.subtotal,
      discount: pricing.discount,
      shippingFee: pricing.shippingFee,
      totalAmount: pricing.totalAmount,
    }))
    .digest('hex');

  return {
    customerName,
    email,
    phone,
    address,
    paymentMethod,
    couponCode,
    pricing,
    fingerprint,
    idempotencyKey,
  };
}

function newOrderNumber() {
  return `HLD-${randomInt(1000, 10000)}`;
}

function orderNumberLookup(value) {
  const normalized = requiredText(value, 'Order number', 40).replace(/^#/, '');
  if (!/^[A-Za-z0-9-]{4,40}$/.test(normalized)) {
    throw new HttpError(400, 'Enter a valid order number.');
  }
  return new RegExp(`^#?${normalized}$`, 'i');
}

async function findOrCreateOrder(input) {
  if (input.idempotencyKey) {
    const existing = await Order.findOne({ idempotencyKey: input.idempotencyKey }).exec();
    if (existing) {
      if (existing.requestFingerprint !== input.fingerprint) {
        throw new HttpError(409, 'Idempotency-Key was already used for a different order.');
      }
      return { order: existing, created: false };
    }
  }

  const itemRows = input.pricing.items.map((item) => ({
    productId: item.productId,
    sku: item.sku,
    name: item.title,
    packSize: item.packSize,
    quantity: item.qty,
    price: item.price,
    isSubscription: item.purchaseType === 'subscribe',
    shippingWeightGrams: item.shippingWeightGrams,
  }));
  const orderNumber = newOrderNumber();
  const data = {
    orderNumber,
    ...(input.idempotencyKey ? { idempotencyKey: input.idempotencyKey } : {}),
    requestFingerprint: input.fingerprint,
    customer: {
      name: input.customerName,
      email: input.email,
      phone: input.phone,
    },
    shippingAddress: input.address,
    items: itemRows,
    pricing: {
      subtotal: input.pricing.subtotal,
      discount: input.pricing.discount,
      shippingFee: input.pricing.shippingFee,
      totalAmount: input.pricing.totalAmount,
      couponCode: input.couponCode,
    },
    payment: {
      method: input.paymentMethod,
      status: 'PENDING',
      ...(input.paymentMethod === 'PREPAID'
        ? { cashfreeOrderId: orderNumber.replace(/^#/, '') }
        : {}),
    },
    status: input.paymentMethod === 'COD' ? 'CONFIRMED' : 'PENDING',
    shipment: {},
    shipmentSyncStatus: 'PENDING',
  };

  for (let attempt = 0; attempt < 8; attempt += 1) {
    try {
      return {
        order: await Order.create(data),
        created: true,
      };
    } catch (error) {
      if (error.code !== 11000) throw error;
      if (input.idempotencyKey) {
        const existing = await Order.findOne({ idempotencyKey: input.idempotencyKey }).exec();
        if (existing) {
          if (existing.requestFingerprint !== input.fingerprint) {
            throw new HttpError(409, 'Idempotency-Key was already used for a different order.');
          }
          return { order: existing, created: false };
        }
      }
      data.orderNumber = newOrderNumber();
      if (data.payment.method === 'PREPAID') {
        data.payment.cashfreeOrderId = data.orderNumber.replace(/^#/, '');
      }
    }
  }

  throw new HttpError(503, 'Could not allocate a unique order number. Please retry.');
}

function parseIdempotencyKey(req) {
  const key = req.get('Idempotency-Key') || req.body?.idempotencyKey;
  if (!key) return null;
  const normalized = requiredText(key, 'Idempotency-Key', 128);
  if (!/^[A-Za-z0-9._:-]{8,128}$/.test(normalized)) {
    throw new HttpError(400, 'Idempotency-Key must be 8–128 letters, digits, or . _ : - characters.');
  }
  return normalized;
}

function checkoutResponse(order, extra = {}) {
  const payment = order.payment || {};
  const shipment = order.shipment || {};
  const pricing = order.pricing || {};
  return {
    success: true,
    orderNumber: order.orderNumber,
    status: order.status,
    orderStatus: order.status,
    paymentStatus: payment.status,
    paymentMethod: payment.method,
    subtotal: pricing.subtotal,
    discount: pricing.discount,
    shippingFee: pricing.shippingFee,
    totalAmount: pricing.totalAmount,
    shipmentStatus: shipment.status,
    shipmentSyncStatus: order.shipmentSyncStatus,
    shiprocketOrderId: shipment.shiprocketOrderId,
    shiprocketShipmentId: shipment.shiprocketShipmentId,
    awbCode: shipment.awbCode,
    courierName: shipment.courierName,
    ...extra,
  };
}

function publicOrderSummary(order) {
  const payment = order.payment || {};
  const shipment = order.shipment || {};
  const pricing = order.pricing || {};
  return {
    orderNumber: order.orderNumber,
    status: order.status,
    orderStatus: order.status,
    paymentStatus: payment.status,
    paymentMethod: payment.method,
    items: Array.isArray(order.items)
      ? order.items.map((item) => ({
          productId: item.productId,
          sku: item.sku,
          name: item.name,
          packSize: item.packSize,
          quantity: item.quantity,
          price: item.price,
          isSubscription: item.isSubscription,
        }))
      : [],
    subtotal: pricing.subtotal,
    discount: pricing.discount,
    shippingFee: pricing.shippingFee,
    totalAmount: pricing.totalAmount,
    shiprocketOrderId: shipment.shiprocketOrderId,
    shiprocketShipmentId: shipment.shiprocketShipmentId,
    awbCode: shipment.awbCode,
    courierName: shipment.courierName,
    shipmentStatus: shipment.status,
    shipmentSyncStatus: order.shipmentSyncStatus,
  };
}

async function verifyPrepaidOrder(orderNumberInput, contactInput) {
  const orderNumber = orderNumberLookup(orderNumberInput);
  const contact = String(contactInput || '').trim();
  if (!contact) throw new HttpError(400, 'Registered email or phone is required.');

  let normalizedContact;
  let contactField;
  try {
    if (contact.includes('@')) {
      normalizedContact = validEmail(contact);
      contactField = 'email';
    } else {
      normalizedContact = validPhone(contact);
      contactField = 'phone';
    }
  } catch {
    throw new HttpError(404, 'Order was not found for the supplied details.');
  }

  let order = await Order.findOne({ orderNumber }).exec();
  const contactMatches = order && (
    contactField === 'phone'
      ? phoneMatches(order.customer.phone, normalizedContact)
      : order.customer.email === normalizedContact
  );
  if (!order || !contactMatches) {
    throw new HttpError(404, 'Order was not found for the supplied details.');
  }
  if (order.payment.method !== 'PREPAID') {
    throw new HttpError(400, 'Payment verification is only available for prepaid orders.');
  }

  if (order.payment.status === 'PENDING') {
    if (!order.payment.cashfreeOrderId) {
      throw new HttpError(500, 'The Cashfree order reference is missing.');
    }
    const providerOrder = await fetchCashfreeOrderStatus(order.payment.cashfreeOrderId);
    if (providerOrder.orderStatus === 'PAID') {
      if (
        providerOrder.orderAmount !== order.pricing.totalAmount ||
        providerOrder.orderCurrency !== 'INR'
      ) {
        throw new HttpError(502, 'Cashfree payment details do not match the saved order.');
      }
      order = await Order.findOneAndUpdate(
        { _id: order._id, 'payment.status': 'PENDING' },
        { $set: { 'payment.status': 'PAID', status: 'CONFIRMED' } },
        { returnDocument: 'after', runValidators: true }
      ).exec() || await Order.findById(order._id).exec();
    } else if (['FAILED', 'EXPIRED', 'TERMINATED'].includes(providerOrder.orderStatus)) {
      await Order.findOneAndUpdate(
        { _id: order._id, 'payment.status': 'PENDING' },
        { $set: { 'payment.status': 'FAILED', status: 'CANCELLED' } },
        { runValidators: true }
      ).exec();
      const refreshedOrder = await Order.findById(order._id).exec();
      if (!refreshedOrder) throw new HttpError(500, 'The order could not be reloaded.');
      order = refreshedOrder;
    }
  }

  let shipmentError = null;
  if (order.payment.status === 'PAID' && !order.shipment?.shiprocketOrderId) {
    try {
      order = await createShiprocketOrder(order);
    } catch (error) {
      if (!(error instanceof HttpError)) throw error;
      const refreshedOrder = await Order.findById(order._id).exec();
      if (!refreshedOrder) throw new HttpError(500, 'The order could not be reloaded.');
      order = refreshedOrder;
      shipmentError = error.message;
    }
  }

  return checkoutResponse(order, {
    paymentReference: order.payment.cashfreePaymentId || order.payment.cashfreeOrderId,
    shipmentError,
    order: publicOrderSummary(order),
  });
}

router.get(
  '/orders/verify/:orderNumber',
  asyncRoute(async (req, res) => {
    res.json(await verifyPrepaidOrder(req.params.orderNumber, req.get('X-Order-Contact')));
  })
);

router.post(
  '/orders/verify-payment',
  asyncRoute(async (req, res) => {
    res.json(await verifyPrepaidOrder(req.body?.orderNumber, req.get('X-Order-Contact')));
  })
);

router.post(
  '/orders/checkout',
  asyncRoute(async (req, res) => {
    const input = normalizeCheckout(req.body || {}, parseIdempotencyKey(req));
    const { order, created } = await findOrCreateOrder(input);

    if (order.payment.method === 'COD') {
      try {
        const shipment = await createShiprocketOrder(order);
        const refreshed = await Order.findById(order._id).exec();
        const confirmedOrder = refreshed || shipment;
        return res.status(created ? 201 : 200).json(
          checkoutResponse(confirmedOrder, { order: publicOrderSummary(confirmedOrder) })
        );
      } catch (error) {
        const savedOrder = await Order.findById(order._id).exec();
        return res.status(502).json({
          ...checkoutResponse(savedOrder || order),
          success: false,
          error: error instanceof HttpError
            ? `Order is saved, but shipment booking failed. ${error.message}`
            : 'Order is saved, but shipment booking failed. Retry with the same Idempotency-Key.',
          orderCreated: true,
        });
      }
    }

    if (order.paymentSessionId) {
      return res.status(created ? 201 : 200).json(
        checkoutResponse(order, {
          paymentSessionId: order.paymentSessionId,
          payment_session_id: order.paymentSessionId,
          cashfreeOrderId: order.payment.cashfreeOrderId,
        })
      );
    }

    try {
      const session = await createCashfreeOrder(order);
      const savedOrder = await Order.findByIdAndUpdate(
        order._id,
        {
          $set: {
          'payment.cashfreeOrderId': session.cashfreeOrderId,
          paymentSessionId: session.paymentSessionId,
          },
        },
        { returnDocument: 'after', runValidators: true }
      ).exec();
      if (!savedOrder) throw new HttpError(500, 'The order could not be reloaded.');
      return res.status(created ? 201 : 200).json(
        checkoutResponse(savedOrder, {
          paymentSessionId: session.paymentSessionId,
          payment_session_id: session.paymentSessionId,
          paymentUrl: session.paymentUrl,
          cashfreeOrderId: savedOrder.payment.cashfreeOrderId,
        })
      );
    } catch (error) {
      return res.status(error.status || 502).json({
        ...checkoutResponse(order),
        success: false,
        error: error.status ? error.message : 'Could not initialize payment. Retry with the same Idempotency-Key.',
        orderCreated: true,
      });
    }
  })
);

webhookRouter.route('/')
  .get(webhookProbe)
  .head(webhookProbe);

webhookRouter.post(
  '/',
  express.raw({ type: 'application/json', limit: '1mb' }),
  asyncRoute(async (req, res) => {
    const rawBodyValue = req.rawBody ?? req.body;
    const rawBody = Buffer.isBuffer(rawBodyValue)
      ? rawBodyValue
      : typeof rawBodyValue === 'string'
        ? Buffer.from(rawBodyValue)
        : null;
    if (!Buffer.isBuffer(rawBody) || rawBody.length === 0) {
      console.info('[cashfree] empty test webhook acknowledged.');
      return res.status(200).json({ ok: true, message: 'Webhook test acknowledged' });
    }

    let event;
    try {
      event = JSON.parse(rawBody.toString('utf8'));
    } catch {
      throw new HttpError(400, 'Invalid Cashfree webhook payload.');
    }
    if (!event || typeof event !== 'object' || Array.isArray(event)) {
      throw new HttpError(400, 'Invalid Cashfree webhook payload.');
    }

    const cashfreeOrderId = String(event.data?.order?.order_id ?? '').trim();
    const acknowledgeTest = (reason) => {
      console.info('[cashfree] test webhook acknowledged.', {
        reason,
        orderId: cashfreeOrderId || null,
      });
      return res.status(200).json({ ok: true, message: 'Webhook test acknowledged' });
    };
    if (
      String(event.type || '').toUpperCase() === 'TEST' ||
      !event.data ||
      !cashfreeOrderId ||
      /^order_test/i.test(cashfreeOrderId)
    ) {
      return acknowledgeTest('test payload');
    }

    await connectDB();
    const order = await Order.findOne({
      'payment.cashfreeOrderId': cashfreeOrderId,
    }).exec();
    if (!order) return acknowledgeTest('order not found');

    const signature = req.get('x-webhook-signature');
    const timestamp = req.get('x-webhook-timestamp');
    if (!verifyCashfreeSignature({
      rawBody,
      signature,
      timestamp,
      secret: config.cashfreeSecretKey,
    })) {
      throw new HttpError(401, 'Invalid Cashfree webhook signature.');
    }

    const eventType = event.type;

    if (eventType === 'PAYMENT_SUCCESS_WEBHOOK') {
      const payment = event.data?.payment;
      if (payment?.payment_status !== 'SUCCESS') {
        return res.status(200).json({ received: true, updated: false });
      }
      const paidAmount = Number(event.data?.order?.order_amount);
      if (!Number.isFinite(paidAmount) || paidAmount !== order.pricing.totalAmount) {
        throw new HttpError(400, 'Cashfree payment amount does not match the saved order.');
      }

      await Order.findOneAndUpdate(
        { _id: order._id, 'payment.status': { $ne: 'PAID' } },
        {
          $set: {
            'payment.status': 'PAID',
            status: 'CONFIRMED',
            'payment.cashfreePaymentId': payment.cf_payment_id
              ? String(payment.cf_payment_id)
              : null,
          },
        },
        { runValidators: true }
      ).exec();

      const paidOrder = await Order.findById(order._id).exec();
      if (!paidOrder) throw new HttpError(500, 'The paid order could not be reloaded.');
      if (!paidOrder.shipment?.shiprocketOrderId) {
        await createShiprocketOrder(paidOrder);
      }
      return res.status(200).json({ received: true, updated: true });
    }

    if (eventType === 'PAYMENT_FAILED_WEBHOOK') {
      await Order.findOneAndUpdate(
        { _id: order._id, 'payment.status': 'PENDING' },
        {
          $set: {
            'payment.status': 'FAILED',
            status: 'CANCELLED',
          },
        },
        { runValidators: true }
      ).exec();
    }

    res.status(200).json({ received: true });
  })
);

export { router as paymentRoutes, webhookRouter as cashfreeWebhookRoutes };
