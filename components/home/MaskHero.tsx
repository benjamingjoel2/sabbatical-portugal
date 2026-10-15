'use client';

import { motion, useMotionTemplate, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { PORTUGAL_PATH, PORTUGAL_VIEWBOX } from '@/components/svg/paths';
import Image from 'next/image';
import { Photo } from '@/components/shared/Photo';

const heroSrc = '/images/hero-lisbon-rooftops.webp';
const heroAlt = 'Terracotta rooftops of Lisbon stepping down to the Tagus, with a white church tower';
import { Pill, PillButton } from '@/components/shared/Buttons';
import { getLenis } from '@/components/motion/SmoothScroll';
import { GridLines } from '@/components/shared/GridLines';
import { RotatingWord } from '@/components/motion/RotatingWord';
import { ShoreEdge } from '@/components/svg/ShoreEdge';

const maskUrl = `url("data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${PORTUGAL_VIEWBOX.w} ${PORTUGAL_VIEWBOX.h}'><path d='${PORTUGAL_PATH}'/></svg>`,
)}")`;

const rotating = ['living', 'working', 'slowing down', 'belonging'];

function HeroCopy() {
  return (
    <>
      <h1 className="font-display-caps text-display-xl">
        <span className="block">Your harbor</span>
        <span className="block">in Portugal</span>
      </h1>
    </>
  );
}

function DiscoverButton() {
  const onClick = () => {
    const el = document.getElementById('intro');
    const target = el ? el.getBoundingClientRect().top + window.scrollY : window.innerHeight;
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(target, { duration: 2.2 });
    else window.scrollTo({ top: target, behavior: 'smooth' });
  };
  return (
    <PillButton type="button" tone="outline" onClick={onClick}>
      Discover <span aria-hidden>↓</span>
    </PillButton>
  );
}

function HeroAside() {
  return (
    <div className="max-w-[22rem]">
      <p className="tight-display text-[clamp(1.6rem,1.1rem+1.6vw,2.6rem)] leading-[1.02] tracking-[-0.045em]">
        <span className="text-harbor/45">— a season of </span>
        <RotatingWord words={rotating} className="text-azulejo" srPrefix="a season of " />
        <span className="block text-harbor/45">in Portugal</span>
      </p>
      <p className="mt-6 hidden text-[0.9375rem] leading-relaxed text-harbor/80 sm:block">
        One to twelve months in Portugal’s best cities, coastlines, countryside and islands. Your home, workspace,
        visa guidance and community, planned end to end by one specialist.
      </p>
      <div className="mt-7 flex flex-wrap gap-2">
        <DiscoverButton />
        <Pill href="/plan-my-season" tone="dark">
          Plan my season
        </Pill>
      </div>
    </div>
  );
}

function IntroCopy({ light = true }: { light?: boolean }) {
  return (
    <div className={`grid gap-8 md:grid-cols-2 ${light ? 'text-shell' : 'text-harbor'}`}>
      <h2 className="font-display-caps text-display-xl">
        <span className="block">We make a big move</span>
        <span className="block">feel simple</span>
      </h2>
      <div className="max-w-[26rem] space-y-4 self-end text-[0.9375rem] leading-relaxed md:justify-self-end">
        <p className="font-medium">We don’t just find you a rental.</p>
        <p>
          We handle the whole move: before you leave, the week you land, and every month after. The right town, a home
          that works, a desk, the paperwork, and people to share a table with.
        </p>
        <p>From Lisbon’s hills to an Azorean crater lake, Porto Season is your harbor for the length of your stay.</p>
      </div>
    </div>
  );
}

/**
 * Flyward A1 + A2: image masked inside the Portugal silhouette; on scroll the mask grows to full
 * bleed, the hero copy gives way to the intro, and a second photo layer (Lisbon rooftops) rises in.
 */
