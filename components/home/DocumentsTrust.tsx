import { site } from '@/config/site';
import { Reveal } from '@/components/motion/Reveal';

const practices = [
  'Encrypted upload links, never email attachments.',
  'Stored encrypted, in the EU, with every access logged.',
  'Seen only by your specialist and, for visas, our partner lawyers.',
  'Never used for marketing, never sold, never shared beyond your plan.',
];

/** Kultiveret "Pricing and guidelines" layout, used for "Your documents, handled with care". */
export function DocumentsTrust() {
  return (
    <section className="bg-shell px-gutter py-20 md:py-28" aria-labelledby="docs-title">
      <h2 id="docs-title" className="tight-display max-w-5xl text-mega">
        Your documents, handled with care
      </h2>
      <div className="mt-12 grid gap-8 text-[1.0625rem] leading-relaxed text-harbor/75 md:ml-[33%] md:grid-cols-2 md:gap-10">
        <Reveal className="space-y-4">
          <p>
            Planning a season means sharing things that matter: passport scans, proof of income, bank statements and visa
            paperwork. We treat every page as if it were our own.
          </p>
          <p className="text-harbor">
            <span className="font-medium">Our deletion promise.</span> Ask, and we permanently delete every document you have
            shared with us within {site.documentDeletionDays} days, and confirm it in writing.
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <ul className="space-y-3">
            {practices.map((p, i) => (
              <li key={p} className="grid grid-cols-[2.25rem_1fr] gap-3">
                <span className="mt-1 inline-grid h-5 place-items-center border border-harbor text-[0.6875rem] tabular-nums text-harbor">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
