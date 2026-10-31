import { getLocale } from '@/lib/i18n/t';
import { INTL_LOCALES } from '@/lib/i18n/config';
import { initLocale } from '@/lib/i18n/server';
import { localizeMetadata } from '@/lib/i18n/metadata';
import { t, tp } from '@/lib/i18n/t';
import type { Metadata } from 'next';
import Link from '@/components/i18n/Link';
import { posts } from '@/data/posts';
import { EditorialHero } from '@/components/shared/PageHero';
import { JournalRows } from '@/components/shared/JournalRows';
import { Photo } from '@/components/shared/Photo';
import { pageMeta } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  return localizeMetadata(pageMeta({
  title: 'Journal',
  description: 'Practical, honest writing about living in Portugal for a season: planning, places, visas and the small things that make a stay feel like home.',
  path: '/journal',
}), (await params).locale);
}

const fmt = (iso: string) => new Date(iso + 'T12:00:00Z').toLocaleDateString(INTL_LOCALES[getLocale()], { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });

export default async function JournalPage({ params }: { params: Promise<{ locale: string }> }) {
  await initLocale(params);
  const [lead, ...rest] = posts;
  return (
    <>
      <EditorialHero eyebrow={t("Journal")} title={t("Notes from the harbor")} />
      {lead && (
        <section className="bg-shell px-gutter pb-16">
          <Link href={`/journal/${lead.slug}`} className="group grid gap-8 md:grid-cols-[1.4fr_1fr] md:items-end">
            <div className="relative aspect-[16/10] overflow-hidden">
              <Photo k={lead.image} sizes="(min-width: 768px) 60vw, 100vw" priority className="transition-transform duration-1000 group-hover:scale-105" />
            </div>
            <div>
              <p className="eyebrow text-harbor/60">
                {tp(lead.tag)} · {tp(fmt(lead.date))} · {tp(lead.readingMinutes)} {t("min read")}</p>
              <h2 className="mt-4 text-statement transition-colors group-hover:text-terracotta">{tp(lead.title)}</h2>
              <p className="mt-4 text-[0.9375rem] leading-relaxed text-harbor/75">{tp(lead.excerpt)}</p>
            </div>
          </Link>
        </section>
      )}
      <section className="bg-shell px-gutter pb-28" aria-label={t("More articles")}>
        <JournalRows posts={tp(rest)} />
      </section>
    </>
  );
}
