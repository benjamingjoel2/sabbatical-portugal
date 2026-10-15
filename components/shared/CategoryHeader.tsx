'use client';

import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { categories } from '@/data/categories';
import type { Category } from '@/data/types';
import { ease } from '@/config/theme';

/** Kultiveret category header: "living through (01) neighborhoods ▾" with a blurred dropdown of all categories. */
export function CategoryHeader({ current }: { current: Category }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    const onClick = (e: MouseEvent) => !ref.current?.contains(e.target as Node) && setOpen(false);
    window.addEventListener('keydown', onKey);
    window.addEventListener('mousedown', onClick);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('mousedown', onClick);
    };
  }, [open]);

  return (
    <div ref={ref} className="sticky top-[var(--header-h)] z-30 -mt-px bg-shell/90 px-gutter py-3 backdrop-blur-md">
      <div className="tight-display flex flex-wrap items-baseline gap-x-4 text-[clamp(1.75rem,1.2rem+2.2vw,2.5rem)]">
        <span className="text-harbor/45">living through</span>
        <span className="tabular-nums">({current.number})</span>
        <button
          type="button"
          aria-expanded={open}
          aria-controls="category-list"
          onClick={() => setOpen((o) => !o)}
          className="inline-flex items-baseline gap-2 lowercase transition-colors hover:text-terracotta"
        >
          {current.label}
          <span aria-hidden className={`text-[0.5em] transition-transform ${open ? 'rotate-180' : ''}`}>
            ▾
          </span>
          <span className="sr-only">Choose another category</span>
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.nav
            id="category-list"
            aria-label="Life in Portugal categories"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease }}
            className="absolute inset-x-0 top-full h-[70vh] bg-shell/70 px-gutter pt-4 backdrop-blur-xl"
          >
            <ul className="tight-display text-[clamp(1.5rem,1.1rem+1.6vw,2rem)] lowercase md:ml-[clamp(9rem,22vw,20rem)]">
              {categories.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/life/${c.slug}`}
                    aria-current={c.slug === current.slug ? 'page' : undefined}
                    onClick={() => setOpen(false)}
                    className={`inline-flex items-baseline gap-3 transition-colors hover:text-terracotta ${c.slug === current.slug ? '' : 'text-harbor/45'}`}
                  >
                    <span className="text-[0.45em] tabular-nums">{c.number}</span>
                    {c.label}
                    {c.slug === current.slug && <span aria-hidden className="text-[0.5em]">▸</span>}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </div>
  );
}
