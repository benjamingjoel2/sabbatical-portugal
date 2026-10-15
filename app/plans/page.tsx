import type { Metadata } from 'next';
import Link from 'next/link';
import { plans } from '@/data/plans';
import { EditorialHero } from '@/components/shared/PageHero';
import { Photo } from '@/components/shared/Photo';
import { Price } from '@/components/shared/Price';
import { ArrowUpRight } from '@/components/svg/Icons';
import { StepsZigzag } from '@/components/home/StepsZigzag';
import { CtaHero } from '@/components/shared/CtaHero';
import { pageMeta } from '@/lib/seo';

export const metadata: Metadata = pageMeta({
  title: 'Plans: from one month to a full year',
  description: 'Taster, Season, Full year and Family season plans for living in Portugal, each planned end to end by one specialist.',
  path: '/plans',
});

export default function PlansPage() {
  return (
    <>
      <EditorialHero eyebrow="Plans" title="One month to a full year">
        <p className="text-[1rem] leading-relaxed text-harbor/75">
          Every plan includes a vetted home, a real workspace, airport pickup and a specialist who knows you by name. Longer
          plans add admin help, visa guidance and school guidance.
        </p>
        <p className="text-[1rem] leading-relaxed text-harbor/75">
          Prices are “from” per month for one or two guests, before flights. Your quote lists everything, with no surprises.
        </p>
      </EditorialHero>
      <section aria-label="Plans" className="grid gap-1.5 bg-harbor-deep md:grid-cols-2">
        {plans.map((p) => (
          <Link key={p.slug} href={`/plans/${p.slug}`} className="group relative block h-[80vh] min-h-[30rem] overflow-hidden text-shell">
            <Photo k={p.image} sizes="(min-width: 768px) 50vw, 100vw" className="transition-transform duration-[1.4s] ease-[var(--ease-harbor)] group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-harbor-deep/85 via-harbor-deep/15 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 grid gap-4 p-5 md:grid-cols-[1fr_minmax(0,15rem)] md:items-end md:p-8">
              <div>
                <span className="nav-caps inline-flex h-6 items-center gap-1.5 rounded-full border border-shell/80 px-2.5 text-[0.5625rem] group-hover:bg-shell group-hover:text-harbor">
                  {p.duration} <ArrowUpRight className="h-2 w-2" />
                </span>
                <h2 className="font-display-caps text-display-m mt-3">{p.name}</h2>
              </div>
              <div className="text-[0.875rem] leading-snug">
                <p className="text-shell/90">{p.tagline}</p>
                <p className="mt-3">
                  From <Price eur={p.fromPerMonth} className="font-medium" /> / month
                </p>
              </div>
            </div>
          </Link>
        ))}
      </section>
      <StepsZigzag />
      <CtaHero lines={['Not sure which plan?', 'Tell us your season']} image="coffeeTable" />
    </>
  );
}
