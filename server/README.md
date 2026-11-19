# Nature's Golden Gift API

Independent Express API for checkout, Cashfree, Shiprocket tracking, and customer inquiries. Mongoose stores order and inquiry records in MongoDB. Payment and shipping credentials are never sent to the browser.

## Setup

1. Use Node.js 20.19 or newer and start a local MongoDB service, or use a MongoDB Atlas connection string.
2. From `server/`, copy `.env.example` to `.env` and set the MongoDB URI, Cashfree credentials, and Shiprocket account/pickup values. Keep `.env` private.
3. Install dependencies:

   ```sh
   npm install
   ```

4. Start the API:

   ```sh
   npm run dev
   ```

`MONGODB_URI` defaults to `mongodb://127.0.0.1:27017/natures-golden-gift`; Mongoose creates the database and collections when the first document is saved. The API waits for MongoDB before listening, and exits with a clear startup error if it cannot connect. `GET /health` checks database connectivity. The API listens on port `5000` by default, matching the Vite app's `VITE_API_URL` default. `CASHFREE_ENV=SANDBOX` is the default. Do not switch to `PRODUCTION` until production credentials, HTTPS callback URLs, and live Shiprocket pickup settings are configured.

## API

### `POST /api/orders/checkout`

Requires a delivery address and registered customer details. Use an `Idempotency-Key` header (8–128 safe characters) for retries.

```json
{
  "customer": {
    "name": "Example Customer",
    "email": "customer@example.com",
    "phone": "9876543210"
  },
  "address": {
    "street": "10 Example Road",
    "city": "Mumbai",
    "state": "Maharashtra",
    "pincode": "400001"
  },
  "items": [
    { "sku": "collection-heirloom-powder__250g", "qty": 1 }
  ],
  "paymentMethod": "PREPAID",
  "couponCode": ""
}
```

Accepted item identifiers are server-side catalog SKUs in `src/catalog.js`. The API ignores submitted titles and prices, recalculates quantity, subscription discounts, the `PURE10` coupon, shipping, and total. Existing cart objects with `productId`, `variantId`, and `quantity` are also accepted.

Orders are stored with nested customer, shipping, pricing, payment, and shipment data. Phone numbers are normalized to 10 digits. For prepaid orders, the response contains `paymentSessionId` (and the compatible `payment_session_id` field); initialize Cashfree Checkout with that value. COD orders are confirmed in the API and submitted to Shiprocket before checkout returns. The response includes the Shiprocket order/shipment identifiers and a limited order summary. If carrier booking fails, the API retains the saved order and reports the reason without exposing provider payloads or customer data in logs. Reuse the same idempotency key for safe retries.

### `POST /api/orders/verify-payment`

Send `{ "orderNumber": "#HLD-8492" }` and the registered email or phone in `X-Order-Contact`. The API checks Cashfree's server-side order status, amount, and currency. Paid orders are submitted to Shiprocket if a webhook has not already done so. The previous `GET /api/orders/verify/:orderNumber` remains available for compatibility.

### `/api/webhooks/cashfree` and `/webhooks/cashfree`

Configure this HTTPS URL in Cashfree. The API verifies `x-webhook-signature` against the exact raw request bytes and `x-webhook-timestamp`, checks the paid amount against the stored order, and submits eligible paid orders to Shiprocket. Signatures older than 15 minutes are rejected.
`GET` and `HEAD` return `{ "ok": true }` for reachability checks. Empty, data-less, `TEST`, dummy, and unmatched-order POSTs are acknowledged with `{ "ok": true, "message": "Webhook test acknowledged" }`; payment events for known orders still require a valid signature.

### Shipping

- `GET /api/shipping/check-pincode/:pincode?weight=0.5` — returns serviceability, estimated days, and COD availability.
- `GET /api/orders/track/:orderNumber` — send the registered email or phone in the `X-Order-Contact` header; returns shipment/payment status and tracking events.
- `/api/webhooks/shiprocket` and `/api/webhooks/courier-updates` — configure Shiprocket to send `x-api-key` using `SHIPROCKET_WEBHOOK_TOKEN` for POST events. `GET`/`HEAD` probes, POST payloads without order, AWB, or shipment IDs, Shiprocket's placeholder sample payload, and unmatched orders are acknowledged with `{ "ok": true }`. Unmatched orders are logged; status updates are normalized and cannot downgrade an order's saved shipment milestone.

### `POST /api/inquiries`

Accepts `kind` (`CONTACT` or `GIFTING_BULK`), `name`, `email`, and `message`; phone, company, inquiry type, quantity, city, target date, and order ID are optional. Submissions are rate-limited and saved to MongoDB with a unique ticket ID.

## Operations and security

- Set `CLIENT_URL` or `CLIENT_ORIGINS` to the exact storefront origins. Production startup requires one.
- Put the API behind HTTPS and a configured reverse proxy. Set `TRUST_PROXY=true` only when the API is behind a trusted single proxy.
- Configure Cashfree and Shiprocket credentials, webhook URLs/token, pickup location, and pickup pincode before enabling those flows.
- Set up database backups, monitoring, and an operator process for orders whose Shiprocket booking reports `FAILED`.
- Configure the storefront's root `.env` from `.env.example`; production builds must provide the deployed `VITE_API_URL` and `VITE_CASHFREE_ENV`. Provider flows still require sandbox testing with real credentials before launch.

Run unit tests with `npm test`.

On Render, a Secret File named `.env` is loaded from `/etc/secrets/.env`. If that file is absent, local development loads `server/.env`.

## Vercel deployment

Set the Vercel project's Root Directory to `server/`. The `vercel.json` configuration routes every request to the exported Express app. Configure `MONGODB_URI`, `CLIENT_URL` (the deployed storefront URL), `PUBLIC_API_URL`, and `CASHFREE_RETURN_URL` in the Vercel project environment; production URLs must use HTTPS. `CLIENT_ORIGINS` remains supported for additional storefront origins. MongoDB connections are reused across warm function invocations.

Local development remains available with `npm run dev` from this directory.
