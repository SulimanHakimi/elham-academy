import { getCourseSlugs, getPostSlugs } from '@/lib/data';
import { locales } from '@/lib/i18n';

const base = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

/** Every page is listed once per locale, with hreflang alternates. */
export default async function sitemap() {
  const [courseSlugs, postSlugs] = await Promise.all([getCourseSlugs(), getPostSlugs()]);
  const now = new Date();

  const routes = [
    { path: '', priority: 1, changeFrequency: 'weekly' },
    { path: '/landing', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/courses', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/about', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/enrollment', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/blog', priority: 0.7, changeFrequency: 'weekly' },
    { path: '/contact', priority: 0.7, changeFrequency: 'monthly' },
    ...courseSlugs.map((slug) => ({
      path: `/courses/${slug}`,
      priority: 0.7,
      changeFrequency: 'monthly',
    })),
    ...postSlugs.map((slug) => ({
      path: `/blog/${slug}`,
      priority: 0.6,
      changeFrequency: 'yearly',
    })),
  ];

  const alternatesFor = (routePath) =>
    Object.fromEntries(locales.map((locale) => [locale, `${base}/${locale}${routePath}`]));

  return locales.flatMap((locale) =>
    routes.map((route) => ({
      url: `${base}/${locale}${route.path}`,
      lastModified: now,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
      alternates: { languages: alternatesFor(route.path) },
    }))
  );
}
