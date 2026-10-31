import type { MetadataRoute } from 'next';
import { site } from '@/config/site';
import { LOCALES, localizePath } from '@/lib/i18n/config';
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
  const url = (p: string, l: (typeof LOCALES)[number]) => new URL(localizePath(p, l), site.url).toString();
  return paths.flatMap((p) =>
    LOCALES.map((l) => ({
      url: url(p, l),
      lastModified: now,
      alternates: { languages: Object.fromEntries([...LOCALES.map((x) => [x, url(p, x)]), ['x-default', url(p, 'en')]]) },
    })),
  );
}
