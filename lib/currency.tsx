'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { currencies, currencyMeta, eurRates, type CurrencyCode } from '@/config/currency';
import { readStorage, writeStorage } from './storage';

interface CurrencyCtx {
  currency: CurrencyCode;
  setCurrency: (c: CurrencyCode) => void;
  format: (eur: number, opts?: { compact?: boolean }) => string;
}

const Ctx = createContext<CurrencyCtx | null>(null);
const KEY = 'ps-currency';

export function formatMoney(eur: number, currency: CurrencyCode, compact = false) {
  const value = eur * eurRates[currency];
  const rounded = compact || value >= 100 ? Math.round(value / (value >= 1000 ? 10 : 1)) * (value >= 1000 ? 10 : 1) : value;
  return new Intl.NumberFormat(currencyMeta[currency].locale, {
    style: 'currency',
    currency,
    maximumFractionDigits: rounded >= 100 ? 0 : 2,
    minimumFractionDigits: rounded >= 100 ? 0 : value % 1 === 0 ? 0 : 2,
    notation: compact ? 'compact' : 'standard',
  }).format(rounded);
}

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setState] = useState<CurrencyCode>('EUR');

  useEffect(() => {
    const saved = readStorage<CurrencyCode>(KEY, 'EUR');
    if ((currencies as readonly string[]).includes(saved)) setState(saved);
  }, []);

  const setCurrency = useCallback((c: CurrencyCode) => {
    setState(c);
    writeStorage(KEY, c);
  }, []);

  const value = useMemo<CurrencyCtx>(
    () => ({ currency, setCurrency, format: (eur, o) => formatMoney(eur, currency, o?.compact) }),
    [currency, setCurrency],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCurrency() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useCurrency must be used inside CurrencyProvider');
  return ctx;
}
