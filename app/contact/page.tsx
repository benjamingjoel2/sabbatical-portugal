import type { Metadata } from 'next';
import { site } from '@/config/site';
import { Photo } from '@/components/shared/Photo';
import { ContactForm } from '@/components/shared/ContactForm';
import { GridLines } from '@/components/shared/GridLines';
import { PortugalLineMap } from '@/components/svg/PortugalLineMap';
import { MAINLAND_PINS } from '@/components/svg/paths';
import { pageMeta } from '@/lib/seo';

export const metadata: Metadata = pageMeta({
  title: 'Contact',
  description: `Talk to a Porto Season specialist. Office hours in Lisbon time, WhatsApp, email and phone. ${site.tagline}`,
  path: '/contact',
});

/** Flyward /contact: photo background, translucent info panel, 3-column form, "Find us here". */
export default function ContactPage() {
  const lisbon = MAINLAND_PINS.lisbon;
  return (
    <>
      <section className="relative isolate overflow-hidden px-gutter pb-24 pt-[calc(var(--header-h)+3rem)]">
        <div className="absolute inset-0 -z-10">
          <Photo k="portoGoldenHour" sizes="100vw" priority />
          <div className="absolute inset-0 bg-harbor-deep/25" />
        </div>
        <GridLines light />
        <div className="relative grid gap-1.5 lg:grid-cols-[1fr_1.35fr]">
          <div className="flex flex-col justify-between gap-12 bg-harbor/75 p-6 text-shell backdrop-blur-md md:p-8">
            <div>
              <h1 className="font-display-caps text-display-m">
                <span className="block">Let’s plan</span>
                <span className="block">your season</span>
              </h1>
              <div className="mt-10 grid gap-8 sm:grid-cols-2">
                <div>
                  <h2 className="font-display text-[1.125rem] uppercase leading-tight tracking-[0.04em]">Office hours</h2>
                  <ul className="mt-3 space-y-1 text-[0.875rem] text-shell/85">
                    {site.officeHours.map((h) => (
                      <li key={h.days}>
                        {h.days}: {h.hours}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-2 text-[0.75rem] text-shell/60">{site.officeHoursNote}</p>
                </div>
                <div>
                  <h2 className="font-display text-[1.125rem] uppercase leading-tight tracking-[0.04em]">Guests in season</h2>
                  <p className="mt-3 text-[0.875rem] text-shell/85">
                    Already with us? Message your specialist on WhatsApp any time. Urgent issues are answered seven days a week.
                  </p>
                </div>
              </div>
            </div>
            <div className="grid gap-8 text-[0.875rem] sm:grid-cols-3">
              <div>
                <h2 className="eyebrow mb-3 tracking-[0.16em]">Contact</h2>
                <ul className="space-y-1.5 text-shell/80">
                  <li>
                    <a href={`mailto:${site.contact.email}`} className="break-all hover:text-shell">
                      {site.contact.email}
                    </a>
                  </li>
                  <li>
                    <a href={site.contact.phoneHref} className="hover:text-shell">
                      {site.contact.phone}
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h2 className="eyebrow mb-3 tracking-[0.16em]">Chat</h2>
                <ul className="space-y-1.5 text-shell/80">
                  <li>
                    <a href={site.contact.whatsappHref} target="_blank" rel="noopener noreferrer" className="hover:text-shell">
                      WhatsApp
                    </a>
                  </li>
                  <li>
                    <a href={site.contact.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-shell">
                      Instagram DM
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h2 className="eyebrow mb-3 tracking-[0.16em]">Socials</h2>
                <ul className="space-y-1.5 text-shell/80">
                  <li>
                    <a href={site.contact.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-shell">
                      {site.contact.instagramHandle}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <ContactForm />
        </div>

        <div className="relative mt-1.5 grid gap-1.5 bg-harbor/75 p-6 text-shell backdrop-blur-md md:grid-cols-[auto_1fr] md:items-center md:p-8">
          <div className="relative mx-auto h-56 w-56">
            <PortugalLineMap className="h-full w-full text-shell/50" />
            <svg viewBox="0 0 520 540" className="absolute inset-0 h-full w-full" aria-hidden>
              <circle cx={240 + lisbon.x} cy={10 + lisbon.y} r="10" className="fill-terracotta/30" />
              <circle cx={240 + lisbon.x} cy={10 + lisbon.y} r="4" className="fill-terracotta" />
            </svg>
          </div>
          <div className="md:pl-8">
            <h2 className="eyebrow tracking-[0.16em]">Find us here</h2>
            <p className="mt-3 font-display text-[1.75rem] uppercase leading-none tracking-[0.03em]">{site.location.city}</p>
            <p className="mt-3 text-[0.875rem] text-shell/80">{site.location.address}</p>
            <p className="mt-1 text-[0.875rem] text-shell/60">Visits by appointment. We plan seasons all over Portugal, from Lisbon.</p>
          </div>
        </div>
      </section>
    </>
  );
}
