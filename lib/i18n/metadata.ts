import type { Metadata } from 'next';
import { DEFAULT_LOCALE, LOCALES, OG_LOCALES, isLocale, localizePath, stripLocale, type Locale } from './config';
import { dictFor, setLocale } from './server';
import { inLocale, t } from './t';

const SEPS = [' · ', ': ', ' | ', ' — ', ' – '];
/** Translate a title-like string, falling back to its parts ("Plans · Brand"). */
function tt(s: string): string {
  const whole = t(s);
  if (whole !== s) return whole;
  for (const sep of SEPS) {
    if (s.includes(sep)) {
      const parts = s.split(sep).map((p) => tt(p));
      return parts.join(sep);
    }
  }
  return s;
}

/** Translate a description, falling back to sentence by sentence (descriptions are often two strings joined). */
function td(s: string): string {
  const whole = t(s);
  if (whole !== s) return whole;
  return s.split(/(?<=[.!?])\s+/).map((x) => t(x)).join(' ');
}

function abs(u: string | URL | undefined, base: string): URL | null {
  if (!u) return null;
  try {
    return new URL(String(u), base);
  } catch {
    return null;
  }
}

/**
 * Translate a page's English metadata into the request language and give it the right
 * canonical URL, hreflang alternates (en, fr, de, es, x-default) and Open Graph locale.
 */
export function localizeMetadata(meta: Metadata, localeParam: string | undefined, siteUrl?: string): Metadata {
  const locale: Locale = isLocale(localeParam) ? localeParam : DEFAULT_LOCALE;
  setLocale(locale);
  return inLocale(locale, dictFor(locale), () => {
    const m: Metadata = { ...meta };
    const base = String(meta.metadataBase ?? siteUrl ?? process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000');
    if (typeof m.title === 'string') m.title = tt(m.title);
    else if (m.title && typeof m.title === 'object') {
      const o = { ...(m.title as Record<string, string>) };
      for (const k of ['default', 'absolute']) if (typeof o[k] === 'string') o[k] = tt(o[k]);
      m.title = o as Metadata['title'];
    }
    if (typeof m.description === 'string') m.description = td(m.description);
    const canon = abs(m.alternates?.canonical as string | undefined, base);
    if (canon) {
      const path = stripLocale(canon.pathname);
      const href = (l: Locale) => new URL(localizePath(path, l), canon.origin).toString();
      const languages: Record<string, string> = {};
      for (const l of LOCALES) languages[l] = href(l);
      languages['x-default'] = href(DEFAULT_LOCALE);
      m.alternates = { ...m.alternates, canonical: href(locale), languages };
    }
    if (m.openGraph) {
      const og = { ...m.openGraph } as Record<string, unknown>;
      if (typeof og.title === 'string') og.title = tt(og.title);
      if (typeof og.description === 'string') og.description = td(og.description);
      if (typeof og.siteName === 'string') og.siteName = t(og.siteName);
      const u = abs(og.url as string | undefined, base);
      if (u) og.url = new URL(localizePath(stripLocale(u.pathname), locale), u.origin).toString();
      og.locale = OG_LOCALES[locale];
      if (Array.isArray(og.images)) og.images = og.images.map((i) => (i && typeof i === 'object' && 'alt' in i && typeof i.alt === 'string' ? { ...i, alt: t(i.alt) } : i));
      m.openGraph = og as Metadata['openGraph'];
    }
    if (m.twitter) {
      const tw = { ...m.twitter } as Record<string, unknown>;
      if (typeof tw.title === 'string') tw.title = tt(tw.title);
      if (typeof tw.description === 'string') tw.description = td(tw.description);
      m.twitter = tw as Metadata['twitter'];
    }
    return m;
  });
}
