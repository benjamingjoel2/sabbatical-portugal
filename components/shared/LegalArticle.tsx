import { getLocale, tp } from '@/lib/i18n/t';
import { legalDoc, type LegalPage } from '@/data/legal';

/** Privacy, Booking Terms and Cookie Policy share this layout. Text lives in data/legal.json (trusted, static HTML, one version per language). */
export function LegalArticle({ page }: { page: LegalPage }) {
  const doc = legalDoc(page.slug, getLocale());
  return (
    <section className="bg-shell px-gutter pb-24 pt-[calc(var(--header-h)+3.5rem)]">
      <h1 className="tight-display text-mega">{doc.title}</h1>
      <div className="prose-season legal mt-12 md:ml-[33%]">
        <p>{tp(page.lede)}</p>
        <p className="text-[0.875rem] text-harbor/60">{doc.updated}</p>
        <div dangerouslySetInnerHTML={{ __html: doc.html }} />
      </div>
    </section>
  );
}
