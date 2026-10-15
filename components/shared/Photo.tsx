import Image from 'next/image';
import { images, unsplash, type ImageKey } from '@/data/images';

/** next/image wrapper for the image library. Always fills its (relative) parent. */
export function Photo({
  k,
  sizes = '100vw',
  priority = false,
  className = '',
  alt,
}: {
  k: ImageKey;
  sizes?: string;
  priority?: boolean;
  className?: string;
  alt?: string;
}) {
  const img = images[k];
  return (
    <Image
      src={unsplash(k, 2000)}
      alt={alt ?? img.alt}
      fill
      sizes={sizes}
      priority={priority}
      className={`object-cover ${className}`}
    />
  );
}
