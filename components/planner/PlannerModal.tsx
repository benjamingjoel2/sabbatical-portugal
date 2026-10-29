'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { SeasonPlanner } from './SeasonPlanner';
import { ease } from '@/config/theme';

export function PlannerModal() {
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);
  const close = () => router.back();

  useEffect(() => {
    document.documentElement.style.overflow = 'hidden';
    const prev = document.activeElement as HTMLElement | null;
    ref.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') router.back();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.documentElement.style.overflow = '';
      prev?.focus?.();
    };
  }, [router]);

  return (
    <div className="fixed inset-0 z-[70] overflow-y-auto">
      <motion.div
        className="fixed inset-0 bg-harbor-deep/60 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        onClick={close}
        aria-hidden
      />
      <motion.div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-label="Plan my season"
        tabIndex={-1}
        className="relative mx-auto my-6 w-[min(36rem,calc(100%-2rem))] outline-none md:my-12"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease }}
      >
        <button
          type="button"
          onClick={close}
          className="nav-caps absolute right-3 top-3 z-10 flex h-8 items-center gap-2 bg-harbor px-3 text-shell hover:bg-terracotta"
        >
          Close <span aria-hidden>×</span>
        </button>
        <SeasonPlanner onDone={close} compact />
      </motion.div>
    </div>
  );
}
