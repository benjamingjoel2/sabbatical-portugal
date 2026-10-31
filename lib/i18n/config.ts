/** Languages: English at the existing URLs, the others under /fr, /de and /es. */
export const LOCALES = ['en', 'fr', 'de', 'es'] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'en';
export const LOCALE_LABELS: Record<Locale, string> = { en: 'EN', fr: 'FR', de: 'DE', es: 'ES' };
export const LOCALE_NAMES: Record<Locale, string> = { en: 'English', fr: 'Français', de: 'Deutsch', es: 'Español' };
export const OG_LOCALES: Record<Locale, string> = { en: 'en_GB', fr: 'fr_FR', de: 'de_DE', es: 'es_ES' };
/** BCP 47 tags for dates and numbers. */
export const INTL_LOCALES: Record<Locale, string> = { en: 'en-GB', fr: 'fr-FR', de: 'de-DE', es: 'es-ES' };

export const isLocale = (s: unknown): s is Locale => typeof s === 'string' && (LOCALES as readonly string[]).includes(s);

/** Remove a leading /fr, /de or /es (and /en) from a path. */
export function stripLocale(path: string): string {
  const m = path.match(/^\/(en|fr|de|es)(?=\/|$|\?|#)/);
  if (!m) return path || '/';
  const rest = path.slice(m[0].length);
  return rest.startsWith('/') ? rest : '/' + rest;
}

const NON_PAGE = /^\/(api|_next|images|audio|photos|media|fonts|favicon|icon|apple-icon|opengraph-image|robots\.txt|sitemap\.xml)(\/|$|\.|\?)|\.[a-z0-9]{2,5}($|\?|#)/i;

/** The same path in another language. Assets, API routes and external URLs are left alone. */
export function localizePath(href: string, locale: Locale): string {
  if (!href.startsWith('/') || href.startsWith('//') || NON_PAGE.test(href)) return href;
  const bare = stripLocale(href);
  if (locale === DEFAULT_LOCALE) return bare;
  if (bare === '/') return `/${locale}`;
  if (/^\/[?#]/.test(bare)) return `/${locale}${bare.slice(1)}`;
  return `/${locale}${bare}`;
}
