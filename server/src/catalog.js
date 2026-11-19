const products = [
  {
    id: 'ngg-signature-turmeric',
    title: "Nature's Golden Gift — Pure Ground Turmeric",
    subscriptionDiscountPercent: 12,
    variants: [
      { id: '100g', packSize: '100g', grams: 100, price: 249 },
      { id: '250g', packSize: '250g', grams: 250, price: 549 },
      { id: '500g', packSize: '500g', grams: 500, price: 999 },
    ],
  },
  {
    id: 'ngg-trial-pouch',
    title: 'First Harvest — 100g Trial Jar',
    subscriptionDiscountPercent: 10,
    variants: [
      { id: '100g', packSize: '100g', grams: 100, price: 249 },
      { id: '250g', packSize: '250g', grams: 250, price: 549 },
    ],
  },
  {
    id: 'ngg-family-reserve',
    title: 'Kitchen Reserve — 500g Family Pack',
    subscriptionDiscountPercent: 15,
    variants: [
      { id: '500g', packSize: '500g', grams: 500, price: 999 },
      { id: '250g', packSize: '250g', grams: 250, price: 549 },
    ],
  },
  {
    id: 'ngg-ritual-bundle',
    title: 'Nighttime Elixir — Golden Milk Bundle',
    subscriptionDiscountPercent: 12,
    variants: [
      { id: 'bundle-250g', packSize: '250g jar + pepper pairing', grams: 300, price: 699 },
    ],
  },
  {
    id: 'collection-heirloom-powder',
    title: 'Heirloom Everyday Haldi Powder',
    subscriptionDiscountPercent: 15,
    variants: [
      { id: '100g', packSize: '100g', grams: 100, price: 249 },
      { id: '250g', packSize: '250g', grams: 250, price: 549 },
      { id: '500g', packSize: '500g', grams: 500, price: 999 },
    ],
  },
  {
    id: 'collection-whole-roots',
    title: 'Sun-Dried Raw Whole Turmeric Roots',
    subscriptionDiscountPercent: 15,
    variants: [
      { id: '100g', packSize: '100g', grams: 100, price: 299 },
      { id: '250g', packSize: '250g', grams: 250, price: 649 },
      { id: '500g', packSize: '500g', grams: 500, price: 1199 },
    ],
  },
  {
    id: 'collection-family-refill',
    title: 'Eco-Friendly Family Refill Pouch',
    subscriptionDiscountPercent: 15,
    variants: [
      { id: '250g', packSize: '250g', grams: 250, price: 449 },
      { id: '500g', packSize: '500g', grams: 500, price: 849 },
      { id: '1kg', packSize: '1kg', grams: 1000, price: 1599 },
    ],
  },
  {
    id: 'collection-golden-milk-duo',
    title: 'Golden Milk & Black Pepper Ritual Duo',
    subscriptionDiscountPercent: 15,
    variants: [
      { id: 'ritual-duo', packSize: 'jar + pepper duo', grams: 300, price: 699 },
    ],
  },
  {
    id: 'collection-wellness-gift-box',
    title: 'Artisanal Haldi Wellness Gift Box',
    subscriptionDiscountPercent: 15,
    variants: [
      { id: 'gift-box', packSize: 'gift box', grams: 700, price: 1299 },
    ],
  },
  {
    id: 'collection-custom-ritual-bundle',
    title: 'Build Your Custom Ritual Bundle',
    subscriptionDiscountPercent: 0,
    variants: [
      { id: 'custom-ritual-bundle', packSize: 'powder + pepper + brass spoon', grams: 500, price: 764 },
    ],
  },
  {
    id: 'sample-crushed-black-pepper',
    title: 'Crushed Black Pepper',
    subscriptionDiscountPercent: 0,
    variants: [
      { id: 'pepper-50g', packSize: '50g sample tin', grams: 50, price: 149 },
    ],
  },
  {
    id: 'sample-brass-spoon',
    title: 'Brass Measuring Spoon',
    subscriptionDiscountPercent: 0,
    variants: [
      { id: 'spoon-one', packSize: 'one spoon', grams: 80, price: 349 },
    ],
  },
  {
    id: 'sample-golden-milk-duo',
    title: 'Golden Milk Ritual Duo',
    subscriptionDiscountPercent: 0,
    variants: [
      { id: 'duo-one', packSize: 'sample duo', grams: 300, price: 699 },
    ],
  },
  {
    id: 'gift-golden-ritual-box',
    title: 'The Golden Ritual Gift Box',
    subscriptionDiscountPercent: 0,
    variants: [
      { id: 'golden-ritual-gift-box', packSize: '250g haldi + pepper + brass spoon', grams: 700, price: 899 },
    ],
  },
  {
    id: 'gift-festive-heirloom-trio',
    title: 'The Festive Heirloom Trio',
    subscriptionDiscountPercent: 0,
    variants: [
      { id: 'festive-heirloom-trio', packSize: 'haldi + raw roots + honey gift box', grams: 1000, price: 1299 },
    ],
  },
];

