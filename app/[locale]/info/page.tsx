import { initLocale } from '@/lib/i18n/server';
import { localizeMetadata } from '@/lib/i18n/metadata';
import { t, tp } from '@/lib/i18n/t';
import type { Metadata } from 'next';
import Link from '@/components/i18n/Link';
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

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  return localizeMetadata(pageMeta({
  title: 'Booking info, pricing & FAQ',
  description: 'How Porto Season pricing works, how to book, deposits and cancellations, and answers about visas, families, homes, internet and life in Portugal.',
  path: '/info',
}), (await params).locale);
}

const steps = [
  { n: '01', title: 'Tell us about your season.', text: 'Use the season planner or simply write to us. Ten minutes is enough to start.' },
  { n: '02', title: 'Talk to your specialist.', text: 'A video call to understand how you live and work, and what you’re hoping for.' },
  { n: '03', title: 'Receive your proposal.', text: 'Towns, two or three homes, the workspace, a sample month and a clear, itemised price.' },
  { n: '04', title: 'Confirm and get ready.', text: 'A deposit secures your home. We send your arrival guide, and begin visa and admin steps if needed.' },
];

export default async function InfoPage({ params }: { params: Promise<{ locale: string }> }) {
  await initLocale(params);
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: fillTokens(f.a) } })),
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section id="pricing" className="bg-shell px-gutter pb-20 pt-[calc(var(--header-h)+3.5rem)]">
        <h1 className="tight-display text-mega">{t("Pricing and guidelines")}</h1>
        <div className="mt-12 grid gap-8 text-[1rem] leading-relaxed text-harbor/70 md:ml-[33%] md:grid-cols-2 md:gap-10">
          <div className="space-y-4">
            <p>
              {t("Every Porto Season plan is designed for you: the town, the home, the workspace and the pace. Prices are per month and include our planning, your specialist and everything listed in the plan.")}</p>
            <p>
              {t("Plans are priced for one or two guests sharing a home. Families and larger groups receive a tailored quote. Flights, daily living costs and optional experiences are not included unless stated.")}</p>
          </div>
          <div className="space-y-4">
            <p>
              {t("Every season begins with a conversation. You’re welcome to")}{' '}
              <Link href="/plan-my-season" className="text-harbor underline underline-offset-2 hover:text-terracotta">
                {t("fill out the season planner")}</Link>{' '}
              {t("or write to us directly. We’ll reply within one working day, Lisbon time.")}</p>
            <p>{t("All prices below are placeholders while partner agreements are finalised. Switch currency in the header to see your own.")}</p>
          </div>
        </div>
        <Reveal className="mt-16 md:ml-[33%]">
          <table className="w-full border-collapse text-left text-[0.9375rem]">
            <caption className="sr-only">{t("Plan prices")}</caption>
            <thead>
              <tr className="eyebrow border-b border-harbor/30 text-harbor/60">
                <th scope="col" className="py-3 font-normal">{t("Plan")}</th>
                <th scope="col" className="py-3 font-normal">{t("Length")}</th>
                <th scope="col" className="py-3 text-right font-normal">{t("Price / month")}</th>
              </tr>
            </thead>
            <tbody>
              {plans.map((p) => (
                <tr key={p.slug} className="border-b border-line">
                  <th scope="row" className="py-4 font-normal">
                    <Link href={`/plans/${p.slug}`} className="hover:text-terracotta">
                      {tp(p.name)}
                    </Link>
                  </th>
                  <td className="py-4 text-harbor/70">{tp(p.duration)}</td>
                  <td className="py-4 text-right">
                    {t("From ")}<Price eur={tp(p.fromPerMonth)} />
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
            {t("Booking info & FAQs")}</h2>
          <FaqTabs items={faqs.map((f) => ({ ...f, q: t(f.q), a: fillTokens(f.a) }))} />
          <VisaDisclaimer className="mt-10" />
        </div>
      </section>

      <section className="relative bg-shell px-gutter py-24" aria-labelledby="how-title">
        <div className="relative mx-auto mb-12 aspect-[4/3] w-[min(14rem,60%)] rotate-[-4deg] border-[6px] border-shell shadow-xl">
          <Photo k="planning" sizes="14rem" />
        </div>
        <h2 id="how-title" className="tight-display relative -mt-6 text-center text-mega">
          {t("How booking works")}</h2>
        <p className="mx-auto mt-6 max-w-md text-center text-[1rem] text-harbor/75">{t("From first hello to your first morning coffee in Portugal.")}</p>
        <div className="mt-14 border-t border-line pt-3 md:ml-[25%]">
          <h3 className="eyebrow mb-6 text-harbor/60 md:ml-[10%]">{t("Step by step")}</h3>
          <ol className="space-y-5">
            {steps.map((s) => (
              <li key={s.n} className="grid grid-cols-[2.5rem_1fr] gap-4 md:grid-cols-[10%_1fr]">
                <span className="h-fit justify-self-start border border-harbor px-1.5 text-[0.75rem] tabular-nums md:justify-self-end">{tp(s.n)}</span>
                <p className="text-[1rem]">
                  <span className="font-medium">{tp(s.title)}</span> <span className="text-harbor/75">{tp(s.text)}</span>
                </p>
              </li>
            ))}
          </ol>
          <div className="mt-10 md:ml-[10%] md:pl-4">
            <Pill href="/plan-my-season" tone="dark">
              {t("Start my season planner")}</Pill>
          </div>
        </div>
      </section>

    </>
  );
}
