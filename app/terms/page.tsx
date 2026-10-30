import type { Metadata } from 'next';
import { site } from '@/config/site';
import { pageMeta } from '@/lib/seo';

export const metadata: Metadata = pageMeta({ title: 'Terms of Use', description: 'Terms of use for the Porto Season website.', path: '/terms' });

export default function TermsPage() {
  return (
    <section className="bg-shell px-gutter pb-24 pt-[calc(var(--header-h)+3.5rem)]">
      <h1 className="tight-display text-mega">Terms of use</h1>
      <div className="prose-season mt-12 md:ml-[33%]">
        <p>
          <strong>Placeholder text.</strong> Booking terms, deposits and cancellation conditions will be published here once
          finalised and reviewed by a lawyer.
        </p>
        <p>
          This website is operated by {site.name}, based in {site.location.city}.
        </p>
        <h2>Information on this site</h2>
        <p>
          Prices, figures and statistics shown are placeholders unless stated otherwise. Visa information is guidance only, not legal
          advice; always confirm with official sources and our partner immigration lawyers. We do not give tax advice.
        </p>
        <h2>Bookings</h2>
        <p>A season is confirmed only by a written proposal and your acceptance of the booking terms that accompany it.</p>
      </div>
    </section>
  );
}
