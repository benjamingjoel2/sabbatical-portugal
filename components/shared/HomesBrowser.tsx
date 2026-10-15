'use client';

import { useMemo, useState } from 'react';
import { homes, homeTypeLabels } from '@/data/homes';
import { destinations } from '@/data/destinations';
import type { HomeType } from '@/data/types';
import { HomeCard } from './HomeCard';
import { TabList } from './Tabs';

type TypeFilter = HomeType | 'all';
const typeTabs: { slug: TypeFilter; label: string }[] = [
  { slug: 'all', label: 'All homes' },
  ...(Object.keys(homeTypeLabels) as HomeType[]).map((t) => ({ slug: t, label: homeTypeLabels[t] })),
];

export function HomesBrowser() {
  const [type, setType] = useState<TypeFilter>('all');
  const [dest, setDest] = useState('all');
  const list = useMemo(
    () => homes.filter((h) => (type === 'all' || h.type === type) && (dest === 'all' || h.destination === dest)),
    [type, dest],
  );
  const destsWithHomes = destinations.filter((d) => homes.some((h) => h.destination === d.slug));

  return (
    <section className="bg-shell px-gutter pb-24" aria-label="Homes">
      <div className="flex flex-col gap-6 border-y border-line py-5 md:flex-row md:items-center md:justify-between">
        <TabList tabs={typeTabs} value={type} onChange={setType} idBase="homes" label="Filter by home type" />
        <div className="flex items-center gap-3 text-[0.875rem]">
          <label htmlFor="dest-filter" className="text-harbor/60">
            Destination
          </label>
          <select id="dest-filter" value={dest} onChange={(e) => setDest(e.target.value)} className="border-b border-harbor bg-transparent py-1 pr-2">
            <option value="all">Anywhere</option>
            {destsWithHomes.map((d) => (
              <option key={d.slug} value={d.slug}>
                {d.shortName}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div role="tabpanel" id={`homes-panel-${type}`} aria-labelledby={`homes-tab-${type}`} className="mt-12">
        <p className="mb-8 text-[0.8125rem] text-harbor/60" aria-live="polite">
          {list.length} {list.length === 1 ? 'home' : 'homes'}
        </p>
        {list.length ? (
          <ul className="grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((h) => (
              <li key={h.slug}>
                <HomeCard home={h} />
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-[0.9375rem] text-harbor/70">
            No listed homes match yet. We source homes to order: tell us what you need in the season planner.
          </p>
        )}
      </div>
    </section>
  );
}
