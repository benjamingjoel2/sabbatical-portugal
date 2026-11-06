import { lhref, t, tp } from '@/lib/i18n/t';
import Link from '@/components/i18n/Link';
import { legalNav, mainNav } from '@/config/nav';
import { site } from '@/config/site';
import { ArrowLink } from '@/components/shared/Buttons';

/**
 * Letter sign-off footer (F5): a short signed note with the email on the left,
 * link columns on the right, then one thin base line with © and the legal links.
 */
export function Footer() {
  return (
    <footer className="border-t border-line bg-shell text-harbor" aria-labelledby="footer-title">
      <div className="grid gap-12 px-gutter pb-12 pt-14 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] md:gap-16 md:pb-16 md:pt-20">
        <div className="max-w-[34rem]">
          <h2 id="footer-title" className="eyebrow mb-5 text-harbor/55">
            {t("Get in touch")}
          </h2>
          <p className="tight-display text-[clamp(1.6rem,1.1rem+1.4vw,2.4rem)] leading-[1.08] tracking-[-0.035em]">
            {t("Tell us about your season.")}
          </p>
          <p className="mt-4 max-w-[28rem] text-[0.9375rem] leading-relaxed text-harbor/80">
            {t("Use the season planner or simply write to us. Ten minutes is enough to start.")}
          </p>
          <a
            href={lhref(`mailto:${site.contact.email}`)}
            className="mt-6 inline-block break-all text-[1.125rem] underline decoration-1 underline-offset-4 transition-colors hover:text-terracotta"
          >
            {tp(site.contact.email)}
          </a>
          <p className="mt-6 italic text-harbor/80">
            {tp(site.signOff)}
            <span className="mt-1 block not-italic text-[0.8125rem] uppercase tracking-[0.08em] text-harbor/60">— {tp(site.name)}</span>
          </p>
          <div className="mt-6">
            <ArrowLink href="/plan-my-season">{t("plan my season")}</ArrowLink>
          </div>
        </div>

        <div className="grid gap-8 text-[0.875rem] sm:grid-cols-3 md:pt-10">
          <nav aria-label={t("Footer")}>
            <p className="eyebrow mb-3 text-harbor/55">{t("Menu")}</p>
            <ul className="space-y-1.5">
              {mainNav.map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className="hover:text-terracotta">
                    {tp(n.label)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <p className="eyebrow mb-3 text-harbor/55">{t("Office hours · Lisbon time")}</p>
            <ul className="space-y-1.5">
              {site.officeHours.map((h) => (
                <li key={h.days}>
                  {tp(h.days)}: {tp(h.hours)}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow mb-3 text-harbor/55">{t("Location")}</p>
            <p>{tp(site.location.address)}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2 border-t border-line px-gutter py-4 text-[0.6875rem] uppercase leading-snug md:flex-row md:flex-wrap md:items-center md:justify-between">
        <p>
          {tp(site.name)} © {tp(new Date().getFullYear())}
        </p>
        <p>
          {legalNav.map((n, i) => (
            <span key={n.href}>
              <Link href={n.href} className="hover:text-terracotta">
                {tp(n.label)}
              </Link>
              {tp(i < legalNav.length - 1 ? ' · ' : '')}
            </span>
          ))}
        </p>
        <p>{tp(site.tagline)}</p>
      </div>
    </footer>
  );
}
