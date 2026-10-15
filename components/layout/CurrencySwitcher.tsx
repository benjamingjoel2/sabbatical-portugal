'use client';

import { currencies, currencyMeta, type CurrencyCode } from '@/config/currency';
import { useCurrency } from '@/lib/currency';

export function CurrencySwitcher({ className = '', id = 'currency' }: { className?: string; id?: string }) {
  const { currency, setCurrency } = useCurrency();
  return (
    <div className={`relative ${className}`}>
      <label htmlFor={id} className="sr-only">
        Display prices in ({currencyMeta[currency].label})
      </label>
      <select
        id={id}
        value={currency}
        onChange={(e) => setCurrency(e.target.value as CurrencyCode)}
        className="nav-caps h-8 cursor-pointer appearance-none rounded-full border border-current bg-transparent pl-3 pr-6 transition-colors hover:border-current"
      >
        {currencies.map((c) => (
          <option key={c} value={c} className="text-harbor">
            {c}
          </option>
        ))}
      </select>
      <span aria-hidden className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[0.5rem]">
        ▾
      </span>
    </div>
  );
}
