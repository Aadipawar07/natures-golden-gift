import { MEDIA } from '../assets/media';

export const PACK_SIZES = [
  { id: '100g', label: '100g Trial Pack', grams: 100, price: 249, compareAt: 299, tag: 'Starter' },
  { id: '250g', label: '250g Everyday Pack', grams: 250, price: 549, compareAt: 649, tag: 'Most Popular' },
  { id: '500g', label: '500g Family Pack', grams: 500, price: 999, compareAt: 1199, tag: 'Best Value' },
];

export const PDP_SUBSCRIBE_DISCOUNT_PERCENT = 15;

export const PRODUCTS = [
  {
    id: 'ngg-signature-turmeric',
    slug: 'signature-golden-turmeric',
    name: "Nature's Golden Gift — Pure Ground Turmeric",
    subtitle: 'Single-origin small-batch apothecary jar',
    shortDescription:
      'Vibrant, aromatic ground turmeric housed in UV-protected amber glass to preserve natural colour and warmth.',
    longDescription:
      'Carefully sourced and milled in small batches for everyday Indian kitchens, evening golden milk, and traditional botanical rituals. Packaged in reusable amber glass with a linen-textured label.',
    image: MEDIA.jarPrimary,
    hoverImage: MEDIA.powderMortar,
    gallery: [MEDIA.jarPrimary, MEDIA.powderMortar, MEDIA.rootsMacro, MEDIA.kitchenJar],
    variants: PACK_SIZES,
    defaultVariantId: '250g',
    subscribeDiscountPercent: 12,
    demoRating: 4.9,
    demoReviewCount: 128,
    isDemoData: true,
    specifications: [
      { label: 'Form', value: 'Finely milled natural turmeric powder' },
      { label: 'Packaging', value: 'Reusable UV-amber glass apothecary jar' },
      { label: 'Origin Status', value: 'Configurable single-origin batch (Sample)' },
      { label: 'Credentials', value: 'FSSAI & Organic IDs pending verification' },
    ],
    category: 'Everyday Powder',
    badge: 'Signature',
    pdpDescription:
      'A velvety, deep-gold powder with a gently earthy aroma. Made for slow-simmered dals, bright curries, and a quiet cup of haldi doodh.',
    ingredients: 'Turmeric (Curcuma longa). Batch composition pending confirmation.',
    origin: 'Harvest region and batch traceability details pending verification.',
    storage: 'Keep sealed in a cool, dry place away from direct sunlight. Refer to the final pack for best-before details.',
  },
  {
    id: 'ngg-trial-pouch',
    slug: 'golden-harvest-trial-pack',
    name: 'First Harvest — 100g Trial Jar',
    subtitle: 'Ideal for evening elixirs & first-time tasting',
    shortDescription:
      'Experience the aroma, deep amber hue, and earthy warmth in a compact apothecary jar.',
    longDescription:
      'Sized for curious kitchens and evening golden milk rituals. Sealed fresh in small batches without artificial colours or fillers.',
    image: MEDIA.rootsMacro,
    hoverImage: MEDIA.jarPrimary,
    gallery: [MEDIA.rootsMacro, MEDIA.jarPrimary],
    variants: [PACK_SIZES[0], PACK_SIZES[1]],
    defaultVariantId: '100g',
    subscribeDiscountPercent: 10,
    demoRating: 4.8,
    demoReviewCount: 46,
    isDemoData: true,
    specifications: [
      { label: 'Net Weight', value: '100g' },
      { label: 'Best For', value: 'Golden milk, tastings & gifting' },
    ],
    category: 'Everyday Powder',
    badge: 'Trial Pack',
    pdpDescription:
      'A small first taste of warm, earthy haldi. Its compact size makes it easy to try in a favorite curry or evening milk.',
    ingredients: 'Turmeric (Curcuma longa). Batch composition pending confirmation.',
    origin: 'Harvest region and batch traceability details pending verification.',
    storage: 'Keep sealed in a cool, dry place away from direct sunlight. Refer to the final pack for best-before details.',
  },
  {
    id: 'ngg-family-reserve',
    slug: 'family-kitchen-reserve-500g',
    name: 'Kitchen Reserve — 500g Family Pack',
    subtitle: 'Generous daily cooking staple for Indian homes',
    shortDescription:
      'Crafted for households that cook with turmeric every day—from morning tadka to comforting dals.',
    longDescription:
      'Our largest format brings better per-gram value for families who rely on pure, vibrant turmeric across everyday meals.',
    image: MEDIA.kitchenJar,
    hoverImage: MEDIA.jarPrimary,
    gallery: [MEDIA.kitchenJar, MEDIA.jarPrimary, MEDIA.powderMortar],
    variants: [PACK_SIZES[2], PACK_SIZES[1]],
    defaultVariantId: '500g',
    subscribeDiscountPercent: 15,
    demoRating: 4.9,
    demoReviewCount: 84,
    isDemoData: true,
    specifications: [
      { label: 'Net Weight', value: '500g' },
      { label: 'Best For', value: 'Daily dals, curries & family kitchens' },
    ],
    category: 'Refill Pouches',
    badge: 'Family Size',
    pdpDescription:
      'A generous kitchen staple with a warm, rounded aroma. Made for everyday cooking, from morning tadka to a family pot of dal.',
    ingredients: 'Turmeric (Curcuma longa). Batch composition pending confirmation.',
    origin: 'Harvest region and batch traceability details pending verification.',
    storage: 'Keep sealed in a cool, dry place away from direct sunlight. Refer to the final pack for best-before details.',
  },
  {
    id: 'ngg-ritual-bundle',
    slug: 'golden-milk-ritual-bundle',
    name: 'Nighttime Elixir — Golden Milk Bundle',
    subtitle: '250g Turmeric Jar + Cracked Black Pepper Pairing (Demo)',
    shortDescription:
      'Everything needed for a comforting evening haldi doodh ritual, bundled with a 12% savings.',
    longDescription:
      'Pairs our 250g Everyday Turmeric Jar with a sample tin of aromatic crushed black pepper for your nighttime kitchen ritual.',
    image: MEDIA.ritualElixir,
    hoverImage: MEDIA.jarPrimary,
    gallery: [MEDIA.ritualElixir, MEDIA.jarPrimary],
    variants: [
      { id: 'bundle-250g', label: '250g Jar + Pepper Pairing', grams: null, price: 699, compareAt: 799, tag: 'Bundle Save' },
    ],
    defaultVariantId: 'bundle-250g',
    subscribeDiscountPercent: 12,
    demoRating: 5.0,
    demoReviewCount: 39,
    isDemoData: true,
    specifications: [
      { label: 'Includes', value: '250g Turmeric Jar + 30g Crushed Black Pepper (Demo)' },
      { label: 'Savings', value: '₹100 bundle savings' },
    ],
    category: 'Wellness Gift Boxes',
    badge: 'Ritual Duo',
    pdpDescription:
      'An easy pairing for a softly spiced evening drink. The golden blend meets a little peppery warmth for a comforting kitchen ritual.',
    ingredients: 'Turmeric and black pepper pairing. Exact ingredients and weights pending confirmation.',
    origin: 'Ingredient origins and batch traceability details pending verification.',
    storage: 'Keep each ingredient sealed in a cool, dry place. Refer to the final pack for best-before details.',
  },
];

