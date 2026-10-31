import { initLocale } from '@/lib/i18n/server';
import { localizeMetadata } from '@/lib/i18n/metadata';
import { tp } from '@/lib/i18n/t';
import type { Metadata } from 'next';
import { LegalArticle } from '@/components/shared/LegalArticle';
import { getLegalPage } from '@/lib/legal';
import { pageMeta } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const page = getLegalPage('cookies');
  return localizeMetadata(pageMeta({ title: page.title, description: page.lede, path: '/cookies' }), (await params).locale);
}

export default async function CookiesPage({ params }: { params: Promise<{ locale: string }> }) {
  await initLocale(params);
  const page = getLegalPage('cookies');
  return <LegalArticle page={tp(page)} />;
}
