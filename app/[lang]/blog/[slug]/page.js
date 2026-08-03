import Link from 'next/link';
import { notFound } from 'next/navigation';
import Icon from '@/components/Icon';
import BlogCard from '@/components/BlogCard';
import SectionHeading from '@/components/SectionHeading';
import NewsletterForm from '@/components/NewsletterForm';
import { getPost, getPosts } from '@/lib/data';
import { getDictionary } from '@/lib/dictionaries';
import { locales, path } from '@/lib/i18n';
import { accent, formatDate, initials } from '@/lib/ui';

export async function generateStaticParams() {
  const posts = await getPosts();
  return locales.flatMap((lang) => posts.map((post) => ({ lang, slug: post.slug })));
}

export async function generateMetadata({ params }) {
  const { slug, lang } = await params;
  const post = await getPost(slug, lang);

  if (!post) return { title: 'Post not found' };

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
    },
  };
}

export default async function BlogPostPage({ params }) {
  const { slug, lang } = await params;
  const dict = getDictionary(lang);
  const t = dict.blog;
  const common = dict.common;

  const post = await getPost(slug, lang);
  if (!post) notFound();

  const posts = await getPosts({ lang });
  const related = posts.filter((p) => p.slug !== post.slug).slice(0, 3);
  const a = accent(post.accent);

  // `translated` is false only when this locale has no overlay for the post.
  const showTranslationNotice = lang !== 'en' && post.translated === false;

  return (
    <>
      <article>
        {/* Header */}
        <header className="bg-mesh pb-14 pt-8 sm:pt-12">
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
                  <Link href={path('/blog', lang)} className="hover:text-brand-700">
                    {dict.nav.blog}
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li className="font-semibold text-ink">{post.category}</li>
              </ol>
            </nav>

            <div className="mx-auto max-w-3xl text-center">
              <span
                className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider ${a.soft}`}
              >
                <Icon name={post.icon} className="h-4 w-4" />
                {post.category}
              </span>

              <h1 className="h1 mt-6">{post.title}</h1>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-ink-soft">
                <span className="flex items-center gap-2.5">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-brand-600 text-xs font-bold text-white">
                    {initials(post.author)}
                  </span>
                  <span className="font-semibold text-ink">{post.author}</span>
                </span>
                <span className="flex items-center gap-2">
                  <Icon name="clock" className="h-4 w-4 text-brand-400" />
                  {post.readTime} {common.minRead}
                </span>
                <time dateTime={post.date}>{formatDate(post.date, lang)}</time>
              </div>
            </div>
          </div>
        </header>

        {/* Body */}
        <div className="section-tight">
          <div className="container-page">
            <div className="mx-auto max-w-3xl">
              {showTranslationNotice && (
                <p className="mb-8 flex items-start gap-3 rounded-2xl bg-gold-500/10 p-5 text-sm text-ink-soft">
                  <Icon name="lightbulb" className="mt-0.5 h-5 w-5 shrink-0 text-gold-600" />
                  {t.notTranslated}
                </p>
              )}

              <p className="border-brand-300 ps-6 font-display text-xl leading-relaxed text-ink border-s-4">
                {post.excerpt}
              </p>

              <div className="prose-body mt-10 text-[17px]">
                {post.body?.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>

              {/* Share / back */}
              <div className="mt-12 flex flex-wrap items-center justify-between gap-6 border-t border-brand-100 pt-8">
                <Link
                  href={path('/blog', lang)}
                  className="inline-flex items-center gap-2 text-sm font-bold text-brand-600 hover:text-brand-800"
                >
                  <Icon name="arrow-left" className="h-4 w-4 flip-rtl" />
                  {t.backToPosts}
                </Link>

                <div className="flex items-center gap-3">
                  <span className="text-sm font-semibold text-ink-muted">{t.share}</span>
                  {[
                    { icon: 'facebook', label: 'Facebook' },
                    { icon: 'x', label: 'X' },
                    { icon: 'chat', label: 'WhatsApp' },
                  ].map((item) => (
                    <span
                      key={item.label}
                      aria-label={`${t.share} — ${item.label}`}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-50 text-brand-600"
                    >
                      <Icon name={item.icon} className="h-4 w-4" />
                    </span>
                  ))}
                </div>
              </div>

              {/* Newsletter */}
              <div className="mt-12 rounded-4xl bg-ink-mesh p-8 text-white sm:p-10">
                <h2 className="text-2xl text-white">{t.keepReadingTitle}</h2>
                <p className="mt-2.5 text-[15px] leading-relaxed text-white/70">{t.keepReadingBody}</p>
                <div className="mt-6">
                  <NewsletterForm source={`post-${post.slug}`} variant="dark" dict={dict} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Related */}
      <section className="section bg-soft">
        <div className="container-page">
          <SectionHeading
            eyebrow={t.moreEyebrow}
            title={t.moreTitle}
            align="left"
            action={{ href: path('/blog', lang), label: t.allPosts }}
          />
          <div className="mt-12 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <BlogCard key={item.slug} post={item} lang={lang} dict={dict} />
            ))}
          </div>
        </div>
      </section>

    </>
  );
}
