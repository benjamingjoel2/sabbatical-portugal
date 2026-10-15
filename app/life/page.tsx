import type { Metadata } from 'next';
import Link from 'next/link';
import { categories } from '@/data/categories';
import { CategoryScatter } from '@/components/home/CategoryScatter';
import { Photo } from '@/components/shared/Photo';
import { CtaHero } from '@/components/shared/CtaHero';
import { pageMeta } from '@/lib/seo';

export const metadata: Metadata = pageMeta({
  title: 'Life in Portugal',
  description: 'Neighborhoods, surf, food and markets, language, wine country, hiking, craft and azulejos, community and island life: nine ways into a season in Portugal.',
  path: '/life',
});

export default function LifePage() {
  return (
    <>
      <div className="pt-[var(--header-h)]">
        <h1 className="sr-only">Life in Portugal: nine ways into a season</h1>
        <CategoryScatter />
      </div>
      <section className="bg-shell px-gutter pb-24" aria-label="All categories">
        <ul className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c) => (
            <li key={c.slug}>
              <Link href={`/life/${c.slug}`} className="group block">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Photo k={c.image} sizes="(min-width: 1024px) 30vw, 50vw" className="transition-transform duration-1000 group-hover:scale-105" />
                </div>
                <p className="mt-4 flex items-baseline gap-3">
                  <span className="text-[0.75rem] tabular-nums text-harbor/50">{c.number}</span>
                  <span className="tight-display text-[1.75rem] transition-colors group-hover:text-terracotta">{c.name}</span>
                </p>
                <p className="mt-2 text-[0.875rem] leading-relaxed text-harbor/70">{c.intro}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <CtaHero lines={['Build your season', 'around what you love']} image="friendsView" />
    </>
  );
}
