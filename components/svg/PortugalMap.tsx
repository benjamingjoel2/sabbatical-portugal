'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { AZORES, AZORES_VIEW, GEO_PINS, MADEIRA, MADEIRA_VIEW, MAINLAND_VIEW, PORTUGAL_MAINLAND, SPAIN } from './portugalGeo';
import { destinations } from '@/data/destinations';

/** Frame placement inside the 760×640 map canvas. */
const FRAMES = {
  mainland: { x: 372, y: 15, s: 1, w: MAINLAND_VIEW.w, h: MAINLAND_VIEW.h },
  azores: { x: 0, y: 40, s: 0.86, w: AZORES_VIEW.w, h: AZORES_VIEW.h },
  madeira: { x: 0, y: 300, s: 0.86, w: MADEIRA_VIEW.w, h: MADEIRA_VIEW.h },
} as const;

/** Label placement so clustered pins (Lisbon coast) stay readable. */
const LABEL: Record<string, { dx: number; dy: number; anchor: 'start' | 'end' }> = {
  porto: { dx: -10, dy: 4, anchor: 'end' },
  'douro-valley': { dx: 10, dy: 4, anchor: 'start' },
  coimbra: { dx: 10, dy: 4, anchor: 'start' },
  ericeira: { dx: -10, dy: 2, anchor: 'end' },
  'cascais-sintra': { dx: -10, dy: 12, anchor: 'end' },
  lisbon: { dx: 10, dy: -4, anchor: 'start' },
  comporta: { dx: 10, dy: 6, anchor: 'start' },
  'evora-alentejo': { dx: 10, dy: 4, anchor: 'start' },
  'lagos-western-algarve': { dx: -10, dy: 4, anchor: 'end' },
  'tavira-eastern-algarve': { dx: 10, dy: -8, anchor: 'start' },
  madeira: { dx: 10, dy: -8, anchor: 'start' },
  azores: { dx: -10, dy: -10, anchor: 'end' },
};

function pinPoint(slug: string) {
  const p = GEO_PINS[slug];
  if (!p) return null;
  const f = FRAMES[p.frame];
  return { x: f.x + p.x * f.s, y: f.y + p.y * f.s };
}

/**
 * Illustrated map of Portugal from real geography (Natural Earth): ocean tint, Spain for context,
 * the mainland, and Azores and Madeira insets. Every destination is pinned and labelled.
 */
