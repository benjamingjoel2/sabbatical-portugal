import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { destinations, getDestination, regionLabels } from '@/data/destinations';
import { homes } from '@/data/homes';
import { faqs } from '@/data/faqs';
import { PageHero } from '@/components/shared/PageHero';
import { WavyTrio } from '@/components/shared/WavyTrio';
import { CostSnapshot, ClimateStrip } from '@/components/shared/CostClimate';
import { HomeCard } from '@/components/shared/HomeCard';
import { FaqBlock } from '@/components/shared/FaqBlock';
import { CtaHero } from '@/components/shared/CtaHero';
import { Pill, ArrowLink } from '@/components/shared/Buttons';
import { Price } from '@/components/shared/Price';
import { Reveal } from '@/components/motion/Reveal';
import { pageMeta } from '@/lib/seo';
import { unsplash } from '@/data/images';

export function generateStaticParams() {
  return destinations.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const d = getDestination(slug);
  if (!d) return {};
  return pageMeta({
    title: `A season in ${d.name}`,
    description: `${d.vibe} ${d.whoFor}`,
    path: `/destinations/${d.slug}`,
    image: unsplash(d.heroImage, 1600),
  });
}

export default async function DestinationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const d = getDestination(slug);
  if (!d) notFound();
  const here = homes.filter((h) => h.destination === d.slug);
  const related = faqs.filter((f) => ['best-months-by-region', 'internet-and-coworking', 'renting-monthly-vs-yearly', 'driving-and-transport'].includes(f.id));
  const idx = destinations.findIndex((x) => x.slug === d.slug);
  const next = destinations[(idx + 1) % destinations.length];

  return (
    <>
      <PageHero
        eyebrow={`${regionLabels[d.region]} · ${String(idx + 1).padStart(2, '0')} of ${destinations.length}`}
        title={[d.name]}
        intro={
          <>
            {d.vibe}
            {d.highlight && <span className="mt-3 block text-[0.8125rem] font-medium text-port">{d.highlight}</span>}
          </>
        }
        image={d.heroImage}
      >
        <Pill href="/plan-my-season" tone="dark">
          Plan my season here
        </Pill>
      </PageHero>

      <section className="relative bg-shell px-gutter py-20 md:py-28">
        <div className="relative grid gap-12 md:grid-cols-4">
          <Reveal className="md:col-span-2">
            <p className="text-statement">{d.overview}</p>
          </Reveal>
          <Reveal delay={0.1} className="space-y-8 text-[0.9375rem] leading-relaxed md:col-span-2 md:col-start-3 md:max-w-md md:justify-self-end">
            <div>
              <h2 className="eyebrow mb-2 text-harbor/60">Who it’s for</h2>
              <p>{d.whoFor}</p>
            </div>
            <div>
              <h2 className="eyebrow mb-2 text-harbor/60">Best for</h2>
              <ul className="flex flex-wrap gap-1.5">
                {d.bestFor.map((b) => (
                  <li key={b} className="border border-harbor/25 px-2.5 py-1 text-[0.8125rem]">
                    {b}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="eyebrow mb-2 text-harbor/60">Community</h2>
              <p>{d.community}</p>
            </div>
            <div>
              <h2 className="eyebrow mb-2 text-harbor/60">Internet</h2>
              <p>
                Around {d.internet.typicalMbps} Mbps at home. {d.internet.note}
              </p>
            </div>
            <p className="text-[0.875rem]">
              Typical budget from <Price eur={d.monthlyBudgetFrom} className="font-medium" /> per month, all in.
            </p>
          </Reveal>
        </div>
      </section>

      <WavyTrio
        title={['Neighborhoods', 'we love']}
        intro={`Where we usually find homes in ${d.shortName}, and why.`}
        items={d.neighborhoods.map((n) => ({ title: n.name, text: n.blurb, image: n.image }))}
      />

      <CostSnapshot d={d} />
      <ClimateStrip d={d} />

      <section className="bg-shell px-gutter py-20 md:py-28" aria-labelledby="homes-title">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <h2 id="homes-title" className="font-display-caps text-display-m">
            Homes in {d.shortName}
          </h2>
          <ArrowLink href="/homes">all homes</ArrowLink>
        </div>
        {here.length ? (
          <ul className="grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {here.map((h) => (
              <li key={h.slug}>
                <HomeCard home={h} />
              </li>
            ))}
          </ul>
        ) : (
          <p className="max-w-lg text-[0.9375rem] text-harbor/75">
            We source homes in {d.shortName} to order for each guest. Tell us what you need and your specialist will shortlist
            three or four vetted options.
          </p>
        )}
      </section>

      <FaqBlock faqs={related} title={['Good to know']} />

      <nav aria-label="Next destination" className="border-t border-line bg-shell px-gutter py-10">
        <Link href={`/destinations/${next.slug}`} className="group flex items-baseline justify-between gap-6">
          <span className="eyebrow text-harbor/60">Next destination</span>
          <span className="tight-display text-[clamp(2rem,1.4rem+2.6vw,4rem)] transition-colors group-hover:text-terracotta">{next.name} →</span>
        </Link>
      </nav>

      <CtaHero lines={[`Your season`, `in ${d.shortName}`]} image={d.image} />
    </>
  );
}
