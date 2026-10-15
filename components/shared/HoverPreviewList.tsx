'use client';

import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion';
import { useRef, useState } from 'react';
import type { ImageKey } from '@/data/images';
import { Photo } from './Photo';

/**
 * Kultiveret category rows: a list where hovering a row shows a thumbnail that follows the cursor.
 * Rows are rendered by the caller; this only provides the floating preview.
 */
export function HoverPreviewList({
  items,
  children,
  className = '',
}: {
  items: { key: string; image: ImageKey }[];
  children: (bind: (key: string) => { onMouseEnter: () => void; onMouseLeave: () => void }) => React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<string | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 30, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 260, damping: 30, mass: 0.6 });

  const onMove = (e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    x.set(e.clientX - r.left);
    y.set(e.clientY - r.top);
  };

  const bind = (key: string) => ({
    onMouseEnter: () => setActive(key),
    onMouseLeave: () => setActive((k) => (k === key ? null : k)),
  });

  const img = items.find((i) => i.key === active)?.image;

  return (
    <div ref={ref} onMouseMove={onMove} className={`relative ${className}`}>
      {children(bind)}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-0 top-0 z-20 hidden md:block"
        style={{ x: sx, y: sy }}
      >
        <AnimatePresence>
          {img && (
            <motion.div
              key={img}
              initial={{ opacity: 0, scale: 0.85, x: 24, y: '-50%' }}
              animate={{ opacity: 1, scale: 1, x: 24, y: '-50%' }}
              exit={{ opacity: 0, scale: 0.9, x: 24, y: '-50%' }}
              transition={{ duration: 0.35 }}
              className="absolute border border-harbor/20 bg-shell p-1.5"
            >
              <div className="relative h-[9.5rem] w-[8rem] overflow-hidden">
                <Photo k={img} sizes="8rem" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
