'use client';

import NextLink from 'next/link';
import { usePathname as useNextPathname } from 'next/navigation';
import { LOCALES, LOCALE_LABELS, LOCALE_NAMES, localizePath, stripLocale } from '@/lib/i18n/config';
import { useLocale } from '@/lib/i18n/navigation';

const LABEL = { en: 'Language', fr: 'Langue', de: 'Sprache', es: 'Idioma' } as const;

/** EN · FR · DE · ES, each linking to the same page in that language. */
export function LanguageSwitcher({ className = '' }: { className?: string }) {
  const locale = useLocale();
  const path = stripLocale(useNextPathname() || '/');
  return (
    <nav aria-label={LABEL[locale]} className={`lang-switch ${className}`}>
      {LOCALES.map((l, i) => (
        <span key={l} className="lang-switch__item">
          {i > 0 && (
            <span aria-hidden="true" className="lang-switch__sep">
              ·
            </span>
          )}
          <NextLink
            href={localizePath(path, l)}
            hrefLang={l}
            lang={l}
            aria-current={l === locale ? 'true' : undefined}
            className="lang-switch__link"
            prefetch={false}
          >
            <span aria-hidden="true">{LOCALE_LABELS[l]}</span>
            <span className="sr-only">{LOCALE_NAMES[l]}</span>
          </NextLink>
        </span>
      ))}
    </nav>
  );
}
