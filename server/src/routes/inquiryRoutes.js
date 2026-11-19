import { randomInt } from 'node:crypto';
import express from 'express';
import Inquiry from '../../models/Inquiry.js';
import { asyncRoute, HttpError } from '../errors.js';
import {
  optionalText,
  requiredText,
  validEmail,
  validPhone,
} from '../validation.js';

const router = express.Router();

router.post(
  '/inquiries',
  asyncRoute(async (req, res) => {
    const body = req.body || {};
    const kind = String(body.kind || '').trim().toUpperCase();
    if (!['CONTACT', 'GIFTING_BULK'].includes(kind)) {
      throw new HttpError(400, 'kind must be CONTACT or GIFTING_BULK.');
    }

    const phone = body.phone ? validPhone(body.phone) : '';

    let targetDate = '';
    const targetDateInput = body.targetDate || body.deliveryDate;
    if (targetDateInput) {
      const dateValue = requiredText(targetDateInput, 'Target date', 10);
      if (!/^\d{4}-\d{2}-\d{2}$/.test(dateValue)) {
        throw new HttpError(400, 'Target date must use YYYY-MM-DD format.');
      }
      targetDate = new Date(`${dateValue}T00:00:00.000Z`);
      if (
        Number.isNaN(targetDate.valueOf()) ||
        targetDate.toISOString().slice(0, 10) !== dateValue
      ) {
        throw new HttpError(400, 'Enter a valid target date.');
      }
      targetDate = dateValue;
    }

    const inquiryData = {
      type: kind === 'CONTACT' ? 'CONTACT_SUPPORT' : 'GIFTING_BULK',
      name: requiredText(body.name || body.fullName, 'Name', 120),
      email: validEmail(body.email),
      phone,
      companyOrEvent: optionalText(
        body.company || body.companyName || body.eventName,
        'Company or event',
        160
      ) || '',
      category: optionalText(body.inquiryType || body.topic, 'Category', 120) || '',
      estimatedQuantity: optionalText(
        body.quantity || body.estimatedQuantity,
        'Estimated quantity',
        120
      ) || '',
      city: optionalText(body.city || body.deliveryCity, 'City', 100) || '',
      targetDate,
      message: requiredText(
        body.message || body.notes || body.customizationNotes,
        'Message',
        3000
      ),
    };

    let inquiry;
    for (let attempt = 0; attempt < 8; attempt += 1) {
      const prefix = kind === 'CONTACT' ? 'SUP' : 'BLK';
      const ticketId = `${prefix}-${randomInt(1000, 10000)}`;
      try {
        inquiry = await Inquiry.create({ ...inquiryData, ticketId });
        break;
      } catch (error) {
        if (error.code !== 11000) throw error;
      }
    }
    if (!inquiry) throw new HttpError(503, 'Could not allocate an inquiry reference. Please retry.');

    res.status(201).json({
      reference: inquiry.ticketId,
      ticketId: inquiry.ticketId,
      receivedAt: inquiry.createdAt,
    });
  })
);

export { router as inquiryRoutes };
