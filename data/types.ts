import type { ImageKey } from './images';

/** All money values are base EUR. Convert at render time with <Price />. */
export type Eur = number;

export type Region = 'city' | 'coast' | 'countryside' | 'islands';

export interface Neighborhood {
  name: string;
  blurb: string;
  image: ImageKey;
}

export interface MonthClimate {
  month: string; // 'Jan'
  highC: number;
  lowC: number;
  seaC?: number;
  rainDays: number;
}

export interface Destination {
  slug: string;
  name: string;
  /** Short form for compact lists, e.g. "Lagos" */
  shortName: string;
  region: Region;
  /** One-line vibe */
  vibe: string;
  bestFor: string[];
  /** Typical all-in monthly budget for one person, from (EUR). PLACEHOLDER. */
  monthlyBudgetFrom: Eur;
  overview: string;
  whoFor: string;
  neighborhoods: Neighborhood[];
  /** Cost-of-living snapshot. All PLACEHOLDER figures, editable here. */
  costs: {
    rentOneBed: Eur;
    coworkingMonth: Eur;
    coffee: Eur;
    dinnerForTwo: Eur;
  };
  climate: MonthClimate[];
  internet: { typicalMbps: number; note: string };
  community: string;
  image: ImageKey;
  heroImage: ImageKey;
  /** Position on the stylised map, 0–100 within its frame */
  map: { frame: 'mainland' | 'madeira' | 'azores'; x: number; y: number };
  highlight?: string;
}

export type IncludedKey =
  | 'home'
  | 'workspace'
  | 'airport-pickup'
  | 'sim'
  | 'nif-admin'
  | 'welcome-week'
  | 'community-events'
  | 'weekend-escapes'
  | 'visa-guidance'
  | 'school-guidance';

export interface IncludedItem {
  key: IncludedKey;
  title: string;
  text: string;
}

export interface Plan {
  slug: string;
  name: string;
  /** e.g. "1 month" */
  duration: string;
  tagline: string;
  summary: string;
  fromPerMonth: Eur;
  included: IncludedItem[];
  sampleMonth: { label: string; title: string; text: string }[];
  faqIds: string[];
  visaNote?: 'schengen90' | 'd8d7' | 'family';
  image: ImageKey;
  bestFor: string[];
}

export type HomeType = 'city-apartment' | 'beach-house' | 'quinta' | 'island-home';

export interface Home {
  slug: string;
  /** PLACEHOLDER name until we have real agreements */
  name: string;
  type: HomeType;
  destination: string; // destination slug
  area: string;
  bedrooms: number;
  bathrooms: number;
  sleeps: number;
  workspace: string;
  mbps: number;
  perMonth: Eur;
  minStayMonths: number;
  summary: string;
  description: string;
  features: string[];
  images: ImageKey[];
}

export interface Experience {
  slug: string;
  title: string;
  tag: string;
  duration: string;
  where: string;
  description: string;
  fromPrice?: Eur;
  includedIn?: string[]; // plan slugs
  image: ImageKey;
  cutoutImage: ImageKey;
}

export interface Category {
  slug: string;
  number: string; // '01'
  name: string;
  /** Short lowercase label used in the scattered grid and "living through ___" */
  label: string;
  intro: string;
  image: ImageKey;
  experiences: Experience[];
}

export const faqTabs = [
  { slug: 'your-stay', label: 'Your stay' },
  { slug: 'payment-booking', label: 'Payment & booking' },
  { slug: 'cancellations-changes', label: 'Cancellations & changes' },
  { slug: 'visas-admin', label: 'Visas & admin' },
  { slug: 'families-accessibility', label: 'Families & accessibility' },
  { slug: 'miscellaneous', label: 'Miscellaneous' },
] as const;

export type FaqTab = (typeof faqTabs)[number]['slug'];

export interface Faq {
  id: string;
  tab: FaqTab;
  q: string;
  /** Plain text. Use {d8Income}, {d7Income}, {schengenDays}, {schengenWindow}, {etiasFee}, {etiasStatus} tokens for config-driven figures. */
  a: string;
}

export interface Stat {
  label: string;
  value: number;
  suffix?: string;
  unit?: string;
  description: string;
  placeholder: true;
}

export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readingMinutes: number;
  image: ImageKey;
  tag: string;
}
