import type { Metadata } from 'next';
import Link from 'next/link';
import { plans } from '@/data/plans';
import { faqs } from '@/data/faqs';
import { FaqTabs } from '@/components/shared/FaqTabs';
import { Price } from '@/components/shared/Price';
import { Photo } from '@/components/shared/Photo';
import { Pill } from '@/components/shared/Buttons';
import { VisaDisclaimer } from '@/components/shared/VisaDisclaimer';
import { Reveal } from '@/components/motion/Reveal';
import { fillTokens } from '@/lib/tokens';
import { pageMeta } from '@/lib/seo';

export const metadata: Metadata = pageMeta({
  title: 'Booking info, pricing & FAQ',
  description: 'How Porto Season pricing works, how to book, deposits and cancellations, and answers about visas, families, homes, internet and life in Portugal.',
  path: '/info',
});

const steps = [
  { n: '01', title: 'Tell us about your season.', text: 'Use the season planner or simply write to us. Ten minutes is enough to start.' },
  { n: '02', title: 'Talk to your specialist.', text: 'A video call to understand how you live and work, and what you’re hoping for.' },
  { n: '03', title: 'Receive your proposal.', text: 'Towns, two or three homes, the workspace, a sample month and a clear, itemised price.' },
  { n: '04', title: 'Confirm and get ready.', text: 'A deposit secures your home. We send your arrival guide, and begin visa and admin steps if needed.' },
];

export default function InfoPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: fillTokens(f.a) } })),
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section id="pricing" className="bg-shell px-gutter pb-20 pt-[calc(var(--header-h)+3.5rem)]">
        <h1 className="tight-display text-mega">Pricing and guidelines</h1>
        <div className="mt-12 grid gap-8 text-[1rem] leading-relaxed text-harbor/70 md:ml-[33%] md:grid-cols-2 md:gap-10">
          <div className="space-y-4">
            <p>
              Every Porto Season plan is designed for you: the town, the home, the workspace and the pace. Prices are per month and
              include our planning, your specialist and everything listed in the plan.
            </p>
            <p>
              Plans are priced for one or two guests sharing a home. Families and larger groups receive a tailored quote. Flights,
              daily living costs and optional experiences are not included unless stated.
            </p>
          </div>
          <div className="space-y-4">
            <p>
              Every season begins with a conversation. You’re welcome to{' '}
              <Link href="/plan-my-season" className="text-harbor underline underline-offset-2 hover:text-terracotta">
                fill out the season planner
              </Link>{' '}
              or write to us directly. We’ll reply within one working day, Lisbon time.
            </p>
            <p>All prices below are placeholders while partner agreements are finalised. Switch currency in the header to see your own.</p>
          </div>
        </div>
        <Reveal className="mt-16 md:ml-[33%]">
          <table className="w-full border-collapse text-left text-[0.9375rem]">
            <caption className="sr-only">Plan prices</caption>
            <thead>
              <tr className="eyebrow border-b border-harbor/30 text-harbor/60">
                <th scope="col" className="py-3 font-normal">Plan</th>
                <th scope="col" className="py-3 font-normal">Length</th>
                <th scope="col" className="py-3 text-right font-normal">From / month</th>
              </tr>
            </thead>
            <tbody>
              {plans.map((p) => (
                <tr key={p.slug} className="border-b border-line">
                  <th scope="row" className="py-4 font-normal">
                    <Link href={`/plans/${p.slug}`} className="hover:text-terracotta">
                      {p.name}
                    </Link>
                  </th>
                  <td className="py-4 text-harbor/70">{p.duration}</td>
                  <td className="py-4 text-right">
                    <Price eur={p.fromPerMonth} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>
      </section>

      <section id="faq" className="bg-shell px-gutter py-20" aria-labelledby="faq-title">
        <div className="md:ml-[50%]">
          <h2 id="faq-title" className="mb-6 text-statement">
            Booking info & FAQs
          </h2>
          <FaqTabs />
          <VisaDisclaimer className="mt-10" />
        </div>
      </section>

      <section className="relative bg-shell px-gutter py-24" aria-labelledby="how-title">
        <div className="relative mx-auto mb-12 aspect-[4/3] w-[min(14rem,60%)] rotate-[-4deg] border-[6px] border-shell shadow-xl">
          <Photo k="planning" sizes="14rem" />
        </div>
        <h2 id="how-title" className="tight-display relative -mt-6 text-center text-mega">
          How booking works
        </h2>
        <p className="mx-auto mt-6 max-w-md text-center text-[1rem] text-harbor/75">From first hello to your first morning coffee in Portugal.</p>
        <div className="mt-14 border-t border-line pt-3 md:ml-[25%]">
          <h3 className="eyebrow mb-6 text-harbor/60 md:ml-[10%]">Step by step</h3>
          <ol className="space-y-5">
            {steps.map((s) => (
              <li key={s.n} className="grid grid-cols-[2.5rem_1fr] gap-4 md:grid-cols-[10%_1fr]">
                <span className="h-fit justify-self-start border border-harbor px-1.5 text-[0.75rem] tabular-nums md:justify-self-end">{s.n}</span>
                <p className="text-[1rem]">
                  <span className="font-medium">{s.title}</span> <span className="text-harbor/75">{s.text}</span>
                </p>
              </li>
            ))}
          </ol>
          <div className="mt-10 md:ml-[10%] md:pl-4">
            <Pill href="/plan-my-season" tone="dark">
              Start my season planner
            </Pill>
          </div>
        </div>
      </section>

    </>
  );
}
