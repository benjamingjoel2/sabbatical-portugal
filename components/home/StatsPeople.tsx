import { stats } from '@/data/stats';
import { Counter } from '@/components/motion/Counter';
import { PlaceholderFlag } from '@/components/shared/PlaceholderFlag';

export function StatsRow({ tone = 'dark' }: { tone?: 'dark' | 'light' }) {
  return (
    <ul className={`grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-5 ${tone === 'light' ? 'text-shell' : 'text-harbor'}`}>
      {stats.map((s) => {
        const decimals = s.value % 1 === 0 ? 0 : 1;
        return (
          <li key={s.label} className="border-t border-harbor/20 pt-4">
            <p className="tight-display text-[clamp(3rem,2rem+3.6vw,5.5rem)] leading-none">
              <Counter value={s.value} decimals={decimals} />
              {s.suffix}
              {s.unit && <sup className="ml-1 text-[0.25em] font-medium tracking-normal">{s.unit}</sup>}
            </p>
            <p className="mt-3 text-[0.9375rem]">{s.label}</p>
            <p className="mt-1 max-w-[14rem] text-[0.8125rem] leading-snug opacity-70">{s.description}</p>
          </li>
        );
      })}
    </ul>
  );
}
/** Kultiveret light-blue band: figures. */
export function StatsPeople() {
  return (
    <section className="bg-azulejo-mist pb-20 pt-20 text-harbor md:pb-28 md:pt-28" aria-labelledby="stats-title">
      <div className="px-gutter">
        <div className="mb-14 grid gap-6 md:grid-cols-2 md:items-end">
          <h2 id="stats-title" className="tight-display text-mega">
            A season you can rely on
          </h2>
          <p className="flex flex-wrap items-center gap-2 text-[0.8125rem] md:justify-self-end">
            <PlaceholderFlag label="Placeholder figures" /> Real numbers will replace these before launch.
          </p>
        </div>
        <StatsRow />
      </div>
    </section>
  );
}
