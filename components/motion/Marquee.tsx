import { tp } from '@/lib/i18n/t';
export function Marquee({
  children,
  duration = 60,
  reverse = false,
  className = '',
  label,
}: {
  children: React.ReactNode;
  duration?: number;
  reverse?: boolean;
  className?: string;
  label?: string;
}) {
  return (
    <div className={`marquee overflow-hidden ${className}`} aria-label={tp(label)} role={label ? 'region' : undefined}>
      <div
        className="marquee-track flex w-max"
        style={{ '--marquee-duration': `${duration}s`, '--marquee-direction': reverse ? 'reverse' : 'normal' } as React.CSSProperties}
      >
        <div className="flex shrink-0">{children}</div>
        <div className="flex shrink-0" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
