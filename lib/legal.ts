import { site } from '@/config/site';
import { legal, type LegalSlug } from '@/data/legal';

/** Porto Season's legal pages. The text for every language lives in data/legal.json. */
export const legalPages = legal({ brand: site.name });
export const getLegalPage = (slug: LegalSlug) => legalPages.find((p) => p.slug === slug)!;
