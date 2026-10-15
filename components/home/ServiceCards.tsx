import Link from 'next/link';
import { Photo } from '@/components/shared/Photo';
import { ArrowUpRight } from '@/components/svg/Icons';
import { ShoreEdge } from '@/components/svg/ShoreEdge';
import { Parallax } from '@/components/motion/Parallax';
import type { ImageKey } from '@/data/images';

const cards: { title: [string, string]; text: string; href: string; image: ImageKey }[] = [
  {
    title: ['Solo', '& couples'],
    text: 'Remote workers, career-breakers and creatives. A home with a real desk, a neighborhood that fits, and people to meet from week one.',
    href: '/plans',
    image: 'lisbonTram',
  },
  {
    title: ['Families', ''],
    text: 'School-term and full-year stays with international school guidance, family-friendly towns and homes with room to grow.',
    href: '/families',
    image: 'familyBeach',
  },
];

/** Flyward A4: two tall image cards edge to edge. */
export function ServiceCards() {
  return (
    <section aria-label="Who we plan for" className="relative -mt-px bg-harbor-deep">
      <div className="grid gap-1.5 md:grid-cols-2">
        {cards.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className="group relative block h-[88vh] min-h-[32rem] overflow-hidden text-shell md:h-[100vh]"
          >
            <Parallax distance={50} className="absolute inset-[-8%_0]">
              <div className="relative h-full w-full transition-transform duration-[1.4s] ease-[var(--ease-harbor)] group-hover:scale-[1.05]">
                <Photo k={c.image} sizes="(min-width: 768px) 50vw, 100vw" />
              </div>
            </Parallax>
            <div className="absolute inset-0 bg-gradient-to-t from-harbor-deep/80 via-harbor-deep/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 grid gap-4 p-5 md:grid-cols-[1fr_minmax(0,15rem)] md:items-end md:p-8">
              <div>
                <span className="nav-caps inline-flex h-6 items-center gap-1.5 rounded-full border border-shell/80 px-2.5 text-[0.5625rem] transition-colors group-hover:bg-shell group-hover:text-harbor">
                  Explore <ArrowUpRight className="h-2 w-2" />
                </span>
                <h3 className="font-display-caps text-display-m mt-3">
                  <span className="block">{c.title[0]}</span>
                  {c.title[1] && <span className="block">{c.title[1]}</span>}
                </h3>
              </div>
              <p className="text-[0.875rem] leading-snug text-shell/90">{c.text}</p>
            </div>
          </Link>
        ))}
      </div>
      <ShoreEdge fillClass="fill-shell" variant={1} />
    </section>
  );
}
