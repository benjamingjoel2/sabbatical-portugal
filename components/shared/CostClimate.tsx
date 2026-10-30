import type { Destination } from '@/data/types';
import { Price } from './Price';
import { Counter } from '@/components/motion/Counter';
import { PlaceholderFlag } from './PlaceholderFlag';
import { CompassStar } from '@/components/svg/Icons';

/** Flyward stats row repurposed: cost-of-living snapshot (EUR base, converted). */
export function CostSnapshot({ d }: { d: Destination }) {
  const items = [
    { label: 'One-bed rent', eur: d.costs.rentOneBed, note: 'per month, furnished, mid-term' },
    { label: 'Coworking', eur: d.costs.coworkingMonth, note: 'per month, flexible desk' },
    { label: 'Coffee', eur: d.costs.coffee, note: 'an espresso at the counter' },
    { label: 'Dinner for two', eur: d.costs.dinnerForTwo, note: 'a good neighborhood restaurant' },
  ];
  return (
    <section className="bg-limestone/50 px-gutter py-20 md:py-28" aria-labelledby="costs-title">
      <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
        <h2 id="costs-title" className="font-display-caps text-display-m">
          Cost of living
          <span className="block">snapshot</span>
        </h2>
        <div className="max-w-sm text-[0.875rem] text-harbor/75">
          <PlaceholderFlag label="Placeholder figures" />
          <p className="mt-2">Typical prices we see in {d.shortName}. Shown in your chosen currency. Your plan quote lists exact costs.</p>
        </div>
      </div>
      <ul className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-4">
        {items.map((it) => (
          <li key={it.label} className="border-t border-harbor/20 pt-5">
            <p className="font-display font-semibold text-[clamp(2.25rem,1.6rem+2vw,3.5rem)] leading-none">
              <span className="mr-[0.2em] align-middle text-[0.35em] font-normal">From</span>
              <Price eur={it.eur} />
            </p>
            <p className="mt-4 text-[1rem]">{it.label}</p>
            <p className="mt-1 text-[0.8125rem] text-harbor/60">{it.note}</p>
          </li>
        ))}
      </ul>
      <div className="mt-14 flex flex-wrap items-baseline gap-x-10 gap-y-4 border-t border-harbor/20 pt-6 text-[0.9375rem]">
        <p className="flex items-center gap-2">
          <CompassStar size={10} className="text-terracotta" /> Typical all-in budget: From <Price eur={d.monthlyBudgetFrom} className="font-medium" /> / month
        </p>
        <p className="flex items-center gap-2">
          <CompassStar size={10} className="text-terracotta" /> Home internet around <Counter value={d.internet.typicalMbps} /> Mbps
        </p>
      </div>
    </section>
  );
}

/** Climate by month: 12 columns with highs as bars, lows, sea temperature and rain days. */
export function ClimateStrip({ d }: { d: Destination }) {
  const max = Math.max(...d.climate.map((m) => m.highC));
  return (
    <section className="bg-shell px-gutter py-20 md:py-28" aria-labelledby="climate-title">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
        <h2 id="climate-title" className="font-display-caps text-display-m">
          Climate
          <span className="block">by month</span>
        </h2>
        <p className="max-w-sm text-[0.8125rem] text-harbor/60">
          Typical daytime highs and night lows (°C){d.climate.some((m) => m.seaC) ? ', sea temperature' : ''} and rainy days. Placeholder averages.
        </p>
      </div>
      <div className="overflow-x-auto pb-2">
        <table className="w-full min-w-[42rem] border-collapse text-center text-[0.8125rem]">
          <caption className="sr-only">Climate by month in {d.name}</caption>
          <thead>
            <tr>
              <th scope="row" className="w-28 text-left font-normal text-harbor/60">
                Month
              </th>
              {d.climate.map((m) => (
                <th key={m.month} scope="col" className="eyebrow pb-3 font-normal">
                  {m.month}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row" className="text-left font-normal text-harbor/60">
                High
              </th>
              {d.climate.map((m) => (
                <td key={m.month} className="h-40 px-0.5 align-bottom">
                  <div className="mx-auto flex h-full w-full max-w-[2.5rem] flex-col justify-end">
                    <span className="mb-1 tabular-nums">{m.highC}°</span>
                    <div
                      className="w-full shrink-0 bg-gradient-to-t from-azulejo/70 to-terracotta/80"
                      style={{ height: `calc(${(m.highC / max) * 100}% - 1.5rem)` }}
                      aria-hidden
                    />
                  </div>
                </td>
              ))}
            </tr>
            <tr className="border-t border-line">
              <th scope="row" className="py-2 text-left font-normal text-harbor/60">
                Low
              </th>
              {d.climate.map((m) => (
                <td key={m.month} className="py-2 tabular-nums">
                  {m.lowC}°
                </td>
              ))}
            </tr>
            {d.climate.some((m) => m.seaC) && (
              <tr className="border-t border-line">
                <th scope="row" className="py-2 text-left font-normal text-harbor/60">
                  Sea
                </th>
                {d.climate.map((m) => (
                  <td key={m.month} className="py-2 tabular-nums text-azulejo">
                    {m.seaC ? `${m.seaC}°` : '–'}
                  </td>
                ))}
              </tr>
            )}
            <tr className="border-t border-line">
              <th scope="row" className="py-2 text-left font-normal text-harbor/60">
                Rainy days
              </th>
              {d.climate.map((m) => (
                <td key={m.month} className="py-2 tabular-nums">
                  {m.rainDays}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}