export const COLLECTION_CATEGORIES = [
  'All Products',
  'Everyday Powder',
  'Raw Whole Roots',
  'Refill Pouches',
  'Wellness Gift Boxes',
];

const collectionPack = (id, label, grams, price, tag) => ({
  id,
  label,
  grams,
  price,
  tag,
});

export const COLLECTION_PRODUCTS = [
  {
    id: 'collection-heirloom-powder',
    slug: 'heirloom-everyday-haldi-powder',
    name: 'Heirloom Everyday Haldi Powder',
    category: 'Everyday Powder',
    badge: 'Bestseller',
    subtitle: 'A velvety everyday powder with a deep-gold hue',
    shortDescription: 'Deep-gold, warmly aromatic powder for everyday cooking.',
    longDescription:
      'A softly earthy, fine-milled haldi for home cooking and evening milk. Product sourcing and batch details are sample copy pending verification.',
    pdpDescription:
      'A velvety, deep-gold powder with a gently earthy aroma. Made for slow-simmered dals, bright curries, and a quiet cup of haldi doodh.',
    ingredients: 'Turmeric (Curcuma longa). Batch composition pending confirmation.',
    origin: 'Harvest region and batch traceability details pending verification.',
    storage: 'Keep sealed in a cool, dry place away from direct sunlight. Refer to the final pack for best-before details.',
    image: MEDIA.jarPrimary,
    hoverImage: MEDIA.powderMortar,
    gallery: [MEDIA.jarPrimary, MEDIA.powderMortar, MEDIA.rootsMacro, MEDIA.ritualElixir],
    variants: [
      collectionPack('100g', '100g Trial Jar', 100, 249, 'Trial'),
      collectionPack('250g', '250g Everyday Jar', 250, 549, 'Most Popular'),
      collectionPack('500g', '500g Family Refill', 500, 999, 'Value Pack'),
    ],
    defaultVariantId: '250g',
    subscribeDiscountPercent: 15,
    demoRating: 4.9,
    demoReviewCount: 128,
    isDemoData: true,
  },
  {
    id: 'collection-whole-roots',
    slug: 'sun-dried-raw-whole-turmeric-roots',
    name: 'Sun-Dried Raw Whole Turmeric Roots',
    category: 'Raw Whole Roots',
    badge: 'Whole Roots',
    subtitle: 'Earthy whole roots for your own kitchen ritual',
    shortDescription: 'Earthy, golden rhizomes ready for your own kitchen ritual.',
    longDescription:
      'Whole turmeric roots for grating, steeping, or preparing in your preferred way. Product sourcing and batch details are sample copy pending verification.',
    pdpDescription:
      'Firm, earthy rhizomes with a vivid golden center. A whole-root format for cooks who enjoy preparing their ingredients by hand.',
    ingredients: 'Whole turmeric root (Curcuma longa). Batch composition pending confirmation.',
    origin: 'Harvest region and batch traceability details pending verification.',
    storage: 'Keep completely dry and sealed in a cool, dark place. Follow final pack storage guidance.',
    image: MEDIA.rootsMacro,
    hoverImage: MEDIA.rootsSoil,
    gallery: [MEDIA.rootsMacro, MEDIA.rootsSoil, MEDIA.jarPrimary, MEDIA.ritualCulinary],
    variants: [
      collectionPack('100g', '100g', 100, 299, 'Trial'),
      collectionPack('250g', '250g', 250, 649, 'Pantry'),
      collectionPack('500g', '500g', 500, 1199, 'Value Pack'),
    ],
    defaultVariantId: '250g',
    subscribeDiscountPercent: 15,
    demoRating: 4.8,
    demoReviewCount: 46,
    isDemoData: true,
  },
  {
    id: 'collection-family-refill',
    slug: 'eco-friendly-family-refill-pouch',
    name: 'Eco-Friendly Family Refill Pouch',
    category: 'Refill Pouches',
    badge: 'Value Pack',
    subtitle: 'A generous refill for a well-loved everyday kitchen',
    shortDescription: 'A generous refill for well-loved everyday kitchens.',
    longDescription:
      'A larger format designed for kitchens that reach for haldi every day. Final packaging material and batch details pending verification.',
    pdpDescription:
      'A generous refill with a warm, rounded aroma, ready for everyday tadka, dals, and curries. Pouch material details are pending confirmation.',
    ingredients: 'Turmeric (Curcuma longa). Batch composition pending confirmation.',
    origin: 'Harvest region and batch traceability details pending verification.',
    storage: 'Reseal after opening and store in a cool, dry place away from sunlight. Refer to the final pack for best-before details.',
    image: MEDIA.kitchenJar,
    hoverImage: MEDIA.jarPrimary,
    gallery: [MEDIA.kitchenJar, MEDIA.jarPrimary, MEDIA.powderMortar, MEDIA.ritualCulinary],
    variants: [
      collectionPack('250g', '250g Refill', 250, 449, 'Refill'),
      collectionPack('500g', '500g Family Size', 500, 849, 'Family Size'),
      collectionPack('1kg', '1kg Pantry Size', 1000, 1599, 'Best Value'),
    ],
    defaultVariantId: '500g',
    subscribeDiscountPercent: 15,
    demoRating: 4.9,
    demoReviewCount: 84,
    isDemoData: true,
  },
  {
    id: 'collection-golden-milk-duo',
    slug: 'golden-milk-black-pepper-ritual-duo',
    name: 'Golden Milk & Black Pepper Ritual Duo',
    category: 'Wellness Gift Boxes',
    badge: 'Ritual Duo',
    subtitle: 'An evening pairing for a softly spiced golden milk',
    shortDescription: 'A comforting golden-milk pairing with warming black pepper.',
    longDescription:
      'A turmeric and black pepper pairing for a comforting evening drink. Bundle composition and weights shown here are sample details.',
    pdpDescription:
      'A softly spiced pairing for evening haldi doodh, with earthy turmeric and a touch of peppery warmth. A simple, comforting kitchen ritual.',
    ingredients: 'Turmeric and black pepper pairing. Exact ingredients and weights pending confirmation.',
    origin: 'Ingredient origins and batch traceability details pending verification.',
    storage: 'Keep both ingredients sealed in a cool, dry place. Refer to final packs for best-before details.',
    image: MEDIA.ritualElixir,
    hoverImage: MEDIA.jarPrimary,
    gallery: [MEDIA.ritualElixir, MEDIA.jarPrimary, MEDIA.powderMortar, MEDIA.ritualCulinary],
    variants: [
      collectionPack('ritual-duo', 'Jar + Pepper Duo', null, 699, 'Ritual Duo'),
    ],
    defaultVariantId: 'ritual-duo',
    subscribeDiscountPercent: 15,
    demoRating: 5.0,
    demoReviewCount: 39,
    isDemoData: true,
  },
  {
    id: 'collection-wellness-gift-box',
    slug: 'artisanal-haldi-wellness-gift-box',
    name: 'Artisanal Haldi Wellness Gift Box',
    category: 'Wellness Gift Boxes',
    badge: 'Gift Ready',
    subtitle: 'A thoughtful golden ritual for someone special',
    shortDescription: 'A thoughtful golden ritual, wrapped for someone special.',
    longDescription:
      'A sample gift set concept inspired by daily haldi rituals. Final contents, packaging, and pricing are to be confirmed.',
    pdpDescription:
      'A considered gift for someone who loves a golden kitchen ritual. The pictured set is an editorial preview; final contents are pending confirmation.',
    ingredients: 'Final gift-box contents and ingredient list pending confirmation.',
    origin: 'Ingredient origins and batch traceability details pending verification.',
    storage: 'Follow the storage instructions printed on each final product pack.',
    image: MEDIA.powderMortar,
    hoverImage: MEDIA.rootsMacro,
    gallery: [MEDIA.powderMortar, MEDIA.rootsMacro, MEDIA.jarPrimary, MEDIA.ritualElixir],
    variants: [
      collectionPack('gift-box', 'Gift Box', null, 1299, 'Gift Ready'),
    ],
    defaultVariantId: 'gift-box',
    subscribeDiscountPercent: 15,
    demoRating: 4.9,
    demoReviewCount: 24,
    isDemoData: true,
  },
];

