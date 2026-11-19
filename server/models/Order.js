import mongoose from 'mongoose';

const { Schema } = mongoose;

const customerSchema = new Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 120 },
    email: { type: String, required: true, trim: true, lowercase: true, maxlength: 254 },
    phone: { type: String, required: true, trim: true, match: /^[6-9]\d{9}$/ },
  },
  { _id: false }
);

const shippingAddressSchema = new Schema(
  {
    street: { type: String, required: true, trim: true, maxlength: 300 },
    landmark: { type: String, trim: true, default: '' },
    city: { type: String, required: true, trim: true, maxlength: 100 },
    state: { type: String, required: true, trim: true, maxlength: 100 },
    pincode: { type: String, required: true, match: /^[1-9]\d{5}$/ },
  },
  { _id: false }
);

const itemSchema = new Schema(
  {
    productId: { type: String, required: true, trim: true },
    sku: { type: String, required: true, trim: true },
    name: { type: String, required: true, trim: true },
    packSize: { type: String, required: true, trim: true },
    quantity: { type: Number, required: true, min: 1, max: 99 },
    price: { type: Number, required: true, min: 0 },
    isSubscription: { type: Boolean, default: false },
    shippingWeightGrams: { type: Number, min: 0 },
  },
  { _id: false }
);

const pricingSchema = new Schema(
  {
    subtotal: { type: Number, required: true, min: 0 },
    discount: { type: Number, required: true, min: 0, default: 0 },
    shippingFee: { type: Number, required: true, min: 0, default: 0 },
    totalAmount: { type: Number, required: true, min: 0 },
    couponCode: { type: String, trim: true, default: '' },
  },
  { _id: false }
);

const paymentSchema = new Schema(
  {
    method: { type: String, enum: ['PREPAID', 'COD'], required: true },
    status: {
      type: String,
      enum: ['PENDING', 'PAID', 'FAILED'],
      default: 'PENDING',
    },
    cashfreeOrderId: { type: String, trim: true, default: null },
    cashfreePaymentId: { type: String, trim: true, default: null },
  },
  { _id: false }
);

const shipmentSchema = new Schema(
  {
    shiprocketOrderId: { type: String, trim: true, default: null },
    shiprocketShipmentId: { type: String, trim: true, default: null },
    awbCode: { type: String, trim: true, default: null },
    courierName: { type: String, trim: true, default: null },
    status: {
      type: String,
      enum: ['PROCESSING', 'PACKED', 'IN_TRANSIT', 'DELIVERED', 'CANCELLED'],
      default: 'PROCESSING',
    },
  },
  { _id: false }
);

const orderSchema = new Schema(
  {
    orderNumber: { type: String, required: true, trim: true, unique: true },
    idempotencyKey: { type: String, trim: true, unique: true, sparse: true },
    requestFingerprint: { type: String, trim: true, default: null },
    customer: { type: customerSchema, required: true },
    shippingAddress: { type: shippingAddressSchema, required: true },
    items: { type: [itemSchema], required: true, validate: [(items) => items.length > 0, 'Order must include an item.'] },
    pricing: { type: pricingSchema, required: true },
    payment: { type: paymentSchema, required: true },
    shipment: { type: shipmentSchema, default: () => ({}) },
    status: { type: String, enum: ['PENDING', 'CONFIRMED', 'CANCELLED'], default: 'PENDING' },
    paymentSessionId: { type: String, trim: true, default: null },
    shipmentSyncStatus: {
      type: String,
      enum: ['PENDING', 'IN_PROGRESS', 'CREATED', 'FAILED'],
      default: 'PENDING',
    },
    shipmentStatusDetail: { type: String, trim: true, default: null },
  },
  { timestamps: true }
);

orderSchema.index({ 'customer.email': 1, createdAt: -1 });
orderSchema.index({ 'customer.phone': 1, createdAt: -1 });
orderSchema.index({ 'shipment.status': 1, createdAt: -1 });

export default mongoose.models.Order || mongoose.model('Order', orderSchema);
