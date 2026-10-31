import { initLocale } from '@/lib/i18n/server';
import { localizeMetadata } from '@/lib/i18n/metadata';
import { t, tp } from '@/lib/i18n/t';
import type { Metadata } from 'next';
import { EditorialHero } from '@/components/shared/PageHero';
import { HomesBrowser } from '@/components/shared/HomesBrowser';
import { CtaHero } from '@/components/shared/CtaHero';
import { pageMeta } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  return localizeMetadata(pageMeta({
  title: 'Homes for a long stay in Portugal',
  description: 'City apartments, beach houses, quintas and island homes, each visited and checked in person, with a real workspace and tested Wi-Fi.',
  path: '/homes',
}), (await params).locale);
}

export default async function HomesPage({ params }: { params: Promise<{ locale: string }> }) {
  await initLocale(params);
  return (
    <>
      <EditorialHero eyebrow={t("Homes")} title={t("Homes we’d live in ourselves")}>
        <p className="text-[1rem] leading-relaxed text-harbor/75">
          {t("Every home is visited in person before a guest arrives: light, noise, beds, the desk, the Wi-Fi speed, and the walk to the nearest bakery.")}</p>
        <p className="text-[1rem] leading-relaxed text-harbor/75">
          {t("The homes below are placeholder examples while we finalise owner agreements. They show the kind of place we book.")}</p>
      </EditorialHero>
      <HomesBrowser />
      <CtaHero lines={tp(['Tell us how you live', 'we’ll find the home'])} image="villaPool" />
    </>
  );
}
