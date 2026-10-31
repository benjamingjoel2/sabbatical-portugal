import { lhref, t, tp } from '@/lib/i18n/t';
import Link from '@/components/i18n/Link';
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
            {t("Get in touch")}</h2>
          <div className="mt-auto">
            <a href={lhref(`mailto:${site.contact.email}`)} className="text-statement block break-all transition-colors hover:text-terracotta">
              {tp(site.contact.email)}
            </a>
            <ArrowLink href="/plan-my-season" large>
              {t("plan my season")}</ArrowLink>
          </div>
          <div className="grid gap-8 text-[0.8125rem] sm:grid-cols-3">
            <nav aria-label={t("Footer")}>
              <p className="eyebrow mb-2 text-harbor/55">{t("Menu")}</p>
              <ul className="space-y-1">
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
              <p className="eyebrow mb-2 text-harbor/55">{t("Office hours · Lisbon time")}</p>
              <ul className="space-y-1">
                {site.officeHours.map((h) => (
                  <li key={h.days}>
                    {tp(h.days)}: {tp(h.hours)}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="eyebrow mb-2 text-harbor/55">{t("Location")}</p>
              <p>{tp(site.location.address)}</p>
              <LiveClock className="mt-1 space-y-1" />
            </div>
          </div>
        </div>

        <div className="relative min-h-[18rem] bg-harbor md:min-h-0">
          <Photo k="friendsView" sizes="(min-width: 768px) 38vw, 100vw" />
        </div>
      </div>

      <div className="px-gutter pb-6 pt-10">
        <p className="tight-display text-[clamp(2.5rem,1rem+6vw,6rem)] leading-[0.9]">{tp(site.signOff)}</p>
      </div>

      <div className="grid gap-4 border-t border-line px-gutter py-4 text-[0.6875rem] uppercase leading-snug md:grid-cols-3">
        <p>
          {tp(site.name)}
          <br />
          {tp(site.location.city)}
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
          <br />
          {tp(site.name)} © {tp(new Date().getFullYear())}
        </p>
        <p className="md:text-right">
          {tp(site.tagline)}
        </p>
      </div>
    </footer>
  );
}
