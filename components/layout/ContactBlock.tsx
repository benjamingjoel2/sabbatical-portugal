import { site } from '@/config/site';
import { ArrowLink } from '@/components/shared/Buttons';
import { Photo } from '@/components/shared/Photo';
import { testimonials } from '@/data/testimonials';

/** Kultiveret-style contact block: "Get in touch", big email + phone, plan link, office hours. */
export function ContactBlock({ withTestimonial = true }: { withTestimonial?: boolean }) {
  const t = testimonials[1] ?? testimonials[0];
  return (
    <section aria-labelledby="contact-block-title" className="grid border-t border-line md:grid-cols-[1.6fr_1fr]">
      <div className="flex flex-col justify-between gap-16 px-gutter py-10 md:min-h-[32rem]">
        <h2 id="contact-block-title" className="text-lg">
          Get in touch
        </h2>
        <div>
          <a href={`mailto:${site.contact.email}`} className="text-statement block break-all transition-colors hover:text-terracotta">
            {site.contact.email}
          </a>
          <a href={site.contact.phoneHref} className="text-statement block transition-colors hover:text-terracotta">
            {site.contact.phone}
          </a>
          <ArrowLink href="/plan-my-season" large className="mt-1">
            plan my season
          </ArrowLink>
          <div className="mt-8 flex flex-wrap gap-x-12 gap-y-2 text-[0.9375rem]">
            <a href={site.contact.whatsappHref} target="_blank" rel="noopener noreferrer" className="hover:text-terracotta">
              WhatsApp
            </a>
            <a href={site.contact.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-terracotta">
              Instagram
            </a>
          </div>
        </div>
        <div className="grid gap-6 text-[0.8125rem] sm:grid-cols-2">
          <div>
            <p className="eyebrow mb-2 text-harbor/60">Office hours</p>
            <ul>
              {site.officeHours.map((h) => (
                <li key={h.days}>
                  {h.days}: {h.hours}
                </li>
              ))}
            </ul>
            <p className="mt-1 text-harbor/60">{site.officeHoursNote}</p>
          </div>
          <div>
            <p className="eyebrow mb-2 text-harbor/60">Studio</p>
            <p>{site.location.address}</p>
          </div>
        </div>
      </div>
      {withTestimonial && t && (
        <div className="flex flex-col bg-harbor p-2 text-shell">
          <figure className="flex grow flex-col">
            <blockquote className="relative px-8 py-6 text-[0.875rem] leading-snug">
              <span aria-hidden className="absolute left-2 top-5 text-port">“</span>
              {t.quote}
              <span aria-hidden className="absolute right-2 top-5 text-port">”</span>
            </blockquote>
            <figcaption className="px-8 pb-6 text-[0.75rem] text-shell/60">
              {t.name}, {t.stay} · <span className="uppercase tracking-wider">Placeholder testimonial</span>
            </figcaption>
            <div className="relative mt-auto aspect-[4/3] w-full">
              <Photo k={t.image} sizes="(min-width: 768px) 38vw, 100vw" />
            </div>
          </figure>
        </div>
      )}
    </section>
  );
}
