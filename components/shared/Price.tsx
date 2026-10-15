'use client';

import { useCurrency } from '@/lib/currency';

/** Renders a base-EUR amount in the visitor's chosen currency. */
export function Price({ eur, compact = false, className = '' }: { eur: number; compact?: boolean; className?: string }) {
  const { format, currency } = useCurrency();
  return (
    <span className={`tabular-nums ${className}`} suppressHydrationWarning title={currency === 'EUR' ? undefined : `Converted from €${eur.toLocaleString('en-GB')} at a placeholder rate`}>
      {format(eur, { compact })}
    </span>
  );
}
