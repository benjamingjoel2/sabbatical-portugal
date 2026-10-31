import { initLocale } from '@/lib/i18n/server';
import { localizeMetadata } from '@/lib/i18n/metadata';
import type { Metadata } from 'next';
import { MaskHero } from '@/components/home/MaskHero';
import { MapTransition } from '@/components/home/MapTransition';
import { ServiceCards } from '@/components/home/ServiceCards';
import { StepsZigzag } from '@/components/home/StepsZigzag';
import { CategoryScatter } from '@/components/home/CategoryScatter';
import { DestinationRows } from '@/components/home/DestinationRows';
import { StatsPeople } from '@/components/home/StatsPeople';
import { DocumentsTrust } from '@/components/home/DocumentsTrust';
import { BeginForm } from '@/components/home/BeginForm';
import { site } from '@/config/site';
import { pageMeta } from '@/lib/seo';
import { unsplash } from '@/data/images';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  return localizeMetadata({
  ...pageMeta({
    title: `${site.name}: ${site.tagline}`,
    description: site.description,
    path: '/',
    image: unsplash('portoGoldenHour', 1600),
  }),
  title: { absolute: `${site.name}: ${site.tagline}` },
}, (await params).locale);
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  await initLocale(params);
  return (
    <>
      <MaskHero />
      <MapTransition />
      <ServiceCards />
      <StepsZigzag />
      <CategoryScatter />
      <DestinationRows />
      <StatsPeople />
      <DocumentsTrust />
      <BeginForm />
    </>
  );
}
