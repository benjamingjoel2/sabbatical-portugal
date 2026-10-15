import Link from 'next/link';
import { Photo } from '@/components/shared/Photo';
import type { ImageKey } from '@/data/images';

const cards: { title: string; text: string; href: string; image: ImageKey }[] = [
  {
    title: 'Solo & couples',
    text: 'Remote workers, career-breakers and creatives. A home with a real desk, a neighborhood that fits, and people to meet from week one.',
    href: '/plans',
    image: 'lisbonTram',
  },
  {
    title: 'Families',
    text: 'School-term and full-year stays with international school guidance, family-friendly towns and homes with room to grow.',
    href: '/families',
    image: 'familyBeach',
  },
];

/** Two large photos, each with a Kultiveret dark caption box. */
export function ServiceCards() {
  return (
    <section aria-label="Who we plan for" className="grid gap-1.5 bg-shell md:grid-cols-2">
      {cards.map((c) => (
        <Link key={c.href} href={c.href} className="group relative block h-[80vh] min-h-[30rem] overflow-hidden">
          <Photo k={c.image} sizes="(min-width: 768px) 50vw, 100vw" className="transition-transform duration-[1.4s] ease-harbor group-hover:scale-[1.04]" />
          <div className="absolute left-0 top-0 max-w-[26rem] bg-harbor p-5 text-shell md:p-6">
            <h3 className="tight-display text-[clamp(1.75rem,1.3rem+1.6vw,2.75rem)] leading-none">{c.title}</h3>
            <p className="mt-4 text-[0.9375rem] font-light leading-snug text-shell/85">{c.text}</p>
            <p className="mt-5 inline-flex items-center gap-2 border-b border-current pb-0.5 text-[0.875rem] text-azulejo-mist transition-colors group-hover:text-terracotta">
              explore <span aria-hidden>→</span>
            </p>
          </div>
        </Link>
      ))}
    </section>
  );
}
