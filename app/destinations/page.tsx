import type { Metadata } from 'next';
import { destinations, regionLabels } from '@/data/destinations';
import type { Region } from '@/data/types';
import { DestinationRowList } from '@/components/home/DestinationRows';
import { MapTransition } from '@/components/home/MapTransition';
import { EditorialHero } from '@/components/shared/PageHero';
import { CtaHero } from '@/components/shared/CtaHero';
import { pageMeta } from '@/lib/seo';

export const metadata: Metadata = pageMeta({
  title: 'Destinations across Portugal',
  description:
    'Twelve places for a long stay in Portugal: Lisbon, Porto, Cascais & Sintra, Ericeira, Comporta, the Algarve, Évora & the Alentejo, the Douro, Coimbra, Madeira and the Azores.',
  path: '/destinations',
});

const order: Region[] = ['city', 'coast', 'countryside', 'islands'];

export default function DestinationsPage() {
  return (
    <>
      <EditorialHero eyebrow="Destinations · all of Portugal" title="Twelve harbors for a season">
        <p className="text-[1rem] leading-relaxed text-harbor/75">
          Porto Season covers the whole country, not only the city of Porto. Cities with trams and tascas, surf towns,
          quiet countryside, wine valleys and two Atlantic archipelagos.
        </p>
        <p className="text-[1rem] leading-relaxed text-harbor/75">
          Budgets are typical monthly all-in costs for one person and are placeholders while we finalise partner prices.
          Switch currency in the header to see them in yours.
        </p>
      </EditorialHero>
      <MapTransition />
      <div className="space-y-20 bg-shell px-gutter py-24">
        {order.map((r) => {
          const list = destinations.filter((d) => d.region === r);
          if (!list.length) return null;
          return (
            <section key={r} aria-labelledby={`region-${r}`}>
              <h2 id={`region-${r}`} className="eyebrow mb-5 text-harbor/60">
                {regionLabels[r]} · {list.length}
              </h2>
              <DestinationRowList list={list} />
            </section>
          );
        })}
      </div>
      <CtaHero lines={['Not sure where yet?', 'That’s our job']} image="lisbonRooftopsSea" />
    </>
  );
}
