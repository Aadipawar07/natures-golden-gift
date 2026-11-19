import { MEDIA } from '../assets/media';

export const JOURNAL_ARTICLES = [
  {
    id: 'art-1',
    category: 'Culinary Heritage',
    readTime: '4 min read',
    title: 'Why Turmeric Is the Quiet Heart of Every Indian Kitchen',
    excerpt:
      'From morning tempering to heirloom pickle jars, explore how a single golden rhizome anchors regional Indian cooking.',
    image: MEDIA.ritualCulinary,
    body: [
      'Across Indian households, turmeric is rarely treated as a garnish—it is the warm foundation poured into hot oil or ghee at the very start of a meal.',
      'Blooming turmeric gently in fat helps carry its fat-soluble aromatic compounds throughout dals, sabzis, and roasted vegetables.',
    ],
  },
  {
    id: 'art-2',
    category: 'Ingredient Education',
    readTime: '3 min read',
    title: 'Turmeric & Black Pepper: Why Tradition Pairs Them Together',
    excerpt:
      'Traditional recipes have paired haldi with freshly cracked black pepper for centuries. Here is the simple culinary science behind the pairing.',
    image: MEDIA.powderMortar,
    body: [
      'Traditional golden milk and spice blends pair turmeric with a pinch of freshly cracked black pepper and a source of natural fat such as ghee or whole milk.',
      'Note: Culinary traditions and general nutrition literature discuss piperine and fat pairing; this article is educational and not medical advice.',
    ],
  },
  {
    id: 'art-3',
    category: 'Kitchen Craft',
    readTime: '5 min read',
    title: 'How to Store Pure Turmeric So Its Aroma Lasts',
    excerpt:
      'Light, moisture, and heat slowly dull natural spices. Learn why UV-amber glass and dry spoons keep your jar vibrant.',
    image: MEDIA.jarPrimary,
    body: [
      'Always scoop turmeric with a completely dry spoon and keep the jar away from direct stovetop steam.',
      'Dark amber glass helps shield natural pigments from UV light on sunlit kitchen shelves.',
    ],
  },
];

export const SHOPPABLE_RECIPE = {
  id: 'recipe-golden-milk',
  title: 'Evening Golden Milk (Haldi Doodh)',
  subtitle: 'Shoppable 5-Minute Kitchen Ritual',
  description:
    'Warm milk gently simmered with pure turmeric, freshly cracked black pepper, and a touch of ghee.',
  image: MEDIA.ritualElixir,
  ingredients: [
    { name: "Nature's Golden Gift Turmeric", amount: '½ tsp', shoppable: true },
    { name: 'Warm Milk (Dairy or Oat)', amount: '1 cup (240 ml)', shoppable: false },
    { name: 'Cracked Black Pepper', amount: '1 pinch', shoppable: true },
    { name: 'Pure Ghee or Coconut Oil', amount: '½ tsp', shoppable: false },
  ],
};
