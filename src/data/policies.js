export const POLICY_SECTIONS = [
  {
    id: 'shipping',
    label: 'Shipping & Delivery',
    eyebrow: '01 / Delivery',
    title: 'Shipping & Delivery Policy',
    intro:
      'The following delivery details are the proposed storefront policy and must be confirmed against active courier and fulfilment arrangements before publication.',
    sections: [
      {
        heading: 'Processing and dispatch',
        paragraphs: [
          'Orders are proposed to be dispatched within 24–48 business hours from the packing studio after payment or order confirmation. Business hours exclude Sundays and public holidays.',
        ],
      },
      {
        heading: 'Shipping charges',
        paragraphs: [
          'The proposed shipping rate is free express delivery for orders above ₹599 and a flat ₹49 charge for orders below ₹599. The final shipping charge should be shown at checkout before an order is placed.',
        ],
      },
      {
        heading: 'Estimated transit time',
        paragraphs: [
          'Estimated delivery is 2–4 business days for metro locations and 4–6 business days for other serviceable India destinations after dispatch. These are estimates, not guaranteed delivery dates; weather, peak periods, and courier constraints can cause delays.',
        ],
      },
      {
        heading: 'Cash on Delivery',
        paragraphs: [
          'COD has been proposed as an option, but availability by PIN code, order value, fees, and collection rules have not been configured. Only payment options shown at checkout can be treated as available.',
        ],
      },
    ],
  },
  {
    id: 'refunds',
    label: 'Returns & Purity Guarantee',
    eyebrow: '02 / Care',
    title: 'Return, Replacement & 100% Purity Guarantee',
    intro:
      'This draft policy describes the intended customer-care approach. The guarantee, eligibility, and refund workflow must be approved and connected before being represented as an active commitment.',
    sections: [
      {
        heading: '7-Day Kitchen Purity Guarantee',
        paragraphs: [
          'The proposed 7-Day Kitchen Purity Guarantee invites customers who are unhappy with the aroma, color, or purity of their haldi to contact support within 7 days of delivery to request a replacement or full refund.',
          'Please include your order ID and a short description of the concern. Support will confirm the next steps and eligibility under the final published terms.',
        ],
      },
      {
        heading: 'Damaged or leaking parcel',
        paragraphs: [
          'For a jar damaged or leaking in transit, the draft process is to contact support within 48 hours of delivery and share clear photos of the item and outer packaging for review.',
          'A free replacement is a proposed remedy and is subject to final confirmation, stock availability, and the approved claims process.',
        ],
      },
      {
        heading: 'Refund processing',
        paragraphs: [
          'Refund method, processing time, return pickup, and any exclusions have not yet been configured. Confirm these details with support before returning a product; do not send an item to an unverified address.',
        ],
      },
    ],
  },
  {
    id: 'privacy',
    label: 'Privacy Policy',
    eyebrow: '03 / Privacy',
    title: 'Privacy Policy',
    intro:
      'This is plain-language draft copy for review, not a published privacy notice. The business must verify its actual data practices, vendors, retention periods, and legal obligations before launch.',
    sections: [
      {
        heading: 'Information you provide',
        paragraphs: [
          'A working store may collect contact details, delivery addresses, order information, and messages you submit to support so it can process and assist with orders. This prototype does not submit support forms to a server, and its demo checkout does not create a real order.',
        ],
      },
      {
        heading: 'Payments and security',
        paragraphs: [
          'This prototype does not process payments. In a live store, payment details should be handled by the selected payment provider; do not claim encrypted payment processing until the integration and security practices have been verified.',
        ],
      },
      {
        heading: 'How information is used and shared',
        paragraphs: [
          'The intended policy is to use personal information only for order fulfilment, customer support, and services requested by the customer, and not to sell or rent personal data. Any sharing with couriers, payment services, or other processors must be disclosed in the final notice.',
        ],
      },
      {
        heading: 'Your choices and questions',
        paragraphs: [
          'Customers should be able to request access, correction, or deletion where applicable and contact the store with privacy questions. Configure a verified support channel and define data retention and response procedures before publishing this policy.',
        ],
      },
    ],
  },
  {
    id: 'terms',
    label: 'Terms of Service',
    eyebrow: '04 / Terms',
    title: 'Terms of Service',
    intro:
      'These draft terms are a general storefront outline and are not legal advice. Have the final terms reviewed for the operating business and applicable Indian law before launch.',
    sections: [
      {
        heading: 'Website use and orders',
        paragraphs: [
          'Use the website lawfully and provide accurate information when placing an order. An order is subject to product availability, confirmation, and the final checkout terms. This prototype does not accept or fulfil real orders.',
        ],
      },
      {
        heading: 'Product details and pricing',
        paragraphs: [
          'Product images and descriptions should represent the items offered, while natural variations in color, texture, and appearance may occur. The proposed pricing is intended to include applicable GST, but tax treatment and the final payable amount must be verified and shown clearly before purchase.',
        ],
      },
      {
        heading: 'Subscriptions',
        paragraphs: [
          'The proposed subscription plan is intended to allow customers to pause, skip, or cancel at any time without a cancellation fee. Subscription functionality is not active in this prototype; final billing, renewal, notice, and cancellation terms remain to be confirmed.',
        ],
      },
      {
        heading: 'Governing law',
        paragraphs: [
          'The proposed governing law is India, subject to the final legal review and confirmation of the business jurisdiction and dispute-resolution terms.',
        ],
      },
    ],
  },
];
