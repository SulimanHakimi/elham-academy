/**
 * Bilingual configuration.
 *
 * The site is served under a locale prefix: /en/... and /fa/... (fa = Dari,
 * دری). English is the source language; Dari translations live in
 * `lib/dictionaries/fa.js` (interface) and `lib/seed-data.fa.js` (content).
 * Anything without a Dari translation falls back to English rather than
 * rendering an empty string.
 */

export const locales = ['en', 'fa'];
export const defaultLocale = 'en';

export const localeConfig = {
  en: {
    code: 'en',
    dir: 'ltr',
    label: 'English',
    nativeLabel: 'English',
    htmlLang: 'en',
    short: 'EN',
  },
  fa: {
    code: 'fa',
    dir: 'rtl',
    label: 'Dari',
    nativeLabel: 'دری',
    htmlLang: 'fa-AF',
    short: 'دری',
  },
};

export function isLocale(value) {
  return locales.includes(value);
}

export function normalizeLocale(value) {
  return isLocale(value) ? value : defaultLocale;
}

export function dir(lang) {
  return localeConfig[normalizeLocale(lang)].dir;
}

export function isRtl(lang) {
  return dir(lang) === 'rtl';
}

/** Builds a locale-prefixed href: path('/courses', 'fa') -> '/fa/courses'. */
export function path(href, lang) {
  const locale = normalizeLocale(lang);

  // Leave anchors, external links and mail/tel links untouched.
  if (!href || href.startsWith('#') || href.startsWith('http') || href.includes(':')) {
    return href;
  }

  const clean = href === '/' ? '' : href.startsWith('/') ? href : `/${href}`;
  return `/${locale}${clean}` || `/${locale}`;
}

/** Swaps the locale segment of a pathname, for the language switcher. */
export function switchLocalePath(pathname, nextLocale) {
  const segments = (pathname || '/').split('/').filter(Boolean);

  if (segments.length && isLocale(segments[0])) {
    segments[0] = nextLocale;
  } else {
    segments.unshift(nextLocale);
  }

  return `/${segments.join('/')}`;
}

/** Picks the best locale from an Accept-Language header. */
export function localeFromAcceptLanguage(header) {
  if (!header) return defaultLocale;

  const ranked = header
    .split(',')
    .map((part) => {
      const [tag, q] = part.trim().split(';q=');
      return { tag: tag.toLowerCase(), q: q ? Number(q) : 1 };
    })
    .sort((a, b) => b.q - a.q);

  for (const { tag } of ranked) {
    // fa, fa-AF, prs (Dari) and fa-IR all map to our Dari locale.
    if (tag.startsWith('fa') || tag.startsWith('prs') || tag.startsWith('ps')) return 'fa';
    if (tag.startsWith('en')) return 'en';
  }

  return defaultLocale;
}
