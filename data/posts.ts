import type { Post } from './types';

/** Journal posts, newest first. Bodies live in content/journal/[slug].mdx. */
export const posts: Post[] = [
  {
    slug: 'the-d8-digital-nomad-visa-explained',
    title: 'The D8 digital nomad visa, explained',
    excerpt:
      'Who the D8 is for, how much income you need in 2026, the two routes it offers and the documents you will typically be asked for.',
    date: '2026-10-08',
    readingMinutes: 6,
    image: 'coworking',
    tag: 'Visas',
  },
  {
    slug: 'why-evora-is-the-place-to-be-in-2027',
    title: 'Why Évora is the place to be in 2027',
    excerpt:
      'A walled Roman town, Alentejo wine, cork forests and a year as European Capital of Culture. Here is why we think 2027 is Évora’s year.',
    date: '2026-10-01',
    readingMinutes: 5,
    image: 'vineyard',
    tag: 'Destinations',
  },
  {
    slug: 'lisbon-vs-porto-for-a-long-stay',
    title: 'Lisbon vs Porto for a long stay',
    excerpt:
      'Two very different cities, both wonderful to live in. We compare cost, weather, community and day-to-day life to help you choose.',
    date: '2026-09-16',
    readingMinutes: 6,
    image: 'portoRibeira',
    tag: 'Destinations',
  },
  {
    slug: 'how-to-plan-a-season-in-portugal',
    title: 'How to plan a season in Portugal',
    excerpt:
      'From choosing how long to stay to booking your first coworking day, a practical timeline for planning one to twelve months in Portugal.',
    date: '2026-09-02',
    readingMinutes: 6,
    image: 'planning',
    tag: 'Planning',
  },
];

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}
