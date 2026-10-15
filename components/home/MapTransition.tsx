'use client';

import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { useState } from 'react';
import { PortugalLineMap } from '@/components/svg/PortugalLineMap';
import { MAINLAND_PINS } from '@/components/svg/paths';
import { destinations } from '@/data/destinations';
import { Reveal } from '@/components/motion/Reveal';
import { ease } from '@/config/theme';

/** Pin positions in the 520×540 PortugalLineMap space. */
function pinFor(slug: string): { x: number; y: number } | null {
  const m = MAINLAND_PINS[slug];
  if (m) return { x: 240 + m.x, y: 10 + m.y };
  if (slug === 'madeira') return { x: 100, y: 384 };
  if (slug === 'azores') return { x: 152, y: 190 };
  return null;
}

/** Kultiveret-style intro statement plus a line map of every destination, mainland and islands. */
export function MapTransition() {
  const reduce = useReducedMotion();
  const [hover, setHover] = useState<string | null>(null);

  return (
    <section className="bg-shell px-gutter pb-24 pt-16 md:pb-32 md:pt-24" aria-labelledby="map-title">
      <Reveal>
        <h2 id="map-title" className="text-statement indent-[clamp(2rem,30vw,28rem)]">
          All of Portugal, not just Porto. Twelve places we know street by street, from the Douro’s terraces and Lisbon’s
          hills to the Algarve coast and two Atlantic archipelagos.
        </h2>
      </Reveal>

      <div className="mt-16 grid gap-12 md:grid-cols-[1fr_1fr] md:items-center">
        <ol className="tight-display order-2 text-[clamp(1.5rem,1.1rem+1.6vw,2.5rem)] leading-[1.15] md:order-1">
          {destinations.map((d, i) => (
            <li key={d.slug}>
              <Link
                href={`/destinations/${d.slug}`}
                onMouseEnter={() => setHover(d.slug)}
                onMouseLeave={() => setHover(null)}
                onFocus={() => setHover(d.slug)}
                onBlur={() => setHover(null)}
                className={`inline-flex items-start gap-1 transition-colors ${hover && hover !== d.slug ? 'text-harbor/30' : 'hover:text-terracotta'}`}
              >
                {d.shortName}
                <sup className="mt-[0.35em] text-[0.35em] font-medium tracking-normal">{String(i + 1).padStart(2, '0')}</sup>
              </Link>
            </li>
          ))}
        </ol>

        <div className="relative order-1 mx-auto w-full max-w-[32rem] md:order-2">
          <PortugalLineMap className="h-auto w-full text-harbor/45" />
          <svg viewBox="0 0 520 540" className="absolute inset-0 h-full w-full" aria-hidden>
            {destinations.map((d, i) => {
              const pos = pinFor(d.slug);
              if (!pos) return null;
              const on = hover === d.slug;
              return (
                <motion.g
                  key={d.slug}
                  initial={reduce ? false : { opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease, delay: 0.3 + i * 0.06 }}
                >
                  <circle cx={pos.x} cy={pos.y} r={on ? 11 : 6} className="fill-terracotta/25 transition-all duration-300" />
                  <circle cx={pos.x} cy={pos.y} r="3" className={on ? 'fill-terracotta' : 'fill-harbor'} />
                </motion.g>
              );
            })}
          </svg>
          <p className="eyebrow absolute left-[2%] top-[17%] text-harbor/50">Azores</p>
          <p className="eyebrow absolute left-[2%] top-[57%] text-harbor/50">Madeira</p>
        </div>
      </div>
    </section>
  );
}
