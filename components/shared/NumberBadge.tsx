export function NumberBadge({ n, className = '' }: { n: number | string; className?: string }) {
  return (
    <span
      className={`grid h-6 w-6 place-items-center rounded-full bg-harbor text-[0.6875rem] text-shell ${className}`}
      aria-hidden
    >
      {n}
    </span>
  );
}
