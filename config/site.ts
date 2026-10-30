/**
 * Brand, contact and company details. Everything in [BRACKETS] is a placeholder
 * to be replaced before launch.
 */
export const site = {
  name: 'Porto Season',
  tagline: 'Your harbor in Portugal, for a season.',
  signOff: 'Welcome to your season.',
  promise: 'A season in Portugal, planned end to end by one dedicated specialist.',
  description:
    'Porto Season plans one to twelve months of living, working and slowing down anywhere in Portugal: Lisbon, Porto, the coast, the Alentejo, the Douro, Madeira and the Azores. Home, workspace, visa guidance and community, handled by one specialist.',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://portoseason.tourground.com',
  locale: 'en',

  contact: {
    email: 'portoseason@tourground.com',
    phone: '+351 [PHONE NUMBER]',
    phoneHref: 'tel:+351000000000',
    /** Digits only, international format, no "+". Used for wa.me links. */
    whatsappNumber: '[NUMBER]',
    whatsappHref: 'https://wa.me/[NUMBER]',
    instagram: 'https://www.instagram.com/[HANDLE]',
    instagramHandle: '@[HANDLE]',
  },

  location: {
    city: 'Lisbon, Portugal',
    timeZone: 'Europe/Lisbon',
    address: '[STREET ADDRESS], [POSTCODE] Lisboa, Portugal',
  },

  /** Office hours, always in Lisbon time. */
  officeHours: [
    { days: 'Monday to Friday', hours: '09:00 – 18:00' },
    { days: 'Saturday', hours: '10:00 – 13:00' },
    { days: 'Sunday', hours: 'Closed (WhatsApp for guests in season)' },
  ],
  officeHoursNote: 'All times are Lisbon time (WET/WEST).',

  company: {
    legalName: '[COMPANY NAME]',
    registration: 'NIPC [COMPANY REGISTRATION NUMBER]',
    travelLicence: 'RNAVT [RNAVT NUMBER]',
  },

  /** Partner immigration lawyers. Placeholder until an agreement is signed. */
  visaPartner: '[PARTNER NAME]',

  /** How long after a request we delete stored documents. */
  documentDeletionDays: '[X]',
} as const;

export type Site = typeof site;
