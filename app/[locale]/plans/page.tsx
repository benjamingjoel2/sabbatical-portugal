import { initLocale } from '@/lib/i18n/server';
import { localizeMetadata } from '@/lib/i18n/metadata';
import { t, tp } from '@/lib/i18n/t';
import type { Metadata } from 'next';
import Link from '@/components/i18n/Link';
import { plans } from '@/data/plans';
import { EditorialHero } from '@/components/shared/PageHero';
import { Photo } from '@/components/shared/Photo';
import { Price } from '@/components/shared/Price';
import { StepsZigzag } from '@/components/home/StepsZigzag';
import { CtaHero } from '@/components/shared/CtaHero';
import { pageMeta } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  return localizeMetadata(pageMeta({
  title: 'Plans: from one month to a full year',
  description: 'Taster, Season, Full year and Family season plans for living in Portugal, each planned end to end by one specialist.',
  path: '/plans',
}), (await params).locale);
}

export default async function PlansPage({ params }: { params: Promise<{ locale: string }> }) {
  await initLocale(params);
  return (
    <>
      <EditorialHero eyebrow={t("Plans")} title={t("One month to a full year")}>
        <p className="text-[1rem] leading-relaxed text-harbor/75">
          {t("Every plan includes a vetted home, a real workspace, airport pickup and a specialist who knows you by name. Longer plans add admin help, visa guidance and school guidance.")}</p>
        <p className="text-[1rem] leading-relaxed text-harbor/75">
          {t("Prices are “from” per month for one or two guests, before flights. Your quote lists everything, with no surprises.")}</p>
      </EditorialHero>
      <section aria-label={t("Plans")} className="grid gap-1.5 bg-shell md:grid-cols-2">
        {plans.map((p) => (
          <Link key={p.slug} href={`/plans/${p.slug}`} className="group relative block h-[75vh] min-h-[30rem] overflow-hidden">
            <Photo k={p.image} sizes="(min-width: 768px) 50vw, 100vw" className="transition-transform duration-[1.4s] ease-harbor group-hover:scale-[1.04]" />
            <div className="absolute left-0 top-0 max-w-[24rem] bg-harbor p-5 text-shell md:p-6">
              <p className="eyebrow text-shell/60">{tp(p.duration)}</p>
              <h2 className="tight-display mt-2 text-[clamp(2rem,1.5rem+1.8vw,3rem)] leading-none">{tp(p.name)}</h2>
              <p className="mt-3 text-[0.9375rem] font-light leading-snug text-shell/85">{tp(p.tagline)}</p>
              <p className="mt-4 text-[0.9375rem]">
                {t("From ")}<Price eur={tp(p.fromPerMonth)} className="font-medium" /> {t("/ month")}</p>
              <p className="mt-4 inline-flex items-center gap-2 border-b border-current pb-0.5 text-[0.875rem] text-azulejo-mist group-hover:text-terracotta">
                {t("see the plan ")}<span aria-hidden>→</span>
              </p>
            </div>
          </Link>
        ))}
      </section>
      <StepsZigzag />
      <CtaHero lines={tp(['Not sure which plan?', 'Tell us your season'])} image="coffeeTable" />
    </>
  );
}
