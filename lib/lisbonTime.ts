import { getLocale } from '@/lib/i18n/t';
import { INTL_LOCALES } from '@/lib/i18n/config';
import { site } from '@/config/site';

export function lisbonDate(d: Date) {
  return d.toLocaleDateString(INTL_LOCALES[getLocale()], {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: site.location.timeZone,
  });
}

export function lisbonTime(d: Date) {
  return d.toLocaleTimeString(INTL_LOCALES[getLocale()], {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZone: site.location.timeZone,
  });
}
