import Link from 'next/link';
import { legalNav, mainNav } from '@/config/nav';
import { site } from '@/config/site';
import { testimonials } from '@/data/testimonials';
import { LiveClock } from './LiveClock';
import { Photo } from '@/components/shared/Photo';
import { ArrowLink } from '@/components/shared/Buttons';

/**
 * Kultiveret contact block as the site footer: "Get in touch", large email and phone,
 * "plan my season →", office hours, menu, live Lisbon clock, testimonial box, micro legal row.
 */
export function Footer() {
  const t = testimonials[1] ?? testimonials[0];
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
            {site.channels.phone && (
              <a href={site.contact.phoneHref} className="text-statement block transition-colors hover:text-terracotta">
                {site.contact.phone}
              </a>
            )}
            <ArrowLink href="/plan-my-season" large>
              plan my season
            </ArrowLink>
            {(site.channels.whatsapp || site.channels.instagram) && (
              <div className="mt-8 flex flex-wrap gap-x-12 gap-y-2 text-[0.9375rem]">
                {site.channels.whatsapp && (
                  <a href={site.contact.whatsappHref} target="_blank" rel="noopener noreferrer" className="hover:text-terracotta">
                    WhatsApp
                  </a>
                )}
                {site.channels.instagram && (
                  <a href={site.contact.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-terracotta">
                    Instagram
                  </a>
                )}
              </div>
            )}
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
              <p>{site.location.city}</p>
              <LiveClock className="mt-1 space-y-1" />
            </div>
          </div>
        </div>

        {t && (
          <figure className="flex flex-col bg-harbor p-2 text-shell">
            <blockquote className="relative px-8 pb-6 pt-5 text-[0.875rem] leading-snug">
              <span aria-hidden className="absolute left-2 top-4">“</span>
              {t.quote}
              <span aria-hidden className="absolute right-2 top-4">”</span>
            </blockquote>
            <figcaption className="px-8 pb-6 text-[0.75rem] text-shell/60">
              {t.name}, {t.stay} · Placeholder testimonial
            </figcaption>
            <div className="relative mt-auto aspect-[4/3] w-full">
              <Photo k={t.image} sizes="(min-width: 768px) 38vw, 100vw" />
            </div>
          </figure>
        )}
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
          <br />
          Photography: Unsplash (placeholders)
        </p>
      </div>
    </footer>
  );
}
