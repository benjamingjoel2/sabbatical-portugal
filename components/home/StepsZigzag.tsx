import { t, tp } from '@/lib/i18n/t';
import { Photo } from '@/components/shared/Photo';
import { NumberBadge } from '@/components/shared/NumberBadge';
import { Reveal } from '@/components/motion/Reveal';
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
    text: 'Community dinners, a specialist who answers quickly, and small problems solved before they grow.',
    image: 'communityDinner',
  },
];

/** Kultiveret numbered list ("How to purchase"): boxed numbers, bold lead, a photo per step. */
export function StepsZigzag({ title = ['How we make', 'it easy'], steps = homeSteps }: { title?: [string, string]; steps?: Step[] }) {
  return (
    <section className="bg-shell px-gutter py-20 md:py-28" aria-labelledby="steps-title">
      <h2 id="steps-title" className="tight-display text-mega">
        {tp(title).join(' ')}
      </h2>
      <div className="mt-12 border-t border-line pt-3 md:ml-[25%]">
        <p className="eyebrow mb-8 text-harbor/55">{t("Before, during and after")}</p>
        <ol className="flex flex-col gap-10">
          {steps.map((s, i) => (
            <Reveal as="li" key={s.title} className="grid grid-cols-[2.5rem_1fr] gap-x-4 gap-y-4 md:grid-cols-[2.5rem_1fr_minmax(0,14rem)] md:gap-x-8">
              <NumberBadge n={i + 1} className="mt-1" />
              <div>
                <h3 className="text-[clamp(1.375rem,1.1rem+1vw,2rem)] leading-tight tracking-[-0.02em]">{tp(s.title)}</h3>
                <p className="mt-2 max-w-md text-[1rem] leading-relaxed text-harbor/75">{tp(s.text)}</p>
              </div>
              <div className="relative col-start-2 aspect-[4/3] w-full max-w-[14rem] overflow-hidden md:col-start-3">
                <Photo k={s.image} sizes="14rem" />
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
