'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { useSound } from './SoundProvider';
import { WaveIcon } from './WaveIcon';
import { ease } from '@/config/theme';

/**
 * First-visit prompt (Kultiveret-style). Shown once; the answer is remembered.
 * Audio only starts on "Yes". Esc or "No" closes it with sound off.
 */
export function SoundGate() {
  const { ready, choice, enable, disable } = useSound();
  const open = ready && choice === 'unset';
  const yesRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    yesRef.current?.focus();
    document.documentElement.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') disable();
      if (e.key === 'Tab' && dialogRef.current) {
        const focusables = dialogRef.current.querySelectorAll<HTMLElement>('button');
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.documentElement.style.overflow = '';
    };
  }, [open, disable]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="sound-gate-title"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-shell px-gutter text-harbor"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease } }}
        >
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.9, ease }}
            className="flex flex-col items-center text-center"
          >
            <p className="tight-display text-[clamp(3.25rem,2rem+5vw,6rem)] leading-[0.8]">Porto Season</p>
            <WaveIcon className="mt-10 text-harbor" />
            <h2 id="sound-gate-title" className="eyebrow mt-5 max-w-[22rem] leading-[1.45] tracking-[0.06em]">
              Would you like to hear the sounds of Portugal?
              <span className="block text-harbor/60">Tram bells, Atlantic waves, harbor gulls and a café terrace.</span>
            </h2>
            <div className="mt-7 flex gap-1.5">
              <button
                ref={yesRef}
                type="button"
                onClick={enable}
                className="nav-caps h-9 min-w-[4.5rem] border border-harbor bg-harbor px-4 text-shell transition-colors hover:border-terracotta hover:bg-terracotta"
              >
                Yes
              </button>
              <button
                type="button"
                onClick={disable}
                className="nav-caps h-9 min-w-[4.5rem] border border-harbor px-4 transition-colors hover:bg-harbor hover:text-shell"
              >
                No
              </button>
            </div>
            <p className="mt-6 text-[0.75rem] text-harbor/50">You can switch sound on or off any time with the wave icon.</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
