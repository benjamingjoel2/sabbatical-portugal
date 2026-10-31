import { tp } from '@/lib/i18n/t';
import { Accordion } from './Accordion';
import type { Faq } from '@/data/types';
import { fillTokens } from '@/lib/tokens';

/** Kultiveret FAQ: tight heading, limestone cards with a plus icon. */
export function FaqBlock({ faqs, title = ['FAQs'], footnote }: { faqs: Faq[]; title?: string[]; footnote?: React.ReactNode }) {
  if (faqs.length === 0) return null;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: fillTokens(f.a) } })),
  };
  return (
    <section className="bg-shell px-gutter py-20 md:py-28">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="grid gap-8 md:grid-cols-2">
        <h2 className="text-statement">{tp(title).join(' ')}</h2>
        <div>
          <Accordion variant="cards" items={faqs.map((f) => ({ id: f.id, q: f.q, a: <p>{tp(fillTokens(f.a))}</p> }))} />
          {footnote && <div className="mt-8">{tp(footnote)}</div>}
        </div>
      </div>
    </section>
  );
}
