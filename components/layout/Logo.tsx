import { t } from '@/lib/i18n/t';
import Link from '@/components/i18n/Link';

/** Text logo placeholder in the Kultiveret manner: a tight, heavy grotesk wordmark. */
export function Logo({ className = '' }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`tight-display whitespace-nowrap text-[1.625rem] leading-none transition-opacity hover:opacity-70 md:text-[2.125rem] ${className}`}
      aria-label={t("Porto Season, home")}
    >
      {t("Porto Season")}</Link>
  );
}
