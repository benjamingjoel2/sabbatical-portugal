import { disclaimer, officialSources, visaVerifiedAsOf } from '@/config/visa';
import { site } from '@/config/site';

export function VisaDisclaimer({ date = visaVerifiedAsOf, className = '', tone = 'dark' }: { date?: string; className?: string; tone?: 'dark' | 'light' }) {
  return (
    <aside
      className={`border-l-2 border-terracotta py-1 pl-4 text-[0.8125rem] leading-relaxed ${tone === 'light' ? 'text-shell/80' : 'text-harbor/80'} ${className}`}
      aria-label="Visa disclaimer"
    >
      <p className="font-medium">{disclaimer(date)}</p>
      <p className="mt-1">
        Visa applications are handled by our partner immigration lawyers, {site.visaPartner}. Always check the official sources:{' '}
        {Object.values(officialSources)
          .slice(0, 3)
          .map((s, i, a) => (
            <span key={s.href}>
              <a href={s.href} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-terracotta">
                {s.label}
              </a>
              {i < a.length - 1 ? ', ' : '.'}
            </span>
          ))}
      </p>
    </aside>
  );
}
