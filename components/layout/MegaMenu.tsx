'use client';

import { lhref, t, tp } from '@/lib/i18n/t';
import Link from '@/components/i18n/Link';
import { usePathname } from '@/lib/i18n/navigation';
import { AnimatePresence, m as motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useUI } from './UIProvider';
import { Photo } from '@/components/shared/Photo';
import { ArrowLink } from '@/components/shared/Buttons';
import { CurrencySwitcher } from './CurrencySwitcher';
import { LanguageSwitcher } from '@/components/i18n/LanguageSwitcher';
import { destinations } from '@/data/destinations';
import { categories } from '@/data/categories';
import { plans } from '@/data/plans';
import { site } from '@/config/site';
import type { ImageKey } from '@/data/images';
import { ease } from '@/config/theme';

interface Group {
  title: string;
  href: string;
  image: ImageKey;
  cutout: ImageKey;
  links: { label: string; href: string; num?: string }[];
  cols?: 1 | 2;
}

const groups: Group[] = [
  {
    title: 'Destinations',
    href: '/destinations',
    image: 'lisbonTram',
    cutout: 'pottery',
    cols: 2,
    links: destinations.map((d) => ({ label: d.shortName, href: `/destinations/${d.slug}` })),
  },
  {
    title: 'Life in Portugal',
    href: '/life',
    image: 'lisbonAlfama',
    cutout: 'coffeeToast',
    cols: 2,
    links: categories.map((c) => ({ label: c.name, href: `/life/${c.slug}`, num: c.number })),
  },
  {
    title: 'Plans & homes',
    href: '/plans',
    image: 'homeWarm',
    cutout: 'planning',
    links: [
      ...plans.map((p) => ({ label: p.name, href: `/plans/${p.slug}` })),
      { label: 'All homes', href: '/homes' },
      { label: 'Families', href: '/families' },
    ],
  },
  {
    title: 'Porto Season',
    href: '/about',
    image: 'portoGoldenHour',
    cutout: 'specialist',
    links: [
      { label: 'About us', href: '/about' },
      { label: 'Visas', href: '/visas' },
      { label: 'Booking info & FAQ', href: '/info' },
      { label: 'Journal', href: '/journal' },
      { label: 'Contact', href: '/contact' },
    ],
  },
];

/** Kultiveret-style full-screen, image-led menu. */
export function MegaMenu() {
  const { menuOpen, setMenuOpen } = useUI();
  const [active, setActive] = useState(0);
  const pathname = usePathname();
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => setMenuOpen(false), [pathname, setMenuOpen]);

  useEffect(() => {
    if (menuOpen) {
      document.documentElement.style.overflow = 'hidden';
      setTimeout(() => panel.current?.querySelector<HTMLElement>('a')?.focus(), 50);
    } else {
      document.documentElement.style.overflow = '';
    }
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMenuOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menuOpen, setMenuOpen]);

  const g = groups[active];

  return (
    <AnimatePresence>
      {menuOpen && (
        <motion.div
          id="mega-menu"
          role="dialog"
          aria-modal="true"
          aria-label={t("Site menu")}
          ref={panel}
          className="fixed inset-0 z-40 overflow-y-auto bg-azulejo-mist text-harbor"
          initial={{ clipPath: 'inset(0 0 100% 0)' }}
          animate={{ clipPath: 'inset(0 0 0% 0)' }}
          exit={{ clipPath: 'inset(0 0 100% 0)' }}
          transition={{ duration: 0.7, ease }}
        >
          <div className="grid min-h-full grid-rows-[1fr_auto] gap-10 px-gutter pb-6 pt-[calc(var(--header-h)+1rem)] md:grid-cols-2 md:grid-rows-1">
            {/* Image column */}
            <div className="relative hidden md:block">
              <AnimatePresence mode="wait">
                <motion.div
                  key={g.title}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease }}
                  className="relative w-[min(22rem,60%)]"
                >
                  <div className="relative aspect-[3/4] w-full overflow-hidden">
                    <Photo k={g.image} sizes="22rem" />
                  </div>
                  <div className="absolute -bottom-10 -right-12 aspect-square w-28 overflow-hidden rounded-full border-4 border-azulejo-mist">
                    <Photo k={g.cutout} sizes="7rem" />
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Links column */}
            <div className="flex flex-col justify-between gap-12">
              <nav aria-label={t("Menu")} className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
                {groups.map((grp, i) => (
                  <div
                    key={grp.title}
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    className={grp.cols === 2 ? 'sm:col-span-2 lg:col-span-1' : ''}
                  >
                    <Link href={grp.href} className="text-[1.5rem] leading-tight tracking-[-0.02em] transition-colors hover:text-terracotta md:text-[1.75rem]">
                      {tp(grp.title)}
                    </Link>
                    <ul className={`mt-3 grid gap-x-6 gap-y-1 text-[0.875rem] ${grp.cols === 2 ? 'grid-cols-2' : ''}`}>
                      {grp.links.map((l) => (
                        <li key={l.href}>
                          <Link href={l.href} className="group inline-flex gap-1 transition-colors hover:text-terracotta">
                            {tp(l.label)}
                            {l.num && <sup className="text-[0.55rem] text-harbor/60">{tp(l.num)}</sup>}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </nav>

              <div>
                <a href={lhref(`mailto:${site.contact.email}`)} className="text-statement block break-all hover:text-terracotta">
                  {tp(site.contact.email)}
                </a>
                <ArrowLink href="/plan-my-season" large>
                  {t("plan my season")}</ArrowLink>
                <div className="mt-6 flex items-center gap-6 md:hidden">
                  <LanguageSwitcher />
                  <CurrencySwitcher id="currency-menu" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