export const CATALOG = Object.freeze(
  Object.fromEntries(
    products.flatMap((product) =>
      product.variants.map((variant) => {
        const sku = `${product.id}__${variant.id}`;
        return [
          sku,
          Object.freeze({
            sku,
            productId: product.id,
            variantId: variant.id,
            title: product.title,
            packSize: variant.packSize,
            grams: variant.grams,
            shippingWeightGrams: Math.max(300, variant.grams),
            price: variant.price,
            subscriptionDiscountPercent: product.subscriptionDiscountPercent,
          }),
        ];
      })
    )
  )
);

function getSku(line) {
  if (typeof line?.sku === 'string') return line.sku.trim();
  if (typeof line?.productId === 'string' && typeof line?.variantId === 'string') {
    return `${line.productId.trim()}__${line.variantId.trim()}`;
  }
  if (typeof line?.key === 'string') {
    const [productId, variantId] = line.key.split('__');
    if (productId && variantId) return `${productId}__${variantId}`;
  }
  return '';
}

export function calculateCart(items, couponCode = '') {
  if (!Array.isArray(items) || items.length === 0 || items.length > 50) {
    throw new Error('Provide between 1 and 50 cart items.');
  }

  const pricedItems = items.map((line) => {
    const sku = getSku(line);
    const catalogItem = CATALOG[sku];
    if (!catalogItem) throw new Error(`Unknown cart item: ${sku || 'missing SKU'}.`);

    const qty = line.qty ?? line.quantity;
    if (!Number.isSafeInteger(qty) || qty < 1 || qty > 99) {
      throw new Error('Each item quantity must be an integer from 1 to 99.');
    }

    const purchaseType = line.purchaseType === 'subscribe' ? 'subscribe' : 'one-time';
    const discountPercent =
      purchaseType === 'subscribe' ? catalogItem.subscriptionDiscountPercent : 0;
    const price = Math.round(catalogItem.price * (1 - discountPercent / 100));

    return {
      sku,
      productId: catalogItem.productId,
      variantId: catalogItem.variantId,
      title: catalogItem.title,
      packSize: catalogItem.packSize,
      qty,
      price,
      lineTotal: price * qty,
      purchaseType,
      shippingWeightGrams: catalogItem.shippingWeightGrams,
    };
  });

  const subtotal = pricedItems.reduce((sum, item) => sum + item.lineTotal, 0);
  const normalizedCoupon = typeof couponCode === 'string' ? couponCode.trim().toUpperCase() : '';
  if (normalizedCoupon && normalizedCoupon !== 'PURE10') {
    throw new Error('The coupon code is not valid.');
  }

  const discount = normalizedCoupon === 'PURE10' ? Math.round(subtotal * 0.1) : 0;
  const shippingFee = subtotal >= 599 ? 0 : 49;
  const totalAmount = subtotal - discount + shippingFee;
  const totalWeightGrams = Math.max(
    300,
    pricedItems.reduce((sum, item) => sum + item.shippingWeightGrams * item.qty, 0)
  );

  return {
    items: pricedItems,
    subtotal,
    discount,
    shippingFee,
    totalAmount,
    totalWeightKg: Number((totalWeightGrams / 1000).toFixed(3)),
  };
}
