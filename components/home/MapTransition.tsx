'use client';

import { t, tp } from '@/lib/i18n/t';
import Link from '@/components/i18n/Link';
import { useState } from 'react';
import { destinations } from '@/data/destinations';
import { Reveal } from '@/components/motion/Reveal';

/** Kultiveret-style intro statement plus the list of every destination, mainland and islands (no map, by owner rule). */
export function MapTransition() {
  const [hover, setHover] = useState<string | null>(null);

  return (
    <section className="bg-shell px-gutter pb-24 pt-16 md:pb-32 md:pt-24" aria-labelledby="map-title">
      <Reveal>
        <h2 id="map-title" className="text-statement indent-[clamp(2rem,30vw,28rem)]">
          {t("All of Portugal, not just Porto. Twelve places we know street by street, from the Douro’s terraces and Lisbon’s hills to the Algarve coast and two Atlantic archipelagos.")}</h2>
      </Reveal>

      <div className="mt-16">
        <ol className="tight-display grid text-[clamp(1.5rem,1.1rem+1.6vw,2.5rem)] leading-[1.15] md:grid-cols-2 md:gap-x-12 lg:grid-cols-3">
          {destinations.map((d, i) => (
            <li key={d.slug}>
              <Link
                href={`/destinations/${d.slug}`}
                onMouseEnter={() => setHover(d.slug)}
                onMouseLeave={() => setHover(null)}
                onFocus={() => setHover(d.slug)}
                onBlur={() => setHover(null)}
                className={`transition-colors ${hover && hover !== d.slug ? 'text-harbor/30' : 'hover:text-terracotta'}`}
              >
                {tp(d.shortName)}
                <sup className="ml-1 text-[0.4em] font-medium tracking-normal">{tp(String(i + 1).padStart(2, '0'))}</sup>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