export function MaskHero() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  // Progress across the whole 300vh section: 0 = hero at rest, 1 = intro fully in view.
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start start', 'end end'] });

  // Smaller silhouette on narrow screens so the copy above and below stays clear.
  const [baseH, setBaseH] = useState(74);
  useEffect(() => {
    const set = () => setBaseH(window.innerWidth < 1024 ? 34 : 74);
    set();
    window.addEventListener('resize', set);
    return () => window.removeEventListener('resize', set);
  }, []);
  // The silhouette grows while the hero copy scrolls away (first half of the section).
  const maskH = useTransform(p, [0, 0.1, 0.45], [baseH, baseH, 900]);
  const maskSize = useMotionTemplate`auto ${maskH}vh`;
  const imgScale = useTransform(p, [0, 0.45], [1.2, 1]);
  // Once the silhouette is big, an unmasked full-bleed copy fades in so no edge of the shape is ever visible.
  const fullOpacity = useTransform(p, [0.3, 0.42], [0, 1]);
  // Second photo layer (golden-hour harbor) and shade arrive with the intro copy.
  const roofClip = useTransform(p, [0.45, 0.75], [100, 0]);
  const roofClipPath = useMotionTemplate`inset(${roofClip}% 0 0 0)`;
  const shade = useTransform(p, [0.35, 0.6], [0, 0.5]);
  // Hero copy fades out quickly as it scrolls away, before the silhouette grows under it.
  const heroOpacity = useTransform(p, [0, 0.12], [1, 0]);

  if (reduce) {
    return (
      <>
        <section id="hero" className="relative min-h-screen bg-shell pt-[var(--header-h)]">
          <GridLines />
          <div className="relative grid min-h-[calc(100vh-var(--header-h))] items-center gap-10 px-gutter py-10 lg:grid-cols-[1fr_auto_1fr]">
            <HeroCopy />
            <div
              className="relative mx-auto h-[60vh] w-[30vh]"
              style={{ maskImage: maskUrl, WebkitMaskImage: maskUrl, maskSize: 'contain', WebkitMaskSize: 'contain', maskRepeat: 'no-repeat', WebkitMaskRepeat: 'no-repeat', maskPosition: 'center' }}
            >
              <Image src={heroSrc} alt={heroAlt} fill priority sizes="40vh" className="object-cover" />
            </div>
            <HeroAside />
          </div>
        </section>
        <section id="intro" className="relative bg-harbor-deep px-gutter py-24">
          <div className="absolute inset-0">
            <Photo k="portoGoldenHour" sizes="100vw" className="opacity-50" />
          </div>
          <div className="relative">
            <IntroCopy />
          </div>
        </section>
      </>
    );
  }

  return (
    <section id="hero" ref={ref} className="relative bg-shell" aria-label="Introduction">
      {/* Pinned image stage: only images move here, never text */}
      <div className="sticky top-0 h-screen overflow-hidden" aria-hidden>
        <GridLines />
        <motion.div
          className="absolute inset-0"
          style={{
            maskImage: maskUrl,
            WebkitMaskImage: maskUrl,
            maskRepeat: 'no-repeat',
            WebkitMaskRepeat: 'no-repeat',
            maskPosition: '50% 50%',
            WebkitMaskPosition: '50% 50%',
            maskSize,
            WebkitMaskSize: maskSize,
          }}
        >
          <motion.div className="absolute inset-0" style={{ scale: imgScale }}>
            <Image src={heroSrc} alt="" fill priority sizes="100vw" className="object-cover" />
          </motion.div>
        </motion.div>
        <motion.div className="absolute inset-0" style={{ opacity: fullOpacity }}>
          <Image src={heroSrc} alt="" fill sizes="100vw" className="object-cover" />
        </motion.div>
        <motion.div className="absolute inset-0" style={{ clipPath: roofClipPath, WebkitClipPath: roofClipPath }}>
          <Photo k="portoGoldenHour" sizes="100vw" />
        </motion.div>
        <motion.div className="absolute inset-0 bg-harbor-deep" style={{ opacity: shade }} />
      </div>

      {/* Text scrolls normally over the stage, so the two blocks can never overlap */}
      <div className="relative -mt-[100vh]">
        <motion.div style={{ opacity: heroOpacity }} className="grid h-screen grid-rows-[auto_1fr_auto] px-gutter pb-8 pt-[calc(var(--header-h)+1.5rem)] lg:grid-cols-[1fr_minmax(16rem,22vw)_1fr] lg:grid-rows-1 lg:items-center lg:gap-10 lg:pb-0">
          <div className="lg:self-center">
            <HeroCopy />
          </div>
          <div />
          <div className="self-end lg:self-center lg:justify-self-end">
            <HeroAside />
          </div>
        </motion.div>
        <div className="h-[80vh]" />
        <div id="intro" className="flex min-h-screen items-end px-gutter pb-[18vh]">
          <IntroCopy />
        </div>
      </div>

      <ShoreEdge fillClass="fill-harbor-deep" />
    </section>
  );
}
