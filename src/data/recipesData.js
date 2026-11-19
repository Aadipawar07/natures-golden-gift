import { MEDIA } from '../assets/media';

export const RECIPE_CATEGORIES = [
  { id: 'all', label: 'All Rituals' },
  { id: 'drinks', label: 'Elixirs & Drinks' },
  { id: 'curries', label: 'Traditional Curries' },
  { id: 'skincare', label: 'Botanical Skincare' },
];

export const RECIPES = [
  {
    id: 'classic-haldi-doodh',
    category: 'drinks',
    categoryLabel: 'Elixirs & Drinks',
    title: 'Classic Restorative Haldi Doodh (Golden Milk)',
    time: '5 Mins',
    difficulty: 'Easy',
    servings: '1 cup',
    image: MEDIA.ritualElixir,
    imageAlt: 'Warm golden milk in a ceramic cup',
    description: 'A gently spiced, creamy evening cup with a mellow golden hue and a little peppery warmth.',
    whyItWorks:
      'Gentle heat brings the spices together with milk or a plant-based alternative for a rounded, comforting drink. It is a kitchen ritual, not a medical remedy.',
    ingredients: [
      { amount: '1 cup', name: 'Milk or unsweetened plant milk' },
      { amount: '½ tsp', name: 'Ground turmeric', shoppable: true },
      { amount: '1 pinch', name: 'Freshly cracked black pepper' },
      { amount: '½ tsp', name: 'Ghee or coconut oil (optional)' },
      { amount: 'To taste', name: 'Honey or maple syrup (optional)' },
    ],
    steps: [
      'Warm the milk gently in a small saucepan; avoid bringing it to a hard boil.',
      'Whisk in the turmeric, black pepper, and optional ghee or coconut oil.',
      'Simmer for 2–3 minutes, pour into a cup, and sweeten to taste.',
    ],
  },
  {
    id: 'ginger-haldi-shot',
    category: 'drinks',
    categoryLabel: 'Elixirs & Drinks',
    title: 'Fiery Morning Ginger-Haldi Immunity Shot',
    time: '3 Mins',
    difficulty: 'Easy',
    servings: '1 small glass',
    image: MEDIA.ritualElixir,
    imageAlt: 'Golden turmeric drink prepared with fresh ingredients',
    description: 'A bright, tangy little sip balanced with fresh ginger, lemon, and a touch of honey.',
    whyItWorks:
      'Ginger and lemon bring a lively, warming flavour. This is a food recipe, not an immunity treatment or a substitute for medical advice.',
    ingredients: [
      { amount: '1 tsp', name: 'Freshly grated ginger' },
      { amount: '¼ tsp', name: 'Ground turmeric', shoppable: true },
      { amount: '1 tbsp', name: 'Fresh lemon juice' },
      { amount: '2 tbsp', name: 'Water' },
      { amount: '½ tsp', name: 'Honey (optional)' },
      { amount: '1 tiny pinch', name: 'Black pepper (optional)' },
    ],
    steps: [
      'Stir the grated ginger, turmeric, lemon juice, and water together in a small glass.',
      'Let the mixture stand for a minute, then stir again so the spices are evenly dispersed.',
      'Add honey if you like, sip slowly, and adjust the lemon or water next time to taste.',
    ],
  },
  {
    id: 'tadka-dal',
    category: 'curries',
    categoryLabel: 'Traditional Curries',
    title: 'Slow-Simmered Tadka Dal with Cold-Milled Haldi',
    time: '25 Mins',
    difficulty: 'Easy',
    servings: '3–4 servings',
    image: MEDIA.ritualCulinary,
    imageAlt: 'A bowl of golden dal finished with a fragrant tadka',
    description: 'Soft lentils meet a cumin-garlic tadka for a simple, deeply savoury weeknight bowl.',
    whyItWorks:
      'Blooming spices briefly in warm ghee or oil gives the tadka a fragrant, rounded flavour. Add water as needed for your preferred dal texture.',
    ingredients: [
      { amount: '1 cup', name: 'Red lentils (masoor dal), rinsed' },
      { amount: '3 cups', name: 'Water' },
      { amount: '½ tsp', name: 'Ground turmeric', shoppable: true },
      { amount: '1 tbsp', name: 'Ghee or neutral cooking oil' },
      { amount: '½ tsp', name: 'Cumin seeds' },
      { amount: '2 cloves', name: 'Garlic, thinly sliced' },
      { amount: 'To taste', name: 'Salt and lemon' },
    ],
    steps: [
      'Combine the rinsed lentils, water, turmeric, and salt in a saucepan. Simmer until soft, about 18–20 minutes.',
      'Warm the ghee or oil in a small pan. Add cumin and garlic; cook until fragrant and lightly golden.',
      'Pour the tadka over the dal, stir, loosen with hot water if needed, and finish with lemon.',
    ],
  },
  {
    id: 'coconut-vegetable-curry',
    category: 'curries',
    categoryLabel: 'Traditional Curries',
    title: 'Golden Coconut & Turmeric Vegetable Curry',
    time: '20 Mins',
    difficulty: 'Easy',
    servings: '3 servings',
    image: MEDIA.ritualCulinary,
    imageAlt: 'A golden vegetable curry served in a rustic bowl',
    description: 'Seasonal vegetables simmer in a silky coconut sauce scented with ginger and warm spices.',
    whyItWorks:
      'Coconut milk gives the curry a mellow, creamy texture, while a brief bloom in oil helps the spices open up in the pan.',
    ingredients: [
      { amount: '3 cups', name: 'Mixed seasonal vegetables, chopped' },
      { amount: '1 tbsp', name: 'Cooking oil' },
      { amount: '1 tsp', name: 'Fresh ginger, grated' },
      { amount: '½ tsp', name: 'Ground turmeric', shoppable: true },
      { amount: '½ tsp', name: 'Ground cumin' },
      { amount: '1 cup', name: 'Coconut milk' },
      { amount: '½ cup', name: 'Water, plus more as needed' },
      { amount: 'To taste', name: 'Salt and lime' },
    ],
    steps: [
      'Warm the oil in a pan. Add ginger, turmeric, and cumin; stir for 20–30 seconds.',
      'Add the vegetables, coconut milk, water, and salt. Cover and simmer until the vegetables are tender.',
      'Adjust seasoning and consistency, then finish with a squeeze of lime.',
    ],
  },
  {
    id: 'honey-yogurt-glow-mask',
    category: 'skincare',
    categoryLabel: 'Botanical Skincare',
    title: 'Raw Honey, Yogurt & Haldi Glow Mask',
    time: '10 Mins',
    difficulty: 'Easy',
    servings: '1 small batch',
    image: MEDIA.ritualSkincare,
    imageAlt: 'A small bowl of a turmeric, yogurt, and honey mask',
    description: 'A simple, creamy DIY mask with a soft golden tint and ingredients from the kitchen.',
    whyItWorks:
      'Yogurt and honey create a spreadable base for this traditional cosmetic ritual. It is not a treatment for skin conditions; patch-test first and stop if irritation occurs.',
    ingredients: [
      { amount: '1 tbsp', name: 'Plain yogurt' },
      { amount: '1 tsp', name: 'Raw honey' },
      { amount: '¼ tsp', name: 'Ground turmeric', shoppable: true },
      { amount: 'A few drops', name: 'Water, only if needed' },
    ],
    steps: [
      'Stir the yogurt and honey together in a clean bowl.',
      'Mix in the turmeric until the paste is smooth; add a few drops of water if needed.',
      'After a patch test, apply a thin layer to clean skin, avoiding eyes and irritated or broken skin. Rinse gently after 5–10 minutes.',
    ],
    safetyNote:
      'For external use only. Patch-test first; turmeric may stain skin, fabric, and surfaces. Avoid the eye area and broken or irritated skin; rinse off and discontinue if irritation occurs.',
  },
  {
    id: 'sandalwood-spot-paste',
    category: 'skincare',
    categoryLabel: 'Botanical Skincare',
    title: 'Soothing Haldi & Sandalwood Spot Paste',
    time: '5 Mins',
    difficulty: 'Easy',
    servings: '1 small application',
    image: MEDIA.ritualSkincare,
    imageAlt: 'A small bowl with a golden botanical paste',
    description: 'A tiny, aromatic blend of turmeric and sandalwood powder mixed fresh for a traditional beauty ritual.',
    whyItWorks:
      'Sandalwood adds a soft, woody aroma and helps form a simple paste. This is a cosmetic tradition, not a remedy for spots or skin concerns.',
    ingredients: [
      { amount: '¼ tsp', name: 'Ground turmeric', shoppable: true },
      { amount: '½ tsp', name: 'Sandalwood powder from a trusted source' },
      { amount: '½–1 tsp', name: 'Plain water or rose water' },
    ],
    steps: [
      'Combine the turmeric and sandalwood powder in a clean dish.',
      'Add water a few drops at a time and stir to make a smooth paste.',
      'Patch-test before use. If tolerated, apply a small amount to clean skin, avoiding eyes and irritated or broken skin; rinse gently after a few minutes.',
    ],
    safetyNote:
      'For external use only. Patch-test both ingredients first; turmeric may stain. Avoid the eye area and broken or irritated skin, and discontinue if irritation occurs.',
  },
];

export const ABSORPTION_SPOTLIGHT = {
  title: 'The 20× Absorption Rule — with a little context',
  intro:
    'Turmeric, black pepper, and a little fat are a familiar culinary pairing. The often-repeated “20×” figure comes from specific research conditions; it is not a guaranteed result from any kitchen recipe.',
  ingredients: [
    {
      name: 'Haldi',
      detail: 'Turmeric naturally contains curcuminoids; amounts vary by product and batch.',
      icon: 'haldi',
    },
    {
      name: 'Black pepper',
      detail: 'Pepper contains piperine and adds a bright, peppery finish to the ritual.',
      icon: 'pepper',
    },
    {
      name: 'A little fat',
      detail: 'Milk, ghee, or coconut can add richness and help round out the flavour.',
      icon: 'fat',
    },
  ],
};
