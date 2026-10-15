'use client';

import Lenis from 'lenis';
import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

let lenisInstance: Lenis | null = null;
export const getLenis = () => lenisInstance;

/** Lenis smooth scrolling (both references use it). Disabled for reduced motion. */
export function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
    lenisInstance = lenis;
    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      lenisInstance = null;
    };
  }, []);

  // Reset to top on real page changes, but not when the planner opens or closes as a modal.
  const prev = useRef<string | null>(null);
  useEffect(() => {
    const from = prev.current;
    prev.current = pathname;
    if (from === null || window.location.hash) return;
    if (pathname === '/plan-my-season' || from === '/plan-my-season') return;
    lenisInstance?.scrollTo(0, { immediate: true });
  }, [pathname]);

  return null;
}
