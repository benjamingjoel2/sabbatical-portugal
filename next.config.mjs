import createMDX from '@next/mdx';

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
  images: {
    loader: 'custom',
    loaderFile: './lib/imageLoader.ts',
    deviceSizes: [480, 640, 828, 1080, 1440, 1920, 2560],
    imageSizes: [96, 160, 256, 384],
  },
  // English lives at the existing URLs; French, German and Spanish under /fr, /de and /es.
  // Internally every page sits under app/[locale], so unprefixed paths are served from /en.
  async redirects() {
    return [
      { source: '/en', destination: '/', permanent: true },
      { source: '/en/:path*', destination: '/:path*', permanent: true },
    ];
  },
  async rewrites() {
    return {
      beforeFiles: [
        { source: '/', destination: '/en' },
        { source: '/:path((?!en(?:/|$)|fr(?:/|$)|de(?:/|$)|es(?:/|$)|api(?:/|$)|_next(?:/|$)|images(?:/|$)|audio(?:/|$)|favicon\\.ico$|icon\\.svg$|apple-icon\\.png$|robots\\.txt$|sitemap\\.xml$).+)', destination: '/en/:path' },
      ],
    };
  },
  async headers() {
    return [
      { source: '/images/:path*', headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }] },
      { source: '/audio/:path*', headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }] },
    ];
  },
};

const withMDX = createMDX({});
export default withMDX(nextConfig);
