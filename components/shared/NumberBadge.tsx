/** Kultiveret boxed number ("01"). */
export function NumberBadge({ n, className = '' }: { n: number | string; className?: string }) {
  const label = typeof n === 'number' ? String(n).padStart(2, '0') : n;
  return (
    <span className={`inline-grid h-5 min-w-[1.75rem] place-items-center border border-harbor bg-shell px-1 text-[0.6875rem] tabular-nums text-harbor ${className}`} aria-hidden>
      {label}
    </span>
  );
}
