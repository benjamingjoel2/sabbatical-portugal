import { Pill } from '@/components/shared/Buttons';

export default function NotFound() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-shell px-gutter text-center">
      <div className="azulejo-pattern absolute inset-0 opacity-40" aria-hidden />
      <div className="relative bg-shell p-8">
        <p className="eyebrow text-harbor/60">404</p>
        <h1 className="font-display-caps text-display-l mt-4">Lost at sea</h1>
        <p className="mx-auto mt-4 max-w-sm text-[0.9375rem] text-harbor/75">This page has sailed. Let’s get you back to the harbor.</p>
        <div className="mt-8 flex justify-center gap-2">
          <Pill href="/" tone="dark">
            Home
          </Pill>
          <Pill href="/destinations" tone="outline">
            Destinations
          </Pill>
        </div>
      </div>
    </section>
  );
}
