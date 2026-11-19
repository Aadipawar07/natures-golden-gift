import axios from 'axios';
import Order from '../../models/Order.js';
import { config } from '../config.js';
import { HttpError } from '../errors.js';
import { buildShiprocketOrderPayload } from './shiprocketPayload.js';

const apiBase = 'https://apiv2.shiprocket.in';
const FALLBACK_TOKEN_TTL_MS = 8 * 24 * 60 * 60 * 1000;
let tokenCache = null;
let tokenRequest = null;

function requireCredentials() {
  if (!config.shiprocketEmail || !config.shiprocketPassword) {
    throw new HttpError(503, 'Shiprocket is not configured.');
  }
}

async function login() {
  requireCredentials();
  const response = await axios.post(
    `${apiBase}/v1/external/auth/login`,
    {
      email: config.shiprocketEmail,
      password: config.shiprocketPassword,
    },
    { timeout: 10000 }
  );

  if (typeof response.data?.token !== 'string' || !response.data.token) {
    throw new HttpError(502, 'Shiprocket returned an invalid authentication response.');
  }

  const providerExpiry = Date.parse(response.data.expires_at || '');
  const expiry = Number.isFinite(providerExpiry)
    ? Math.min(providerExpiry - 60_000, Date.now() + FALLBACK_TOKEN_TTL_MS)
    : Date.now() + FALLBACK_TOKEN_TTL_MS;
  tokenCache = { value: response.data.token, expiresAt: expiry };
  return tokenCache.value;
}

async function getToken() {
  if (tokenCache && tokenCache.expiresAt > Date.now()) return tokenCache.value;
  if (!tokenRequest) {
    tokenRequest = login().finally(() => {
      tokenRequest = null;
    });
  }
  return tokenRequest;
}

