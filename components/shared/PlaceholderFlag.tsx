export function PlaceholderFlag({ label = 'Placeholder', className = '' }: { label?: string; className?: string }) {
  return (
    <span
      className={`eyebrow inline-flex items-center gap-1 rounded-sm border border-current px-1.5 py-0.5 text-[0.5625rem] tracking-[0.12em] opacity-80 ${className}`}
    >
      <span aria-hidden>●</span> {label}
    </span>
  );
}
