import type { Metadata } from 'next';
import Link from 'next/link';
import { posts } from '@/data/posts';
import { EditorialHero } from '@/components/shared/PageHero';
import { JournalRows } from '@/components/shared/JournalRows';
import { Photo } from '@/components/shared/Photo';
import { pageMeta } from '@/lib/seo';

export const metadata: Metadata = pageMeta({
  title: 'Journal',
  description: 'Practical, honest writing about living in Portugal for a season: planning, places, visas and the small things that make a stay feel like home.',
  path: '/journal',
});

const fmt = (iso: string) => new Date(iso + 'T12:00:00Z').toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });

export default function JournalPage() {
  const [lead, ...rest] = posts;
  return (
    <>
      <EditorialHero eyebrow="Journal" title="Notes from the harbor" />
      {lead && (
        <section className="bg-shell px-gutter pb-16">
          <Link href={`/journal/${lead.slug}`} className="group grid gap-8 md:grid-cols-[1.4fr_1fr] md:items-end">
            <div className="relative aspect-[16/10] overflow-hidden">
              <Photo k={lead.image} sizes="(min-width: 768px) 60vw, 100vw" priority className="transition-transform duration-1000 group-hover:scale-105" />
            </div>
            <div>
              <p className="eyebrow text-harbor/60">
                {lead.tag} · {fmt(lead.date)} · {lead.readingMinutes} min read
              </p>
              <h2 className="mt-4 text-statement transition-colors group-hover:text-terracotta">{lead.title}</h2>
              <p className="mt-4 text-[0.9375rem] leading-relaxed text-harbor/75">{lead.excerpt}</p>
            </div>
          </Link>
        </section>
      )}
      <section className="bg-shell px-gutter pb-28" aria-label="More articles">
        <JournalRows posts={rest} />
      </section>
    </>
  );
}
