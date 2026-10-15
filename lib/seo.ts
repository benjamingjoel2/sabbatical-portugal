import type { Metadata } from 'next';
import { site } from '@/config/site';

export function pageMeta({
  title,
  description,
  path,
  image,
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
}): Metadata {
  const url = new URL(path, site.url).toString();
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${title} · ${site.name}`,
      description,
      url,
      siteName: site.name,
      type: 'website',
      locale: 'en_GB',
      ...(image ? { images: [{ url: image, width: 1600, height: 900 }] } : {}),
    },
    twitter: { card: 'summary_large_image', title: `${title} · ${site.name}`, description },
  };
}
