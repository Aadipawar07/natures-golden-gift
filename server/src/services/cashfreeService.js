import axios from 'axios';
import { config } from '../config.js';
import { HttpError } from '../errors.js';

const apiBase =
  config.cashfreeEnv === 'PRODUCTION'
    ? 'https://api.cashfree.com/pg'
    : 'https://sandbox.cashfree.com/pg';

function requireCredentials() {
  if (!config.cashfreeAppId || !config.cashfreeSecretKey) {
    throw new HttpError(503, 'Cashfree payments are not configured.');
  }
}

function cashfreeHeaders() {
  return {
    'x-api-version': '2023-08-01',
    'x-client-id': config.cashfreeAppId,
    'x-client-secret': config.cashfreeSecretKey,
  };
}

function logCashfreeFailure(error) {
  const providerError = error.response?.data;
  let message = typeof providerError?.message === 'string'
    ? providerError.message
    : String(error.message || 'Unknown Cashfree error.');
  for (const credential of [config.cashfreeAppId, config.cashfreeSecretKey]) {
    if (credential) message = message.replaceAll(credential, '[redacted]');
  }

  console.error('[cashfree] order creation failed.', {
    status: error.response?.status ?? error.status ?? null,
    code: providerError?.code || error.code || null,
    type: providerError?.type || null,
    message: message.slice(0, 500),
  });
}

export async function createCashfreeOrder(order) {
  requireCredentials();
  const returnSeparator = config.cashfreeReturnUrl.includes('?') ? '&' : '?';

  try {
    const response = await axios.post(
      `${apiBase}/orders`,
      {
        order_id: order.orderNumber.replace(/^#/, ''),
        order_amount: order.pricing.totalAmount,
        order_currency: 'INR',
        customer_details: {
          customer_id: order.id,
          customer_name: order.customer.name,
          customer_email: order.customer.email,
          customer_phone: order.customer.phone,
        },
        order_meta: {
          return_url: `${config.cashfreeReturnUrl}${returnSeparator}order_id={order_id}`,
          notify_url: `${config.publicApiUrl}/api/webhooks/cashfree`,
        },
        order_note: `Store order ${order.orderNumber}`,
        order_expiry_time: new Date(Date.now() + 30 * 60 * 1000).toISOString(),
      },
      {
        timeout: 10000,
        headers: {
          ...cashfreeHeaders(),
          'x-idempotency-key': String(order._id),
          'x-request-id': String(order._id),
        },
      }
    );

    if (!response.data?.payment_session_id || !response.data?.order_id) {
      throw new HttpError(502, 'Cashfree returned an incomplete checkout response.');
    }

    return {
      cashfreeOrderId: response.data.order_id,
      paymentSessionId: response.data.payment_session_id,
      paymentUrl: response.data.payment_link || null,
    };
  } catch (error) {
    logCashfreeFailure(error);
    if (error instanceof HttpError) throw error;
    throw new HttpError(502, 'Could not create a Cashfree checkout session.');
  }
}

export async function fetchCashfreeOrderStatus(orderId) {
  requireCredentials();

  try {
    const response = await axios.get(
      `${apiBase}/orders/${encodeURIComponent(orderId)}`,
      { timeout: 10000, headers: cashfreeHeaders() }
    );
    const orderStatus = response.data?.order_status;
    const orderAmount = Number(response.data?.order_amount);
    const orderCurrency = response.data?.order_currency;
    if (
      typeof orderStatus !== 'string' ||
      !orderStatus ||
      !Number.isFinite(orderAmount) ||
      typeof orderCurrency !== 'string'
    ) {
      throw new HttpError(502, 'Cashfree returned an invalid order status.');
    }
    return {
      orderStatus: orderStatus.toUpperCase(),
      orderAmount,
      orderCurrency: orderCurrency.toUpperCase(),
    };
  } catch (error) {
    if (error instanceof HttpError) throw error;
    throw new HttpError(502, 'Could not verify the Cashfree payment status.');
  }
}
