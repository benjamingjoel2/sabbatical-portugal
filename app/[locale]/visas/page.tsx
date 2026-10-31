import { initLocale } from '@/lib/i18n/server';
import { localizeMetadata } from '@/lib/i18n/metadata';
import { lhref, t, tf, tp } from '@/lib/i18n/t';
import type { Metadata } from 'next';
import { visa, officialSources, formatDate, disclaimer } from '@/config/visa';
import { site } from '@/config/site';
import { faqsByTab } from '@/data/faqs';
import { EditorialHero } from '@/components/shared/PageHero';
import { FaqBlock } from '@/components/shared/FaqBlock';
import { VisaDisclaimer } from '@/components/shared/VisaDisclaimer';
import { CtaHero } from '@/components/shared/CtaHero';
import { Reveal } from '@/components/motion/Reveal';
import { pageMeta } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  return localizeMetadata(pageMeta({
  title: 'Visas for a long stay in Portugal',
  description: `The 90/180 rule, the D8 digital nomad visa (€${visa.d8.minIncomeMonthlyEur.toLocaleString('en-GB')}/month in ${visa.d8.year}), the D7, EES and ETIAS explained honestly. Guidance only, not legal advice.`,
  path: '/visas',
}), (await params).locale);
}

const euro = (n: number) => `€${n.toLocaleString('en-GB')}`;

function Card({
  name,
  badge,
  figure,
  figureNote,
  children,
  validAsOf,
  sources,
  tone = 'default',
}: {
  name: string;
  badge?: string;
  figure?: string;
  figureNote?: string;
  children: React.ReactNode;
  validAsOf: string;
  sources: readonly { label: string; href: string }[];
  tone?: 'default' | 'soon';
}) {
  return (
    <Reveal as="li" className={`flex flex-col gap-5 p-6 md:p-8 ${tone === 'soon' ? 'bg-azulejo-mist/60' : 'bg-limestone/60'}`}>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <h3 className="text-[1.5rem] leading-tight tracking-[-0.02em]">{tp(name)}</h3>
        {badge && <span className="eyebrow bg-harbor px-2 py-1 text-[0.5625rem] text-shell">{tp(badge)}</span>}
      </div>
      {figure && (
        <p>
          <span className="font-display font-semibold text-[clamp(2.5rem,2rem+2vw,3.75rem)] leading-none">{tp(figure)}</span>
          {figureNote && <span className="mt-1 block text-[0.8125rem] text-harbor/60">{tp(figureNote)}</span>}
        </p>
      )}
      <div className="space-y-3 text-[0.9375rem] leading-relaxed">{children}</div>
      <p className="mt-auto border-t border-harbor/15 pt-4 text-[0.75rem] text-harbor/60">
        {t("Verified as of ")}{tp(formatDate(validAsOf))} ·{' '}
        {sources.map((s, i) => (
          <span key={s.href}>
            <a href={lhref(s.href)} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-terracotta">
              {tp(s.label)}
            </a>
            {tp(i < sources.length - 1 ? ' · ' : '')}
          </span>
        ))}
      </p>
    </Reveal>
  );
}

