import { SHORE_PATHS } from './paths';

/**
 * Organic shoreline edge between sections (rebuilt idea of the reference's torn-paper edge).
 * Place inside a relatively positioned section. `fill` should match the neighbouring section.
 */
export function ShoreEdge({
  position = 'bottom',
  fillClass = 'fill-shell',
  variant = 0,
  className = '',
}: {
  position?: 'top' | 'bottom';
  fillClass?: string;
  variant?: 0 | 1;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 1440 80"
      preserveAspectRatio="none"
      aria-hidden
      className={`pointer-events-none absolute left-0 z-10 h-[clamp(28px,5vw,80px)] w-full ${
        position === 'bottom' ? 'bottom-[-1px]' : 'top-[-1px] rotate-180'
      } ${className}`}
    >
      <path d={SHORE_PATHS[variant]} className={fillClass} />
    </svg>
  );
}
