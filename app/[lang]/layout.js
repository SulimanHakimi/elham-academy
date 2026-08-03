import '../globals.css';
import { Outfit, Plus_Jakarta_Sans, Vazirmatn } from 'next/font/google';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getDictionary } from '@/lib/dictionaries';
import { locales, isLocale, localeConfig } from '@/lib/i18n';
import { getSite } from '@/lib/data';

const display = Outfit({
  subsets: ['latin'],
  display: 'swap',
  weight: ['500', '600', '700', '800'],
  variable: '--font-display',
});

const body = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
  variable: '--font-body',
});

// Persian-script type for the Dari interface and the About page passages.
const dari = Vazirmatn({
  subsets: ['arabic', 'latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
  variable: '--font-dari',
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }) {
  const { lang } = await params;
  if (!isLocale(lang)) return {};

  const site = getSite(lang);

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: `${site.name} — ${site.tagline}`,
      template: `%s | ${site.name}`,
    },
    description: site.description,
    keywords: [
      'Elham Online Education',
      'free online courses Afghanistan',
      'online education for Afghan girls',
      'Afghan women education',
      'Kankor preparation',
      'ICDL Afghanistan',
      'آموزش آنلاین رایگان',
      'کورس آنلاین برای دختران افغان',
    ],
    alternates: {
      canonical: `${siteUrl}/${lang}`,
      languages: {
        en: `${siteUrl}/en`,
        'fa-AF': `${siteUrl}/fa`,
        'x-default': `${siteUrl}/en`,
      },
    },
    openGraph: {
      title: `${site.name} — ${site.tagline}`,
      description: site.description,
      url: `${siteUrl}/${lang}`,
      siteName: site.name,
      type: 'website',
      locale: lang === 'fa' ? 'fa_AF' : 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${site.name} — ${site.tagline}`,
      description: site.description,
    },
    icons: { icon: [{ url: '/icon.svg', type: 'image/svg+xml' }] },
  };
}

export const viewport = {
  themeColor: '#14284b',
  width: 'device-width',
  initialScale: 1,
};

export default async function LocaleLayout({ children, params }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const dict = getDictionary(lang);
  const config = localeConfig[lang];

  return (
    // `suppressHydrationWarning` covers browser extensions that inject
    // attributes onto <html>/<body> before React hydrates (a common source of
    // false hydration mismatches — e.g. `inmaintabuse` from tab managers).
    <html
      lang={config.htmlLang}
      dir={config.dir}
      className={`${display.variable} ${body.variable} ${dari.variable}`}
      suppressHydrationWarning
    >
      <body className={lang === 'fa' ? 'font-dari' : undefined} suppressHydrationWarning>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:z-[60] focus:rounded-full focus:bg-brand-600 focus:px-5 focus:py-3 focus:text-sm focus:font-bold focus:text-white focus:start-4"
        >
          {dict.nav.skipToContent}
        </a>
        <Navbar lang={lang} dict={dict} />
        <main id="main">{children}</main>
        <Footer lang={lang} dict={dict} />
      </body>
    </html>
  );
}
