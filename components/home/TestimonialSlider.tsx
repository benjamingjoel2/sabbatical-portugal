'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useState } from 'react';
import { testimonials } from '@/data/testimonials';
import { Photo } from '@/components/shared/Photo';
import { PlaceholderFlag } from '@/components/shared/PlaceholderFlag';
import { ShoreEdge } from '@/components/svg/ShoreEdge';
import { RevealLines } from '@/components/motion/Reveal';
import { ease } from '@/config/theme';

function ArrowBtn({ dir, onClick }: { dir: -1 | 1; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={dir === -1 ? 'Previous testimonial' : 'Next testimonial'}
      className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-harbor transition-colors hover:bg-harbor hover:text-shell"
    >
      <span aria-hidden>{dir === -1 ? '←' : '→'}</span>
    </button>
  );
}

/** Flyward A7: centred title over a soft sky, testimonial slider with round arrows. */
export function TestimonialSlider() {
  const [[i, dir], set] = useState<[number, number]>([0, 1]);
  const reduce = useReducedMotion();
  const go = (d: -1 | 1) => set(([n]) => [(n + d + testimonials.length) % testimonials.length, d]);
  const t = testimonials[i];

  return (
    <section
      className="relative overflow-hidden bg-[linear-gradient(180deg,var(--color-shell)_0%,var(--color-azulejo-mist)_35%,#e9d3c4_75%,#d9b49c_100%)] pt-32"
      aria-label="Testimonials"
      aria-roledescription="carousel"
    >
      <div className="px-gutter">
        <RevealLines as="h2" lines={['Trusted by people', 'who stayed']} className="font-display-caps text-display-l text-center" />
        <p className="mt-4 flex justify-center">
          <PlaceholderFlag label="Placeholder testimonials" />
        </p>
      </div>

      <div className="relative mx-auto mt-16 max-w-3xl px-gutter pb-16 text-center">
        <div className="flex items-start justify-between gap-4">
          <ArrowBtn dir={-1} onClick={() => go(-1)} />
          <div className="min-h-[22rem] grow md:min-h-[19rem]" aria-live="polite">
            <AnimatePresence mode="wait" custom={dir}>
              <motion.figure
                key={i}
                custom={dir}
                initial={reduce ? false : { opacity: 0, x: dir * 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={reduce ? undefined : { opacity: 0, x: dir * -40 }}
                transition={{ duration: 0.55, ease }}
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${testimonials.length}`}
              >
                <div className="relative mx-auto h-20 w-20 overflow-hidden">
                  <Photo k={t.image} sizes="5rem" />
                </div>
                <figcaption className="mt-6">
                  <span className="block font-display text-[clamp(1.5rem,1.2rem+1vw,2rem)] uppercase leading-none tracking-[0.02em]">
                    {t.name}
                  </span>
                  <span className="eyebrow mt-2 block text-harbor/60">
                    {t.from} · {t.stay}
                  </span>
                </figcaption>
                <p className="eyebrow mt-6 text-port">{t.title}</p>
                <blockquote className="mt-3 font-display text-[clamp(1.125rem,1rem+0.5vw,1.375rem)] leading-snug">
                  “{t.quote}”
                </blockquote>
              </motion.figure>
            </AnimatePresence>
          </div>
          <ArrowBtn dir={1} onClick={() => go(1)} />
        </div>
        <div className="mt-6 flex justify-center gap-2" role="group" aria-label="Choose testimonial">
          {testimonials.map((_, n) => (
            <button
              key={n}
              type="button"
              onClick={() => set([n, n > i ? 1 : -1])}
              aria-label={`Show testimonial ${n + 1}`}
              aria-current={n === i}
              className={`h-1.5 rounded-full transition-all ${n === i ? 'w-6 bg-harbor' : 'w-1.5 bg-harbor/30'}`}
            />
          ))}
        </div>
      </div>

      <div className="relative h-[60vh] min-h-[22rem]">
        <ShoreEdge position="top" fillClass="fill-[#d9b49c]" variant={1} />
        <Photo k="lisbonRooftopsSea" sizes="100vw" />
        <ShoreEdge fillClass="fill-shell" />
      </div>
    </section>
  );
}