async function shiprocketRequest(request, allowRefresh = true) {
  const token = await getToken();
  try {
    return await axios.request({
      baseURL: apiBase,
      timeout: 15000,
      ...request,
      headers: {
        ...request.headers,
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    if (error.response?.status === 401 && allowRefresh) {
      tokenCache = null;
      return shiprocketRequest(request, false);
    }
    throw error;
  }
}

function logShiprocketFailure(error, order) {
  const providerData = error.response?.data;
  const fields = providerData?.errors && typeof providerData.errors === 'object'
    ? Object.keys(providerData.errors).slice(0, 12)
    : [];
  console.error('[shiprocket] order creation failed', {
    orderNumber: order.orderNumber,
    status: error.response?.status || null,
    errorFields: fields,
  });
}

function findShiprocketOrderResult(responseBody) {
  const candidates = [
    responseBody,
    responseBody?.data,
    responseBody?.result,
    responseBody?.order,
    responseBody?.data?.order,
  ].filter((candidate) => candidate && typeof candidate === 'object' && !Array.isArray(candidate));
  return candidates.find((candidate) =>
    candidate.order_id !== undefined ||
    candidate.orderId !== undefined ||
    candidate.sr_order_id !== undefined
  ) || null;
}

function providerMessage(responseBody) {
  const message = responseBody?.message;
  return typeof message === 'string'
    ? message.replace(/[\r\n\t]+/g, ' ').trim().slice(0, 240)
    : '';
}

export function parseShiprocketOrderResponse(responseBody) {
  const result = findShiprocketOrderResult(responseBody);
  const statusCode = Number(responseBody?.status_code ?? result?.status_code);
  if (Number.isFinite(statusCode) && statusCode >= 400) {
    throw new HttpError(422, `Shiprocket rejected the order: ${providerMessage(responseBody) || 'provider validation failed'}.`);
  }

  const orderId = result?.order_id ?? result?.orderId ?? result?.sr_order_id;
  if (orderId === undefined || orderId === null || String(orderId).trim() === '') {
    const message = providerMessage(responseBody);
    throw new HttpError(
      502,
      `Shiprocket did not confirm the order${message ? `: ${message}` : ' (response did not include order_id)'}.`
    );
  }

  return {
    orderId: String(orderId),
    shipmentId: result.shipment_id ?? responseBody?.shipment_id ?? null,
    awbCode: result.awb_code ?? responseBody?.awb_code ?? null,
    courierName: result.courier_name ?? responseBody?.courier_name ?? null,
  };
}

function mapShipmentStatus(value) {
  const status = String(value || '').toUpperCase();
  if (status.includes('CANCEL')) return 'CANCELLED';
  if (status === 'DELIVERED' || status.startsWith('DELIVERED ')) return 'DELIVERED';
  if (
    status.includes('TRANSIT') ||
    status.includes('SHIPPED') ||
    status.includes('PICKUP') ||
    status.includes('OUT FOR DELIVERY') ||
    status.includes('REACHED') ||
    status.includes('UNDELIVERED')
  ) {
    return 'IN_TRANSIT';
  }
  if (status.includes('PACKED') || status.includes('READY TO SHIP')) return 'PACKED';
  return 'PROCESSING';
}

export function estimatedDeliveryDays(courier) {
  const explicitDays = Number(courier.estimated_delivery_days);
  if (Number.isInteger(explicitDays) && explicitDays > 0 && explicitDays <= 90) {
    return explicitDays;
  }

  const etd = String(courier.etd || '').trim();
  if (/^\d+$/.test(etd)) {
    const days = Number(etd);
    if (days > 0 && days <= 90) return days;
  }
  const dayRange = etd.match(/(\d+)\s*(?:business\s*)?days?/i);
  if (dayRange) {
    const days = Number(dayRange[1]);
    if (days > 0 && days <= 90) return days;
  }

  const deliveryDate = Date.parse(etd);
  if (Number.isFinite(deliveryDate)) {
    const days = Math.ceil((deliveryDate - Date.now()) / 86_400_000);
    if (days > 0 && days <= 90) return days;
  }
  return null;
}

export async function createShiprocketOrder(order) {
  const savedOrder = await Order.findById(order._id)
    .select('shipment.shiprocketOrderId shipmentSyncStatus')
    .exec();
  if (!savedOrder) throw new HttpError(404, 'Order was not found.');
  if (savedOrder.shipment?.shiprocketOrderId) return savedOrder;

  const claim = await Order.findOneAndUpdate(
    {
      _id: order._id,
      'shipment.shiprocketOrderId': { $in: [null, ''] },
      shipmentSyncStatus: { $in: ['PENDING', 'FAILED'] },
    },
    { $set: { shipmentSyncStatus: 'IN_PROGRESS' } },
    { returnDocument: 'after' }
  ).exec();
  if (!claim) {
    const currentOrder = await Order.findById(order._id).exec();
    if (
      currentOrder?.shipment?.shiprocketOrderId ||
      currentOrder?.shipmentSyncStatus === 'CREATED'
    ) {
      return currentOrder;
    }
    throw new HttpError(503, 'Shipment booking is already in progress. Retry this order shortly.');
  }

  try {
    requireCredentials();
    if (!config.shiprocketPickupLocation) {
      throw new HttpError(503, 'Shiprocket pickup location is not configured.');
    }

    const response = await shiprocketRequest({
      method: 'post',
      url: '/v1/external/orders/create/adhoc',
      data: buildShiprocketOrderPayload(order, config.shiprocketPickupLocation),
    });

    let shiprocketResult;
    try {
      shiprocketResult = parseShiprocketOrderResponse(response.data);
    } catch (error) {
      console.error('[shiprocket] order creation returned no provider order ID', {
        orderNumber: order.orderNumber,
        status: response.status,
        responseKeys: Object.keys(response.data || {}).slice(0, 12),
        nestedDataKeys: Object.keys(response.data?.data || {}).slice(0, 12),
        providerStatusCode: response.data?.status_code ?? response.data?.data?.status_code ?? null,
      });
      throw error;
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      order._id,
      {
        $set: {
          'shipment.shiprocketOrderId': shiprocketResult.orderId,
          'shipment.shiprocketShipmentId': shiprocketResult.shipmentId
          ? String(shiprocketResult.shipmentId)
          : null,
          'shipment.awbCode': shiprocketResult.awbCode ? String(shiprocketResult.awbCode) : null,
          'shipment.courierName': shiprocketResult.courierName
          ? String(shiprocketResult.courierName)
          : null,
          'shipment.status': 'PACKED',
          shipmentStatusDetail: 'Order created with Shiprocket',
          shipmentSyncStatus: 'CREATED',
        },
      },
      { returnDocument: 'after', runValidators: true }
    ).exec();
    if (!updatedOrder) throw new HttpError(404, 'Order was not found.');
    console.info('[shiprocket] order created', {
      orderNumber: order.orderNumber,
      shiprocketOrderId: updatedOrder.shipment.shiprocketOrderId,
      shiprocketShipmentId: updatedOrder.shipment.shiprocketShipmentId,
    });
    return updatedOrder;
  } catch (error) {
    await Order.findByIdAndUpdate(order._id, {
      $set: { shipmentSyncStatus: 'FAILED' },
    }).exec();
    if (error instanceof HttpError) throw error;
    logShiprocketFailure(error, order);
    if ([400, 422].includes(error.response?.status)) {
      throw new HttpError(
        422,
        'Shiprocket rejected the delivery details. Check the street address and PIN code, then try again.'
      );
    }
    if ([401, 403].includes(error.response?.status)) {
      throw new HttpError(502, 'Shiprocket authentication was rejected. Check the server account credentials.');
    }
    throw new HttpError(502, 'Shiprocket could not create the shipment.');
  }
}

export async function checkServiceability(pincode, weightKg = 0.5) {
  requireCredentials();
  if (!config.shiprocketPickupPincode || !/^[1-9]\d{5}$/.test(config.shiprocketPickupPincode)) {
    throw new HttpError(503, 'Shiprocket pickup pincode is not configured.');
  }

  try {
    const response = await shiprocketRequest({
      method: 'get',
      url: '/v1/external/courier/serviceability/',
      params: {
        pickup_postcode: config.shiprocketPickupPincode,
        delivery_postcode: pincode,
        weight: weightKg,
        cod: 1,
      },
    });
    const couriers = response.data?.data?.available_courier_companies || [];
    if (!Array.isArray(couriers)) throw new HttpError(502, 'Invalid Shiprocket serviceability response.');

    const courierOptions = couriers
      .map((courier) => ({
        courierName: typeof courier.courier_name === 'string'
          ? courier.courier_name.trim()
          : '',
        estimatedDeliveryDays: estimatedDeliveryDays(courier),
        codAvailable: Number(courier.cod) === 1,
      }))
      .filter((courier) => courier.courierName);
    const fastestCourier = courierOptions
      .filter((courier) => courier.estimatedDeliveryDays !== null)
      .sort((left, right) => left.estimatedDeliveryDays - right.estimatedDeliveryDays)[0];

    return {
      available: couriers.length > 0,
      estimatedDeliveryDays: fastestCourier?.estimatedDeliveryDays || null,
      courierName: fastestCourier?.courierName || courierOptions[0]?.courierName || null,
      codAvailable: couriers.some((courier) => Number(courier.cod) === 1),
      courierCount: couriers.length,
    };
  } catch (error) {
    if (error instanceof HttpError) throw error;
    throw new HttpError(502, 'Could not check Shiprocket serviceability.');
  }
}

export async function fetchTracking(awbCode) {
  try {
    const response = await shiprocketRequest({
      method: 'get',
      url: `/v1/external/courier/track/awb/${encodeURIComponent(awbCode)}`,
    });
    const trackingData = response.data?.tracking_data;
    const firstTrack = trackingData?.shipment_track?.[0] || {};
    return {
      shipmentStatus: mapShipmentStatus(firstTrack.current_status || trackingData?.track_status),
      shipmentStatusDetail: firstTrack.current_status || trackingData?.track_status || null,
      courierName: firstTrack.courier_name || null,
      awbCode: firstTrack.awb_code || awbCode,
      estimatedDeliveryDate: firstTrack.edd || null,
      trackingUrl: firstTrack.url || trackingData?.track_url || null,
      activities: Array.isArray(trackingData?.shipment_track_activities)
        ? trackingData.shipment_track_activities.map((activity) => ({
            date: activity.date || null,
            status: activity.activity || activity.status || '',
            location: activity.location || '',
          }))
        : [],
    };
  } catch (error) {
    if (error instanceof HttpError) throw error;
    throw new HttpError(502, 'Could not retrieve live shipment tracking.');
  }
}

export { mapShipmentStatus };
