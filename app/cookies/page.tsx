import type { Metadata } from 'next';
import { LegalArticle } from '@/components/shared/LegalArticle';
import { getLegalPage } from '@/lib/legal';
import { pageMeta } from '@/lib/seo';

const page = getLegalPage('cookies');
export const metadata: Metadata = pageMeta({ title: page.title, description: page.lede, path: '/cookies' });

export default function CookiesPage() {
  return <LegalArticle page={page} />;
}
