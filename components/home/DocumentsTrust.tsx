import { site } from '@/config/site';
import { GridLines } from '@/components/shared/GridLines';
import { Reveal, RevealLines } from '@/components/motion/Reveal';
import { PortugalLineMap } from '@/components/svg/PortugalLineMap';
import { CompassStar } from '@/components/svg/Icons';

const practices = [
  'Encrypted upload links, never email attachments',
  'Stored encrypted, in the EU, with access logged',
  'Seen only by your specialist and, for visas, our partner lawyers',
  'Never used for marketing, never sold, never shared beyond your plan',
];

/** Flyward A8 rebuilt as "Your documents, handled with care". */
export function DocumentsTrust() {
  return (
    <section className="relative overflow-hidden bg-shell px-gutter py-24 md:py-36" aria-labelledby="docs-title">
      <GridLines />
      <PortugalLineMap className="pointer-events-none absolute -left-[12%] top-0 h-full w-auto text-harbor/10" />
      <div className="relative grid gap-y-14 md:grid-cols-4 md:gap-x-6">
        <RevealLines
          id="docs-title"
          lines={['Your documents,', 'handled with care']}
          className="font-display-caps text-display-xl md:col-span-3"
        />
        <Reveal className="text-[0.9375rem] leading-relaxed md:col-span-2 md:col-start-2 md:max-w-md">
          <p>
            Planning a season means sharing things that matter: passport scans, proof of income, bank statements, visa
            paperwork. We treat every page as if it were our own.
          </p>
        </Reveal>
        <Reveal delay={0.1} className="md:col-span-2 md:col-start-3 md:max-w-md">
          <ul className="space-y-3 text-[0.9375rem]">
            {practices.map((p) => (
              <li key={p} className="flex gap-3">
                <CompassStar size={10} className="mt-1.5 shrink-0 text-terracotta" />
                {p}
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={0.15} className="text-[0.9375rem] leading-relaxed md:col-span-2 md:col-start-2 md:max-w-md">
          <p className="font-medium">Our deletion promise</p>
          <p className="mt-2">
            Ask, and we permanently delete every document you have shared with us within {site.documentDeletionDays} days,
            and confirm it in writing. You stay in charge of your own paperwork.
          </p>
        </Reveal>
        <RevealLines
          as="p"
          lines={['Your papers are yours.', 'We just keep them safe.']}
          className="font-display-caps text-display-m md:col-span-3 md:col-start-2 md:mt-10"
        />
      </div>
    </section>
  );
}
