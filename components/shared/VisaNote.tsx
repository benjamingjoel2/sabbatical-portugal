import { t, tp } from '@/lib/i18n/t';
import Link from '@/components/i18n/Link';
import { visa } from '@/config/visa';
import { site } from '@/config/site';
import { VisaDisclaimer } from './VisaDisclaimer';

const euro = (n: number) => `€${n.toLocaleString('en-GB')}`;

/** Short, config-driven visa note for plan pages. */
export function VisaNote({ kind }: { kind: 'schengen90' | 'd8d7' | 'family' }) {
  return (
    <div className="space-y-4 bg-limestone/60 p-6 md:p-8">
      <p className="eyebrow text-harbor/60">{t("Visas, honestly")}</p>
      {kind === 'schengen90' && (
        <p className="text-[0.9375rem] leading-relaxed">
          {t("Designed to fit the Schengen short-stay rule for visa-exempt travelers: up to ")}{tp(visa.schengen.maxDays)} {t("days in any")}{' '}
          {tp(visa.schengen.windowDays)}{t("-day period, counted across all Schengen countries. If you have travelled in Europe in the last six months, tell us and we’ll check your dates.")}</p>
      )}
      {kind === 'd8d7' && (
        <p className="text-[0.9375rem] leading-relaxed">
          {t("Stays beyond 90 days usually need a national visa. Remote workers often use the D8 (minimum ")}{tp(euro(visa.d8.minIncomeMonthlyEur))} {t("a month for a single applicant in ")}{tp(visa.d8.year)}{t("); people with passive income often use the D7 (around")}{' '}
          {tp(euro(visa.d7.minIncomeMonthlyEur))} {t("a month")}{tp(visa.d7.verified ? '' : ', to be confirmed')}{t("). Applications are handled by our partner immigration lawyers, ")}{tp(site.visaPartner)}.
        </p>
      )}
      {kind === 'family' && (
        <p className="text-[0.9375rem] leading-relaxed">
          {t("Term-length stays may fit the ")}{tp(visa.schengen.maxDays)}/{tp(visa.schengen.windowDays)} {t("rule; a school year needs a national visa for each family member, and income thresholds rise with family size. We map it out with our partner lawyers before you commit.")}</p>
      )}
      <p className="text-[0.875rem]">
        <Link href="/visas" className="underline underline-offset-2 hover:text-terracotta">
          {t("Read our full visa guide →")}</Link>
      </p>
      <VisaDisclaimer />
    </div>
  );
}
