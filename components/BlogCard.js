import Link from 'next/link';
import Icon from './Icon';
import { accent, formatDate, initials } from '@/lib/ui';
import { path } from '@/lib/i18n';

function PostArt({ post, className = 'h-44' }) {
  const a = accent(post.accent);

  return (
    <div className={`relative overflow-hidden bg-gradient-to-br ${a.thumb} ${className}`}>
      <svg
        className="absolute inset-0 h-full w-full opacity-25"
        viewBox="0 0 400 200"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <circle cx="60" cy="40" r="70" fill="rgba(255,255,255,0.3)" />
        <circle cx="340" cy="170" r="90" fill="rgba(255,255,255,0.2)" />
      </svg>
      <Icon
        name={post.icon || 'book'}
        className="absolute bottom-3 h-24 w-24 text-white/45 end-4"
        strokeWidth={1.25}
      />
      <span className="absolute top-5 inline-flex items-center rounded-full bg-white/95 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-ink start-5">
        {post.category}
      </span>
    </div>
  );
}

export function FeaturedPost({ post, lang = 'en', dict }) {
  const t = dict?.common || {};

  return (
    <article className="card card-hover grid overflow-hidden lg:grid-cols-2">
      <Link href={path(`/blog/${post.slug}`, lang)} aria-label={post.title}>
        <PostArt post={post} className="h-56 lg:h-full lg:min-h-[320px]" />
      </Link>

      <div className="flex flex-col justify-center p-8 lg:p-10">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-semibold text-ink-muted">
          <span className="chip">{t.featured || 'Featured'}</span>
          <span>{formatDate(post.date, lang)}</span>
          <span className="inline-flex items-center gap-1.5">
            <Icon name="clock" className="h-3.5 w-3.5" />
            {post.readTime} {t.minRead || 'min read'}
          </span>
        </div>

        <h3 className="mt-4 font-display text-2xl font-bold leading-snug text-ink sm:text-3xl">
          <Link href={path(`/blog/${post.slug}`, lang)} className="transition hover:text-brand-700">
            {post.title}
          </Link>
        </h3>

        <p className="mt-4 text-[15px] leading-relaxed text-ink-soft">{post.excerpt}</p>

        <div className="mt-7 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-brand-100 text-xs font-bold text-brand-700">
              {initials(post.author)}
            </span>
            <span className="text-sm font-semibold text-ink">{post.author}</span>
          </div>
          <Link
            href={path(`/blog/${post.slug}`, lang)}
            className="inline-flex items-center gap-1.5 text-sm font-bold text-brand-600 hover:text-brand-800"
          >
            {t.readMore || 'Read More'}
            <Icon name="arrow-right" className="h-4 w-4 flip-rtl" />
          </Link>
        </div>
      </div>
    </article>
  );
}

export default function BlogCard({ post, lang = 'en', dict }) {
  const t = dict?.common || {};

  return (
    <article className="card card-hover flex h-full flex-col overflow-hidden">
      <Link href={path(`/blog/${post.slug}`, lang)} aria-label={post.title}>
        <PostArt post={post} />
      </Link>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-3 text-xs font-semibold text-ink-muted">
          <span>{formatDate(post.date, lang)}</span>
          <span aria-hidden="true">•</span>
          <span>
            {post.readTime} {t.minRead || 'min read'}
          </span>
        </div>

        <h3 className="mt-3 text-lg font-bold leading-snug text-ink">
          <Link href={path(`/blog/${post.slug}`, lang)} className="transition hover:text-brand-700">
            {post.title}
          </Link>
        </h3>

        <p className="mt-2.5 line-clamp-3 flex-1 text-sm leading-relaxed text-ink-soft">
          {post.excerpt}
        </p>

        <div className="mt-5 flex items-center justify-between gap-3 border-t border-brand-50 pt-4">
          <span className="text-xs font-semibold text-ink-muted">
            {t.by || 'By'} {post.author}
          </span>
          <Link
            href={path(`/blog/${post.slug}`, lang)}
            className="inline-flex items-center gap-1.5 text-sm font-bold text-brand-600 hover:text-brand-800"
          >
            {t.readMore || 'Read More'}
            <Icon name="arrow-right" className="h-4 w-4 flip-rtl" />
          </Link>
        </div>
      </div>
    </article>
  );
}
