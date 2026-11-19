import { MEDIA } from '../assets/media';

export const STORY_STAGES = [
  {
    id: 'stage-1',
    number: '01',
    label: 'Born From The Earth',
    headline: 'Every golden beginning starts beneath the soil.',
    narrative:
      'Our story begins with the earth, where nature creates something extraordinary. Beneath monsoon-fed loam, golden rhizomes slowly gather their natural warmth and colour.',
    detail: 'Editable Origin Note: Soil & harvest season details will reflect verified farm batch records.',
    image: MEDIA.rootsSoil,
    alt: 'Fresh golden-orange turmeric rhizomes emerging from dark moist soil',
    bgClass: 'from-[#171B17] via-[#1f241c] to-[#262B22]',
  },
  {
    id: 'stage-2',
    number: '02',
    label: 'Grown With Care',
    headline: 'Rooted in the hands that nurture it.',
    narrative:
      'Generations of Indian agricultural knowledge guide every season—tended with patience, morning mist, and respect for the land.',
    detail: 'Candidate Regions (Configurable): Meghalaya • Erode • Sangli (Pending verified farm onboarding).',
    image: MEDIA.farmFields,
    alt: 'Anime-inspired landscape painting of Indian farmers tending green terraced turmeric fields at sunrise',
    bgClass: 'from-[#262B22] via-[#2c2a1e] to-[#231F20]',
  },
  {
    id: 'stage-3',
    number: '03',
    label: 'Carefully Transformed',
    headline: 'Nature deserves a gentler touch.',
    narrative:
      'From whole cured rhizomes to luminous powder, every batch is cleaned and milled with care so its natural aroma and earthy richness reach you intact.',
    detail: 'Processing Note: Low-temperature grinding & sun-drying storytelling shown as configurable brand workflow.',
    image: MEDIA.powderMortar,
    alt: 'Macro view of vibrant golden turmeric powder cascading beside whole dried roots and stone mortar',
    bgClass: 'from-[#231F20] via-[#312419] to-[#2a1f16]',
  },
  {
    id: 'stage-4',
    number: '04',
    label: 'Delivered To Your Kitchen',
    headline: 'From our roots to your rituals.',
    narrative:
      'Sealed in UV-protective amber glass to honour your morning tadka, evening golden milk, and quiet daily rituals.',
    detail: 'Ready for your table — small-batch freshness designed for modern Indian homes.',
    image: MEDIA.kitchenJar,
    alt: 'Amber glass apothecary jar of golden turmeric resting on a sunlit Indian kitchen counter',
    bgClass: 'from-[#2a1f16] via-[#231F20] to-[#171B17]',
  },
];
