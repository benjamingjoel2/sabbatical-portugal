import type { ImageKey } from '@/data/images';
import { Photo } from './Photo';
import { NumberBadge } from './NumberBadge';
import { WavyPath } from './WavyPath';
import { Reveal, RevealLines } from '@/components/motion/Reveal';

export interface TrioItem {
  title: string;
  text: string;
  image: ImageKey;
  eyebrow?: string;
}

const offsets = ['md:mt-0', 'md:mt-24', 'md:mt-12', 'md:mt-28'];

/** Flyward "Perfectly suited for" / about "We combine…": numbered images along a hand-drawn wavy path. */
export function WavyTrio({ title, items, intro }: { title: string[]; items: TrioItem[]; intro?: string }) {
  const cols = items.length >= 4 ? 'md:grid-cols-4' : 'md:grid-cols-3';
  return (
    <section className="relative overflow-hidden bg-shell px-gutter py-24 md:py-32">
      <div className="relative mb-16 grid gap-6 md:grid-cols-2 md:items-end">
        <RevealLines lines={title} className="font-display-caps text-display-l" />
        {intro && <p className="max-w-md text-[1rem] leading-relaxed text-harbor/80 md:justify-self-end">{intro}</p>}
      </div>
      <div className="relative">
        <WavyPath className="inset-x-[-4%] top-[8%] hidden h-[50%] w-[108%] md:block" />
        <ol className={`relative grid gap-14 ${cols} md:gap-8`}>
          {items.map((it, i) => (
            <li key={it.title} className={offsets[i % offsets.length]}>
              <Reveal delay={i * 0.08}>
                <div className="relative w-[78%] max-w-[17rem]">
                  <div className="relative aspect-[5/4] overflow-hidden">
                    <Photo k={it.image} sizes="(min-width: 768px) 20vw, 80vw" />
                  </div>
                  <NumberBadge n={i + 1} className="absolute -right-3 -top-3" />
                </div>
                {it.eyebrow && <p className="eyebrow mt-5 text-harbor/60">{it.eyebrow}</p>}
                <h3 className="mt-3 font-display text-[1.375rem] uppercase leading-[1.02] tracking-[0.04em]">{it.title}</h3>
                <p className="mt-3 max-w-[19rem] text-[0.875rem] leading-relaxed text-harbor/75">{it.text}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
