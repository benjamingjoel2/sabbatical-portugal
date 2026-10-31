import { tp } from '@/lib/i18n/t';
import type { ImageKey } from '@/data/images';
import { Photo } from './Photo';
import { Reveal } from '@/components/motion/Reveal';

export interface TrioItem {
  title: string;
  text: string;
  image: ImageKey;
  eyebrow?: string;
}

/** Kultiveret numbered image grid: photos with lowercase labels and superscript numbers. */
export function WavyTrio({ title, items, intro }: { title: string[]; items: TrioItem[]; intro?: string }) {
  const cols = items.length >= 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3';
  return (
    <section className="bg-shell px-gutter py-20 md:py-28">
      <div className="mb-12 grid gap-6 md:grid-cols-2 md:items-end">
        <h2 className="tight-display text-mega">{tp(title).join(' ')}</h2>
        {intro && <p className="max-w-md text-[1.0625rem] leading-relaxed text-harbor/75 md:justify-self-end">{tp(intro)}</p>}
      </div>
      <ol className={`grid gap-x-6 gap-y-12 sm:grid-cols-2 ${cols}`}>
        {items.map((it, i) => (
          <Reveal as="li" key={it.title} delay={i * 0.06}>
            <div className="relative aspect-[4/5] overflow-hidden">
              <Photo k={it.image} sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" />
            </div>
            {it.eyebrow && <p className="eyebrow mt-4 text-harbor/55">{tp(it.eyebrow)}</p>}
            <h3 className="mt-3 text-[1.375rem] leading-tight tracking-[-0.02em]">
              {tp(it.title)}
              <sup className="ml-1 text-[0.6rem] font-medium">{tp(String(i + 1).padStart(2, '0'))}</sup>
            </h3>
            <p className="mt-2 max-w-[22rem] text-[0.9375rem] leading-relaxed text-harbor/75">{tp(it.text)}</p>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}
