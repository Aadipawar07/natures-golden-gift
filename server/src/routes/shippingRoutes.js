import express from 'express';
import { connectDB } from '../../config/db.js';
import Order from '../../models/Order.js';
import { asyncRoute, HttpError } from '../errors.js';
import { mapShipmentStatus, checkServiceability, fetchTracking } from '../services/shiprocketService.js';
import { verifySharedToken } from '../services/webhookSecurity.js';
import { config } from '../config.js';
import { phoneMatches, validEmail, validPhone, validPincode } from '../validation.js';

const router = express.Router();
const webhookRouter = express.Router();
const statusRank = {
  PROCESSING: 0,
  PACKED: 1,
  IN_TRANSIT: 2,
  DELIVERED: 3,
  CANCELLED: 4,
};

function webhookProbe(req, res) {
  res.status(200).json({ ok: true });
}

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function orderNumberPattern(value) {
  const normalized = String(value || '').trim().replace(/^#/, '');
  if (!/^[A-Za-z0-9-]{4,40}$/.test(normalized)) {
    throw new HttpError(400, 'Enter a valid order number.');
  }
  return new RegExp(`^#?${escapeRegex(normalized)}$`, 'i');
}

router.get(
  '/shipping/check-pincode/:pincode',
  asyncRoute(async (req, res) => {
    const pincode = validPincode(req.params.pincode);
    const requestedWeight = req.query.weight === undefined
      ? 0.5
      : Number(req.query.weight);
    if (!Number.isFinite(requestedWeight) || requestedWeight < 0.3 || requestedWeight > 10) {
      throw new HttpError(400, 'weight must be between 0.3 and 10 kilograms.');
    }
    res.json(await checkServiceability(pincode, requestedWeight));
  })
);

router.get(
  '/orders/track/:orderNumber',
  asyncRoute(async (req, res) => {
    const orderNumber = orderNumberPattern(req.params.orderNumber);
    const contact = String(req.get('X-Order-Contact') || '').trim();
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

    const order = await Order.findOne({ orderNumber }).exec();
    const contactMatches = order && (
      contactField === 'phone'
        ? phoneMatches(order.customer.phone, normalizedContact)
        : order.customer.email === normalizedContact
    );
    if (!order || !contactMatches) {
      throw new HttpError(404, 'Order was not found for the supplied details.');
    }

    const shipment = order.shipment || {};
    let tracking = null;
    if (shipment.awbCode) {
      tracking = await fetchTracking(shipment.awbCode);
      const nextStatus = tracking.shipmentStatus;
      if (statusRank[nextStatus] >= statusRank[shipment.status]) {
        await Order.findByIdAndUpdate(
          order._id,
          {
            $set: {
              'shipment.status': nextStatus,
              shipmentStatusDetail: tracking.shipmentStatusDetail,
              'shipment.courierName': tracking.courierName || shipment.courierName,
            },
          },
          { runValidators: true }
        ).exec();
      }
    }

    res.json({
      orderNumber: order.orderNumber,
      orderStatus: order.status,
      paymentStatus: order.payment.status,
      paymentMethod: order.payment.method,
      createdAt: order.createdAt,
      shipmentStatus:
        tracking && statusRank[tracking.shipmentStatus] >= statusRank[shipment.status]
          ? tracking.shipmentStatus
          : shipment.status,
      shipmentStatusDetail: tracking?.shipmentStatusDetail || order.shipmentStatusDetail,
      awbCode: tracking?.awbCode || shipment.awbCode,
      courierName: tracking?.courierName || shipment.courierName,
      estimatedDeliveryDate: tracking?.estimatedDeliveryDate || null,
      trackingUrl: tracking?.trackingUrl || null,
      activities: tracking?.activities || [],
      live: Boolean(tracking),
    });
  })
);

webhookRouter.route('/')
  .get(webhookProbe)
  .head(webhookProbe);

webhookRouter.post(
  '/',
  express.raw({ type: 'application/json', limit: '1mb' }),
  asyncRoute(async (req, res) => {
    const rawBody = req.body;
    if (!Buffer.isBuffer(rawBody) || rawBody.length === 0) {
      return res.status(200).json({ ok: true, message: 'Shiprocket webhook ready' });
    }

    let payload;
    try {
      payload = JSON.parse(rawBody.toString('utf8'));
    } catch {
      throw new HttpError(400, 'Invalid Shiprocket webhook payload.');
    }
    if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
      throw new HttpError(400, 'Invalid Shiprocket webhook payload.');
    }
    if (!payload.order_id && !payload.awb && !payload.shipment_id) {
      return res.status(200).json({ ok: true, message: 'Shiprocket webhook ready' });
    }

    const suppliedToken = req.get('x-api-key');
    if (!verifySharedToken(config.shiprocketWebhookToken, suppliedToken)) {
      throw new HttpError(401, 'Invalid Shiprocket webhook token.');
    }

    const providerOrderId = String(
      payload.channel_order_id || payload.order_number || payload.order_id || ''
    ).trim();
    const shiprocketOrderIds = [
      payload.sr_order_id,
      payload.shiprocket_order_id,
      payload.order_id,
    ].filter((value) => value !== undefined && value !== null).map(String);
    const awbCode = String(payload.awb || payload.awb_code || '').trim();
    const alternatives = [];
    if (/^#?[A-Za-z0-9-]{4,40}$/.test(providerOrderId)) {
      alternatives.push({ orderNumber: orderNumberPattern(providerOrderId) });
    }
    if (shiprocketOrderIds.length) {
      alternatives.push({ 'shipment.shiprocketOrderId': { $in: shiprocketOrderIds } });
    }
    if (awbCode) alternatives.push({ 'shipment.awbCode': awbCode });
    if (alternatives.length === 0) {
      return res.status(200).json({ received: true, matched: false });
    }
    await connectDB();
    let order;
    try {
      order = await Order.findOne({ $or: alternatives }).exec();
    } catch (error) {
      console.warn('[shiprocket] webhook order lookup failed.', error.message);
      throw error;
    }
    if (!order) {
      console.warn('[shiprocket] webhook order not found.', {
        providerOrderId,
        shiprocketOrderIds,
        awbCode: awbCode || null,
      });
      return res.status(200).json({ received: true, matched: false });
    }

    const detail = String(payload.current_status || payload.current_status_code || payload.status || '')
      .trim()
      .slice(0, 200);
    const nextStatus = mapShipmentStatus(detail);
    const currentStatus = order.shipment?.status || 'PROCESSING';
    const shouldAdvance =
      statusRank[nextStatus] >= statusRank[currentStatus];
    const updates = {
      ...(awbCode ? { 'shipment.awbCode': awbCode } : {}),
      ...(payload.courier_name
        ? { 'shipment.courierName': String(payload.courier_name).slice(0, 120) }
        : {}),
      ...(payload.sr_order_id || payload.shiprocket_order_id
        ? { 'shipment.shiprocketOrderId': String(payload.sr_order_id || payload.shiprocket_order_id) }
        : {}),
      ...(payload.shipment_id
        ? { 'shipment.shiprocketShipmentId': String(payload.shipment_id) }
        : {}),
      ...(detail ? { shipmentStatusDetail: detail } : {}),
      ...(shouldAdvance ? { 'shipment.status': nextStatus } : {}),
    };
    await Order.findByIdAndUpdate(
      order._id,
      { $set: updates },
      { runValidators: true }
    ).exec();

    res.status(200).json({ received: true, matched: true });
  })
);

export { router as shippingRoutes, webhookRouter as shiprocketWebhookRoutes };
