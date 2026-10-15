import type { Metadata } from 'next';
import { EditorialHero } from '@/components/shared/PageHero';
import { HomesBrowser } from '@/components/shared/HomesBrowser';
import { CtaHero } from '@/components/shared/CtaHero';
import { pageMeta } from '@/lib/seo';

export const metadata: Metadata = pageMeta({
  title: 'Homes for a long stay in Portugal',
  description: 'City apartments, beach houses, quintas and island homes, each visited and checked in person, with a real workspace and tested Wi-Fi.',
  path: '/homes',
});

export default function HomesPage() {
  return (
    <>
      <EditorialHero eyebrow="Homes" title="Homes we’d live in ourselves">
        <p className="text-[1rem] leading-relaxed text-harbor/75">
          Every home is visited in person before a guest arrives: light, noise, beds, the desk, the Wi-Fi speed, and the walk to
          the nearest bakery.
        </p>
        <p className="text-[1rem] leading-relaxed text-harbor/75">
          The homes below are placeholder examples while we finalise owner agreements. They show the kind of place we book.
        </p>
      </EditorialHero>
      <HomesBrowser />
      <CtaHero lines={['Tell us how you live', 'we’ll find the home']} image="villaPool" />
    </>
  );
}
