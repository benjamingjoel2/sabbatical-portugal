import { Photo } from './Photo';
import { GridLines } from './GridLines';
import { ShoreEdge } from '@/components/svg/ShoreEdge';
import type { ImageKey } from '@/data/images';
import { RevealLines, Reveal } from '@/components/motion/Reveal';

/** Flyward inner-page hero: grid lines, centred uppercase title, intro, wide photo with a shoreline edge. */
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
    <section className="relative overflow-hidden bg-shell pt-[calc(var(--header-h)+3rem)]">
      <GridLines />
      <div className="relative px-gutter text-center">
        {eyebrow && <p className="eyebrow mb-5 text-harbor/60">{eyebrow}</p>}
        <RevealLines as="h1" lines={title} className="font-display-caps text-display-xl mx-auto max-w-5xl" />
        {intro && (
          <Reveal delay={0.2} className="mx-auto mt-6 max-w-xl text-[1rem] leading-relaxed text-harbor/80">
            {intro}
          </Reveal>
        )}
        {children && <div className="mt-8 flex flex-wrap justify-center gap-2">{children}</div>}
      </div>
      <div className="relative mt-14 h-[62svh] min-h-[22rem]">
        <ShoreEdge position="top" fillClass="fill-shell" variant={1} />
        <Photo k={image} sizes="100vw" priority />
        <ShoreEdge fillClass="fill-shell" />
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
    <section className="bg-shell px-gutter pb-16 pt-[calc(var(--header-h)+3.5rem)] md:pb-24">
      {eyebrow && <p className="eyebrow mb-6 text-harbor/60">{eyebrow}</p>}
      <h1 className="tight-display max-w-6xl text-mega">{title}</h1>
      {children && <div className="mt-12 grid gap-8 md:ml-[33%] md:grid-cols-2 md:gap-10">{children}</div>}
    </section>
  );
}
