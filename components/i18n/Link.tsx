'use client';

import NextLink from 'next/link';
import { forwardRef, type ComponentProps } from 'react';
import { useParams } from 'next/navigation';
import { isLocale, localizePath, DEFAULT_LOCALE } from '@/lib/i18n/config';

type Props = ComponentProps<typeof NextLink>;

/** next/link that keeps the visitor in their language. */
const Link = forwardRef<HTMLAnchorElement, Props>(function Link({ href, ...rest }, ref) {
  const p = useParams();
  const locale = isLocale(p?.locale) ? p.locale : DEFAULT_LOCALE;
  const h = typeof href === 'string' ? localizePath(href, locale) : href && typeof href === 'object' && typeof href.pathname === 'string' ? { ...href, pathname: localizePath(href.pathname, locale) } : href;
  return <NextLink ref={ref} href={h} {...rest} />;
});

export default Link;
export { Link };
