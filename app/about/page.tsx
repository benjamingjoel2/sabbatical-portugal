import type { Metadata } from 'next';
import { people } from '@/data/people';
import { testimonials } from '@/data/testimonials';
import { site } from '@/config/site';
import { Photo } from '@/components/shared/Photo';
import { PlaceholderFlag } from '@/components/shared/PlaceholderFlag';
import { ContactBlock } from '@/components/layout/ContactBlock';
import { PeopleMarquee } from '@/components/home/StatsPeople';
import { Reveal } from '@/components/motion/Reveal';
import { RotatingWord } from '@/components/motion/RotatingWord';
import { Parallax } from '@/components/motion/Parallax';
import { pageMeta } from '@/lib/seo';

export const metadata: Metadata = pageMeta({
  title: 'About Porto Season',
  description: `What “porto” means, who will plan your season, and the people we trust across Portugal. ${site.promise}`,
  path: '/about',
});

const timeline = [
  { year: '[2009]', text: 'Moves to Lisbon for a six-month contract. Stays.' },
  { year: '[2013]', text: 'Relocation coordinator for international families.' },
  { year: '[2017]', text: 'Learns every corner of the coast, from Ericeira to Sagres.' },
  { year: '[2021]', text: 'Helps the first remote workers settle for a season.' },
  { year: '[2025]', text: 'Founds Porto Season.' },
];

export default function AboutPage() {
  const t = testimonials[0];
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
        <Parallax distance={30} className="relative aspect-[16/10] overflow-hidden md:aspect-auto md:min-h-[34rem]">
          <div className="relative h-[115%] w-full">
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

      {/* B5: Meet your specialist */}
      <section className="relative bg-azulejo-mist px-gutter pb-8 pt-16 md:pt-20" aria-labelledby="specialist-title">
        <div className="grid gap-10 md:grid-cols-[1fr_1fr_1.2fr]">
          <div className="md:col-span-3 md:ml-[40%]">
            <p className="eyebrow text-harbor/60" id="specialist-title">
              Meet your specialist
            </p>
            <blockquote className="mt-4 text-[clamp(1.375rem,1.1rem+1.1vw,2.25rem)] leading-[1.15] tracking-[-0.02em]">
              “A season should feel like coming home somewhere new. My job is to make the first week easy, so the next ten can be
              wonderful.”
            </blockquote>
            <p className="mt-3 text-[0.8125rem] text-harbor/70">
              [Specialist name], founder and season specialist · <PlaceholderFlag label="Placeholder bio" />
            </p>
          </div>

          <ol className="relative order-3 space-y-6 border-l border-harbor/30 pl-5 text-[0.75rem] md:order-none md:mt-24" aria-label="Career timeline">
            {timeline.map((t) => (
              <li key={t.year} className="relative">
                <span aria-hidden className="absolute -left-[1.4rem] top-1 h-px w-3 bg-harbor/50" />
                <p className="font-medium tabular-nums">{t.year}</p>
                <p className="mt-0.5 max-w-[12rem] text-harbor/75">{t.text}</p>
              </li>
            ))}
          </ol>

          <div className="relative mx-auto w-[min(20rem,80%)] md:mt-40">
            <div className="relative aspect-[4/3] overflow-hidden">
              <Photo k="specialist" sizes="20rem" />
            </div>
            <div className="absolute -bottom-8 -left-10 aspect-square w-24 overflow-hidden rounded-full border-4 border-azulejo-mist">
              <Photo k="pottery" sizes="6rem" />
            </div>
          </div>

          <Reveal className="space-y-4 text-[0.9375rem] leading-relaxed md:mt-24">
            <p>
              [Placeholder bio.] Our founder came to Lisbon for six months and never left. Fifteen years of helping people move here,
              first families relocating for work, then remote workers and career-breakers, became the idea behind Porto Season.
            </p>
            <p>
              Fluent in Portuguese and English, and with a habit of knowing the best bakery near any address in the country, our
              founder now plans every season personally, with a small team and a wide circle of trusted local partners.
            </p>
            <p>When you plan with us, you’ll have one person who knows your plans, your dates and your name, from first call to last week.</p>
          </Reveal>
        </div>
        <div className="mt-20">
          <p className="eyebrow mb-3 text-harbor/60">Our people in Portugal</p>
          <PeopleMarquee />
        </div>
      </section>

      {/* People grid */}
      <section className="bg-shell px-gutter py-24" aria-labelledby="people-title">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <h2 id="people-title" className="font-display-caps text-display-l">
            Our people
            <span className="block">in Portugal</span>
          </h2>
          <div className="max-w-sm text-[0.875rem] text-harbor/70">
            <PlaceholderFlag label="Placeholder people" />
            <p className="mt-2">
              Hosts, teachers, coaches, lawyers and makers. Names and photos are placeholders until partner agreements are signed.
            </p>
          </div>
        </div>
        <ul className="grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
          {people.map((p, i) => (
            <Reveal as="li" key={p.slug} delay={(i % 4) * 0.06}>
              <div className="relative aspect-[3/4] overflow-hidden">
                <Photo k={p.image} sizes="(min-width: 1024px) 24vw, 50vw" className="grayscale-[25%]" />
              </div>
              <h3 className="mt-4 text-[1.0625rem] uppercase tracking-[0.02em]">{p.name}</h3>
              <p className="text-[0.8125rem] text-harbor/70">
                {p.role} · {p.town}
              </p>
              <p className="mt-2 text-[0.875rem] leading-relaxed text-harbor/80">{p.bio}</p>
            </Reveal>
          ))}
        </ul>
      </section>

      {/* B6: portrait + testimonial box */}
      {t && (
        <section className="relative isolate min-h-[90vh] overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <Photo k="friendsView" sizes="100vw" />
          </div>
          <figure className="absolute bottom-0 right-0 w-full max-w-md bg-harbor p-6 text-shell md:w-[40%]">
            <blockquote className="text-[0.9375rem] leading-snug">“{t.quote}”</blockquote>
            <figcaption className="mt-4 text-[0.75rem] text-shell/60">
              {t.name}, {t.stay} · Placeholder testimonial
            </figcaption>
          </figure>
        </section>
      )}

      <ContactBlock withTestimonial={false} />
    </>
  );
}
