'use client';

import Link from 'next/link';
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { useRef } from 'react';
import { categories } from '@/data/categories';
import type { Category } from '@/data/types';
import { Photo } from '@/components/shared/Photo';
import { RotatingWord } from '@/components/motion/RotatingWord';

// Scattered placements (desktop): left %, top %, width (vw), parallax factor
const spots = [
  { l: 2, t: 10, w: 13, k: 0.6 },
  { l: 24, t: 2, w: 8, k: 1.2 },
  { l: 38, t: 30, w: 15, k: 0.4 },
  { l: 66, t: 6, w: 11, k: 0.9 },
  { l: 84, t: 26, w: 12, k: 0.5 },
  { l: 10, t: 56, w: 10, k: 1.0 },
  { l: 30, t: 72, w: 9, k: 0.7 },
  { l: 58, t: 60, w: 14, k: 1.1 },
  { l: 80, t: 74, w: 9, k: 0.8 },
];

function ScatterItem({ c, i, progress }: { c: Category; i: number; progress: MotionValue<number> }) {
  const s = spots[i];
  const reduce = useReducedMotion();
  const y = useTransform(progress, [0, 1], reduce ? [0, 0] : [120 * s.k, -120 * s.k]);
  return (
    <motion.li className="absolute" style={{ left: `${s.l}%`, top: `${s.t}%`, width: `${s.w}vw`, y }}>
      <Link href={`/life/${c.slug}`} className="group block focus-visible:outline-offset-4">
        <div className="relative aspect-[4/5] w-full overflow-hidden">
          <Photo
            k={c.image}
            sizes="16vw"
            className="scale-105 blur-[7px] grayscale-[30%] transition-all duration-700 ease-[var(--ease-harbor)] group-hover:scale-100 group-hover:blur-0 group-hover:grayscale-0 group-focus-visible:blur-0"
          />
        </div>
        <p className="mt-1.5 text-[0.8125rem] lowercase transition-colors group-hover:text-terracotta">
          {c.label}
          <sup className="ml-0.5 text-[0.5625rem] font-medium">{c.number}</sup>
        </p>
      </Link>
    </motion.li>
  );
}

/** Kultiveret B2: numbered categories as a scattered, blurred image field that sharpens on hover. */
export function CategoryScatter() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });

  return (
    <section ref={ref} className="relative overflow-hidden bg-shell py-20 md:py-28" aria-labelledby="life-title">
      <div className="px-gutter">
        <p className="eyebrow text-harbor/60">Life in Portugal · 01–09</p>
        <h2 id="life-title" className="tight-display mt-4 text-[clamp(2.75rem,1.5rem+5vw,6rem)]">
          <span className="text-harbor">living through </span>
          <RotatingWord words={categories.map((c) => c.label)} className="text-azulejo" interval={2200} srPrefix="living through " />
        </h2>
        <p className="mt-6 max-w-md text-[1rem] leading-relaxed text-harbor/75">
          A season is made of small rituals: the market on Saturday, the same surf break at dawn, the tasca where they
          start your order when you walk in. Nine ways in.
        </p>
      </div>

      {/* Desktop scatter */}
      <ul className="relative mx-gutter mt-10 hidden h-[110vh] min-h-[44rem] md:block">
        {categories.map((c, i) => (
          <ScatterItem key={c.slug} c={c} i={i} progress={scrollYProgress} />
        ))}
      </ul>

      {/* Mobile grid */}
      <ul className="mt-10 grid grid-cols-2 gap-x-3 gap-y-6 px-gutter md:hidden">
        {categories.map((c) => (
          <li key={c.slug}>
            <Link href={`/life/${c.slug}`} className="block">
              <div className="relative aspect-[4/5] overflow-hidden">
                <Photo k={c.image} sizes="50vw" />
              </div>
              <p className="mt-1.5 text-[0.875rem] lowercase">
                {c.label}
                <sup className="ml-0.5 text-[0.5625rem]">{c.number}</sup>
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
