import { getLocale } from '@/lib/i18n/t';
import { INTL_LOCALES } from '@/lib/i18n/config';
import { initLocale } from '@/lib/i18n/server';
import { localizeMetadata } from '@/lib/i18n/metadata';
import { t, tp } from '@/lib/i18n/t';
import type { Metadata } from 'next';
import Link from '@/components/i18n/Link';
import { notFound } from 'next/navigation';
import { getPost, posts } from '@/data/posts';
import { Photo } from '@/components/shared/Photo';
import { ArrowLink } from '@/components/shared/Buttons';
import { CtaHero } from '@/components/shared/CtaHero';
import { pageMeta } from '@/lib/seo';
import { unsplash } from '@/data/images';
import { site } from '@/config/site';

export const dynamicParams = false;

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

async function generateMetadataEn({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getPost(slug);
  if (!p) return {};
  return { ...pageMeta({ title: p.title, description: p.excerpt, path: `/journal/${p.slug}`, image: unsplash(p.image, 1600) }) };
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  return localizeMetadata(await generateMetadataEn(props), ((await props.params) as { locale?: string }).locale);
}

const fmt = (iso: string) => new Date(iso + 'T12:00:00Z').toLocaleDateString(INTL_LOCALES[getLocale()], { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  await initLocale(params);
  const { slug } = await params;
  const p = getPost(slug);
  if (!p) notFound();
  const { default: Content } = await import(`@/content/journal/${getLocale() === 'en' ? '' : getLocale() + '/'}${slug}.mdx`);
  const idx = posts.findIndex((x) => x.slug === slug);
  const next = posts[(idx + 1) % posts.length];
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: p.title,
    datePublished: p.date,
    image: unsplash(p.image, 1600),
    publisher: { '@type': 'Organization', name: site.name },
  };

  return (
    <>
      <article>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <header className="bg-shell px-gutter pb-12 pt-[calc(var(--header-h)+3rem)]">
          <p className="eyebrow text-harbor/60">
            <Link href="/journal" className="hover:text-terracotta">
              {t("Journal")}</Link>{' '}
            · {tp(p.tag)} · {tp(fmt(p.date))} · {tp(p.readingMinutes)} {t("min read")}</p>
          <h1 className="tight-display mt-6 max-w-6xl text-mega">{tp(p.title)}</h1>
          <p className="mt-10 max-w-3xl text-statement md:ml-[33%]">{tp(p.excerpt)}</p>
        </header>
        <div className="relative h-[70vh] min-h-[22rem]">
          <Photo k={p.image} sizes="100vw" priority />
        </div>
        <div className="bg-shell px-gutter py-20">
          <div className="prose-season md:ml-[33%]">
            <Content />
          </div>
        </div>
      </article>
      <nav aria-label={t("Next article")} className="border-t border-line bg-shell px-gutter py-10">
        <Link href={`/journal/${next.slug}`} className="group flex flex-col gap-3 md:flex-row md:items-baseline md:justify-between">
          <span className="eyebrow text-harbor/60">{t("Next in the journal")}</span>
          <span className="tight-display text-[clamp(1.75rem,1.2rem+2.2vw,3.25rem)] transition-colors group-hover:text-terracotta">{tp(next.title)} →</span>
        </Link>
        <ArrowLink href="/journal" className="mt-6">
          {t("all articles")}</ArrowLink>
      </nav>
      <CtaHero />
    </>
  );
}
