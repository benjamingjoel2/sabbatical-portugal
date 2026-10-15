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

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getPlan(slug);
  if (!p) return {};
  return pageMeta({ title: `${p.name} plan (${p.duration})`, description: p.summary, path: `/plans/${p.slug}`, image: unsplash(p.image, 1600) });
}

const stackImages: ImageKey[] = ['homeWarm', 'lisbonTram', 'communityDinner'];
const weekImages: ImageKey[] = ['planning', 'cafeInterior', 'hikers', 'friendsSunset'];

export default async function PlanPage({ params }: { params: Promise<{ slug: string }> }) {
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
      <PageHero eyebrow={`Plan · ${p.duration}`} title={[p.name]} intro={p.summary} image={p.image}>
        <Pill href="/plan-my-season" tone="dark">
          Plan my season
        </Pill>
      </PageHero>

      <section className="bg-shell px-gutter py-16">
        <Reveal className="mx-auto grid max-w-5xl gap-8 border-y border-line py-10 md:grid-cols-3 md:items-center">
          <div>
            <p className="eyebrow text-harbor/60">From</p>
            <p className="mt-2 font-display text-[clamp(2.5rem,2rem+2vw,4rem)] leading-none">
              <Price eur={p.fromPerMonth} />
            </p>
            <p className="mt-2 text-[0.875rem] text-harbor/70">per month · placeholder price</p>
          </div>
          <div>
            <p className="eyebrow text-harbor/60">Best for</p>
            <p className="mt-2 text-[1rem]">{p.bestFor.join(' · ')}</p>
          </div>
          <div>
            <p className="eyebrow text-harbor/60">Length</p>
            <p className="mt-2 text-[1rem]">{p.duration}</p>
          </div>
        </Reveal>
      </section>

      <FeatureStack title={['What’s included']} steps={groups} />

      <WavyTrio
        title={['A sample', 'month']}
        intro="Every season is different. Here’s how a month often unfolds."
        items={p.sampleMonth.map((w, i) => ({ eyebrow: w.label, title: w.title, text: w.text, image: weekImages[i % weekImages.length] }))}
      />

      {p.visaNote && (
        <section className="bg-shell px-gutter pb-8">
          <div className="mx-auto max-w-4xl">
            <VisaNote kind={p.visaNote} />
          </div>
        </section>
      )}

      <FaqBlock faqs={getFaqs(p.faqIds)} title={['Questions', 'about this plan']} />
      <CtaHero lines={[`Start your`, `${p.name.toLowerCase()} season`]} image="portoRiverside" />
    </>
  );
}
