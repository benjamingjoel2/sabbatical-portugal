import type { ImageKey } from '@/data/images';
import { Photo } from './Photo';
import { Pill } from './Buttons';
import { RevealLines } from '@/components/motion/Reveal';
import { ShoreEdge } from '@/components/svg/ShoreEdge';

/** Flyward closing hero: big statement and a "Shall we begin?" pill over a full-bleed photo. */
export function CtaHero({
  lines = ['Your season', 'starts with a hello'],
  image = 'portoGoldenHour',
  href = '/plan-my-season',
  label = 'Shall we begin?',
}: {
  lines?: string[];
  image?: ImageKey;
  href?: string;
  label?: string;
}) {
  return (
    <section className="relative isolate flex min-h-[90svh] flex-col items-center px-gutter pt-28 text-center text-shell">
      <div className="absolute inset-0 -z-10">
        <Photo k={image} sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-b from-harbor-deep/45 via-harbor-deep/10 to-harbor-deep/30" />
      </div>
      <ShoreEdge position="top" fillClass="fill-shell" />
      <RevealLines lines={lines} className="font-display-caps text-display-xl max-w-5xl" />
      <Pill href={href} tone="light" className="mt-8">
        {label}
      </Pill>
    </section>
  );
}
