import { NextResponse } from 'next/server';
import { locales, defaultLocale, isLocale, localeFromAcceptLanguage } from './lib/i18n';

const PUBLIC_FILE = /\.(svg|png|jpg|jpeg|gif|webp|ico|txt|xml|webmanifest)$/i;

/**
 * Every page lives under a locale prefix. This sends locale-less URLs to the
 * right language: a remembered choice first (the `NEXT_LOCALE` cookie), then the
 * browser's Accept-Language header, then English.
 */
export function middleware(request) {
  const { pathname, search } = request.nextUrl;

  // Route handlers, Next internals, and static files are served as-is.
  if (
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname === '/sitemap.xml' ||
    pathname === '/robots.txt' ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  const first = pathname.split('/')[1];
  if (isLocale(first)) return NextResponse.next();

  const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value;
  const locale = isLocale(cookieLocale)
    ? cookieLocale
    : localeFromAcceptLanguage(request.headers.get('accept-language')) || defaultLocale;

  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === '/' ? '' : pathname}`;
  url.search = search;

  return NextResponse.redirect(url);
}

export const config = {
  matcher: ['/((?!_next|api|.*\\..*).*)'],
};

export { locales };
