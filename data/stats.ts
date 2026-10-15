import type { Stat } from './types';

/** All figures are PLACEHOLDERS until verified. */
export const stats: Stat[] = [
  {
    label: 'Guests hosted',
    value: 480,
    description: 'Solo travelers, couples and families who have spent a season with us.',
    placeholder: true,
  },
  {
    label: 'Average stay',
    value: 4.5,
    unit: 'months',
    description: 'Long enough to have a favorite café and a neighbor who waves.',
    placeholder: true,
  },
  {
    label: 'Repeat guests',
    value: 38,
    suffix: '%',
    description: 'Guests who came back for another season, often somewhere new.',
    placeholder: true,
  },
  {
    label: 'Homes vetted',
    value: 260,
    description: 'Homes we have visited, tested and photographed in person.',
    placeholder: true,
  },
  {
    label: 'Destinations',
    value: 12,
    description: 'From Lisbon and Porto to the Douro, the Algarve and the islands.',
    placeholder: true,
  },
];
