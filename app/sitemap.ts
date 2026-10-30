import type { MetadataRoute } from 'next';
import { site } from '@/config/site';
import { destinations } from '@/data/destinations';
import { plans } from '@/data/plans';
import { homes } from '@/data/homes';
import { categories } from '@/data/categories';
import { posts } from '@/data/posts';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const paths = [
    '/',
    '/destinations',
    '/plans',
    '/homes',
    '/life',
    '/visas',
    '/families',
    '/about',
    '/journal',
    '/info',
    '/contact',
    '/plan-my-season',
    '/privacy',
    '/terms',
    '/cookies',
    ...destinations.map((d) => `/destinations/${d.slug}`),
    ...plans.map((p) => `/plans/${p.slug}`),
    ...homes.map((h) => `/homes/${h.slug}`),
    ...categories.map((c) => `/life/${c.slug}`),
    ...posts.map((p) => `/journal/${p.slug}`),
  ];
  return paths.map((p) => ({ url: new URL(p, site.url).toString(), lastModified: now }));
}
