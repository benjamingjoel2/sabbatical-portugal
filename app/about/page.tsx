import type { Metadata } from 'next';
import { site } from '@/config/site';
import { Photo } from '@/components/shared/Photo';
import { Reveal } from '@/components/motion/Reveal';
import { RotatingWord } from '@/components/motion/RotatingWord';
import { Parallax } from '@/components/motion/Parallax';
import { pageMeta } from '@/lib/seo';

export const metadata: Metadata = pageMeta({
  title: 'About Porto Season',
  description: `What “porto” means and how we plan a season anywhere in Portugal. ${site.promise}`,
  path: '/about',
});

export default function AboutPage() {
  return (
    <>
      {/* B2/B3: logo-scale title, rotating line, statement */}
      <section className="bg-shell px-gutter pb-16 pt-[calc(var(--header-h)+2rem)]">
        <h1 className="tight-display text-[clamp(3.5rem,1.5rem+9vw,10rem)] leading-[0.8]">Porto Season</h1>
        <p className="tight-display mt-4 text-[clamp(1.75rem,1.2rem+2.5vw,3.5rem)] text-harbor/45">
          — your harbor for{' '}
          <RotatingWord words={['a season', 'a year', 'a summer', 'a school term']} className="text-azulejo" srPrefix="your harbor for " />
        </p>
        <Reveal className="mt-20 md:mt-28">
          <p className="text-statement indent-[clamp(3rem,30vw,28rem)]">
            Porto Season plans long stays in Portugal: one to twelve months of living, working and slowing down in the country’s
            best towns, cities, coastlines and islands. We handle the hard parts so you can stay long enough to have a favorite
            café, a local market, and neighbors who know your name.
          </p>
        </Reveal>
      </section>

      <section className="grid gap-6 bg-shell pb-20 md:grid-cols-[2fr_1fr]">
        <Parallax distance={30} className="relative aspect-[16/10] overflow-hidden md:aspect-auto md:h-[34rem]">
          <div className="absolute inset-x-0 -top-[8%] h-[116%]">
            <Photo k="lisbonRooftopsSea" sizes="66vw" />
          </div>
        </Parallax>
        <Reveal className="space-y-4 px-gutter text-[0.9375rem] leading-relaxed md:pl-0 md:pr-[var(--gutter)]">
          <p>
            Most travel companies are built for a week. We’re built for a season. That changes everything: the home has to work
            on a Tuesday in February, the desk has to survive a long call, and someone has to know which pharmacy is open on
            Sunday.
          </p>
          <p>
            One specialist plans your season end to end, from the first call to the day you leave, with partner lawyers for visas,
            vetted homes, workspaces, and a community waiting when you land.
          </p>
          <p>We work across all of Portugal: not only Porto, but Lisbon, the coast, the Alentejo, the Douro, Madeira and the Azores.</p>
        </Reveal>
      </section>

      {/* B4: meaning of the name */}
      <section className="relative isolate min-h-[90vh] overflow-hidden" aria-labelledby="meaning-title">
        <div className="absolute inset-0 -z-10">
          <Photo k="portoRibeira" sizes="100vw" />
        </div>
        <Reveal className="max-w-3xl bg-harbor p-6 text-shell md:p-8">
          <h2 id="meaning-title" className="text-[clamp(1.375rem,1.1rem+1vw,2rem)] leading-[1.15] tracking-[-0.02em]">
            Porto — <em className="not-italic text-terracotta">“port”, “harbor”</em> — the place you sail into, drop anchor, and
            stay a while.
          </h2>
          <p className="mt-5 max-w-xl text-[0.9375rem] font-light leading-relaxed text-shell/85">
            It’s also the city that gave the country its name: the Roman harbor of Portus Cale became Portugal. We chose it
            because that’s what we want to be for you: a safe harbor in a new country, for a season or a year. Not just in Porto,
            but anywhere in Portugal you choose to drop anchor.
          </p>
        </Reveal>
      </section>

    </>
  );
}
