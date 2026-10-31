import { initLocale } from '@/lib/i18n/server';
import { PlannerModal } from '@/components/planner/PlannerModal';

/** Intercepted route: in-app links to /plan-my-season open the planner as a modal. */
export default async function PlannerModalRoute({ params }: { params: Promise<{ locale: string }> }) {
  await initLocale(params);
  return <PlannerModal />;
}
