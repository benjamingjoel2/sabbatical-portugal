export interface NavItem {
  label: string;
  href: string;
}

/** Main navigation, in the order given in the brief. */
export const mainNav: NavItem[] = [
  { label: 'Destinations', href: '/destinations' },
  { label: 'Plans', href: '/plans' },
  { label: 'Homes', href: '/homes' },
  { label: 'Life in Portugal', href: '/life' },
  { label: 'Visas', href: '/visas' },
  { label: 'About', href: '/about' },
  { label: 'Journal', href: '/journal' },
  { label: 'Contact', href: '/contact' },
];

/** The four links shown inline in the desktop header (left side). */
export const headerNav: NavItem[] = mainNav.slice(0, 4);

export const secondaryNav: NavItem[] = [
  { label: 'Families', href: '/families' },
  { label: 'Booking info & FAQ', href: '/info' },
  { label: 'Plan my season', href: '/plan-my-season' },
];

export const legalNav: NavItem[] = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Cookie Policy', href: '/privacy#cookies' },
  { label: 'Terms of Use', href: '/terms' },
];
