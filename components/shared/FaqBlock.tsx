import { Accordion } from './Accordion';
import type { Faq } from '@/data/types';
import { fillTokens } from '@/lib/tokens';
import { RevealLines } from '@/components/motion/Reveal';
import { PortugalLineMap } from '@/components/svg/PortugalLineMap';

/** Flyward FAQ: title left, line accordion right, faint coastline behind. */
export function FaqBlock({ faqs, title = ["FAQ’s"], footnote }: { faqs: Faq[]; title?: string[]; footnote?: React.ReactNode }) {
  if (faqs.length === 0) return null;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: fillTokens(f.a) } })),
  };
  return (
    <section className="relative overflow-hidden bg-shell px-gutter py-24 md:py-32">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PortugalLineMap className="pointer-events-none absolute -left-[8%] top-[10%] hidden h-[90%] w-auto text-harbor/10 md:block" />
      <div className="relative grid gap-10 md:grid-cols-[1fr_1.3fr]">
        <RevealLines lines={title} className="font-display-caps text-display-l" />
        <div>
          <Accordion items={faqs.map((f) => ({ id: f.id, q: f.q, a: <p>{fillTokens(f.a)}</p> }))} />
          {footnote && <div className="mt-8">{footnote}</div>}
        </div>
      </div>
    </section>
  );
}
