import type { ImageKey } from '@/data/images';
import { Photo } from './Photo';
import { NumberBadge } from './NumberBadge';
import { Reveal } from '@/components/motion/Reveal';

export interface StackStep {
  title: string;
  image: ImageKey;
  features: { lead: string; text: string }[];
}

/** Kultiveret-style list: each group is a limestone row with a boxed number, an image and its features. */
export function FeatureStack({ title, steps }: { title: string[]; steps: StackStep[] }) {
  return (
    <section className="bg-shell px-gutter py-20 md:py-28">
      <h2 className="tight-display mb-12 text-mega">{title.join(' ')}</h2>
      <ol className="flex flex-col gap-1.5">
        {steps.map((s, i) => (
          <Reveal as="li" key={s.title} className="grid gap-8 bg-limestone/60 p-4 md:grid-cols-[minmax(0,18rem)_1fr] md:gap-12 md:p-5">
            <div className="relative aspect-[4/3] overflow-hidden md:aspect-[4/5]">
              <Photo k={s.image} sizes="(min-width: 768px) 18rem, 100vw" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-baseline gap-4">
                <NumberBadge n={i + 1} />
                <h3 className="text-[clamp(1.5rem,1.1rem+1.4vw,2.5rem)] leading-[1.05] tracking-[-0.02em]">{s.title}</h3>
              </div>
              <ul className="mt-8 grid gap-x-10 gap-y-5 sm:grid-cols-2 md:mt-auto">
                {s.features.map((f) => (
                  <li key={f.lead} className="text-[0.9375rem] leading-relaxed">
                    <span className="font-medium">{f.lead}.</span> <span className="text-harbor/70">{f.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}
