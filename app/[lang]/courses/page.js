import Link from 'next/link';
import Icon from '@/components/Icon';
import PageHero from '@/components/PageHero';
import CourseExplorer from '@/components/CourseExplorer';
import SectionHeading from '@/components/SectionHeading';
import { getCourses, getCategories } from '@/lib/data';
import { getDictionary, fill } from '@/lib/dictionaries';
import { path } from '@/lib/i18n';

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const dict = getDictionary(lang);

  return { title: dict.courses.metaTitle, description: dict.courses.metaDescription };
}

export default async function CoursesPage({ params, searchParams }) {
  const { lang } = await params;
  const query = await searchParams;
  const dict = getDictionary(lang);
  const t = dict.courses;

  const initialCategory = typeof query?.category === 'string' ? query.category : 'all';

  const [courses, categories] = await Promise.all([getCourses({ lang }), getCategories(lang)]);

  const helpHrefs = [
    path('/contact', lang),
    path('/enrollment', lang),
    path('/courses?category=kankor-prep', lang),
  ];
  const helpIcons = ['lightbulb', 'users', 'award'];

  return (
    <>
      <PageHero eyebrow={t.eyebrow} title={t.title} description={t.description}>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <span className="chip bg-white px-4 py-2">
            <Icon name="book" className="h-4 w-4" />
            {fill(t.badgeListed, { count: courses.length })}
          </span>
          <span className="chip bg-white px-4 py-2">
            <Icon name="heart" className="h-4 w-4" />
            {t.badgeFree}
          </span>
          <span className="chip bg-white px-4 py-2">
            <Icon name="download" className="h-4 w-4" />
            {t.badgeDownload}
          </span>
        </div>
      </PageHero>

      <section className="section-tight">
        <div className="container-page">
          <SectionHeading
            eyebrow={t.subjectsEyebrow}
            title={t.subjectsTitle}
            align="left"
            className="mb-10"
          />
          <CourseExplorer
            courses={courses}
            categories={categories}
            initialCategory={initialCategory}
            lang={lang}
            dict={dict}
          />
        </div>
      </section>

      {/* Help choosing */}
      <section className="section pt-4">
        <div className="container-page">
          <div className="grid gap-6 rounded-5xl bg-soft p-8 sm:p-12 lg:grid-cols-3">
            {t.helpCards.map((card, i) => (
              <div
                key={card.title}
                className="rounded-3xl bg-white p-7 shadow-card ring-1 ring-brand-100/70"
              >
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
                  <Icon name={helpIcons[i]} className="h-6 w-6" />
                </span>
                <h3 className="mt-5 text-lg font-bold text-ink">{card.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-ink-soft">{card.body}</p>
                <Link
                  href={helpHrefs[i]}
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-brand-600 hover:text-brand-800"
                >
                  {card.label}
                  <Icon name="arrow-right" className="h-4 w-4 flip-rtl" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

    </>
  );
}
