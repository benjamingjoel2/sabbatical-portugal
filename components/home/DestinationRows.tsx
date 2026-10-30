'use client';

import Link from 'next/link';
import { destinations, regionLabels } from '@/data/destinations';
import type { Destination } from '@/data/types';
import { HoverPreviewList } from '@/components/shared/HoverPreviewList';
import { Price } from '@/components/shared/Price';
import { ArrowLink } from '@/components/shared/Buttons';
import { RevealLines } from '@/components/motion/Reveal';

export function DestinationRowList({ list = destinations }: { list?: Destination[] }) {
  return (
    <HoverPreviewList items={list.map((d) => ({ key: d.slug, image: d.image }))}>
      {(bind) => (
        <ul className="flex flex-col gap-1.5">
          {list.map((d, i) => (
            <li key={d.slug} {...bind(d.slug)}>
              <Link
                href={`/destinations/${d.slug}`}
                className="group grid gap-x-6 gap-y-2 bg-limestone/60 px-4 py-5 transition-colors hover:bg-limestone md:grid-cols-[3rem_1.3fr_1fr_0.7fr_auto] md:items-baseline md:px-5 md:py-6"
              >
                <span className="text-[0.75rem] tabular-nums text-harbor/50">{String(i + 1).padStart(2, '0')}</span>
                <span>
                  <span className="block text-[clamp(1.5rem,1.1rem+1.4vw,2.5rem)] leading-[1.05] tracking-[-0.02em] transition-colors group-hover:text-terracotta">
                    {d.name}
                  </span>
                  {d.highlight && (
                    <span className="eyebrow mt-2 inline-block bg-port px-1.5 py-1 text-[0.5625rem] text-shell">{d.highlight}</span>
                  )}
                </span>
                <span className="text-[0.875rem] leading-snug text-harbor/80">{d.vibe}</span>
                <span className="flex items-start gap-2 text-[0.8125rem] text-harbor/70">
                  <span aria-hidden className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-harbor/70" />
                  <span>
                    <span className="sr-only">Best for: </span>
                    {d.bestFor.slice(0, 2).join(', ')}
                  </span>
                </span>
                <span className="text-[0.8125rem] md:text-right">
                  <span className="text-harbor/60">From </span>
                  <Price eur={d.monthlyBudgetFrom} className="font-medium" />
                  <span className="text-harbor/60"> / mo</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </HoverPreviewList>
  );
}

/** Homepage destinations: Kultiveret row list with Flyward section rhythm. */
export function DestinationRows() {
  return (
    <section className="bg-shell px-gutter py-24 md:py-32" aria-labelledby="dest-title">
      <div className="mb-12 grid gap-8 md:grid-cols-2 md:items-end">
        <RevealLines id="dest-title" as="h2" lines={['Twelve harbors,', 'one Portugal']} className="font-display-caps text-display-l" />
        <div className="max-w-md md:justify-self-end">
          <p className="text-[0.9375rem] leading-relaxed text-harbor/80">
            Cities, surf towns, quiet countryside and Atlantic islands. Typical monthly budgets are for one person, all in:
            home, workspace, food and getting around. Prices show in your chosen currency.
          </p>
          <p className="mt-3 text-[0.75rem] text-harbor/50">
            {Object.values(regionLabels).join(' · ')} · Budgets are placeholder estimates.
          </p>
        </div>
      </div>
      <DestinationRowList />
      <div className="mt-10">
        <ArrowLink href="/destinations">all destinations</ArrowLink>
      </div>
    </section>
  );
}
