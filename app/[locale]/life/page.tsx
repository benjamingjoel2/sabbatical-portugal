import { initLocale } from '@/lib/i18n/server';
import { localizeMetadata } from '@/lib/i18n/metadata';
import { t, tp } from '@/lib/i18n/t';
import type { Metadata } from 'next';
import Link from '@/components/i18n/Link';
import { categories } from '@/data/categories';
import { CategoryScatter } from '@/components/home/CategoryScatter';
import { Photo } from '@/components/shared/Photo';
import { CtaHero } from '@/components/shared/CtaHero';
import { pageMeta } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  return localizeMetadata(pageMeta({
  title: 'Life in Portugal',
  description: 'Neighborhoods, surf, food and markets, language, wine country, hiking, craft and azulejos, community and island life: nine ways into a season in Portugal.',
  path: '/life',
}), (await params).locale);
}

export default async function LifePage({ params }: { params: Promise<{ locale: string }> }) {
  await initLocale(params);
  return (
    <>
      <div className="pt-[var(--header-h)]">
        <h1 className="sr-only">{t("Life in Portugal: nine ways into a season")}</h1>
        <CategoryScatter />
      </div>
      <section className="bg-shell px-gutter pb-24" aria-label={t("All categories")}>
        <ul className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c) => (
            <li key={c.slug}>
              <Link href={`/life/${c.slug}`} className="group block">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Photo k={c.image} sizes="(min-width: 1024px) 30vw, 50vw" className="transition-transform duration-1000 group-hover:scale-105" />
                </div>
                <p className="mt-4 flex items-baseline gap-3">
                  <span className="text-[0.75rem] tabular-nums text-harbor/50">{tp(c.number)}</span>
                  <span className="tight-display text-[1.75rem] transition-colors group-hover:text-terracotta">{tp(c.name)}</span>
                </p>
                <p className="mt-2 text-[0.875rem] leading-relaxed text-harbor/70">{tp(c.intro)}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <CtaHero lines={tp(['Build your season', 'around what you love'])} image="friendsView" />
    </>
  );
}
