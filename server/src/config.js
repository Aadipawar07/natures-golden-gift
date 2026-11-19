import dotenv from 'dotenv';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const serverDirectory = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
dotenv.config({ path: path.join(serverDirectory, '.env') });

const cashfreeEnv = (process.env.CASHFREE_ENV || 'SANDBOX').trim().toUpperCase();
if (!['SANDBOX', 'PRODUCTION'].includes(cashfreeEnv)) {
  throw new Error('CASHFREE_ENV must be SANDBOX or PRODUCTION.');
}

export const config = Object.freeze({
  nodeEnv: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT || '5000'),
  mongodbUri: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/natures-golden-gift',
  clientOrigins: (process.env.CLIENT_ORIGINS || 'http://localhost:5173,http://127.0.0.1:5173')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean),
  cashfreeEnv,
  cashfreeAppId: process.env.CASHFREE_APP_ID || '',
  cashfreeSecretKey: process.env.CASHFREE_SECRET_KEY || '',
  cashfreeReturnUrl: process.env.CASHFREE_RETURN_URL || 'http://localhost:5173/checkout',
  publicApiUrl: (process.env.PUBLIC_API_URL || `http://localhost:${process.env.PORT || '5000'}`)
    .replace(/\/+$/, ''),
  shiprocketEmail: process.env.SHIPROCKET_EMAIL || '',
  shiprocketPassword: process.env.SHIPROCKET_PASSWORD || '',
  shiprocketPickupLocation: process.env.SHIPROCKET_PICKUP_LOCATION || '',
  shiprocketPickupPincode: process.env.SHIPROCKET_PICKUP_PINCODE || '',
  shiprocketWebhookToken: process.env.SHIPROCKET_WEBHOOK_TOKEN || '',
  trustProxy: process.env.TRUST_PROXY === 'true',
});

export function assertRuntimeConfig() {
  if (!Number.isInteger(config.port) || config.port < 1 || config.port > 65535) {
    throw new Error('PORT must be a valid TCP port.');
  }
  if (config.nodeEnv === 'production' && !process.env.CLIENT_ORIGINS) {
    throw new Error('CLIENT_ORIGINS must be configured in production.');
  }
  if (
    config.nodeEnv === 'production' &&
    (!config.publicApiUrl.startsWith('https://') ||
      !config.cashfreeReturnUrl.startsWith('https://'))
  ) {
    throw new Error('PUBLIC_API_URL and CASHFREE_RETURN_URL must use HTTPS in production.');
  }
}
