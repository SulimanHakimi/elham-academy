'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Icon from '@/components/Icon';
import { getDictionary } from '@/lib/dictionaries';
import { isLocale, defaultLocale, path } from '@/lib/i18n';

/**
 * `not-found.js` does not receive route params, so the locale is read from the
 * pathname instead. This keeps a wrong URL in the language the visitor was
 * already browsing.
 */
export default function NotFound() {
  const pathname = usePathname();
  const first = (pathname || '/').split('/')[1];
  const lang = isLocale(first) ? first : defaultLocale;

  const dict = getDictionary(lang);
  const t = dict.notFound;

  const links = [
    { href: '/courses?category=kankor-prep', label: t.links[0].label },
    { href: '/courses?category=languages', label: t.links[1].label },
    { href: '/blog', label: t.links[2].label },
  ];

  return (
    <section className="bg-mesh py-24">
      <div className="container-page">
        <div className="mx-auto max-w-xl text-center">
          <span className="inline-flex h-20 w-20 items-center justify-center rounded-4xl bg-white text-brand-600 shadow-card">
            <Icon name="compass" className="h-10 w-10" />
          </span>
          <p className="eyebrow mt-8 justify-center">{t.eyebrow}</p>
          <h1 className="h1">{t.title}</h1>
          <p className="lede mt-5">{t.description}</p>

          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href={path('/courses', lang)} className="btn-primary">
              {dict.common.browseCourses}
              <Icon name="arrow-right" className="h-4 w-4 flip-rtl" />
            </Link>
            <Link href={path('/', lang)} className="btn-outline">
              {t.backHome}
            </Link>
          </div>

          <div className="mt-14 grid gap-4 sm:grid-cols-3">
            {links.map((link) => (
              <Link
                key={link.href}
                href={path(link.href, lang)}
                className="rounded-2xl bg-white px-5 py-4 text-sm font-bold text-brand-700 shadow-soft transition hover:-translate-y-0.5 hover:shadow-card"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
