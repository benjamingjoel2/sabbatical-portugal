'use client';
import { getLocale } from '@/lib/i18n/t';
import { INTL_LOCALES } from '@/lib/i18n/config';

import { t, tp } from '@/lib/i18n/t';
import Link from '@/components/i18n/Link';
import type { Post } from '@/data/types';
import { HoverPreviewList } from './HoverPreviewList';

const fmt = (iso: string) => new Date(iso + 'T12:00:00Z').toLocaleDateString(INTL_LOCALES[getLocale()], { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });

export function JournalRows({ posts }: { posts: Post[] }) {
  return (
    <HoverPreviewList items={posts.map((p) => ({ key: p.slug, image: p.image }))}>
      {(bind) => (
        <ul className="flex flex-col gap-1.5">
          {posts.map((p) => (
            <li key={p.slug} {...bind(p.slug)}>
              <Link
                href={`/journal/${p.slug}`}
                className="group grid gap-3 bg-limestone/60 px-4 py-6 transition-colors hover:bg-limestone md:grid-cols-[1.5fr_1fr_auto] md:items-end md:px-5 md:py-8"
              >
                <span className="text-[clamp(1.375rem,1.1rem+1.2vw,2.25rem)] leading-[1.08] tracking-[-0.02em] group-hover:text-terracotta">{tp(p.title)}</span>
                <span className="flex items-center gap-2 text-[0.8125rem] text-harbor/70">
                  <span aria-hidden className="h-1.5 w-1.5 bg-harbor/70" />
                  {tp(p.tag)}
                </span>
                <span className="text-[0.8125rem] text-harbor/70 md:text-right">
                  {tp(fmt(p.date))} · {tp(p.readingMinutes)} {t("min")}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </HoverPreviewList>
  );
}
