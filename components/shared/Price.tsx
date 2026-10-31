'use client';

import { tp } from '@/lib/i18n/t';
import { useCurrency } from '@/lib/currency';

/** Renders a base-EUR amount in the visitor's chosen currency. */
export function Price({ eur, compact = false, className = '' }: { eur: number; compact?: boolean; className?: string }) {
  const { format, currency } = useCurrency();
  return (
    <span className={`tabular-nums ${className}`} suppressHydrationWarning title={tp(currency === 'EUR' ? undefined : `Converted from €${eur.toLocaleString('en-GB')} at a placeholder rate`)}>
      {tp(format(eur, { compact }))}
    </span>
  );
}
