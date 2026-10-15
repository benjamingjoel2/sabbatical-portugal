import type { Metadata } from 'next';
import Link from 'next/link';
import { getPlan } from '@/data/plans';
import { getDestination } from '@/data/destinations';
import { faqsByTab } from '@/data/faqs';
import { PageHero } from '@/components/shared/PageHero';
import { WavyTrio } from '@/components/shared/WavyTrio';
import { FaqBlock } from '@/components/shared/FaqBlock';
import { CtaHero } from '@/components/shared/CtaHero';
import { Pill } from '@/components/shared/Buttons';
import { Price } from '@/components/shared/Price';
import { Photo } from '@/components/shared/Photo';
import { VisaNote } from '@/components/shared/VisaNote';
import { Reveal, RevealLines } from '@/components/motion/Reveal';
import { CompassStar } from '@/components/svg/Icons';
import { pageMeta } from '@/lib/seo';

export const metadata: Metadata = pageMeta({
  title: 'Families: a school term or a year in Portugal',
  description: 'Family seasons in Portugal with international school guidance, family-friendly towns, bigger homes and a specialist who has done it with children.',
  path: '/families',
});

const schoolPoints = [
  { lead: 'Curricula', text: 'International schools around Lisbon, Cascais, Porto, the Algarve and Madeira teach British, American, IB and other curricula.' },
  { lead: 'Timing', text: 'Places for popular year groups go early. We start school conversations as soon as your dates firm up.' },
  { lead: 'Shorter stays', text: 'Some schools accept term-length students; others suit a full year. We help you ask the right questions.' },
  { lead: 'Portuguese schools', text: 'Public schools are free and welcoming for residents, with Portuguese as the language of teaching.' },
];

export default function FamiliesPage() {
  const plan = getPlan('family-season');
  const towns = ['cascais-sintra', 'lisbon', 'madeira', 'lagos-western-algarve']
    .map((s) => getDestination(s))
    .filter((d): d is NonNullable<typeof d> => !!d);

  return (
    <>
      <PageHero
        eyebrow="Families"
        title={['A season', 'they’ll remember']}
        intro="School-term and full-year stays in Portugal, with school guidance, homes with room to grow and towns where children can walk to the beach."
        image="familyBeach"
      >
        <Pill href="/plan-my-season" tone="dark">
          Plan a family season
        </Pill>
      </PageHero>

      <section className="relative bg-shell px-gutter py-20 md:py-28" aria-labelledby="schools-title">
        <div className="relative grid gap-12 md:grid-cols-[1fr_1.2fr]">
          <RevealLines id="schools-title" lines={['School,', 'sorted early']} className="font-display-caps text-display-l" />
          <Reveal>
            <ul className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
              {schoolPoints.map((p) => (
                <li key={p.lead} className="text-[0.9375rem] leading-relaxed">
                  <CompassStar size={10} className="mb-3 text-terracotta" />
                  <span className="font-medium">{p.lead}.</span> <span className="text-harbor/70">{p.text}</span>
                </li>
              ))}
            </ul>
            <p className="mt-8 text-[0.8125rem] text-harbor/60">
              We don’t name or rank schools on this site. Your specialist shares current options for your children’s ages and dates.
            </p>
          </Reveal>
        </div>
      </section>

      <WavyTrio
        title={['Family-friendly', 'towns']}
        intro="Walkable, safe, close to schools and to the sea."
        items={towns.map((d) => ({ title: d.shortName, text: d.whoFor, image: d.image, eyebrow: d.vibe }))}
      />

      {plan && (
        <section className="bg-shell px-gutter pb-24">
          <div className="grid gap-1.5 md:grid-cols-2">
            <Link href={`/plans/${plan.slug}`} className="group relative block min-h-[28rem] overflow-hidden text-shell">
              <Photo k={plan.image} sizes="(min-width: 768px) 50vw, 100vw" className="transition-transform duration-1000 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-harbor-deep/85 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                <p className="eyebrow">{plan.duration}</p>
                <h2 className="font-display-caps text-display-m mt-2">{plan.name}</h2>
                <p className="mt-3 max-w-md text-[0.9375rem]">{plan.tagline}</p>
                <p className="mt-3 text-[0.875rem]">
                  From <Price eur={plan.fromPerMonth} className="font-medium" /> / month · see the plan →
                </p>
              </div>
            </Link>
            <VisaNote kind="family" />
          </div>
        </section>
      )}

      <FaqBlock faqs={faqsByTab('families-accessibility')} title={['Families &', 'accessibility']} />
      <CtaHero lines={['Bring everyone', 'for a season']} image="friendsSunset" />
    </>
  );
}
