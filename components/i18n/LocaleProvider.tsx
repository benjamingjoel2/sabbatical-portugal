'use client';

import { useMemo } from 'react';
import { LocaleContext, _setBrowserState, type Dict } from '@/lib/i18n/t';
import type { Locale } from '@/lib/i18n/config';

/** Hands the page language and the client strings to client components. */
export function LocaleProvider({ locale, dict, children }: { locale: Locale; dict: Dict | null; children: React.ReactNode }) {
  const value = useMemo(() => ({ locale, dict }), [locale, dict]);
  _setBrowserState(value);
  if (!LocaleContext) return <>{children}</>;
  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}
