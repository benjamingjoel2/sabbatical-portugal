import { t, tp } from '@/lib/i18n/t';
import Image from 'next/image';
import Link from '@/components/i18n/Link';
import { Photo } from '@/components/shared/Photo';
import { Pill } from '@/components/shared/Buttons';
import { RotatingWord } from '@/components/motion/RotatingWord';
import { destinations } from '@/data/destinations';
import type { ImageKey } from '@/data/images';

const heroSrc = '/images/hero-lisbon-rooftops.webp';
const heroAlt = 'Terracotta rooftops of Lisbon stepping down to the Tagus, with a white church tower';
const rotating = ['living', 'working', 'slowing down', 'belonging'];

const name = (slug: string) => tp(destinations.find((d) => d.slug === slug)?.shortName ?? '');

const tiles: { slug: string; k?: ImageKey }[] = [{ slug: 'lisbon' }, { slug: 'porto', k: 'portoGoldenHour' }, { slug: 'ericeira', k: 'surfWave' }];

/**
 * Home hero (H3 mosaic): left-aligned headline and lead beside three photos of different places.
 * Server-rendered; the first tile (Lisbon rooftops) is the preloaded LCP image. No map, by owner rule.
 */
export function HeroMosaic() {
  return (
    <>
      <section id="hero" className="bg-shell px-gutter pb-14 pt-[calc(var(--header-h)+2rem)] md:pb-20 lg:pt-[calc(var(--header-h)+3rem)]">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-end lg:gap-14">
          <div className="max-w-[34rem]">
            <h1 className="hero-caps text-display-xl lg:text-[clamp(2.75rem,4.2vw,5rem)]">
              <span className="block">{t("Your harbor")}</span>
              <span className="block">{t("in Portugal")}</span>
            </h1>
            <p className="tight-display mt-6 text-[clamp(1.4rem,1rem+1.2vw,2.1rem)] leading-[1.05] tracking-[-0.04em]">
              <span className="text-harbor/60">{t("— a season of ")}</span>
              <RotatingWord words={rotating} className="text-azulejo" srPrefix={t("a season of ")} />
              <span className="block text-harbor/60">{t("in Portugal")}</span>
            </p>
            <p className="mt-6 max-w-[28rem] text-[0.9375rem] leading-relaxed text-harbor/80">
              {t("One to twelve months in Portugal’s best cities, coastlines, countryside and islands. Your home, workspace, visa guidance and community, planned end to end by one specialist.")}
            </p>
            <div className="mt-8">
              <Pill href="/plan-my-season" tone="dark">
                {t("Plan my season")}
              </Pill>
            </div>
          </div>

          <ul className="grid h-[min(105vw,480px)] grid-cols-2 grid-rows-2 gap-2 md:gap-3 lg:h-[min(72svh,660px)]">
            {tiles.map((tile, i) => (
              <li key={tile.slug} className={i === 0 ? 'row-span-2' : undefined}>
                <Link href={`/destinations/${tile.slug}`} className="group relative block h-full overflow-hidden bg-limestone">
                  {tile.k ? (
                    <Photo k={tile.k} sizes="(min-width: 1024px) 28vw, 50vw" className="transition-transform duration-700 group-hover:scale-[1.03]" />
                  ) : (
                    <Image src={heroSrc} alt={tp(heroAlt)} fill priority sizes="(min-width: 1024px) 30vw, 50vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
                  )}
                  <span aria-hidden className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-harbor-deep/70 to-transparent" />
                  <span className="absolute bottom-3 left-3 text-[0.9375rem] font-medium text-shell md:bottom-4 md:left-4">{name(tile.slug)}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="intro" className="relative bg-harbor-deep px-gutter py-24 md:py-32">
        <div className="absolute inset-0">
          <Photo k="portoGoldenHour" sizes="100vw" className="opacity-40" />
        </div>
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-harbor-deep/90 via-harbor-deep/60 to-harbor-deep/40" />
        <div className="relative grid gap-8 text-shell md:grid-cols-2">
          <h2 className="hero-caps text-display-xl">
            <span className="block">{t("We make a big move")}</span>
            <span className="block">{t("feel simple")}</span>
          </h2>
          <div className="max-w-[26rem] space-y-4 self-end text-[0.9375rem] leading-relaxed md:justify-self-end">
            <p className="font-medium">{t("We don’t just find you a rental.")}</p>
            <p>
              {t("We handle the whole move: before you leave, the week you land, and every month after. The right town, a home that works, a desk, the paperwork, and people to share a table with.")}
            </p>
            <p>{t("From Lisbon’s hills to an Azorean crater lake, Porto Season is your harbor for the length of your stay.")}</p>
          </div>
        </div>
      </section>
    </>
  );
}
