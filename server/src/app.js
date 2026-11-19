import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { config } from './config.js';
import { asyncRoute, errorHandler, HttpError } from './errors.js';
import { inquiryRoutes } from './routes/inquiryRoutes.js';
import { paymentRoutes, cashfreeWebhookRoutes } from './routes/paymentRoutes.js';
import { shippingRoutes, shiprocketWebhookRoutes } from './routes/shippingRoutes.js';
import { connectDB, mongoose } from '../config/db.js';

const app = express();
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 120,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  skip: (req) => req.path.startsWith('/webhooks/'),
});
const inquiryLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: 10,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
});

app.disable('x-powered-by');
if (config.trustProxy) app.set('trust proxy', 1);
app.use(helmet());
app.use(cors({
  origin(origin, callback) {
    if (!origin || config.clientOrigins.includes(origin)) {
      callback(null, true);
      return;
    }
    callback(null, false);
  },
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: [
    'Content-Type',
    'Idempotency-Key',
    'Authorization',
    'X-Order-Contact',
    'x-api-key',
  ],
}));

app.use('/api/webhooks/cashfree', cashfreeWebhookRoutes);
app.use('/api/webhooks/shiprocket', shiprocketWebhookRoutes);

app.use(asyncRoute(async (req, res, next) => {
  await connectDB();
  next();
}));

app.get(
  '/health',
  asyncRoute(async (req, res) => {
    if (mongoose.connection.readyState !== 1 || !mongoose.connection.db) {
      throw new HttpError(503, 'MongoDB is not connected.');
    }
    await mongoose.connection.db.admin().ping();
    res.json({ ok: true });
  })
);

app.use(express.json({ limit: '64kb' }));
app.use('/api', apiLimiter);
app.use('/api', paymentRoutes);
app.use('/api', shippingRoutes);
app.use('/api', inquiryLimiter, inquiryRoutes);

app.use((req, res) => {
  res.status(404).json({ error: 'Route not found.' });
});
app.use(errorHandler);

export default app;
