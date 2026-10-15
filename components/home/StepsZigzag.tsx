import { Photo } from '@/components/shared/Photo';
import { NumberBadge } from '@/components/shared/NumberBadge';
import { GridLines } from '@/components/shared/GridLines';
import { Parallax } from '@/components/motion/Parallax';
import { Reveal, RevealLines } from '@/components/motion/Reveal';
import { PortugalLineMap } from '@/components/svg/PortugalLineMap';
import type { ImageKey } from '@/data/images';

export interface Step {
  title: string;
  text: string;
  image: ImageKey;
}

export const homeSteps: Step[] = [
  {
    title: 'Your plan',
    text: 'We match your town, home and workspace to how you live and work, then show you the honest costs.',
    image: 'planning',
  },
  {
    title: 'Your visa',
    text: 'Clear guidance on the right route, with applications handled by our partner immigration lawyers.',
    image: 'lisbonComercio',
  },
  {
    title: 'Your arrival',
    text: 'Airport pickup, a local SIM, help with your NIF and bank account, and a welcome week to find your feet.',
    image: 'lisbonTram',
  },
  {
    title: 'Your season',
    text: 'Community dinners, support on WhatsApp, and small problems solved before they grow.',
    image: 'communityDinner',
  },
];

// Desktop placement for the staggered layout (column start / span on a 12-col grid, parallax distance)
const layout = [
  { col: 'md:col-start-8 md:col-span-3', mt: 'md:mt-0', d: 40 },
  { col: 'md:col-start-2 md:col-span-3', mt: 'md:-mt-24', d: 90 },
  { col: 'md:col-start-7 md:col-span-3', mt: 'md:-mt-10', d: 60 },
  { col: 'md:col-start-3 md:col-span-3', mt: 'md:-mt-32', d: 110 },
];

/** Flyward A5: numbered image-led steps in a staggered zig-zag, each with its own parallax speed. */
export function StepsZigzag({ title = ['How we make', 'it easy'], steps = homeSteps }: { title?: [string, string]; steps?: Step[] }) {
  return (
    <section className="relative overflow-hidden bg-shell pb-32 pt-24 md:pb-48 md:pt-32" aria-labelledby="steps-title">
      <GridLines />
      <PortugalLineMap className="pointer-events-none absolute -right-[10%] top-[8%] h-[120%] w-auto text-harbor/10" />
      <div className="relative px-gutter">
        <RevealLines
          id="steps-title"
          as="h2"
          lines={title}
          className="font-display-caps text-display-l text-center"
        />
        <ol className="mt-20 grid gap-16 md:mt-28 md:grid-cols-12 md:gap-x-6 md:gap-y-0">
          {steps.map((s, i) => {
            const l = layout[i % layout.length];
            return (
              <li key={s.title} className={`${l.col} ${l.mt}`}>
                <Parallax distance={l.d}>
                  <Reveal>
                    <div className="relative">
                      <div className="relative aspect-[4/5] w-full overflow-hidden">
                        <Photo k={s.image} sizes="(min-width: 768px) 22vw, 90vw" />
                      </div>
                      <NumberBadge n={i + 1} className="absolute -right-3 -top-3" />
                    </div>
                    <h3 className="mt-5 font-display text-[1.375rem] uppercase leading-[1.05] tracking-[0.04em] md:text-[1.5rem]">
                      {s.title}
                    </h3>
                    <p className="mt-3 max-w-[18rem] text-[0.875rem] leading-relaxed text-harbor/80">{s.text}</p>
                  </Reveal>
                </Parallax>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
