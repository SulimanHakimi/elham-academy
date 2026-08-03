'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { locales, localeConfig, switchLocalePath } from '@/lib/i18n';

/**
 * Switches between English and Dari on the current page. The chosen locale is
 * stored in the `NEXT_LOCALE` cookie so a later visit to a locale-less URL lands
 * in the same language (see middleware.js).
 */
export default function LanguageSwitcher({ lang, dict, variant = 'light', className = '' }) {
  const pathname = usePathname();
  const isDark = variant === 'dark';

  const remember = (locale) => {
    // One year, site-wide.
    document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=31536000; samesite=lax`;
  };

  return (
    <div
      className={`inline-flex items-center gap-1 rounded-full p-1 ${
        isDark ? 'bg-white/10' : 'bg-brand-50'
      } ${className}`}
      role="group"
      aria-label={dict.nav.switchLanguage}
    >
      {locales.map((locale) => {
        const active = locale === lang;
        const config = localeConfig[locale];

        return (
          <Link
            key={locale}
            href={switchLocalePath(pathname, locale)}
            hrefLang={config.htmlLang}
            lang={config.htmlLang}
            onClick={() => remember(locale)}
            aria-current={active ? 'true' : undefined}
            className={`rounded-full px-3 py-1.5 text-xs font-bold transition ${
              active
                ? isDark
                  ? 'bg-white text-brand-700'
                  : 'bg-brand-600 text-white'
                : isDark
                  ? 'text-white/70 hover:text-white'
                  : 'text-ink-soft hover:text-brand-700'
            }`}
          >
            {config.nativeLabel}
          </Link>
        );
      })}
    </div>
  );
}
