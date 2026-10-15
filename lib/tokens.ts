import { site } from '@/config/site';
import { visa } from '@/config/visa';

const euro = (n: number) => `€${n.toLocaleString('en-GB')}`;

/** Replace config-driven tokens in FAQ answers and other copy. */
export function fillTokens(text: string): string {
  const map: Record<string, string> = {
    d8Income: euro(visa.d8.minIncomeMonthlyEur),
    d7Income: euro(visa.d7.minIncomeMonthlyEur),
    schengenDays: String(visa.schengen.maxDays),
    schengenWindow: String(visa.schengen.windowDays),
    etiasFee: euro(visa.etias.feeEur),
    etiasStatus:
      visa.etias.status === 'required'
        ? 'required before you travel'
        : `not yet required (launch expected in ${visa.etias.expectedLaunch})`,
    visaPartner: site.visaPartner,
    deletionDays: site.documentDeletionDays,
  };
  return text.replace(/\{(\w+)\}/g, (m, k: string) => map[k] ?? m);
}
