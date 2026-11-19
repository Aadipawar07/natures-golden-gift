import mongoose from 'mongoose';

const inquirySchema = new mongoose.Schema(
  {
    ticketId: { type: String, required: true, unique: true, trim: true },
    type: {
      type: String,
      enum: ['GIFTING_BULK', 'CONTACT_SUPPORT'],
      required: true,
    },
    name: { type: String, required: true, trim: true, maxlength: 120 },
    companyOrEvent: { type: String, trim: true, default: '' },
    email: { type: String, required: true, trim: true, lowercase: true, maxlength: 254 },
    phone: { type: String, trim: true, default: '' },
    category: { type: String, trim: true, default: '' },
    estimatedQuantity: { type: String, trim: true, default: '' },
    city: { type: String, trim: true, default: '' },
    targetDate: { type: String, trim: true, default: '' },
    message: { type: String, required: true, trim: true, maxlength: 3000 },
  },
  { timestamps: true }
);

inquirySchema.index({ email: 1, createdAt: -1 });
inquirySchema.index({ type: 1, createdAt: -1 });

export default mongoose.models.Inquiry || mongoose.model('Inquiry', inquirySchema);
