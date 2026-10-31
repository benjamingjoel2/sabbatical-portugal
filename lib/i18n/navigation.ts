'use client';

import { usePathname as useNextPathname, useRouter as useNextRouter, useParams } from 'next/navigation';
import { useMemo } from 'react';
import { DEFAULT_LOCALE, isLocale, localizePath, stripLocale, type Locale } from './config';

export function useLocale(): Locale {
  const p = useParams();
  return isLocale(p?.locale) ? p.locale : DEFAULT_LOCALE;
}

/** The current path without the language prefix, so nav highlighting works in every language. */
export function usePathname(): string {
  return stripLocale(useNextPathname() || '/');
}

/** useRouter whose push/replace/prefetch keep the current language. */
export function useRouter() {
  const r = useNextRouter();
  const locale = useLocale();
  return useMemo(
    () => ({
      ...r,
      push: (href: string, o?: Parameters<typeof r.push>[1]) => r.push(localizePath(href, locale), o),
      replace: (href: string, o?: Parameters<typeof r.replace>[1]) => r.replace(localizePath(href, locale), o),
      prefetch: (href: string, o?: Parameters<typeof r.prefetch>[1]) => r.prefetch(localizePath(href, locale), o),
    }),
    [r, locale],
  );
}

export { useParams, useSearchParams, notFound } from 'next/navigation';
