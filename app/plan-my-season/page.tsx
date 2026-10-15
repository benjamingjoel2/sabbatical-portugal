import type { Metadata } from 'next';
import { SeasonPlanner } from '@/components/planner/SeasonPlanner';
import { Photo } from '@/components/shared/Photo';
import { pageMeta } from '@/lib/seo';

export const metadata: Metadata = pageMeta({
  title: 'Plan my season',
  description:
    'Tell us when, where and who. Five short steps and your Porto Season specialist will design your season in Portugal, with a first look at your likely visa path.',
  path: '/plan-my-season',
});

/** Kultiveret booking card over a blurred photo, styled with the shared tokens. */
export default function PlanMySeasonPage() {
  return (
    <section className="relative isolate min-h-screen px-gutter pb-24 pt-[calc(var(--header-h)+3rem)]">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <Photo k="portoRibeira" sizes="100vw" priority className="scale-110 blur-md" />
        <div className="absolute inset-0 bg-harbor-deep/45" />
      </div>
      <div className="mx-auto grid max-w-6xl items-start gap-10 lg:grid-cols-[1fr_minmax(0,36rem)]">
        <div className="text-shell lg:sticky lg:top-32">
          <h1 className="font-display-caps text-display-l">
            <span className="block">Plan</span>
            <span className="block">my season</span>
          </h1>
          <p className="mt-6 max-w-sm text-[1rem] leading-relaxed text-shell/85">
            Five short steps. Tell us when, where and who, and your specialist will come back with towns, homes and honest
            costs, plus a first look at your likely visa path.
          </p>
        </div>
        <SeasonPlanner />
      </div>
    </section>
  );
}