export default async function VisasPage({ params }: { params: Promise<{ locale: string }> }) {
  await initLocale(params);
  const etiasRequired = visa.etias.status === 'required';
  return (
    <>
      <EditorialHero eyebrow={t("Visas & entry")} title={t("Visas, honestly")}>
        <p className="text-[1rem] leading-relaxed text-harbor/75">
          {t("The right route depends on your passport, how long you stay and how you earn. Here is the plain-English version. The real answer for your situation always comes from our partner immigration lawyers, ")}{tp(site.visaPartner)}.
        </p>
        <VisaDisclaimer />
      </EditorialHero>

      <section className="bg-shell px-gutter pb-24" aria-labelledby="routes-title">
        <h2 id="routes-title" className="eyebrow mb-6 text-harbor/60">
          {t("The main routes")}</h2>
        <ul className="grid gap-1.5 md:grid-cols-2">
          <Card
            name={visa.schengen.name}
            badge={t("Up to 3 months")}
            figure={tp(`${visa.schengen.maxDays} / ${visa.schengen.windowDays}`)}
            figureNote={t("days, in any rolling period")}
            validAsOf={tp(visa.schengen.validAsOf)}
            sources={tp(visa.schengen.sources)}
          >
            <p>{tp(visa.schengen.summary)}</p>
            <p>{t("Our Taster and Season plans are designed to fit inside this rule. Tell us about recent travel in Europe so we can check your dates.")}</p>
          </Card>
          <Card
            name={visa.d8.name}
            badge={t("Remote work")}
            figure={tp(euro(visa.d8.minIncomeMonthlyEur))}
            figureNote={tf("minimum monthly income, single applicant, {0} ({1}× the Portuguese minimum wage of {2})", visa.d8.year, visa.d8.multiplierOfMinimumWage, euro(visa.minimumWage.monthlyEur))}
            validAsOf={tp(visa.d8.validAsOf)}
            sources={tp(visa.d8.sources)}
          >
            <p>{tp(visa.d8.summary)}</p>
            <p>{t("The threshold rises when the minimum wage rises, and with each family member who joins you.")}</p>
          </Card>
          <Card
            name={visa.d7.name}
            badge={t("Passive income")}
            figure={tp(`≈ ${euro(visa.d7.minIncomeMonthlyEur)}`)}
            figureNote={tf("guide monthly income, single applicant, {0}{1}", visa.d7.year, visa.d7.verified ? '' : ' · figure to be verified')}
            validAsOf={tp(visa.d7.validAsOf)}
            sources={tp(visa.d7.sources)}
          >
            <p>{tp(visa.d7.summary)}</p>
            <p>{t("The amount increases for a spouse and for each child. Savings and accommodation are usually assessed too.")}</p>
          </Card>
          <Card name={visa.ees.name} badge={t("In operation")} validAsOf={tp(visa.ees.validAsOf)} sources={tp(visa.ees.sources)}>
            <p>{tp(visa.ees.summary)}</p>
            <p>{t("Allow a little extra time at passport control on your first entry.")}</p>
          </Card>
          <Card
            name={visa.etias.name}
            badge={tp(etiasRequired ? 'Required' : 'Coming soon')}
            figure={tp(euro(visa.etias.feeEur))}
            figureNote={tp(etiasRequired ? 'online pre-travel authorization' : `expected ${visa.etias.expectedLaunch}`)}
            validAsOf={tp(visa.etias.validAsOf)}
            sources={tp(visa.etias.sources)}
            tone={etiasRequired ? 'default' : 'soon'}
          >
            <p>{tp(etiasRequired ? visa.etias.summaryRequired : visa.etias.summaryComingSoon)}</p>
            <p>{t("Only ever apply on the official EU portal. Unofficial sites charge more.")}</p>
          </Card>
          <Reveal as="li" className="flex flex-col justify-between gap-6 bg-harbor p-6 text-shell md:p-8">
            <div>
              <h3 className="text-[1.5rem] leading-tight tracking-[-0.02em]">{t("Who does what")}</h3>
              <ul className="mt-5 space-y-3 text-[0.9375rem] leading-relaxed text-shell/85">
                <li>{t("Your specialist: helps you understand the options, gathers documents and plans timings around your season.")}</li>
                <li>{tp(site.visaPartner)}{t(": our partner immigration lawyers advise on your case and prepare and file your application.")}</li>
                <li>{t("The authorities (consulates and AIMA) decide. Nobody can guarantee an outcome.")}</li>
              </ul>
            </div>
            <p className="text-[0.8125rem] text-shell/60">{tp(disclaimer())}</p>
          </Reveal>
        </ul>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          <h2 className="eyebrow text-harbor/60">{t("Official sources")}</h2>
          <ul className="space-y-2 text-[1rem] md:col-span-2">
            {Object.values(officialSources).map((s) => (
              <li key={s.href}>
                <a href={lhref(s.href)} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-terracotta">
                  {tp(s.label)} ↗
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <FaqBlock faqs={tp(faqsByTab('visas-admin'))} title={tp(['Visas & admin', 'questions'])} footnote={<VisaDisclaimer />} />
      <CtaHero lines={tp(['Find your', 'visa path'])} image="lisbonComercio" label={t("Plan my season")} />
    </>
  );
}
