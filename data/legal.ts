/**
 * Legal pages: Privacy Policy, Booking Terms and Cookie Policy.
 *
 * The full text is written in every language in data/legal.json (HTML with sections,
 * lists and the cookie table; brand, email, Lisbon address and language-prefixed links in
 * place). The storage table lists exactly what the site keeps in the visitor's browser
 * (ps-currency, ps-sound, ps-season-planner-v1); update it if that changes.
 * Last updated 1 November 2026.
 */
import docs from './legal.json';
import type { Locale } from '@/lib/i18n/config';

export type LegalSlug = 'privacy' | 'terms' | 'cookies';
export interface LegalDoc { title: string; updated: string; html: string }
/** English title and lede: rendered through the t()/tp() dictionaries for the other languages. */
export interface LegalPage { slug: LegalSlug; title: string; lede: string }

const KEY: Record<LegalSlug, 'privacy' | 'terms' | 'cookies'> = { privacy: 'privacy', terms: 'terms', cookies: 'cookies' };

export const legalDoc = (slug: LegalSlug, locale: Locale): LegalDoc => (docs as Record<Locale, Record<string, LegalDoc>>)[locale][KEY[slug]];

export function legal({ brand }: { brand: string }): LegalPage[] {
  return [
    { slug: 'privacy', title: 'Privacy Policy', lede: `How ${brand} collects, uses and protects your personal information.` },
    { slug: 'terms', title: 'Booking Terms', lede: `The terms on which ${brand} plans and arranges tailor-made journeys. Please read them before you confirm a booking.` },
    { slug: 'cookies', title: 'Cookie Policy', lede: `What ${brand} stores on your device when you use this website, and how to control it.` },
  ];
}
