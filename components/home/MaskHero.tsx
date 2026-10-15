'use client';

import { motion, useMotionTemplate, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef } from 'react';
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
    const el = document.getElementById('hero');
    const target = el ? el.offsetTop + window.innerHeight * 1.75 : window.innerHeight;
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
      <p className="mt-6 text-[0.9375rem] leading-relaxed text-harbor/80">
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
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start start', 'end end'] });

  // Smaller silhouette on narrow screens so the copy above and below stays clear.
  const baseH = useRef(74);
  useEffect(() => {
    baseH.current = window.innerWidth < 1024 ? 42 : 74;
    p.set(p.get());
  }, [p]);
  const maskH = useTransform(p, (v) => {
    const b = baseH.current;
    if (v <= 0.08) return b;
    const k = Math.min(1, (v - 0.08) / 0.42);
    return b + (1100 - b) * k * k;
  });
  const maskSize = useMotionTemplate`auto ${maskH}vh`;
  const imgScale = useTransform(p, [0, 0.5], [1.25, 1]);
  const heroOpacity = useTransform(p, [0.06, 0.2], [1, 0]);
  const heroY = useTransform(p, [0.06, 0.25], [0, -60]);
  const shade = useTransform(p, [0.3, 0.55], [0, 0.45]);
  const roofClip = useTransform(p, [0.5, 0.78], [100, 0]);
  const roofClipPath = useMotionTemplate`inset(${roofClip}% 0 0 0)`;
  const roofY = useTransform(p, [0.5, 1], ['12%', '0%']);
  const introOpacity = useTransform(p, [0.42, 0.56], [0, 1]);
  const introY = useTransform(p, [0.42, 0.6], [80, 0]);

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
    <section id="hero" ref={ref} className="relative h-[330vh] bg-shell" aria-label="Introduction">
      <div className="sticky top-0 h-screen overflow-hidden">
        <GridLines />

        {/* Masked photo layers */}
        <motion.div
          className="absolute inset-0"
          style={{
            maskImage: maskUrl,
            WebkitMaskImage: maskUrl,
            maskRepeat: 'no-repeat',
            WebkitMaskRepeat: 'no-repeat',
            maskPosition: '50% 54%',
            WebkitMaskPosition: '50% 54%',
            maskSize,
            WebkitMaskSize: maskSize,
          }}
        >
          <motion.div className="absolute inset-0" style={{ scale: imgScale }}>
            <Image src={heroSrc} alt={heroAlt} fill priority sizes="100vw" className="object-cover" />
          </motion.div>
          <motion.div className="absolute inset-0 bg-harbor-deep" style={{ opacity: shade }} />
          <motion.div className="absolute inset-0" style={{ clipPath: roofClipPath }}>
            <motion.div className="absolute inset-[-12%_0_0_0]" style={{ y: roofY }}>
              <Photo k="portoGoldenHour" sizes="100vw" />
            </motion.div>
            <div className="absolute inset-0 bg-harbor-deep/55" />
          </motion.div>
        </motion.div>

        {/* Hero copy flanking the silhouette */}
        <motion.div
          style={{ opacity: heroOpacity, y: heroY }}
          className="pointer-events-auto relative grid h-full grid-rows-[auto_1fr_auto] px-gutter pb-8 pt-[calc(var(--header-h)+1.5rem)] lg:grid-cols-[1fr_minmax(16rem,22vw)_1fr] lg:grid-rows-1 lg:items-center lg:gap-10 lg:pb-0"
        >
          <div className="lg:self-center">
            <HeroCopy />
          </div>
          <div />
          <div className="self-end lg:self-center lg:justify-self-end">
            <HeroAside />
          </div>
        </motion.div>

        {/* Intro (Flyward A2) */}
        <motion.div
          style={{ opacity: introOpacity, y: introY }}
          className="pointer-events-none absolute inset-x-0 bottom-[14vh] px-gutter"
        >
          <IntroCopy />
        </motion.div>

        <ShoreEdge fillClass="fill-harbor-deep" />
      </div>
    </section>
  );
}
