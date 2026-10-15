/**
 * Every visa figure on the site lives here, with a "valid as of" date and an official source.
 * Update this file and every visa section on the site updates with it.
 * Guidance only, not legal advice.
 */

export interface Source {
  label: string;
  href: string;
}

export const officialSources = {
  aima: { label: 'AIMA, Agency for Integration, Migration and Asylum', href: 'https://aima.gov.pt' },
  consular: { label: 'Portuguese consular network (Vistos portal)', href: 'https://vistos.mne.gov.pt' },
  euTravel: { label: 'EU official travel portal (EES & ETIAS)', href: 'https://travel-europe.europa.eu' },
  schengenCalculator: {
    label: 'EU short-stay calculator',
    href: 'https://home-affairs.ec.europa.eu/policies/schengen-borders-and-visa/border-crossing_en',
  },
} satisfies Record<string, Source>;

export const visaVerifiedAsOf = '2026-10-15';

export const disclaimer = (date: string = visaVerifiedAsOf) =>
  `Guidance only, not legal advice. Verified as of ${formatDate(date)}.`;

export function formatDate(iso: string) {
  return new Date(iso + 'T12:00:00Z').toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

export const visa = {
  schengen: {
    name: 'Schengen short stay',
    maxDays: 90,
    windowDays: 180,
    summary:
      'Visa-exempt travelers can stay up to 90 days in any 180-day period across the whole Schengen area, not just Portugal.',
    validAsOf: '2026-10-15',
    sources: [officialSources.euTravel, officialSources.schengenCalculator],
  },

  /** Portuguese national minimum wage used to derive income thresholds. */
  minimumWage: {
    monthlyEur: 920,
    year: 2026,
    validAsOf: '2026-01-01',
  },

  d8: {
    name: 'D8 digital nomad visa',
    summary:
      'For people working remotely for employers or clients outside Portugal. Temporary stay (up to one year) or residence route.',
    /** Four times the Portuguese minimum wage. Rises when the minimum wage rises. */
    minIncomeMonthlyEur: 3680,
    multiplierOfMinimumWage: 4,
    year: 2026,
    validAsOf: '2026-10-15',
    verified: true,
    sources: [officialSources.consular, officialSources.aima],
  },

  d7: {
    name: 'D7 passive income visa',
    summary:
      'For people with regular passive income such as pensions, rental income, dividends or royalties.',
    /** FIGURE TO VERIFY with partner lawyers before publishing as fact. */
    minIncomeMonthlyEur: 920,
    multiplierOfMinimumWage: 1,
    year: 2026,
    validAsOf: '2026-10-15',
    verified: false,
    sources: [officialSources.consular, officialSources.aima],
  },

  ees: {
    name: 'EES (EU Entry/Exit System)',
    status: 'in-operation' as const,
    summary:
      'Non-EU travelers register fingerprints and a facial image at the border on first entry. Passport stamps are being replaced by this digital record.',
    validAsOf: '2026-10-15',
    sources: [officialSources.euTravel],
  },

  etias: {
    name: 'ETIAS travel authorization',
    /** Switch to 'required' when ETIAS launches. Every ETIAS mention on the site follows this. */
    status: 'coming-soon' as 'coming-soon' | 'required',
    feeEur: 20,
    expectedLaunch: '2027 (no firm date yet)',
    summaryComingSoon:
      'A €20 online pre-travel authorization for visa-exempt travelers. Launch has been postponed to 2027 and there is no firm date yet. You do not need it today.',
    summaryRequired:
      'A €20 online pre-travel authorization for visa-exempt travelers. Apply only on the official EU site before you travel.',
    validAsOf: '2026-10-15',
    sources: [officialSources.euTravel],
  },
} as const;

export type VisaPath = 'schengen-short-stay' | 'd8' | 'd7' | 'eu-citizen' | 'needs-advice';
