import { initLocale } from '@/lib/i18n/server';
import { localizeMetadata } from '@/lib/i18n/metadata';
import { t, tf, tp } from '@/lib/i18n/t';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPlan, plans } from '@/data/plans';
import { getFaqs } from '@/data/faqs';
import type { ImageKey } from '@/data/images';
import { PageHero } from '@/components/shared/PageHero';
import { FeatureStack, type StackStep } from '@/components/shared/FeatureStack';
import { WavyTrio } from '@/components/shared/WavyTrio';
import { FaqBlock } from '@/components/shared/FaqBlock';
import { CtaHero } from '@/components/shared/CtaHero';
import { Pill } from '@/components/shared/Buttons';
import { Price } from '@/components/shared/Price';
import { VisaNote } from '@/components/shared/VisaNote';
import { Reveal } from '@/components/motion/Reveal';
import { pageMeta } from '@/lib/seo';
import { unsplash } from '@/data/images';

export function generateStaticParams() {
  return plans.map((p) => ({ slug: p.slug }));
}

async function generateMetadataEn({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getPlan(slug);
  if (!p) return {};
  return pageMeta({ title: `${p.name} plan (${p.duration})`, description: p.summary, path: `/plans/${p.slug}`, image: unsplash(p.image, 1600) });
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  return localizeMetadata(await generateMetadataEn(props), ((await props.params) as { locale?: string }).locale);
}

const stackImages: ImageKey[] = ['homeWarm', 'lisbonTram', 'communityDinner'];
const weekImages: ImageKey[] = ['planning', 'cafeInterior', 'hikers', 'friendsSunset'];

export default async function PlanPage({ params }: { params: Promise<{ slug: string }> }) {
  await initLocale(params);
  const { slug } = await params;
  const p = getPlan(slug);
  if (!p) notFound();

  // Group what's included into pinned steps of up to four features
  const groups: StackStep[] = [];
  const titles = ['Home & workspace', 'Arrival & admin', 'Your people & your weekends'];
  for (let i = 0; i < p.included.length; i += 4) {
    const chunk = p.included.slice(i, i + 4);
    groups.push({
      title: titles[groups.length] ?? 'And more',
      image: stackImages[groups.length % stackImages.length],
      features: chunk.map((c) => ({ lead: c.title, text: c.text })),
    });
  }

  return (
    <>
      <PageHero eyebrow={tf("Plan · {0}", p.duration)} title={tp([p.name])} intro={tp(p.summary)} image={p.image}>
        <Pill href="/plan-my-season" tone="dark">
          {t("Plan my season")}</Pill>
      </PageHero>

      <section className="bg-shell px-gutter py-16">
        <Reveal className="mx-auto grid max-w-5xl gap-8 border-y border-line py-10 md:grid-cols-3 md:items-center">
          <div>
            <p className="eyebrow text-harbor/60">{t("From")}</p>
            <p className="mt-2 font-display font-semibold text-[clamp(2.5rem,2rem+2vw,4rem)] leading-none">
              <Price eur={tp(p.fromPerMonth)} />
            </p>
            <p className="mt-2 text-[0.875rem] text-harbor/70">{t("per month · placeholder price")}</p>
          </div>
          <div>
            <p className="eyebrow text-harbor/60">{t("Best for")}</p>
            <p className="mt-2 text-[1rem]">{tp(p.bestFor).join(' · ')}</p>
          </div>
          <div>
            <p className="eyebrow text-harbor/60">{t("Length")}</p>
            <p className="mt-2 text-[1rem]">{tp(p.duration)}</p>
          </div>
        </Reveal>
      </section>

      <FeatureStack title={tp(['What’s included'])} steps={tp(groups)} />

      <WavyTrio
        title={tp(['A sample', 'month'])}
        intro={t("Every season is different. Here’s how a month often unfolds.")}
        items={p.sampleMonth.map((w, i) => ({ eyebrow: w.label, title: w.title, text: w.text, image: weekImages[i % weekImages.length] }))}
      />

      {p.visaNote && (
        <section className="bg-shell px-gutter pb-8">
          <div className="mx-auto max-w-4xl">
            <VisaNote kind={p.visaNote} />
          </div>
        </section>
      )}

      <FaqBlock faqs={tp(getFaqs(p.faqIds))} title={tp(['Questions', 'about this plan'])} />
      <CtaHero lines={tp([`Start your`, `${p.name.toLowerCase()} season`])} image="portoRiverside" />
    </>
  );
}
