import fr from '@/i18n/fr.json';
import de from '@/i18n/de.json';
import es from '@/i18n/es.json';
import clientKeys from '@/i18n/client-keys.json';
import { _store, inLocale, type Dict } from './t';
import { DEFAULT_LOCALE, LOCALES, isLocale, localizePath, type Locale } from './config';

const DICTS: Record<Locale, Dict | null> = { en: null, fr, de, es };
const norm = (s: string) => s.replace(/\s+/g, ' ').trim();
for (const l of LOCALES) {
  const d = DICTS[l];
  if (d) for (const k of Object.keys(d)) if (norm(k) !== k) d[norm(k)] = d[k];
}

export function dictFor(locale: Locale): Dict | null {
  return DICTS[locale];
}

/** Call at the top of every layout and page under app/[locale]. */
export function setLocale(locale: string): Locale {
  const l = isLocale(locale) ? locale : DEFAULT_LOCALE;
  const s = _store();
  s.locale = l;
  s.dict = DICTS[l];
  return l;
}

/** Resolve the locale param, store it for the render, and return it. */
export async function initLocale(params: Promise<Record<string, string | string[] | undefined>> | Record<string, string | string[] | undefined> | undefined): Promise<Locale> {
  const p = await params;
  return setLocale(String(p?.locale ?? DEFAULT_LOCALE));
}

/** Build metadata in a locale: `return metaIn(params, () => ({ ... }))`. */
export async function metaIn<T>(params: Promise<Record<string, string | string[] | undefined>> | undefined, fn: () => T): Promise<T> {
  const l = await initLocale(params);
  return inLocale(l, DICTS[l], fn);
}

/** The strings client components need, for <LocaleProvider>. */
const CLIENT: Partial<Record<Locale, Dict>> = {};
/** Same object every time, so React sends it once per page even when the layout renders twice. */
export function clientDict(locale: Locale): Dict | null {
  const d = DICTS[locale];
  if (!d) return null;
  if (CLIENT[locale]) return CLIENT[locale]!;
  const out: Dict = (CLIENT[locale] = {});
  for (const k of clientKeys as string[]) if (d[k] !== undefined) out[k] = d[k];
  return out;
}

/** Canonical and hreflang alternates for a path (English path, no locale prefix). */
export function alternatesFor(path: string, locale: Locale, siteUrl: string) {
  const abs = (l: Locale) => new URL(localizePath(path, l), siteUrl).toString();
  const languages: Record<string, string> = {};
  for (const l of LOCALES) languages[l] = abs(l);
  languages['x-default'] = abs(DEFAULT_LOCALE);
  return { canonical: abs(locale), languages };
}

export { LOCALES };