export function PortugalMap({
  active,
  onHover,
  className = '',
}: {
  active?: string | null;
  onHover?: (slug: string | null) => void;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const m = FRAMES.mainland;
  const az = FRAMES.azores;
  const md = FRAMES.madeira;

  return (
    <svg viewBox="0 0 760 640" className={className} role="img" aria-labelledby="pt-map-title">
      <title id="pt-map-title">Map of Portugal showing Porto Season’s twelve destinations, including Madeira and the Azores</title>
      <defs>
        <clipPath id="clip-mainland">
          <rect x={m.x} y={m.y} width={m.w} height={m.h} />
        </clipPath>
        <clipPath id="clip-azores">
          <rect x={az.x} y={az.y} width={az.w * az.s} height={az.h * az.s} />
        </clipPath>
        <clipPath id="clip-madeira">
          <rect x={md.x} y={md.y} width={md.w * md.s} height={md.h * md.s} />
        </clipPath>
        <pattern id="sea-lines" width="10" height="10" patternUnits="userSpaceOnUse">
          <path d="M0 5h10" stroke="#14263B" strokeOpacity="0.05" strokeWidth="1" />
        </pattern>
      </defs>

      {/* Mainland frame */}
      <g clipPath="url(#clip-mainland)">
        <rect x={m.x} y={m.y} width={m.w} height={m.h} fill="#C6D3DF" fillOpacity="0.55" />
        <rect x={m.x} y={m.y} width={m.w} height={m.h} fill="url(#sea-lines)" />
        <g transform={`translate(${m.x} ${m.y})`}>
          <path d={SPAIN} fill="#E7E0D2" stroke="#14263B" strokeOpacity="0.2" strokeWidth="0.8" strokeLinejoin="round" />
          <path d={PORTUGAL_MAINLAND} fill="#FBFAF6" stroke="#14263B" strokeWidth="1" strokeLinejoin="round" />
        </g>
        <text x={m.x + 312} y={m.y + 300} className="fill-harbor/35 text-[13px] uppercase tracking-[0.3em]" textAnchor="middle">
          Spain
        </text>
        <text x={m.x + 14} y={m.y + 240} className="fill-harbor/40 text-[10px] uppercase tracking-[0.3em]" transform={`rotate(-90 ${m.x + 14} ${m.y + 240})`} textAnchor="middle">
          Atlantic Ocean
        </text>
      </g>
      <rect x={m.x} y={m.y} width={m.w} height={m.h} fill="none" stroke="#14263B" strokeOpacity="0.25" />

      {/* Azores inset */}
      <g clipPath="url(#clip-azores)">
        <rect x={az.x} y={az.y} width={az.w * az.s} height={az.h * az.s} fill="#C6D3DF" fillOpacity="0.55" />
        <g transform={`translate(${az.x} ${az.y}) scale(${az.s})`}>
          <path d={AZORES} fill="#FBFAF6" stroke="#14263B" strokeWidth={1 / az.s} strokeLinejoin="round" />
        </g>
      </g>
      <rect x={az.x} y={az.y} width={az.w * az.s} height={az.h * az.s} fill="none" stroke="#14263B" strokeOpacity="0.25" />
      <text x={az.x + 10} y={az.y + az.h * az.s - 12} className="fill-harbor text-[12px] uppercase tracking-[0.2em]">
        Azores
      </text>

      {/* Madeira inset */}
      <g clipPath="url(#clip-madeira)">
        <rect x={md.x} y={md.y} width={md.w * md.s} height={md.h * md.s} fill="#C6D3DF" fillOpacity="0.55" />
        <g transform={`translate(${md.x} ${md.y}) scale(${md.s})`}>
          <path d={MADEIRA} fill="#FBFAF6" stroke="#14263B" strokeWidth={1 / md.s} strokeLinejoin="round" />
        </g>
      </g>
      <rect x={md.x} y={md.y} width={md.w * md.s} height={md.h * md.s} fill="none" stroke="#14263B" strokeOpacity="0.25" />
      <text x={md.x + 10} y={md.y + md.h * md.s - 12} className="fill-harbor text-[12px] uppercase tracking-[0.2em]">
        Madeira
      </text>

      {/* Pins */}
      {destinations.map((d, i) => {
        const p = pinPoint(d.slug);
        if (!p) return null;
        const on = active === d.slug;
        const l = LABEL[d.slug] ?? { dx: 10, dy: 4, anchor: 'start' as const };
        return (
          <motion.g
            key={d.slug}
            initial={reduce ? false : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 + i * 0.05 }}
          >
            <Link
              href={`/destinations/${d.slug}`}
              onMouseEnter={() => onHover?.(d.slug)}
              onMouseLeave={() => onHover?.(null)}
              onFocus={() => onHover?.(d.slug)}
              onBlur={() => onHover?.(null)}
              aria-label={d.name}
            >
              <circle cx={p.x} cy={p.y} r={on ? 10 : 7} className="fill-terracotta/25 transition-all duration-300" />
              <circle cx={p.x} cy={p.y} r="3.5" className={on ? 'fill-terracotta' : 'fill-harbor'} />
              <text
                x={p.x + l.dx}
                y={p.y + l.dy}
                textAnchor={l.anchor}
                className={`text-[12px] font-medium transition-colors ${on ? 'fill-terracotta' : 'fill-harbor'}`}
                style={{ paintOrder: 'stroke', stroke: '#FBFAF6', strokeWidth: 3, strokeLinejoin: 'round' }}
              >
                {d.shortName}
              </text>
            </Link>
          </motion.g>
        );
      })}
    </svg>
  );
}
