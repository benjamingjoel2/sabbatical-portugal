import Link from 'next/link';
import { WaveMark } from '@/components/svg/Icons';

/** Text logo placeholder: tracked serif wordmark with a small harbour-wave mark. */
export function Logo({ className = '' }: { className?: string }) {
  return (
    <Link href="/" className={`group inline-flex items-center gap-2 ${className}`} aria-label="Porto Season, home">
      <WaveMark className="h-3 w-6 transition-transform duration-500 group-hover:-translate-y-0.5" />
      <span className="font-display text-[0.95rem] uppercase tracking-[0.32em] md:text-[1.05rem]">Porto Season</span>
    </Link>
  );
}
