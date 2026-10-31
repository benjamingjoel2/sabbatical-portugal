import { initLocale } from '@/lib/i18n/server';
import { localizeMetadata } from '@/lib/i18n/metadata';
import { lhref, t, tp } from '@/lib/i18n/t';
import type { Metadata } from 'next';
import { site } from '@/config/site';
import { Photo } from '@/components/shared/Photo';
import { ContactForm } from '@/components/shared/ContactForm';
import { pageMeta } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  return localizeMetadata(pageMeta({
  title: 'Contact',
  description: `Talk to a Porto Season specialist by email. Office hours in Lisbon time. ${site.tagline}`,
  path: '/contact',
}), (await params).locale);
}

/** Kultiveret contact: blurred photo, dark form card, and the details in an editorial column. */
export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  await initLocale(params);
  return (
    <>
      <section className="relative isolate overflow-hidden px-gutter pb-20 pt-[calc(var(--header-h)+2.5rem)]">
        <div className="absolute inset-0 -z-10">
          <Photo k="portoGoldenHour" sizes="100vw" priority className="scale-110 blur-md" />
          <div className="absolute inset-0 bg-harbor-deep/35" />
        </div>
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_minmax(0,34rem)]">
          <div className="text-shell">
            <h1 className="tight-display text-mega">{t("Let’s plan your season")}</h1>
            <p className="mt-6 max-w-sm text-[1.0625rem] font-light leading-relaxed text-shell/90">
              {t("Use the form or email us. Your specialist replies within one working day, Lisbon time.")}</p>
          </div>
          <ContactForm />
        </div>
      </section>

      <section className="grid gap-10 bg-shell px-gutter py-16 md:grid-cols-3" aria-label={t("Contact details")}>
        <div>
          <p className="eyebrow mb-3 text-harbor/55">{t("Email")}</p>
          <a href={lhref(`mailto:${site.contact.email}`)} className="block break-all hover:text-terracotta">
            {tp(site.contact.email)}
          </a>
        </div>
        <div>
          <p className="eyebrow mb-3 text-harbor/55">{t("Office hours · Lisbon time")}</p>
          <ul>
            {site.officeHours.map((h) => (
              <li key={h.days}>
                {tp(h.days)}: {tp(h.hours)}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="eyebrow mb-3 text-harbor/55">{t("Find us")}</p>
          <p>{tp(site.location.city)}</p>
          <p className="text-harbor/70">{tp(site.location.address)}</p>
          <p className="mt-2 text-[0.875rem] text-harbor/60">{t("Visits by appointment. We plan seasons all over Portugal.")}</p>
        </div>
      </section>
    </>
  );
}
