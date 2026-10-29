/**
 * next/image loader. Unsplash photos are resized by Unsplash's own image CDN (fast, globally cached,
 * serves AVIF/WebP via auto=format), so they skip Vercel's optimizer entirely.
 * Local files in /public are already web-sized and are served as-is from Vercel's CDN.
 */
export default function imageLoader({ src, width, quality }: { src: string; width: number; quality?: number }) {
  if (src.startsWith('https://images.unsplash.com/')) {
    const url = new URL(src);
    url.searchParams.set('auto', 'format');
    url.searchParams.set('fit', 'crop');
    url.searchParams.set('w', String(width));
    url.searchParams.set('q', String(quality ?? 68));
    return url.toString();
  }
  return `${src}${src.includes('?') ? '&' : '?'}w=${width}`;
}
