'use client';

import { useEffect, useState } from 'react';
import { lisbonDate, lisbonTime } from '@/lib/lisbonTime';

/** Live Lisbon date and ticking time (Flyward footer). Renders after mount to avoid hydration drift. */
export function LiveClock({ className = '' }: { className?: string }) {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <div className={className}>
      <p className="min-h-[1.5em]">{now ? lisbonDate(now) : ' '}</p>
      <p className="min-h-[1.5em] tabular-nums" aria-live="off">
        {now ? lisbonTime(now) : ' '}
      </p>
    </div>
  );
}
