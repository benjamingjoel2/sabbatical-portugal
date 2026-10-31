import { initLocale } from '@/lib/i18n/server';
import { localizeMetadata } from '@/lib/i18n/metadata';
import { t, tp } from '@/lib/i18n/t';
import type { Metadata } from 'next';
import Link from '@/components/i18n/Link';
import { notFound } from 'next/navigation';
import { getHome, homes, homeTypeLabels } from '@/data/homes';
import { getDestination } from '@/data/destinations';
import { Photo } from '@/components/shared/Photo';
import { Price } from '@/components/shared/Price';
import { Pill } from '@/components/shared/Buttons';
import { PlaceholderFlag } from '@/components/shared/PlaceholderFlag';
import { HomeCard } from '@/components/shared/HomeCard';
import { CtaHero } from '@/components/shared/CtaHero';
import { CompassStar } from '@/components/svg/Icons';
import { Reveal } from '@/components/motion/Reveal';
import { pageMeta } from '@/lib/seo';
import { unsplash } from '@/data/images';

export function generateStaticParams() {
  return homes.map((h) => ({ slug: h.slug }));
}

async function generateMetadataEn({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const h = getHome(slug);
  if (!h) return {};
  return pageMeta({ title: `${h.name}, ${h.area}`, description: h.summary, path: `/homes/${h.slug}`, image: unsplash(h.images[0], 1600) });
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  return localizeMetadata(await generateMetadataEn(props), ((await props.params) as { locale?: string }).locale);
}

export default async function HomePage({ params }: { params: Promise<{ slug: string }> }) {
  await initLocale(params);
  const { slug } = await params;
  const h = getHome(slug);
  if (!h) notFound();
  const d = getDestination(h.destination);
  const more = homes.filter((x) => x.slug !== h.slug && (x.type === h.type || x.destination === h.destination)).slice(0, 3);

  const facts = [
    ['Bedrooms', h.bedrooms === 0 ? 'Studio' : String(h.bedrooms)],
    ['Bathrooms', String(h.bathrooms)],
    ['Sleeps', String(h.sleeps)],
    ['Internet', `${h.mbps} Mbps`],
    ['Minimum stay', `${h.minStayMonths} month${h.minStayMonths > 1 ? 's' : ''}`],
  ];

  return (
    <>
      <section className="bg-shell px-gutter pb-16 pt-[calc(var(--header-h)+2.5rem)]">
        <p className="eyebrow text-harbor/60">
          <Link href="/homes" className="hover:text-terracotta">
            {t("Homes")}</Link>{' '}
          · {tp(homeTypeLabels[h.type])} · {tp(d?.name)}
        </p>
        <div className="mt-4 flex flex-wrap items-end justify-between gap-6">
          <h1 className="font-display-caps text-display-xl">{tp(h.name)}</h1>
          <PlaceholderFlag label={t("Placeholder home")} />
        </div>
        <div className="mt-10 grid gap-1.5 md:grid-cols-[2fr_1fr] md:grid-rows-2">
          <div className="relative aspect-[4/3] md:row-span-2 md:aspect-auto">
            <Photo k={h.images[0]} priority sizes="(min-width: 768px) 66vw, 100vw" />
          </div>
          {h.images.slice(1, 3).map((k) => (
            <div key={k} className="relative aspect-[4/3]">
              <Photo k={k} sizes="(min-width: 768px) 33vw, 100vw" />
            </div>
          ))}
        </div>
      </section>

      <section className="bg-shell px-gutter pb-24">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr]">
          <Reveal>
            <p className="text-statement">{tp(h.summary)}</p>
            <p className="mt-8 max-w-2xl text-[1rem] leading-relaxed text-harbor/80">{tp(h.description)}</p>
            <h2 className="eyebrow mt-12 text-harbor/60">{t("Workspace")}</h2>
            <p className="mt-2 max-w-2xl text-[1rem] leading-relaxed">{tp(h.workspace)}</p>
            <h2 className="eyebrow mt-10 text-harbor/60">{t("What you’ll love")}</h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {h.features.map((f) => (
                <li key={f} className="flex gap-3 text-[0.9375rem]">
                  <CompassStar size={10} className="mt-1.5 shrink-0 text-terracotta" />
                  {tp(f)}
                </li>
              ))}
            </ul>
          </Reveal>
          <aside className="h-fit bg-limestone/60 p-6 md:sticky md:top-24 md:p-8">
            <p className="eyebrow text-harbor/60">{t("From")}</p>
            <p className="mt-2 font-display font-semibold text-[2.75rem] leading-none">
              <Price eur={tp(h.perMonth)} />
            </p>
            <p className="mt-1 text-[0.8125rem] text-harbor/60">{t("per month for the home · placeholder price")}</p>
            <dl className="mt-8 divide-y divide-line border-y border-line text-[0.875rem]">
              {facts.map(([k, v]) => (
                <div key={k} className="flex justify-between py-2.5">
                  <dt className="text-harbor/60">{tp(k)}</dt>
                  <dd>{tp(v)}</dd>
                </div>
              ))}
              <div className="flex justify-between py-2.5">
                <dt className="text-harbor/60">{t("Area")}</dt>
                <dd>
                  {tp(h.area)},{' '}
                  {d && (
                    <Link href={`/destinations/${d.slug}`} className="underline underline-offset-2 hover:text-terracotta">
                      {tp(d.shortName)}
                    </Link>
                  )}
                </dd>
              </div>
            </dl>
            <Pill href="/plan-my-season" tone="dark" className="mt-8 w-full">
              {t("Request this home")}</Pill>
            <p className="mt-3 text-[0.75rem] text-harbor/60">{t("Homes are offered as part of a plan, with your specialist.")}</p>
          </aside>
        </div>
      </section>

      {more.length > 0 && (
        <section className="border-t border-line bg-shell px-gutter py-20">
          <h2 className="font-display-caps text-display-m mb-10">{t("You might also like")}</h2>
          <ul className="grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {more.map((x) => (
              <li key={x.slug}>
                <HomeCard home={tp(x)} />
              </li>
            ))}
          </ul>
        </section>
      )}
      <CtaHero lines={tp(['Make it', 'your home'])} image={h.images[1] ?? h.images[0]} />
    </>
  );
}
