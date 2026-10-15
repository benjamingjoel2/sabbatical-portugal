'use client';

import Link from 'next/link';
import { useState } from 'react';
import { PortugalMap } from '@/components/svg/PortugalMap';
import { destinations } from '@/data/destinations';
import { Reveal } from '@/components/motion/Reveal';

/** Kultiveret-style intro statement plus a line map of every destination, mainland and islands. */
export function MapTransition() {
  const [hover, setHover] = useState<string | null>(null);

  return (
    <section className="bg-shell px-gutter pb-24 pt-16 md:pb-32 md:pt-24" aria-labelledby="map-title">
      <Reveal>
        <h2 id="map-title" className="text-statement indent-[clamp(2rem,30vw,28rem)]">
          All of Portugal, not just Porto. Twelve places we know street by street, from the Douro’s terraces and Lisbon’s
          hills to the Algarve coast and two Atlantic archipelagos.
        </h2>
      </Reveal>

      <div className="mt-16 grid gap-12 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] md:items-center">
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

        <div className="order-1 w-full md:order-2">
          <PortugalMap active={hover} onHover={setHover} className="h-auto w-full" />
        </div>
      </div>
    </section>
  );
}
