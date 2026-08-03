import Link from 'next/link';
import Icon from '@/components/Icon';
import PageHero from '@/components/PageHero';
import SectionHeading from '@/components/SectionHeading';
import BlogCard, { FeaturedPost } from '@/components/BlogCard';
import NewsletterForm from '@/components/NewsletterForm';
import { getPosts } from '@/lib/data';
import { getDictionary } from '@/lib/dictionaries';
import { path } from '@/lib/i18n';
import { formatDate, formatNumber } from '@/lib/ui';

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const dict = getDictionary(lang);

  return { title: dict.blog.metaTitle, description: dict.blog.metaDescription };
}

export default async function BlogPage({ params }) {
  const { lang } = await params;
  const dict = getDictionary(lang);
  const t = dict.blog;

  const posts = await getPosts({ lang });
  const featured = posts.find((p) => p.featured) || posts[0];
  const rest = posts.filter((p) => p.slug !== featured?.slug);

  const categories = [...new Set(posts.map((p) => p.category))];

  return (
    <>
      <PageHero eyebrow={t.eyebrow} title={t.title} description={t.description} />

      {/* Featured */}
      {featured && (
        <section className="section-tight">
          <div className="container-page">
            <FeaturedPost post={featured} lang={lang} dict={dict} />
          </div>
        </section>
      )}

      {/* Grid + sidebar */}
      <section className="section pt-4">
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-[1fr_320px]">
            <div>
              <SectionHeading
                eyebrow={t.latestEyebrow}
                title={t.latestTitle}
                align="left"
                className="mb-10"
              />

              <div className="grid gap-7 sm:grid-cols-2">
                {rest.map((post) => (
                  <BlogCard key={post.slug} post={post} lang={lang} dict={dict} />
                ))}
              </div>
            </div>

            <aside className="space-y-8">
              <div className="card p-7">
                <h2 className="text-lg font-bold text-ink">{t.categories}</h2>
                <ul className="mt-5 space-y-2">
                  {categories.map((category) => {
                    const count = posts.filter((p) => p.category === category).length;

                    return (
                      <li key={category}>
                        <span className="flex items-center justify-between rounded-2xl px-4 py-2.5 text-sm font-semibold text-ink-soft transition hover:bg-brand-50 hover:text-brand-700">
                          {category}
                          <span className="text-xs text-ink-muted">{formatNumber(count, lang)}</span>
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div className="card p-7">
                <h2 className="text-lg font-bold text-ink">{t.mostRead}</h2>
                <ol className="mt-5 space-y-5">
                  {posts.slice(0, 4).map((post, i) => (
                    <li key={post.slug} className="flex gap-4">
                      <span className="font-display text-2xl font-extrabold text-brand-200">
                        {formatNumber(i + 1, lang).padStart(2, lang === 'fa' ? '۰' : '0')}
                      </span>
                      <div>
                        <Link
                          href={path(`/blog/${post.slug}`, lang)}
                          className="text-sm font-bold leading-snug text-ink transition hover:text-brand-700"
                        >
                          {post.title}
                        </Link>
                        <p className="mt-1 text-xs text-ink-muted">{formatDate(post.date, lang)}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="rounded-3xl bg-ink-mesh p-7 text-white">
                <h2 className="text-lg font-bold text-white">{t.newsletterTitle}</h2>
                <p className="mt-2 text-sm leading-relaxed text-white/70">{t.newsletterBody}</p>
                <div className="mt-5">
                  <NewsletterForm source="blog-sidebar" variant="dark" dict={dict} />
                </div>
              </div>

              <div className="card p-7">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gold-500/15 text-gold-600">
                  <Icon name="lightbulb" className="h-6 w-6" />
                </span>
                <h2 className="mt-4 text-lg font-bold text-ink">{t.writeTitle}</h2>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{t.writeBody}</p>
                <Link
                  href={path('/contact', lang)}
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-brand-600 hover:text-brand-800"
                >
                  {t.writeCta}
                  <Icon name="arrow-right" className="h-4 w-4 flip-rtl" />
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>

    </>
  );
}
