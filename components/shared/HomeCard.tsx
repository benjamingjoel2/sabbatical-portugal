import { t, tp } from '@/lib/i18n/t';
import Link from '@/components/i18n/Link';
import type { Home } from '@/data/types';
import { homeTypeLabels } from '@/data/homes';
import { getDestination } from '@/data/destinations';
import { Photo } from './Photo';
import { Price } from './Price';
import { PlaceholderFlag } from './PlaceholderFlag';

export function HomeCard({ home }: { home: Home }) {
  const dest = getDestination(home.destination);
  return (
    <Link href={`/homes/${home.slug}`} className="group block">
      <div className="relative aspect-[4/5] overflow-hidden">
        <Photo k={home.images[0]} sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw" className="transition-transform duration-[1.2s] ease-[var(--ease-harbor)] group-hover:scale-105" />
        <span className="absolute left-3 top-3 bg-shell/90 px-2 py-1 text-[0.6875rem] uppercase tracking-[0.1em]">{tp(homeTypeLabels[home.type].replace(/s$/, ''))}</span>
      </div>
      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <h3 className="font-display font-semibold text-[1.375rem] leading-none tracking-[-0.04em] transition-colors group-hover:text-terracotta">{tp(home.name)}</h3>
          <p className="mt-2 text-[0.8125rem] text-harbor/70">
            {tp(home.area)}, {tp(dest?.shortName)} · {tp(home.bedrooms === 0 ? 'Studio' : `${home.bedrooms} bed`)} · {tp(home.mbps)} {t("Mbps")}</p>
        </div>
        <p className="shrink-0 text-right text-[0.8125rem]">
          {t("From ")}<Price eur={tp(home.perMonth)} className="font-medium" />
          <span className="block text-harbor/60">{t("per month")}</span>
        </p>
      </div>
      <PlaceholderFlag label={t("Placeholder home")} className="mt-3" />
    </Link>
  );
}
