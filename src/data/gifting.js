import { MEDIA } from '../assets/media';

export const GIFTING_STATUS_NOTE =
  'Offer contents, minimum quantities, customization, volume discounts, product claims, packaging specifications, and dispatch terms are preview details pending business confirmation.';

export const GIFTING_OFFERINGS = [
  {
    number: '01',
    title: 'Festive & Corporate Wellness Hampers',
    icon: 'gift',
    image: MEDIA.ritualElixir,
    imageAlt: 'Warm golden milk and a turmeric jar styled as an editorial gifting scene',
    idealFor: 'Diwali, client appreciation, and wellness retreats.',
    features: [
      'Custom branded sleeves',
      'Handwritten calligraphy note cards',
      'Amber glass jars',
      'Brass spoon pairing',
    ],
    badge: 'MOQ: 15 Boxes • Custom Branding Available',
  },
  {
    number: '02',
    title: 'Bespoke Wedding & Mehendi Favors',
    icon: 'heart',
    image: MEDIA.kitchenJar,
    imageAlt: 'Amber turmeric jar in warm natural light for a wedding favor concept',
    idealFor: 'Haldi ceremony favors, bridesmaid boxes, and wedding welcome hampers.',
    features: [
      'Mini 50g / 100g apothecary jar concepts',
      'Personalized couple monogram tags',
      'Kraft packaging concept',
      'Plastic-free packaging goal',
    ],
    badge: 'MOQ: 30 Favors • Personalized Tags',
  },
  {
    number: '03',
    title: 'Bulk Kitchen, Cafe & Studio Supply',
    icon: 'supply',
    image: MEDIA.ritualCulinary,
    imageAlt: 'A golden curry in a rustic bowl for a bulk kitchen supply concept',
    idealFor: 'Cloud kitchens, specialty cafes, wellness studios, and boutique grocers.',
    features: [
      '2kg, 5kg, and 10kg pack-size concepts',
      'Airtight food-grade refill pack concept',
      'Wholesale slab pricing on request',
      'Fresh milling-to-order goal',
    ],
    badge: 'MOQ: 2 kg • Freshly Milled to Order',
  },
];

export const READY_TO_SHIP_GIFTS = [
  {
    id: 'gift-golden-ritual-box',
    name: 'The Golden Ritual Gift Box',
    image: MEDIA.ritualElixir,
    imageAlt: 'Golden milk and turmeric jar styled as a curated ritual gift box',
    price: 899,
    variant: {
      id: 'golden-ritual-gift-box',
      label: 'Gift Box · 250g Haldi + Pepper + Brass Spoon + Recipe Card',
      price: 899,
    },
    contents: [
      '250g Everyday Haldi Jar',
      '50g Crushed Black Pepper',
      'Handcrafted Brass Spoon',
      'Recipe Card',
    ],
  },
  {
    id: 'gift-festive-heirloom-trio',
    name: 'The Festive Heirloom Trio',
    image: MEDIA.jarPrimary,
    imageAlt: 'Amber turmeric jar and golden ingredients styled as a festive gift',
    price: 1299,
    variant: {
      id: 'festive-heirloom-trio',
      label: 'Gift Box · Haldi Powder + Raw Roots + Wild Forest Honey',
      price: 1299,
    },
    contents: [
      '250g Haldi Powder',
      '200g Sun-Dried Raw Roots',
      'Wild Forest Honey',
      'Keepsake Box',
    ],
  },
];

export const BULK_VOLUME_TIERS = [
  {
    volume: '15–49 Units / 2–5 kg',
    saving: 'Up to 15% Off',
    inclusion: 'Custom Gift Note',
  },
  {
    volume: '50–149 Units / 5–15 kg',
    saving: 'Up to 25% Off',
    inclusion: 'Custom Branded Sleeve / Tag',
  },
  {
    volume: '150+ Units / 15+ kg',
    saving: 'Custom Wholesale Pricing',
    inclusion: 'Dedicated Account Manager & Pan-India Dispatch',
  },
];

export const GIFTING_INQUIRY_TYPES = [
  'Festive / Corporate Gifting',
  'Wedding / Haldi Ceremony Favors',
  'Bulk Cafe / Kitchen Supply',
  'Retail Partnership',
];
