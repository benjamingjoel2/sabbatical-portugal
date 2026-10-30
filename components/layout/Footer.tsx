import Link from 'next/link';
import { legalNav, mainNav } from '@/config/nav';
import { site } from '@/config/site';
import { LiveClock } from './LiveClock';
import { Photo } from '@/components/shared/Photo';
import { ArrowLink } from '@/components/shared/Buttons';

/**
 * Kultiveret contact block as the site footer: "Get in touch", large email,
 * "plan my season →", office hours, menu, address and live Lisbon clock, a photo panel, micro legal row.
 */
export function Footer() {
  return (
    <footer className="border-t border-line bg-shell text-harbor" aria-labelledby="footer-title">
      <div className="grid md:grid-cols-[1.6fr_1fr]">
        <div className="flex flex-col gap-14 px-gutter pb-8 pt-8 md:min-h-[36rem]">
          <h2 id="footer-title" className="text-[1.125rem]">
            Get in touch
          </h2>
          <div className="mt-auto">
            <a href={`mailto:${site.contact.email}`} className="text-statement block break-all transition-colors hover:text-terracotta">
              {site.contact.email}
            </a>
            <ArrowLink href="/plan-my-season" large>
              plan my season
            </ArrowLink>
          </div>
          <div className="grid gap-8 text-[0.8125rem] sm:grid-cols-3">
            <nav aria-label="Footer">
              <p className="eyebrow mb-2 text-harbor/55">Menu</p>
              <ul className="space-y-1">
                {mainNav.map((n) => (
                  <li key={n.href}>
                    <Link href={n.href} className="hover:text-terracotta">
                      {n.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div>
              <p className="eyebrow mb-2 text-harbor/55">Office hours · Lisbon time</p>
              <ul className="space-y-1">
                {site.officeHours.map((h) => (
                  <li key={h.days}>
                    {h.days}: {h.hours}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="eyebrow mb-2 text-harbor/55">Location</p>
              <p>{site.location.address}</p>
              <LiveClock className="mt-1 space-y-1" />
            </div>
          </div>
        </div>

        <div className="relative min-h-[18rem] bg-harbor md:min-h-0">
          <Photo k="friendsView" sizes="(min-width: 768px) 38vw, 100vw" />
        </div>
      </div>

      <div className="px-gutter pb-6 pt-10">
        <p className="tight-display text-[clamp(2.5rem,1rem+6vw,6rem)] leading-[0.9]">{site.signOff}</p>
      </div>

      <div className="grid gap-4 border-t border-line px-gutter py-4 text-[0.6875rem] uppercase leading-snug md:grid-cols-3">
        <p>
          {site.name}
          <br />
          {site.location.city}
        </p>
        <p>
          {legalNav.map((n, i) => (
            <span key={n.href}>
              <Link href={n.href} className="hover:text-terracotta">
                {n.label}
              </Link>
              {i < legalNav.length - 1 ? ' · ' : ''}
            </span>
          ))}
          <br />
          {site.name} © {new Date().getFullYear()}
        </p>
        <p className="md:text-right">
          {site.tagline}
        </p>
      </div>
    </footer>
  );
}
