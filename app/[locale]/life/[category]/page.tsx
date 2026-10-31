import { initLocale } from '@/lib/i18n/server';
import { localizeMetadata } from '@/lib/i18n/metadata';
import { t, tf, tp } from '@/lib/i18n/t';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { categories, getCategory } from '@/data/categories';
import { CategoryHeader } from '@/components/shared/CategoryHeader';
import { ExperienceRows } from '@/components/shared/ExperienceRows';
import { Photo } from '@/components/shared/Photo';
import { Reveal } from '@/components/motion/Reveal';
import { pageMeta } from '@/lib/seo';
import { unsplash } from '@/data/images';

export function generateStaticParams() {
  return categories.map((c) => ({ category: c.slug }));
}

async function generateMetadataEn({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category } = await params;
  const c = getCategory(category);
  if (!c) return {};
  return pageMeta({ title: `${c.name} · Life in Portugal`, description: c.intro, path: `/life/${c.slug}`, image: unsplash(c.image, 1600) });
}

export async function generateMetadata(props: { params: Promise<{ category: string }> }): Promise<Metadata> {
  return localizeMetadata(await generateMetadataEn(props), ((await props.params) as { locale?: string }).locale);
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  await initLocale(params);
  const { category } = await params;
  const c = getCategory(category);
  if (!c) notFound();
  return (
    <>
      <div className="h-[var(--header-h)] bg-shell" />
      <CategoryHeader current={c} />
      <section className="bg-shell px-gutter pb-16 pt-10">
        <h1 className="sr-only">{tp(c.name)}{t(": life in Portugal")}</h1>
        <div className="grid gap-10 md:grid-cols-[1fr_1fr]">
          <Reveal className="relative mx-auto aspect-square w-[min(18rem,70%)] overflow-hidden border border-harbor/20 p-1.5 md:order-1 md:mx-0 md:mt-24 md:justify-self-start">
            <div className="relative h-full w-full overflow-hidden">
              <Photo k={c.image} sizes="18rem" priority />
            </div>
          </Reveal>
          <Reveal delay={0.1} className="max-w-sm text-[1rem] leading-relaxed md:order-2 md:justify-self-start">
            <p>{tp(c.intro)}</p>
            <p className="mt-4 text-[0.8125rem] text-harbor/60">
              {tp(c.experiences.length)} {t("experiences · tap one to see details")}</p>
          </Reveal>
        </div>
      </section>
      <section className="bg-shell px-gutter pb-24" aria-label={tf("{0} experiences", c.name)}>
        <ExperienceRows items={tp(c.experiences)} />
      </section>
    </>
  );
}
