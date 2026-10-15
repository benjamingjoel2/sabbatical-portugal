import { stats } from '@/data/stats';
import { people } from '@/data/people';
import { Photo } from '@/components/shared/Photo';
import { Counter } from '@/components/motion/Counter';
import { Marquee } from '@/components/motion/Marquee';
import { CompassStar } from '@/components/svg/Icons';
import { ShoreEdge } from '@/components/svg/ShoreEdge';
import { PlaceholderFlag } from '@/components/shared/PlaceholderFlag';
import { RevealLines, Reveal } from '@/components/motion/Reveal';

export function StatsRow({ tone = 'dark' }: { tone?: 'dark' | 'light' }) {
  return (
    <ul className={`grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-5 ${tone === 'light' ? 'text-shell' : 'text-harbor'}`}>
      {stats.map((s) => {
        const decimals = s.value % 1 === 0 ? 0 : 1;
        return (
          <li key={s.label} className="flex flex-col items-center text-center">
            <p className="eyebrow">{s.label}</p>
            <p className="mt-4 font-display text-[clamp(3rem,2rem+3.4vw,5rem)] leading-none">
              <Counter value={s.value} decimals={decimals} />
              {s.suffix}
            </p>
            {s.unit ? <p className="mt-3 font-display text-[1rem] uppercase tracking-[0.06em]">{s.unit}</p> : <CompassStar className="mt-4" size={12} />}
            <p className="mt-3 max-w-[13rem] text-[0.75rem] leading-snug opacity-75">{s.description}</p>
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

/** Flyward A6 (pinned sunset photo, counters, partner strip) with Kultiveret's partner marquee content. */
export function StatsPeople() {
  return (
    <section className="relative isolate text-harbor" aria-label="Our track record and our people">
      <ShoreEdge position="top" fillClass="fill-shell" />
      <div className="sticky top-0 -z-10 h-screen overflow-hidden" aria-hidden>
        <Photo k="beachSunset" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-b from-shell/30 via-shell/45 to-shell/20" />
      </div>
      <div className="-mt-[100vh]">
        <div className="flex min-h-screen items-end px-gutter pb-[18vh]">
          <RevealLines as="h2" lines={['A season', 'you can rely on']} className="font-display-caps text-display-l mx-auto text-center" />
        </div>
        <div className="flex min-h-screen flex-col justify-center gap-10 px-gutter py-20">
          <StatsRow />
          <p className="mx-auto flex items-center gap-2 text-center text-[0.75rem]">
            <PlaceholderFlag label="Placeholder figures" /> Real numbers will replace these before launch.
          </p>
        </div>
        <div className="flex min-h-[80vh] flex-col justify-center gap-8 py-20">
          <Reveal className="flex flex-col items-center gap-2 px-gutter">
            <CompassStar size={12} />
            <h2 className="eyebrow">Our people in Portugal</h2>
            <p className="max-w-md text-center text-[0.875rem]">
              Hosts, teachers, surf coaches, lawyers and makers we trust, in every place we work.
            </p>
            <PlaceholderFlag label="Placeholder names" className="mt-1" />
          </Reveal>
          <PeopleMarquee />
        </div>
      </div>
    </section>
  );
}
