import Image from 'next/image';
import { images, unsplash, type ImageKey } from '@/data/images';

/** next/image wrapper for the image library. Always fills its (relative) parent. */
export function Photo({
  k,
  sizes = '100vw',
  priority = false,
  eager = false,
  className = '',
  alt,
}: {
  k: ImageKey;
  sizes?: string;
  priority?: boolean;
  /** Load straight away but without a preload (for images that are needed soon but are not the LCP). */
  eager?: boolean;
  className?: string;
  alt?: string;
}) {
  const img = images[k];
  return (
    <Image
      src={unsplash(k)}
      alt={alt ?? img.alt}
      fill
      sizes={sizes}
      priority={priority}
      loading={priority ? undefined : eager ? 'eager' : undefined}
      className={`bg-limestone object-cover ${className}`}
    />
  );
}
