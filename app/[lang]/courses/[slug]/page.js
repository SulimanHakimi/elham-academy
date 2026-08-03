import Link from 'next/link';
import { notFound } from 'next/navigation';
import Icon from '@/components/Icon';
import EnrollBox from '@/components/EnrollBox';
import CourseCard from '@/components/CourseCard';
import SectionHeading from '@/components/SectionHeading';
import Curriculum from '@/components/Curriculum';
import { getCourse, getCourses, getRelatedCourses } from '@/lib/data';
import { getDictionary } from '@/lib/dictionaries';
import { locales, path } from '@/lib/i18n';
import { formatMinutes, formatNumber, lessonCount } from '@/lib/ui';

export async function generateStaticParams() {
  const courses = await getCourses();
  return locales.flatMap((lang) => courses.map((course) => ({ lang, slug: course.slug })));
}

export async function generateMetadata({ params }) {
  const { slug, lang } = await params;
  const course = await getCourse(slug, lang);

  if (!course) return { title: 'Course not found' };

  return {
    title: course.title,
    description: course.excerpt,
    openGraph: { title: course.title, description: course.excerpt, type: 'article' },
  };
}

export default async function CoursePage({ params }) {
  const { slug, lang } = await params;
  const dict = getDictionary(lang);
  const t = dict.course;
  const common = dict.common;

  const course = await getCourse(slug, lang);
  if (!course) notFound();

  const related = await getRelatedCourses(course, 3, lang);
  const lessons = lessonCount(course);
  const levelLabel = dict.explorer.levels[course.level] || course.level;

  return (
    <>
      {/* Course hero */}
      <section className="bg-mesh pb-14 pt-8 sm:pt-12">
        <div className="container-page">
          <nav aria-label={common.breadcrumb} className="mb-7">
            <ol className="flex flex-wrap items-center gap-2 text-sm text-ink-muted">
              <li>
                <Link href={path('/', lang)} className="hover:text-brand-700">
                  {common.home}
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href={path('/courses', lang)} className="hover:text-brand-700">
                  {dict.nav.courses}
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link
                  href={path(`/courses?category=${course.category}`, lang)}
                  className="hover:text-brand-700"
                >
                  {course.categoryName}
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="font-semibold text-ink">{course.title}</li>
            </ol>
          </nav>

          <div className="grid gap-10 lg:grid-cols-[1.35fr_0.65fr]">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <span className="chip bg-white px-4 py-2">{course.categoryName}</span>
                <span className="chip bg-white px-4 py-2">{levelLabel}</span>
              </div>

              <h1 className="h1 mt-6">{course.title}</h1>
              <p className="lede mt-5 max-w-2xl">{course.excerpt}</p>

              <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
                <div className="flex items-center gap-2 text-sm text-ink-soft">
                  <Icon name="clock" className="h-5 w-5 text-brand-400" />
                  {formatMinutes(course.minutes, lang, dict)} · {formatNumber(lessons, lang)}{' '}
                  {common.lessons}
                </div>

                <div className="flex items-center gap-2 text-sm text-ink-soft">
                  <Icon name="globe" className="h-5 w-5 text-brand-400" />
                  {course.languageLabel || course.language}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="section-tight">
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-[1.35fr_0.65fr]">
            <div>
              {/* Overview */}
              <div className="prose-body">
                <h2 className="h3 mb-4">{t.overview}</h2>
                <p>{course.description}</p>
              </div>

              {/* Outcomes */}
              <div className="mt-10 rounded-4xl bg-soft p-7 sm:p-9">
                <h2 className="h3">{t.outcomesTitle}</h2>
                <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                  {course.outcomes?.map((outcome) => (
                    <li key={outcome} className="flex items-start gap-3">
                      <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal-500/15 text-teal-600">
                        <Icon name="check" className="h-3.5 w-3.5" strokeWidth={3} />
                      </span>
                      <span className="text-[15px] leading-relaxed text-ink-soft">{outcome}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Curriculum */}
              <div className="mt-12">
                <div className="flex flex-wrap items-end justify-between gap-4">
                  <h2 className="h3">{t.curriculum}</h2>
                  <p className="text-sm text-ink-muted">
                    {formatNumber(course.curriculum?.length || 0, lang)} {common.sections} ·{' '}
                    {formatNumber(lessons, lang)} {common.lessons} ·{' '}
                    {formatMinutes(course.minutes, lang, dict)}
                  </p>
                </div>
                <div className="mt-6">
                  <Curriculum modules={course.curriculum || []} lang={lang} dict={dict} />
                </div>
              </div>

              {/* Requirements */}
              <div className="mt-12">
                <h2 className="h3">{t.requirements}</h2>
                <ul className="mt-5 space-y-3.5">
                  {course.requirements?.map((requirement) => (
                    <li key={requirement} className="flex items-start gap-3">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-400" />
                      <span className="text-[15px] leading-relaxed text-ink-soft">{requirement}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

            <aside>
              <EnrollBox course={course} lang={lang} dict={dict} />
            </aside>
          </div>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="section bg-soft">
          <div className="container-page">
            <SectionHeading
              eyebrow={t.relatedEyebrow}
              title={t.relatedTitle}
              align="left"
              action={{ href: path('/courses', lang), label: common.allCourses }}
            />
            <div className="mt-12 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <CourseCard key={item.slug} course={item} lang={lang} dict={dict} />
              ))}
            </div>
          </div>
        </section>
      )}

    </>
  );
}
