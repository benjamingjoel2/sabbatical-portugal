import { initLocale, clientDict } from '@/lib/i18n/server';
import { LOCALES } from '@/lib/i18n/config';
import { LocaleProvider } from '@/components/i18n/LocaleProvider';
import { t } from '@/lib/i18n/t';
import { localizeMetadata } from '@/lib/i18n/metadata';
import { tp } from '@/lib/i18n/t';
import type { Metadata, Viewport } from 'next';
import { Gilda_Display, Hanken_Grotesk } from 'next/font/google';
import '../globals.css';
import { site } from '@/config/site';
import { CurrencyProvider } from '@/lib/currency';
import { SoundProvider } from '@/components/sound/SoundProvider';
import { UIProvider } from '@/components/layout/UIProvider';
import { Header } from '@/components/layout/Header';
import { MegaMenu } from '@/components/layout/MegaMenu';
import { Footer } from '@/components/layout/Footer';

const gilda = Gilda_Display({ subsets: ['latin', 'latin-ext'], weight: '400', variable: '--font-gilda', display: 'swap' });
const hanken = Hanken_Grotesk({
  subsets: ['latin', 'latin-ext'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-hanken',
  display: 'swap',
});

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  return localizeMetadata({
  metadataBase: new URL(site.url),
  title: { default: `${site.name}: ${site.tagline}`, template: `%s · ${site.name}` },
  description: site.description,
  applicationName: site.name,
  openGraph: { siteName: site.name, type: 'website', locale: 'en_GB' },
  twitter: { card: 'summary_large_image' },
}, (await params).locale);
}

export const dynamicParams = false;

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: '#F8F5EE',
  width: 'device-width',
  initialScale: 1,
};

export default async function RootLayout({ children, modal, params }: { children: React.ReactNode; modal: React.ReactNode; params: Promise<{ locale: string }> }) {
  const locale = await initLocale(params);
  const orgJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TravelAgency',
    name: site.name,
    slogan: t(site.tagline),
    description: t(site.description),
    url: locale === 'en' ? site.url : `${site.url}/${locale}`,
    inLanguage: locale,
    email: site.contact.email,
    areaServed: { '@type': 'Country', name: 'Portugal' },
    address: { '@type': 'PostalAddress', ...site.location.postalAddress },
  };
  return (
    <html lang={locale} className={`${gilda.variable} ${hanken.variable}`}>
      <head>
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
      </head>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
        <LocaleProvider locale={locale} dict={clientDict(locale)}>
        <CurrencyProvider>
          <SoundProvider>
            <UIProvider>
              <Header />
              <MegaMenu />
              <main id="main">{children}</main>
              <Footer />
              {tp(modal)}
            </UIProvider>
          </SoundProvider>
        </CurrencyProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}
