'use client';

import Link from 'next/link';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { PortugalLineMap } from '@/components/svg/PortugalLineMap';
import { MAINLAND_PINS } from '@/components/svg/paths';
import { destinations } from '@/data/destinations';
import { ease } from '@/config/theme';

/** Pin positions in the 520×540 PortugalLineMap space. */
function pinFor(slug: string): { x: number; y: number } | null {
  const m = MAINLAND_PINS[slug];
  if (m) return { x: 240 + m.x, y: 10 + m.y };
  if (slug === 'madeira') return { x: 100, y: 384 };
  if (slug === 'azores') return { x: 152, y: 190 };
  return null;
}

/** Flyward A3: dark section, outlined headline, line-art map. Our map adds every destination. */
export function MapTransition() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const [hover, setHover] = useState<string | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const titleX = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : ['6%', '-10%']);

  return (
    <section ref={ref} className="relative overflow-hidden bg-harbor-deep pb-28 pt-16 text-shell md:pb-40" aria-labelledby="map-title">
      <div className="azulejo-pattern absolute inset-0 opacity-[0.05]" aria-hidden />
      <motion.h2
        id="map-title"
        style={{ x: titleX }}
        className="font-display-caps outline-text relative whitespace-nowrap px-gutter text-[clamp(3rem,1rem+8vw,8.5rem)] leading-[0.9] text-shell/80"
      >
        A season designed around you
      </motion.h2>

      <div className="relative mt-10 grid gap-12 px-gutter md:grid-cols-[1fr_1.1fr] md:items-center">
        <div className="max-w-md">
          <p className="text-statement">
            All of Portugal, not just Porto. Twelve places we know street by street, from the Minho to the Algarve and out
            into the Atlantic.
          </p>
          <ul className="mt-8 grid grid-cols-2 gap-x-6 gap-y-1.5 text-[0.875rem] text-shell/75">
            {destinations.map((d, i) => (
              <li key={d.slug}>
                <Link
                  href={`/destinations/${d.slug}`}
                  onMouseEnter={() => setHover(d.slug)}
                  onMouseLeave={() => setHover(null)}
                  onFocus={() => setHover(d.slug)}
                  onBlur={() => setHover(null)}
                  className={`inline-flex gap-2 transition-colors hover:text-terracotta ${hover === d.slug ? 'text-terracotta' : ''}`}
                >
                  <span className="tabular-nums text-shell/40">{String(i + 1).padStart(2, '0')}</span>
                  {d.shortName}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative mx-auto w-full max-w-[34rem]">
          <svg viewBox="0 0 520 540" className="absolute inset-0 h-full w-full" aria-hidden>
            {destinations.map((d, i) => {
              const pos = pinFor(d.slug);
              if (!pos) return null;
              const on = hover === d.slug;
              return (
                <motion.g
                  key={d.slug}
                  initial={reduce ? false : { opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease, delay: 0.6 + i * 0.07 }}
                  style={{ transformOrigin: `${pos.x}px ${pos.y}px` }}
                >
                  <circle cx={pos.x} cy={pos.y} r={on ? 9 : 5} className="fill-terracotta/25 transition-all duration-300" />
                  <circle cx={pos.x} cy={pos.y} r="2.6" className={on ? 'fill-terracotta' : 'fill-shell'} />
                </motion.g>
              );
            })}
          </svg>
          <motion.div
            initial={reduce ? false : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.6, ease }}
          >
            <PortugalLineMap className="h-auto w-full text-shell/55" />
          </motion.div>
          <p className="eyebrow absolute left-[2%] top-[19%] text-shell/50">Azores</p>
          <p className="eyebrow absolute left-[2%] top-[58%] text-shell/50">Madeira</p>
        </div>
      </div>
    </section>
  );
}
