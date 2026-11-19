import { MEDIA } from '../assets/media';

export const ORIGIN_REGIONS = [
  {
    id: 'meghalaya',
    name: 'Meghalaya (Jaintia Hills)',
    tag: 'Sample Configurable Region',
    coordinates: { x: 78, y: 38 },
    elevation: 'Highland rain-fed terraces',
    profileTitle: 'Sample Grower Collective — Jaintia Hills',
    farmerName: 'Sample Profile (Pending Verification)',
    story:
      'Renowned across India for deep crimson-gold rhizomes grown in rich, forested hill soil without heavy industrial intervention.',
    processingNote: 'Traditional sun-curing & small-batch stone/low-heat milling (configurable).',
    image: MEDIA.heroLandscape,
    isSample: true,
  },
  {
    id: 'sangli',
    name: 'Sangli, Maharashtra',
    tag: 'Sample Configurable Region',
    coordinates: { x: 35, y: 63 },
    elevation: 'Deccan plateau alluvial plains',
    profileTitle: 'Sample Grower Collective — Krishna Valley',
    farmerName: 'Sample Profile (Pending Verification)',
    story:
      'One of India’s historic turmeric trading and cultivation belts, prized for bold, aromatic fingers and balanced earthy flavour.',
    processingNote: 'Careful curing, polishing & moisture-controlled storage (configurable).',
    image: MEDIA.farmFields,
    isSample: true,
  },
  {
    id: 'erode',
    name: 'Erode, Tamil Nadu',
    tag: 'Sample Configurable Region',
    coordinates: { x: 44, y: 80 },
    elevation: 'Cauvery basin fertile plains',
    profileTitle: 'Sample Grower Collective — Cauvery Belt',
    farmerName: 'Sample Profile (Pending Verification)',
    story:
      'Celebrated for bright saffron-yellow colour and centuries-old South Indian culinary heritage.',
    processingNote: 'Sorted by hand and milled in small batches for kitchen freshness (configurable).',
    image: MEDIA.rootsSoil,
    isSample: true,
  },
];
