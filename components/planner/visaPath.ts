import { visa, type VisaPath } from '@/config/visa';
import type { PlannerInput } from '@/lib/schemas';

export interface VisaGuidance {
  path: VisaPath;
  title: string;
  summary: string;
  points: string[];
}

const euro = (n: number) => `€${n.toLocaleString('en-GB')}`;

function months(i: PlannerInput['when']): number | null {
  if (i.length === 'custom') {
    const n = parseInt(i.customLength ?? '', 10);
    return Number.isFinite(n) ? n : null;
  }
  return parseInt(i.length, 10);
}

/**
 * A first, rough signal of which visa route is likely to apply. GUIDANCE ONLY:
 * the real answer always comes from our partner immigration lawyers.
 */
export function likelyVisaPath(d: Pick<PlannerInput, 'when' | 'who'>): VisaGuidance {
  const m = months(d.when);
  const { nationality, income } = d.who;
  const entry =
    visa.etias.status === 'required'
      ? `Before you fly: register with EES at the border, and apply for ETIAS (${euro(visa.etias.feeEur)}) on the official EU site.`
      : `At the border you’ll register with EES (fingerprints and photo). ETIAS (${euro(visa.etias.feeEur)}) is not required yet; launch is expected in ${visa.etias.expectedLaunch}.`;

  if (nationality === 'eu-eea-swiss') {
    return {
      path: 'eu-citizen',
      title: 'No visa needed',
      summary: 'As an EU, EEA or Swiss citizen you can live in Portugal freely.',
      points: [
        'For stays over three months you register your residence with the local council (a simple certificate).',
        'We help with the NIF (tax number), bank account and health registration as part of your plan.',
      ],
    };
  }

  if (nationality === 'unsure') {
    return {
      path: 'needs-advice',
      title: 'Let’s check together',
      summary: 'Tell your specialist your nationality and we’ll confirm the right route with our partner lawyers.',
      points: [entry],
    };
  }

  if (m !== null && m <= 3) {
    if (nationality === 'visa-exempt') {
      return {
        path: 'schengen-short-stay',
        title: `Short stay: up to ${visa.schengen.maxDays} days`,
        summary: `Your season can likely fit within the Schengen short-stay rule: up to ${visa.schengen.maxDays} days in any ${visa.schengen.windowDays}-day period.`,
        points: [
          'Days spent anywhere in the Schengen area in the previous 180 days count towards the 90.',
          entry,
          'Want to stay longer? We can look at a D8 or D7 route before you arrive.',
        ],
      };
    }
    return {
      path: 'needs-advice',
      title: 'A short-stay visa is likely needed',
      summary: 'Your nationality usually needs a Schengen short-stay visa, applied for before you travel.',
      points: ['Our partner lawyers can confirm requirements and timings for your passport.', entry],
    };
  }

  if (income === 'remote-salary' || income === 'freelance') {
    return {
      path: 'd8',
      title: 'Likely route: D8 digital nomad visa',
      summary: `For remote work for employers or clients outside Portugal. The minimum income is ${euro(
        visa.d8.minIncomeMonthlyEur,
      )} per month for a single applicant in ${visa.d8.year} (four times the Portuguese minimum wage).`,
      points: [
        'The threshold rises with the minimum wage, and with each family member who joins you.',
        'Typical documents: contract or client agreements, recent payslips or invoices, bank statements, accommodation and health insurance.',
        `Applications are prepared and filed with our partner immigration lawyers.`,
      ],
    };
  }

  if (income === 'passive') {
    return {
      path: 'd7',
      title: 'Likely route: D7 passive income visa',
      summary: `For regular passive income such as pensions, rentals or dividends. The guide figure is around ${euro(
        visa.d7.minIncomeMonthlyEur,
      )} per month for a single applicant${visa.d7.verified ? '' : ' (to be confirmed by our partner lawyers)'}.`,
      points: [
        'The threshold increases for a spouse and for each child.',
        'Typical documents: proof of income, bank statements, accommodation and health insurance.',
        'Applications are prepared and filed with our partner immigration lawyers.',
      ],
    };
  }

  return {
    path: 'needs-advice',
    title: 'Let’s talk it through',
    summary: 'Long stays without work or passive income need a closer look. There are options, and our partner lawyers will advise.',
    points: [entry],
  };
}
