import type { Metadata, Viewport } from 'next';
import { Gilda_Display, Hanken_Grotesk } from 'next/font/google';
import './globals.css';
import { site } from '@/config/site';
import { CurrencyProvider } from '@/lib/currency';
import { SoundProvider } from '@/components/sound/SoundProvider';
import { UIProvider } from '@/components/layout/UIProvider';
import { Header } from '@/components/layout/Header';
import { MegaMenu } from '@/components/layout/MegaMenu';
import { Footer } from '@/components/layout/Footer';
import { WhatsAppFab } from '@/components/layout/WhatsAppFab';

const gilda = Gilda_Display({ subsets: ['latin', 'latin-ext'], weight: '400', variable: '--font-gilda', display: 'swap' });
const hanken = Hanken_Grotesk({
  subsets: ['latin', 'latin-ext'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-hanken',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name}: ${site.tagline}`, template: `%s · ${site.name}` },
  description: site.description,
  applicationName: site.name,
  openGraph: { siteName: site.name, type: 'website', locale: 'en_GB' },
  twitter: { card: 'summary_large_image' },
};

export const viewport: Viewport = {
  themeColor: '#F8F5EE',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children, modal }: { children: React.ReactNode; modal: React.ReactNode }) {
  const orgJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TravelAgency',
    name: site.name,
    slogan: site.tagline,
    description: site.description,
    url: site.url,
    email: site.contact.email,
    areaServed: { '@type': 'Country', name: 'Portugal' },
    address: { '@type': 'PostalAddress', addressLocality: 'Lisbon', addressCountry: 'PT' },
  };
  return (
    <html lang="en" className={`${gilda.variable} ${hanken.variable}`}>
      <head>
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
      </head>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
        <CurrencyProvider>
          <SoundProvider>
            <UIProvider>
              <Header />
              <MegaMenu />
              <main id="main">{children}</main>
              <Footer />
              {site.channels.whatsapp && <WhatsAppFab />}
              {modal}
            </UIProvider>
          </SoundProvider>
        </CurrencyProvider>
      </body>
    </html>
  );
}