export const RITUAL_BUNDLE = {
  id: 'collection-custom-ritual-bundle',
  name: 'Build Your Custom Ritual Bundle',
  image: MEDIA.ritualElixir,
  variants: [
    {
      id: 'custom-ritual-bundle',
      label: 'Powder + Pepper + Brass Spoon',
      price: 764,
      compareAt: 899,
      tag: '15% Bundle Saving',
    },
  ],
};

export const CROSS_SELL_PRODUCTS = [
  {
    id: 'sample-crushed-black-pepper',
    name: 'Crushed Black Pepper',
    image: MEDIA.ritualCulinary,
    variants: [{ id: 'pepper-50g', label: '50g Sample Tin', price: 149 }],
  },
  {
    id: 'sample-brass-spoon',
    name: 'Brass Measuring Spoon',
    image: MEDIA.ritualElixir,
    variants: [{ id: 'spoon-one', label: 'One Spoon', price: 349 }],
  },
  {
    id: 'sample-golden-milk-duo',
    name: 'Golden Milk Ritual Duo',
    image: MEDIA.ritualElixir,
    variants: [{ id: 'duo-one', label: 'Sample Duo', price: 699 }],
  },
];

export const PDP_USAGE_RITUALS = [
  {
    title: 'Daily Culinary Cooking',
    amount: '½ tsp',
    description: 'Stir into dals, curries, and warm oil for a golden everyday meal.',
    icon: 'cooking',
  },
  {
    title: 'Golden Milk / Haldi Doodh',
    amount: '½ tsp',
    description: 'Whisk with warm milk and a pinch of black pepper.',
    icon: 'milk',
  },
  {
    title: 'Botanical Glow Mask',
    amount: '¼ tsp',
    description: 'Blend with raw honey and yogurt; patch test before use.',
    icon: 'mask',
  },
];

