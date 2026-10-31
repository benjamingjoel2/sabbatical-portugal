'use client';

import { t, tp } from '@/lib/i18n/t';
import Link from '@/components/i18n/Link';
import { usePathname } from '@/lib/i18n/navigation';
import { useMotionValueEvent, useScroll } from 'framer-motion';
import { useState } from 'react';
import { Logo } from './Logo';
import { LanguageSwitcher } from '@/components/i18n/LanguageSwitcher';
import { CurrencySwitcher } from './CurrencySwitcher';
import { SoundToggle } from '@/components/sound/SoundToggle';
import { useUI } from './UIProvider';

/** Pages whose first screen is a dark photo: header starts in light text. */
const lightTopRoutes = ['/contact', '/plan-my-season'];

/** Kultiveret header: wordmark left; sound wave, currency, plan link and a dark square MENU button right. */
export function Header() {
  const pathname = usePathname();
  const { menuOpen, setMenuOpen } = useUI();
  const { scrollY } = useScroll();
  const [atTop, setAtTop] = useState(true);
  useMotionValueEvent(scrollY, 'change', (y) => setAtTop(y < 40));

  const light = atTop && lightTopRoutes.includes(pathname) && !menuOpen;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${light ? 'text-shell' : 'text-harbor'} ${
        !atTop && !menuOpen ? 'bg-shell/90 backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <a
        href="#main"
        className="sr-only z-[60] bg-harbor px-4 py-3 text-sm text-shell focus:not-sr-only focus:fixed focus:left-2 focus:top-2"
      >
        {t("Skip to content")}</a>
      <div className="flex h-[var(--header-h)] items-center justify-between gap-4 px-gutter">
        <Logo />
        <div className="flex items-center gap-2 md:gap-3">
          <LanguageSwitcher className="hidden md:flex" />
          <SoundToggle />
          <CurrencySwitcher className="hidden md:block" id="currency-header" />
          <Link
            href="/plan-my-season"
            className={`hidden h-9 items-center whitespace-nowrap border px-3 text-[0.875rem] transition-colors sm:inline-flex ${
              light ? 'border-shell hover:bg-shell hover:text-harbor' : 'border-harbor hover:bg-harbor hover:text-shell'
            }`}
          >
            {t("Plan my season")}</Link>
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-controls="mega-menu"
            className={`flex h-9 items-center gap-2.5 px-3 text-[0.8125rem] uppercase tracking-[0.04em] transition-colors ${
              menuOpen ? 'bg-harbor text-shell' : light ? 'bg-shell text-harbor' : 'bg-harbor text-shell hover:bg-terracotta'
            }`}
          >
            <span>{tp(menuOpen ? 'Close' : 'Menu')}</span>
            <span aria-hidden className="relative block h-2 w-3.5">
              <span className={`absolute left-0 h-px w-full bg-current transition-transform duration-300 ${menuOpen ? 'top-1 rotate-45' : 'top-0'}`} />
              <span className={`absolute left-0 h-px w-full bg-current transition-transform duration-300 ${menuOpen ? 'top-1 -rotate-45' : 'top-2'}`} />
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
