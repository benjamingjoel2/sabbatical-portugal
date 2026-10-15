import type { Metadata } from 'next';
import { site } from '@/config/site';
import { Photo } from '@/components/shared/Photo';
import { ContactForm } from '@/components/shared/ContactForm';
import { pageMeta } from '@/lib/seo';

export const metadata: Metadata = pageMeta({
  title: 'Contact',
  description: `Talk to a Porto Season specialist. Office hours in Lisbon time, WhatsApp, email and phone. ${site.tagline}`,
  path: '/contact',
});

/** Kultiveret contact: blurred photo, dark form card, and the details in an editorial column. */
export default function ContactPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden px-gutter pb-20 pt-[calc(var(--header-h)+2.5rem)]">
        <div className="absolute inset-0 -z-10">
          <Photo k="portoGoldenHour" sizes="100vw" priority className="scale-110 blur-md" />
          <div className="absolute inset-0 bg-harbor-deep/35" />
        </div>
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_minmax(0,34rem)]">
          <div className="text-shell">
            <h1 className="tight-display text-mega">Let’s plan your season</h1>
            <p className="mt-6 max-w-sm text-[1.0625rem] font-light leading-relaxed text-shell/90">
              Write to us, call, or message on WhatsApp. Your specialist replies within one working day, Lisbon time.
            </p>
          </div>
          <ContactForm />
        </div>
      </section>

      <section className="grid gap-10 bg-shell px-gutter py-16 md:grid-cols-4" aria-label="Contact details">
        <div>
          <p className="eyebrow mb-3 text-harbor/55">Email & phone</p>
          <a href={`mailto:${site.contact.email}`} className="block break-all hover:text-terracotta">
            {site.contact.email}
          </a>
          <a href={site.contact.phoneHref} className="block hover:text-terracotta">
            {site.contact.phone}
          </a>
        </div>
        <div>
          <p className="eyebrow mb-3 text-harbor/55">Chat</p>
          <a href={site.contact.whatsappHref} target="_blank" rel="noopener noreferrer" className="block hover:text-terracotta">
            WhatsApp
          </a>
          <a href={site.contact.instagram} target="_blank" rel="noopener noreferrer" className="block hover:text-terracotta">
            Instagram {site.contact.instagramHandle}
          </a>
        </div>
        <div>
          <p className="eyebrow mb-3 text-harbor/55">Office hours · Lisbon time</p>
          <ul>
            {site.officeHours.map((h) => (
              <li key={h.days}>
                {h.days}: {h.hours}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="eyebrow mb-3 text-harbor/55">Find us</p>
          <p>{site.location.city}</p>
          <p className="text-harbor/70">{site.location.address}</p>
          <p className="mt-2 text-[0.875rem] text-harbor/60">Visits by appointment. We plan seasons all over Portugal.</p>
        </div>
      </section>
    </>
  );
}
