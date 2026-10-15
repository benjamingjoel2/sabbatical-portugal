/**
 * Display currencies. All prices in /data are stored in EUR and converted at render time.
 * Rates are static placeholders: replace with a live feed (e.g. ECB reference rates) later.
 */
export const currencies = ['EUR', 'USD', 'GBP', 'CAD', 'AUD', 'BRL'] as const;
export type CurrencyCode = (typeof currencies)[number];

export const baseCurrency: CurrencyCode = 'EUR';

export const ratesValidAsOf = '2026-10-01';

/** Units of each currency per 1 EUR. PLACEHOLDER rates. */
export const eurRates: Record<CurrencyCode, number> = {
  EUR: 1,
  USD: 1.17,
  GBP: 0.87,
  CAD: 1.62,
  AUD: 1.78,
  BRL: 6.3,
};

export const currencyMeta: Record<CurrencyCode, { label: string; locale: string }> = {
  EUR: { label: 'Euro', locale: 'en-IE' },
  USD: { label: 'US dollar', locale: 'en-US' },
  GBP: { label: 'British pound', locale: 'en-GB' },
  CAD: { label: 'Canadian dollar', locale: 'en-CA' },
  AUD: { label: 'Australian dollar', locale: 'en-AU' },
  BRL: { label: 'Brazilian real', locale: 'pt-BR' },
};
