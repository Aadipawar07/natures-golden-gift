import { MEDIA } from '../assets/media';

export const STORY_VERIFICATION_NOTICE =
  'Farm identities, soil and crop inputs, harvest timing, farmer compensation, and processing details on this page are illustrative draft copy pending verification.';

export const OUR_STORY_HERO = {
  eyebrow: 'OUR STORY • ROOTED IN HONESTY',
  title: 'Nine Months in the Soil. Zero Shortcuts to Your Jar.*',
  subtitle:
    'An illustrated look at the care we want from soil to jar—and the farm, harvest, and process details we are still verifying before making batch-specific promises.',
  image: MEDIA.heroLandscape,
  imageAlt: 'Sunlit, painterly hillside landscape in warm golden-hour light',
};

export const TERROIR_STORY = {
  eyebrow: '01 / THE TERROIR',
  title: 'Mineral-Rich Earth Makes Potent Roots*',
  paragraphs: [
    'A root’s character begins in the field. The soil profile, farm identity, crop inputs, and harvest timing for the current collection have not yet been verified, so mineral, chemical-free, and potency claims remain unconfirmed.',
    'Our intended sourcing story centers on heirloom rhizomes and an unhurried growing season. The nine-month cycle and single-origin status must be confirmed against partner and batch records before they can be treated as product facts.',
  ],
  image: MEDIA.rootsSoil,
  imageAlt: 'Illustrated turmeric rhizomes nestled in dark, textured soil',
  imageLabel: 'Below the soil · concept art',
  details: true,
  metrics: [
    { value: '9 Months*', label: 'Target maturation cycle' },
    { value: '100%*', label: 'Heirloom rhizomes' },
    { value: 'Zero*', label: 'Added dyes' },
  ],
};

export const FARMER_STORY = {
  eyebrow: '02 / DIRECT PARTNERSHIPS',
  title: 'Grown by Hands We Know by Name*',
  paragraphs: [
    'Our goal is to build lasting partnerships with growers and make the value behind each harvest visible. The current partner roster, direct-purchase terms, number of intermediaries, and above-market payment claims are not yet verified.',
    'When specific farms and payment practices are confirmed, we can share those stories with permission and name the people behind each batch. Until then, this scene and its language are sample brand storytelling—not a verified farmer profile.',
  ],
  image: MEDIA.farmFields,
  imageAlt: 'Illustrated Indian farm landscape at sunrise, shown as concept art',
  imageLabel: 'Grower partnership · concept art',
  quote:
    '“When farmers are paid for potency instead of weight, they let the root mature until it turns deep burnt-amber inside.”',
  quoteAttribution: 'Illustrative brand copy · not a verified farmer quote',
};

export const FARM_TO_JAR_STEPS = [
  {
    number: '01',
    title: 'Hand-Harvested at Peak Maturity',
    description:
      'The planned story follows a careful harvest guided by crop maturity. Exact timing, hand-harvest methods, and yield details need confirmation from farm records.',
    image: MEDIA.farmFields,
    imageAlt: 'Illustrated crop landscape representing a harvest scene',
    imageLabel: 'Harvest · process details pending',
  },
  {
    number: '02',
    title: 'Gentle Washing & Sun-Drying',
    description:
      'Gentle cleaning and slow drying are part of the intended process story. Water source, curing method, and batch handling must be confirmed before publication.',
    image: MEDIA.rootsSoil,
    imageAlt: 'Illustrated turmeric roots after harvest',
    imageLabel: 'Curing · process details pending',
  },
  {
    number: '03',
    title: 'Small-Batch Cold Milling',
    description:
      'Low-temperature, small-batch milling is a target, not a confirmed specification. Mill setup, batch size, and temperature records are still to be verified.',
    image: MEDIA.powderMortar,
    imageAlt: 'Illustrated turmeric powder beside whole roots and a stone mortar',
    imageLabel: 'Milling · process details pending',
  },
  {
    number: '04',
    title: 'Sealed in UV-Safe Apothecary Jars',
    description:
      'Amber glass is the intended packaging story. Jar specifications, light-protection claims, and time from milling to sealing need confirmation from suppliers and batch records.',
    image: MEDIA.jarPrimary,
    imageAlt: 'Illustrated amber turmeric jar',
    imageLabel: 'Packaging · specifications pending',
  },
];

export const VALUE_COMPARISON = [
  {
    label: 'Sourcing',
    standard:
      'Origin and blending practices vary by supplier; there is no single pattern across all commercial products.',
    our:
      'Single-origin lots are a planned standard. Farm identity and lot traceability are pending verification.',
  },
  {
    label: 'Milling',
    standard:
      'Equipment and grinding conditions differ by producer; process claims should be checked product by product.',
    our:
      'Cold milling is the intended approach. Mill conditions and temperature records are not yet confirmed.',
  },
  {
    label: 'Colour & ingredients',
    standard:
      'Ingredient and additive policies vary. The package label is the source for a specific product.',
    our:
      'No-added-dye language is a target pending final formulation and process confirmation.',
  },
  {
    label: 'Farmer trade',
    standard:
      'Supply chains and pricing routes differ by supplier; avoid assuming the same number of intermediaries.',
    our:
      'Direct partnerships and harvest premiums are goals. Partner, contract, and payment details are pending verification.',
  },
];

export const STORY_CLOSING = {
  title: 'Taste the Difference Patience Makes.',
  subtitle:
    'Explore the collection while we work to make every sourcing and process detail as transparent as the ritual itself.',
  image: MEDIA.kitchenJar,
  imageAlt: 'Warmly lit illustrated kitchen scene with an amber-toned turmeric jar',
};
