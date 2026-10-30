import type { Metadata } from 'next';
import { LegalArticle } from '@/components/shared/LegalArticle';
import { getLegalPage } from '@/lib/legal';
import { pageMeta } from '@/lib/seo';

const page = getLegalPage('terms');
export const metadata: Metadata = pageMeta({ title: page.title, description: page.lede, path: '/terms' });

export default function TermsPage() {
  return <LegalArticle page={page} />;
}