export const PDP_DEMO_REVIEWS = [
  {
    id: 'rev-1',
    name: 'Aarav M.',
    location: 'Mumbai, MH',
    category: 'Cooking',
    rating: 5,
    quote:
      'The aroma hits the pan the moment it touches warm ghee. Our everyday dal has a rich, natural golden hue without needing much.',
    packPurchased: '250g Everyday Pack',
    date: 'Sample date',
    image: MEDIA.ritualCulinary,
    mediaType: 'image',
    isDemo: true,
  },
  {
    id: 'rev-2',
    name: 'Meera K.',
    location: 'Bengaluru, KA',
    category: 'Rituals',
    rating: 5,
    quote:
      'My 10 PM haldi doodh feels like an actual café ritual now. Smooth, earthy, and zero chalky aftertaste.',
    packPurchased: 'Golden Milk Bundle',
    date: 'Sample date',
    image: MEDIA.ritualElixir,
    mediaType: 'image',
    isDemo: true,
  },
  {
    id: 'rev-3',
    name: 'Rhea S.',
    location: 'Pune, MH',
    category: 'Skincare',
    rating: 5,
    quote:
      'I use a tiny pinch with raw honey and dahi on Sunday mornings. Love that the amber jar looks serene on my counter too.',
    packPurchased: '100g Trial Pack',
    date: 'Sample date',
    image: MEDIA.ritualSkincare,
    mediaType: 'image',
    isDemo: true,
  },
  {
    id: 'rev-4',
    name: 'Vikram & Ananya',
    location: 'New Delhi, DL',
    category: 'Cooking',
    rating: 5,
    quote:
      'Switched to the 500g family jar for our kitchen. Clean packaging, warm colour, and transparent batch placeholders we appreciate.',
    packPurchased: '500g Family Pack',
    date: 'Sample date',
    image: MEDIA.kitchenJar,
    mediaType: 'image',
    isDemo: true,
  },
];

export const ALL_PRODUCTS = [...PRODUCTS, ...COLLECTION_PRODUCTS].map((product) => ({
  ...product,
  usageRituals: product.usageRituals || PDP_USAGE_RITUALS,
  reviews: product.reviews || PDP_DEMO_REVIEWS,
}));
export const DEFAULT_PRODUCT = ALL_PRODUCTS.find(
  (product) => product.slug === 'heirloom-everyday-haldi-powder'
);

export function findProductBySlug(slug) {
  return ALL_PRODUCTS.find((product) => product.slug === slug || product.id === slug) || null;
}
