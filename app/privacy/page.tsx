import type { Metadata } from 'next';
import { LegalArticle } from '@/components/shared/LegalArticle';
import { getLegalPage } from '@/lib/legal';
import { pageMeta } from '@/lib/seo';

const page = getLegalPage('privacy');
export const metadata: Metadata = pageMeta({ title: page.title, description: page.lede, path: '/privacy' });

export default function PrivacyPage() {
  return <LegalArticle page={page} />;
}
