import { Photo } from './Photo';
import type { ImageKey } from '@/data/images';
import { Reveal } from '@/components/motion/Reveal';

/** Kultiveret inner-page opening: huge tight title, offset intro column, then a wide photo. */
export function PageHero({
  eyebrow,
  title,
  intro,
  image,
  children,
}: {
  eyebrow?: string;
  title: string[];
  intro?: React.ReactNode;
  image: ImageKey;
  children?: React.ReactNode;
}) {
  return (
    <section className="bg-shell pt-[calc(var(--header-h)+2.5rem)]">
      <div className="px-gutter">
        {eyebrow && <p className="eyebrow mb-5 text-harbor/60">{eyebrow}</p>}
        <h1 className="tight-display max-w-6xl text-mega">{title.join(' ')}</h1>
        {(intro || children) && (
          <Reveal className="mt-10 max-w-md text-[1.0625rem] leading-relaxed text-harbor/80 md:ml-[50%]">
            {intro && <div>{intro}</div>}
            {children && <div className="mt-6 flex flex-wrap gap-2">{children}</div>}
          </Reveal>
        )}
      </div>
      <div className="relative mt-14 aspect-[4/3] w-full sm:aspect-[16/9] lg:aspect-[21/9]">
        <Photo k={image} sizes="100vw" priority />
      </div>
    </section>
  );
}

/** Kultiveret inner-page title: huge tight grotesk heading with editorial columns. */
export function EditorialHero({
  title,
  eyebrow,
  children,
}: {
  title: string;
  eyebrow?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="bg-shell px-gutter pb-16 pt-[calc(var(--header-h)+2.5rem)] md:pb-24">
      {eyebrow && <p className="eyebrow mb-6 text-harbor/60">{eyebrow}</p>}
      <h1 className="tight-display max-w-6xl text-mega">{title}</h1>
      {children && <div className="mt-12 grid gap-8 text-harbor/75 md:ml-[33%] md:grid-cols-2 md:gap-10">{children}</div>}
    </section>
  );
}
