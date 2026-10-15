'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { useState } from 'react';
import { headerNav } from '@/config/nav';
import { Logo } from './Logo';
import { CurrencySwitcher } from './CurrencySwitcher';
import { SoundToggle } from '@/components/sound/SoundToggle';
import { useUI } from './UIProvider';

/** Pages whose first screen is a dark photo: header starts in light text. */
const lightTopRoutes = ['/contact', '/plan-my-season'];

/**
 * Flyward layout (links left, centred wordmark, pill right) plus Kultiveret controls
 * (sound wave + square MENU button). Hides on scroll down, returns on scroll up.
 */
export function Header() {
  const pathname = usePathname();
  const { menuOpen, setMenuOpen } = useUI();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [atTop, setAtTop] = useState(true);

  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setAtTop(y < 40);
    setHidden(y > 200 && y > prev && !menuOpen);
  });

  const light = atTop && lightTopRoutes.includes(pathname) && !menuOpen;

  return (
    <motion.header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        light ? 'text-shell' : 'text-harbor'
      } ${!atTop && !menuOpen ? 'bg-shell/85 backdrop-blur-md' : 'bg-transparent'}`}
      animate={{ y: hidden ? '-100%' : '0%' }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <a
        href="#main"
        className="nav-caps sr-only z-[60] bg-harbor px-4 py-3 text-shell focus:not-sr-only focus:fixed focus:left-2 focus:top-2"
      >
        Skip to content
      </a>
      <div className="grid h-[var(--header-h)] grid-cols-[1fr_auto_1fr] items-center gap-4 px-gutter">
        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex gap-5">
            {headerNav.map((n) => {
              const active = pathname.startsWith(n.href);
              return (
                <li key={n.href}>
                  <Link
                    href={n.href}
                    aria-current={active ? 'page' : undefined}
                    className={`nav-caps relative py-2 transition-opacity hover:opacity-60 ${active ? 'after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:bg-current' : ''}`}
                  >
                    {n.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="col-start-1 justify-self-start lg:col-start-2 lg:justify-self-center">
          <Logo />
        </div>
        <div className="col-start-3 flex items-center justify-end gap-2 md:gap-3">
          <SoundToggle />
          <CurrencySwitcher className="hidden md:block" id="currency-header" />
          <Link
            href="/plan-my-season"
            className={`nav-caps hidden h-8 items-center rounded-full border px-4 transition-colors sm:inline-flex ${
              light ? 'border-shell hover:bg-shell hover:text-harbor' : 'border-harbor hover:bg-harbor hover:text-shell'
            }`}
          >
            Plan my season
          </Link>
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-controls="mega-menu"
            className="nav-caps flex h-8 items-center gap-2.5 bg-harbor px-3 text-shell transition-colors hover:bg-terracotta"
          >
            <span>{menuOpen ? 'Close' : 'Menu'}</span>
            <span aria-hidden className="relative block h-2 w-3.5">
              <span className={`absolute left-0 h-px w-full bg-current transition-transform duration-300 ${menuOpen ? 'top-1 rotate-45' : 'top-0'}`} />
              <span className={`absolute left-0 h-px w-full bg-current transition-transform duration-300 ${menuOpen ? 'top-1 -rotate-45' : 'top-2'}`} />
            </span>
          </button>
        </div>
      </div>
    </motion.header>
  );
}
