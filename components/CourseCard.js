import Link from 'next/link';
import Icon from './Icon';
import { accent } from '@/lib/ui';
import { path } from '@/lib/i18n';

/**
 * Generated course artwork — a gradient panel with the category icon.
 * Deliberately plain: no rating, no price label, no teacher name.
 */
export function CourseThumb({ course, className = 'h-40' }) {
  const a = accent(course.accent);

  return (
    <div className={`relative overflow-hidden rounded-t-3xl bg-gradient-to-br ${a.thumb} ${className}`}>
      <svg
        className="absolute inset-0 h-full w-full opacity-25"
        viewBox="0 0 400 200"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <circle cx="330" cy="30" r="70" fill="rgba(255,255,255,0.35)" />
        <circle cx="60" cy="180" r="90" fill="rgba(255,255,255,0.22)" />
        <path d="M0 150 Q100 100 200 140 T400 120 V200 H0Z" fill="rgba(255,255,255,0.18)" />
      </svg>

      <span className="absolute top-5 inline-flex items-center rounded-full bg-white/95 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-ink start-5">
        {course.categoryName}
      </span>

      <Icon
        name={course.icon || 'book'}
        className="absolute -bottom-4 h-24 w-24 text-white/45 end-4"
        strokeWidth={1.25}
      />
    </div>
  );
}

/**
 * Course card, stripped to essentials: the artwork, the subject, the course
 * name and a way in. Everything else was noise on a small screen.
 */
export default function CourseCard({ course, lang = 'en', dict, compact = false }) {
  const t = dict?.common || {};
  const href = path(`/courses/${course.slug}`, lang);

  return (
    <article className="card card-hover group flex h-full flex-col overflow-hidden">
      <Link href={href} aria-label={course.title}>
        <CourseThumb course={course} className={compact ? 'h-32' : 'h-40'} />
      </Link>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-lg font-bold leading-snug text-ink">
          <Link href={href} className="transition hover:text-brand-700">
            {course.title}
          </Link>
        </h3>

        <Link
          href={href}
          className="mt-5 inline-flex items-center gap-1.5 self-start text-sm font-bold text-brand-600 transition group-hover:gap-2.5 group-hover:text-brand-800"
        >
          {t.viewDetails || 'View Details'}
          <Icon name="arrow-right" className="h-4 w-4 flip-rtl" />
        </Link>
      </div>
    </article>
  );
}
