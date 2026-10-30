import type { LegalPage } from '@/data/legal';

const fmt = (d: string) =>
  new Date(`${d}T12:00:00Z`).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });

/** Privacy, Booking Terms and Cookie Policy share this layout. Text lives in data/legal.ts (trusted, static HTML). */
export function LegalArticle({ page }: { page: LegalPage }) {
  return (
    <section className="bg-shell px-gutter pb-24 pt-[calc(var(--header-h)+3.5rem)]">
      <h1 className="tight-display text-mega">{page.title}</h1>
      <div className="prose-season mt-12 md:ml-[33%]">
        <p>{page.lede}</p>
        <p className="text-[0.875rem] text-harbor/60">
          Last updated <time dateTime={page.updated}>{fmt(page.updated)}</time>.
        </p>
        {page.sections.map((s) => (
          <div key={s.h}>
            <h2>{s.h}</h2>
            {s.p.map((t, i) =>
              t.includes('<ul>') ? (
                <div key={i} dangerouslySetInnerHTML={{ __html: t }} />
              ) : (
                <p key={i} dangerouslySetInnerHTML={{ __html: t }} />
              ),
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
