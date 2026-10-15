'use client';

import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from 'framer-motion';
import { useRef, useState } from 'react';
import type { ImageKey } from '@/data/images';
import { Photo } from './Photo';
import { NumberBadge } from './NumberBadge';
import { GridLines } from './GridLines';
import { ease } from '@/config/theme';

export interface StackStep {
  title: string;
  image: ImageKey;
  features: { lead: string; text: string }[];
}

function StepView({ s, i }: { s: StackStep; i: number }) {
  return (
    <div className="grid gap-8 md:grid-cols-[auto_1fr] md:gap-12">
      <div className="relative w-full max-w-[20rem] md:w-auto">
        <div className="relative aspect-[4/5] w-full overflow-hidden md:h-[min(25rem,48vh)] md:w-auto">
          <Photo k={s.image} sizes="(min-width: 768px) 20rem, 90vw" />
        </div>
        <NumberBadge n={i + 1} className="absolute -right-3 -top-3" />
      </div>
      <div className="md:pt-8">
        <h3 className="font-display text-[clamp(1.5rem,1.2rem+1vw,2rem)] uppercase leading-[0.95] tracking-[0.03em]">{s.title}</h3>
        <ul className="mt-8 grid gap-x-10 gap-y-6 sm:grid-cols-2">
          {s.features.map((f) => (
            <li key={f.lead} className="text-[0.875rem] leading-relaxed">
              <span className="font-medium">{f.lead}.</span> <span className="text-harbor/60">{f.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/** Flyward "How we make your travel seamless": pinned, numbered steps that swap as you scroll. */
export function FeatureStack({ title, steps }: { title: string[]; steps: StackStep[] }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  useMotionValueEvent(scrollYProgress, 'change', (v) => setActive(Math.min(steps.length - 1, Math.floor(v * steps.length))));

  const heading = (
    <h2 className="font-display-caps text-display-l text-center">
      {title.map((t) => (
        <span key={t} className="block">
          {t}
        </span>
      ))}
    </h2>
  );

  const staticList = (
    <section className={`relative bg-shell px-gutter py-24 ${reduce ? '' : 'md:hidden'}`}>
      <GridLines />
      <div className="relative">{heading}</div>
      <div className="relative mx-auto mt-16 max-w-5xl space-y-20">
        {steps.map((s, i) => (
          <StepView key={s.title} s={s} i={i} />
        ))}
      </div>
    </section>
  );

  if (reduce) return staticList;

  return (
    <>
    {staticList}
    <section ref={ref} className="relative hidden bg-shell md:block" style={{ height: `${steps.length * 90 + 30}vh` }}>
      <div className="sticky top-0 flex h-screen flex-col overflow-hidden px-gutter pb-10 pt-[calc(var(--header-h)+1.5rem)]">
        <GridLines />
        <div className="relative">{heading}</div>
        <div className="relative mx-auto mt-10 w-full max-w-5xl grow md:mt-14">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6, ease }}
            >
              <StepView s={steps[active]} i={active} />
            </motion.div>
          </AnimatePresence>
        </div>
        <ol className="relative mx-auto flex gap-2" aria-hidden>
          {steps.map((_, i) => (
            <li key={i} className={`h-1 rounded-full transition-all duration-500 ${i === active ? 'w-8 bg-harbor' : 'w-2 bg-harbor/25'}`} />
          ))}
        </ol>
      </div>
    </section>
    </>
  );
}
