import { stats } from '@/data/stats';
import { people } from '@/data/people';
import { Counter } from '@/components/motion/Counter';
import { Marquee } from '@/components/motion/Marquee';
import { PlaceholderFlag } from '@/components/shared/PlaceholderFlag';
import { Reveal } from '@/components/motion/Reveal';

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
export function PeopleMarquee({ tone = 'dark' }: { tone?: 'dark' | 'light' }) {
  const half = Math.ceil(people.length / 2);
  const rows = [people.slice(0, half), people.slice(half)];
  return (
    <div className={tone === 'light' ? 'text-shell' : 'text-harbor'}>
      {rows.map((row, r) => (
        <Marquee key={r} duration={48 + r * 10} reverse={r === 1} className="py-2.5" label={r === 0 ? 'Our people in Portugal' : undefined}>
          {row.map((p) => (
            <span key={p.slug} className="flex items-baseline whitespace-nowrap pr-6">
              <span className="text-[clamp(1rem,0.8rem+0.6vw,1.25rem)] uppercase tracking-[0.02em]">{p.name}</span>
              <span className="ml-1.5 text-[0.75rem] opacity-70">
                ({p.role}, {p.town})
              </span>
              <span aria-hidden className="ml-6 opacity-50">
                —
              </span>
            </span>
          ))}
        </Marquee>
      ))}
    </div>
  );
}

/** Kultiveret light-blue band: figures, then the "selected partners" marquee as "Our people in Portugal". */
export function StatsPeople() {
  return (
    <section className="bg-azulejo-mist pb-8 pt-20 text-harbor md:pt-28" aria-labelledby="stats-title">
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
      <Reveal className="mt-24 px-gutter">
        <p className="eyebrow text-harbor/60">Our people in Portugal · placeholder names</p>
      </Reveal>
      <div className="mt-3">
        <PeopleMarquee />
      </div>
    </section>
  );
}
