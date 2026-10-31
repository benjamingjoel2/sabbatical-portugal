import { t, tp } from '@/lib/i18n/t';
import Link from '@/components/i18n/Link';
import type { ImageKey } from '@/data/images';
import { Photo } from './Photo';
import { ArrowRight } from '@/components/svg/Icons';

/**
 * Kultiveret booking block: blurred photo, a dark card with a sharp photo strip,
 * a short line and a light footer bar ("Shall we begin? →").
 */
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
    <section className="relative isolate overflow-hidden px-gutter py-20 md:py-28">
      <div className="absolute inset-0 -z-10">
        <Photo k={image} sizes="100vw" className="scale-110 blur-md" />
        <div className="absolute inset-0 bg-harbor-deep/30" />
      </div>
      <div className="mx-auto w-full max-w-[26rem] bg-harbor text-shell shadow-2xl shadow-harbor-deep/30">
        <div className="relative m-2 aspect-[16/9] overflow-hidden">
          <Photo k={image} sizes="26rem" />
        </div>
        <div className="px-5 pb-8 pt-4">
          <h2 className="tight-display text-[clamp(1.75rem,1.4rem+1.2vw,2.25rem)] leading-[1]">{tp(lines).join(' ')}</h2>
          <p className="mt-3 text-[0.875rem] font-light leading-snug text-shell/80">
            {t("Tell us when, where and who. Your specialist replies within one working day, Lisbon time.")}</p>
        </div>
        <Link href={href} className="group flex h-14 items-center justify-between bg-shell px-5 text-[1rem] font-medium text-harbor transition-colors hover:bg-terracotta hover:text-shell">
          {tp(label)}
          <ArrowRight className="h-3 w-7 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  );
}
