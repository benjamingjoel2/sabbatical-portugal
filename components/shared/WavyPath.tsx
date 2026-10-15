'use client';

import { motion, useReducedMotion } from 'framer-motion';

/** Hand-drawn wavy line that draws itself in (connects numbered images). */
export function WavyPath({ className = '' }: { className?: string }) {
  const reduce = useReducedMotion();
  return (
    <svg viewBox="0 0 1440 300" preserveAspectRatio="none" className={`pointer-events-none absolute ${className}`} aria-hidden fill="none">
      <motion.path
        d="M-20 150C60 40 140 40 170 120S120 260 260 230 420 60 520 110 560 260 700 220 860 70 960 120 1010 250 1130 200 1260 80 1340 120 1420 200 1470 160"
        className="stroke-terracotta/50"
        strokeWidth="1.5"
        initial={reduce ? false : { pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, margin: '0px 0px -20% 0px' }}
        transition={{ duration: 2.4, ease: [0.22, 1, 0.36, 1] }}
      />
    </svg>
  );
}
