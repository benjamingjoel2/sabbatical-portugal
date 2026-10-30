'use client';

import { m as motion, useReducedMotion } from 'framer-motion';
import { ease } from '@/config/theme';

export function Reveal({
  children,
  delay = 0,
  y = 16,
  className,
  as = 'div',
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: 'div' | 'li' | 'section' | 'p' | 'span';
}) {
  const reduce = useReducedMotion();
  const Comp = motion[as];
  return (
    <Comp
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -5% 0px' }}
      transition={{ duration: 0.55, ease, delay: Math.min(delay, 0.15) }}
    >
      {children}
    </Comp>
  );
}

/** Line-by-line headline reveal (SplitText-style, rebuilt with masks). */
export function RevealLines({
  lines,
  className,
  lineClassName = '',
  delay = 0,
  as: Tag = 'h2',
  id,
}: {
  id?: string;
  lines: string[];
  className?: string;
  lineClassName?: string;
  delay?: number;
  as?: 'h1' | 'h2' | 'h3' | 'p';
}) {
  const reduce = useReducedMotion();
  return (
    <Tag id={id} className={className}>
      <span className="sr-only">{lines.join(' ')}</span>
      {lines.map((l, i) => (
        <span key={i} className="block overflow-hidden pb-[0.06em]" aria-hidden>
          <motion.span
            className={`block ${lineClassName}`}
            initial={reduce ? false : { y: '105%' }}
            whileInView={{ y: '0%' }}
            viewport={{ once: true, margin: '0px 0px -8% 0px' }}
            transition={{ duration: 0.6, ease, delay: delay + i * 0.05 }}
          >
            {l}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
