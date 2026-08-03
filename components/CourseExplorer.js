'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import Icon from './Icon';
import CourseCard from './CourseCard';
import { accent, formatNumber } from '@/lib/ui';
import { path } from '@/lib/i18n';
import { fill } from '@/lib/dictionaries';

const LEVELS = ['all', 'Beginner', 'Intermediate', 'Advanced'];
const LANGUAGES = ['all', 'Dari', 'Pashto', 'English'];
const SORTS = ['popular', 'rating', 'shortest', 'longest'];

export default function CourseExplorer({
  courses,
  categories,
  initialCategory = 'all',
  lang = 'en',
  dict,
}) {
  const t = dict.explorer;

  const [category, setCategory] = useState(initialCategory);
  const [level, setLevel] = useState('all');
  const [language, setLanguage] = useState('all');
  const [sort, setSort] = useState('popular');
  const [query, setQuery] = useState('');

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();

    let list = courses.filter((course) => {
      if (category !== 'all' && course.category !== category) return false;
      if (level !== 'all' && course.level !== level) return false;
      // A course listed as "Dari & English" matches either language.
      if (language !== 'all' && !(course.language || '').includes(language)) return false;
      if (
        q &&
        !`${course.title} ${course.excerpt} ${course.instructor} ${course.categoryName}`
          .toLowerCase()
          .includes(q)
      )
        return false;
      return true;
    });

    list = [...list].sort((a, b) => {
      if (sort === 'rating') return b.rating - a.rating;
      if (sort === 'shortest') return a.minutes - b.minutes;
      if (sort === 'longest') return b.minutes - a.minutes;
      return b.students - a.students;
    });

    return list;
  }, [courses, category, level, language, sort, query]);

  const reset = () => {
    setCategory('all');
    setLevel('all');
    setLanguage('all');
    setQuery('');
    setSort('popular');
  };

  const filtersActive = category !== 'all' || level !== 'all' || language !== 'all' || query;

  return (
    <div>
      {/* Category tiles */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <button
          type="button"
          onClick={() => setCategory('all')}
          aria-pressed={category === 'all'}
          className={`group rounded-3xl p-5 text-start transition ${
            category === 'all'
              ? 'bg-brand-600 text-white shadow-lift'
              : 'bg-white shadow-card ring-1 ring-brand-100/70 hover:-translate-y-1 hover:shadow-lift'
          }`}
        >
          <span
            className={`inline-flex h-11 w-11 items-center justify-center rounded-2xl ${
              category === 'all' ? 'bg-white/15 text-white' : 'bg-brand-50 text-brand-600'
            }`}
          >
            <Icon name="layers" className="h-5 w-5" />
          </span>
          <span className="mt-4 block text-sm font-bold">{t.allCourses}</span>
          <span className={`text-xs ${category === 'all' ? 'text-white/70' : 'text-ink-muted'}`}>
            {fill(dict.common.availableCount, { count: formatNumber(courses.length, lang) })}
          </span>
        </button>

        {categories.map((cat) => {
          const isActive = category === cat.slug;
          const a = accent('brand');

          return (
            <button
              key={cat.slug}
              type="button"
              onClick={() => setCategory(cat.slug)}
              aria-pressed={isActive}
              className={`group rounded-3xl p-5 text-start transition ${
                isActive
                  ? 'bg-brand-600 text-white shadow-lift'
                  : 'bg-white shadow-card ring-1 ring-brand-100/70 hover:-translate-y-1 hover:shadow-lift'
              }`}
            >
              <span
                className={`inline-flex h-11 w-11 items-center justify-center rounded-2xl ${
                  isActive ? 'bg-white/15 text-white' : a.soft
                }`}
              >
                <Icon name={cat.icon} className="h-5 w-5" />
              </span>
              <span className="mt-4 block text-sm font-bold">{cat.name}</span>
              <span className={`text-xs ${isActive ? 'text-white/70' : 'text-ink-muted'}`}>
                {fill(dict.common.coursesCount, { count: formatNumber(cat.courseCount, lang) })}
              </span>
            </button>
          );
        })}
      </div>

      {/* Toolbar */}
      <div className="mt-10 flex flex-col gap-4 rounded-3xl bg-white p-5 shadow-card ring-1 ring-brand-100/70 lg:flex-row lg:items-center">
        <div className="relative flex-1">
          <Icon
            name="compass"
            className="pointer-events-none absolute top-1/2 h-5 w-5 -translate-y-1/2 text-ink-muted start-4"
          />
          <label htmlFor="course-search" className="sr-only">
            {t.searchLabel}
          </label>
          <input
            id="course-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t.searchPlaceholder}
            className="input ps-12"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <label htmlFor="level-filter" className="sr-only">
            {t.levelLabel}
          </label>
          <select
            id="level-filter"
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            className="input w-auto py-3"
          >
            {LEVELS.map((value) => (
              <option key={value} value={value}>
                {value === 'all' ? t.levels.all : t.levels[value]}
              </option>
            ))}
          </select>

          <label htmlFor="language-filter" className="sr-only">
            {t.languageLabel}
          </label>
          <select
            id="language-filter"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="input w-auto py-3"
          >
            {LANGUAGES.map((value) => (
              <option key={value} value={value}>
                {value === 'all' ? t.languages.all : t.languages[value]}
              </option>
            ))}
          </select>

          <label htmlFor="sort-filter" className="sr-only">
            {t.sortLabel}
          </label>
          <select
            id="sort-filter"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="input w-auto py-3"
          >
            {SORTS.map((value) => (
              <option key={value} value={value}>
                {t.sorts[value]}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
        <p className="text-sm text-ink-muted">
          {t.showing}{' '}
          <span className="font-bold text-ink">{formatNumber(visible.length, lang)}</span> {t.of}{' '}
          {formatNumber(courses.length, lang)} {t.coursesWord}
        </p>
        {filtersActive && (
          <button type="button" onClick={reset} className="btn-ghost text-sm">
            <Icon name="close" className="h-4 w-4" />
            {t.clearFilters}
          </button>
        )}
      </div>

      {visible.length > 0 ? (
        <div className="mt-6 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((course) => (
            <CourseCard key={course.slug} course={course} lang={lang} dict={dict} />
          ))}
        </div>
      ) : (
        <div className="mt-6 rounded-4xl bg-white p-12 text-center shadow-card ring-1 ring-brand-100/70">
          <span className="inline-flex h-16 w-16 items-center justify-center rounded-3xl bg-brand-50 text-brand-600">
            <Icon name="compass" className="h-8 w-8" />
          </span>
          <h3 className="mt-5 text-xl">{t.emptyTitle}</h3>
          <p className="mx-auto mt-3 max-w-md text-[15px] text-ink-soft">{t.emptyBody}</p>
          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <button type="button" onClick={reset} className="btn-outline">
              {t.clearFilters}
            </button>
            <Link href={path('/contact', lang)} className="btn-primary">
              {t.requestCourse}
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
