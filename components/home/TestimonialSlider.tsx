'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useState } from 'react';
import { testimonials } from '@/data/testimonials';
import { Photo } from '@/components/shared/Photo';
import { ease } from '@/config/theme';

/** Kultiveret B6: a full-height photo with a dark quote box; square arrows switch stories. */
export function TestimonialSlider() {
  const [i, setI] = useState(0);
  const reduce = useReducedMotion();
  const go = (d: -1 | 1) => setI((n) => (n + d + testimonials.length) % testimonials.length);
  const t = testimonials[i];

  return (
    <section className="relative isolate min-h-[90vh] overflow-hidden bg-harbor-deep" aria-roledescription="carousel" aria-label="Testimonials">
      <AnimatePresence initial={false}>
        <motion.div
          key={t.image + i}
          className="absolute inset-0 -z-10"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease }}
        >
          <Photo k={t.image} sizes="100vw" />
        </motion.div>
      </AnimatePresence>
      <div className="absolute left-0 top-0 px-gutter pt-8">
        <h2 className="tight-display text-[clamp(2rem,1.4rem+2.4vw,3.5rem)] text-shell [text-shadow:0_1px_24px_rgba(12,24,38,0.45)]">
          Stories from people who stayed
        </h2>
      </div>
      <figure className="absolute bottom-0 right-0 w-full bg-harbor text-shell sm:w-[min(30rem,92%)]" aria-live="polite">
        <div className="min-h-[13rem] px-8 pb-4 pt-6">
          <p className="eyebrow text-shell/60">
            {t.title} · Placeholder testimonial
          </p>
          <blockquote className="relative mt-3 text-[1rem] leading-snug">
            <span aria-hidden className="absolute -left-5 top-0">“</span>
            {t.quote}
            <span aria-hidden>”</span>
          </blockquote>
          <figcaption className="mt-4 text-[0.8125rem] text-shell/70">
            {t.name} · {t.from} · {t.stay}
          </figcaption>
        </div>
        <div className="flex items-stretch bg-shell text-harbor">
          <span className="flex items-center px-5 text-[1rem] font-medium tabular-nums">
            {i + 1}/{testimonials.length}
          </span>
          <button type="button" onClick={() => go(-1)} aria-label="Previous testimonial" className="ml-auto h-14 px-5 transition-colors hover:bg-terracotta hover:text-shell">
            ←
          </button>
          <button type="button" onClick={() => go(1)} aria-label="Next testimonial" className="h-14 px-5 transition-colors hover:bg-terracotta hover:text-shell">
            →
          </button>
        </div>
      </figure>
    </section>
  );
}
