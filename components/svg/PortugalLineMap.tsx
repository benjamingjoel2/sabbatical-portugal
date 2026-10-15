import { AZORES_ISLANDS, MADEIRA_PATH, PORTO_SANTO_PATH, PORTUGAL_PATH } from './paths';

/** Decorative line-art map: mainland plus Madeira and Azores insets. */
export function PortugalLineMap({ className = '', strokeClass = 'stroke-current' }: { className?: string; strokeClass?: string }) {
  return (
    <svg viewBox="0 0 520 540" className={className} aria-hidden fill="none">
      <g transform="translate(240 10)" className={strokeClass} strokeWidth="1">
        <path d={PORTUGAL_PATH} />
      </g>
      <g transform="translate(10 330)" className={strokeClass} strokeWidth=".8">
        <rect x="0" y="0" width="190" height="90" strokeDasharray="2 4" />
        <g transform="translate(20 15) scale(1.5)">
          <path d={MADEIRA_PATH} />
          <path d={PORTO_SANTO_PATH} />
        </g>
      </g>
      <g transform="translate(10 120)" className={strokeClass} strokeWidth=".8">
        <rect x="0" y="0" width="190" height="90" strokeDasharray="2 4" />
        <g transform="translate(5 10) scale(1.8)">
          {AZORES_ISLANDS.map((d, i) => (
            <path key={i} d={d} />
          ))}
        </g>
      </g>
    </svg>
  );
}
