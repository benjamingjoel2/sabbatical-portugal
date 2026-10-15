import Link from 'next/link';
import { legalNav, mainNav } from '@/config/nav';
import { site } from '@/config/site';
import { LiveClock } from './LiveClock';
import { Photo } from '@/components/shared/Photo';

/** Flyward-style footer: photo, Menu / Socials / Location (live Lisbon clock), registration, giant wordmark. */
export function Footer() {
  return (
    <footer className="relative isolate overflow-hidden bg-harbor-deep text-shell">
      <div className="absolute inset-0 -z-10">
        <Photo k="portoBridgeNight" sizes="100vw" className="opacity-55" />
        <div className="absolute inset-0 bg-gradient-to-b from-harbor-deep/40 via-harbor-deep/55 to-harbor-deep/90" />
      </div>

      <div className="px-gutter pt-[clamp(8rem,22vw,18rem)]">
        <p className="font-display text-[clamp(1.75rem,1.2rem+2vw,3rem)] uppercase leading-none tracking-[0.02em]">
          {site.signOff}
        </p>

        <div className="mt-12 grid grid-cols-2 gap-10 md:grid-cols-[repeat(3,minmax(0,12rem))_1fr]">
          <div>
            <h2 className="eyebrow mb-5 tracking-[0.18em]">Menu</h2>
            <ul className="space-y-2.5 text-[1rem]">
              {mainNav.map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className="transition-opacity hover:opacity-60">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="eyebrow mb-5 tracking-[0.18em]">Socials</h2>
            <ul className="space-y-2.5 text-[1rem]">
              <li>
                <a href={site.contact.instagram} target="_blank" rel="noopener noreferrer" className="hover:opacity-60">
                  Instagram
                </a>
              </li>
              <li>
                <a href={site.contact.whatsappHref} target="_blank" rel="noopener noreferrer" className="hover:opacity-60">
                  WhatsApp
                </a>
              </li>
              <li>
                <a href={`mailto:${site.contact.email}`} className="hover:opacity-60">
                  Email
                </a>
              </li>
            </ul>
          </div>
          <div className="col-span-2 md:col-span-1">
            <h2 className="eyebrow mb-5 tracking-[0.18em]">Location</h2>
            <div className="space-y-2.5 text-[1rem]">
              <p>{site.location.city}</p>
              <LiveClock className="space-y-2.5" />
            </div>
          </div>
          <div className="col-span-2 self-end text-[0.75rem] leading-relaxed text-shell/80 md:col-span-1 md:text-right">
            <p>{site.company.legalName}</p>
            <p>{site.company.registration}</p>
            <p>{site.company.travelLicence}</p>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-shell/15 py-5 text-[0.75rem] md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {site.company.legalName}. All rights reserved.
          </p>
          <p className="text-shell/70">{site.tagline}</p>
          <ul className="flex gap-4">
            {legalNav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="hover:opacity-60">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p
        aria-hidden
        className="pointer-events-none -mb-[0.2em] select-none whitespace-nowrap text-center font-display text-[15.4vw] uppercase leading-[0.82] tracking-[0.04em]"
      >
        Porto Season
      </p>
    </footer>
  );
}
