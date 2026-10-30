'use client';

import { AnimatePresence, m as motion, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { ease } from '@/config/theme';

/**
 * Kultiveret-style rotating word: letters slide up and out, the next word slides in.
 * Screen readers get the full list once instead of a constantly changing region.
 */
export function RotatingWord({
  words,
  interval = 2600,
  className = '',
  srPrefix = '',
}: {
  words: string[];
  interval?: number;
  className?: string;
  srPrefix?: string;
}) {
  const [i, setI] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setI((n) => (n + 1) % words.length), interval);
    return () => clearInterval(id);
  }, [words.length, interval, reduce]);

  const word = words[i];
  return (
    <span className={`relative inline-grid align-baseline ${className}`}>
      <span className="sr-only">
        {srPrefix}
        {words.join(', ')}
      </span>
      {/* reserve width of the longest word */}
      <span aria-hidden className="invisible col-start-1 row-start-1 whitespace-nowrap">
        {words.reduce((a, b) => (b.length > a.length ? b : a))}
      </span>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={word}
          aria-hidden
          className="col-start-1 row-start-1 inline-flex overflow-hidden whitespace-nowrap pb-[0.12em]"
        >
          {word.split('').map((ch, k) => (
            <motion.span
              key={k}
              className="inline-block"
              initial={{ y: '110%' }}
              animate={{ y: '0%', transition: { duration: 0.7, ease, delay: k * 0.022 } }}
              exit={{ y: '-110%', transition: { duration: 0.45, ease, delay: k * 0.012 } }}
            >
              {ch === ' ' ? ' ' : ch}
            </motion.span>
          ))}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
