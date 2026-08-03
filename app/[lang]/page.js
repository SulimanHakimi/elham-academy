import Link from 'next/link';
import Icon from '@/components/Icon';
import SectionHeading from '@/components/SectionHeading';
import CourseCard from '@/components/CourseCard';
import FeatureCard from '@/components/FeatureCard';
import StatsBand from '@/components/StatsBand';
import Testimonials from '@/components/Testimonials';
import { HeroIllustration, LearningIllustration } from '@/components/Illustrations';
import { getCourses, getTestimonials, getFeatures, getWhyFeatures, getStats } from '@/lib/data';
import { getDictionary } from '@/lib/dictionaries';
import { path } from '@/lib/i18n';

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const dict = getDictionary(lang);

  return { title: dict.home.metaTitle, description: dict.home.metaDescription };
}

export default async function HomePage({ params }) {
  const { lang } = await params;
  const dict = getDictionary(lang);
  const t = dict.home;

  const [courses, testimonials] = await Promise.all([
    getCourses({ popular: true, limit: 6, lang }),
    getTestimonials(3, lang),
  ]);

  const features = getFeatures(lang);
  const whyFeatures = getWhyFeatures(lang);
  const stats = getStats(lang);

  const heroStats = [
    { value: lang === 'fa' ? '۲۴,۸۰۰+' : '24,800+', label: t.statGirls },
    { value: lang === 'fa' ? '۱۲۰+' : '120+', label: t.statCourses },
    { value: lang === 'fa' ? '۳۴' : '34', label: t.statProvinces },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-mesh pb-20 pt-10 sm:pt-14">
        <div className="container-page">
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="animate-fade-up">
              <p className="eyebrow">
                <span className="h-1.5 w-1.5 rounded-full bg-gold-500" />
                {t.eyebrow}
              </p>
              <h1 className="h1">
                {t.titleA} <span className="text-gradient">{t.titleHighlight}</span> {t.titleB}
              </h1>
              <p className="lede mt-6 max-w-xl">{t.lede}</p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link href={path('/courses', lang)} className="btn-primary">
                  {t.primaryCta}
                  <Icon name="arrow-right" className="h-4 w-4 flip-rtl" />
                </Link>
                <Link href={path('/about', lang)} className="btn-outline">
                  {t.secondaryCta}
                </Link>
              </div>

              <dl className="mt-11 grid max-w-lg grid-cols-3 gap-6">
                {heroStats.map((item) => (
                  <div key={item.label}>
                    <dd className="font-display text-2xl font-extrabold text-ink sm:text-3xl">
                      {item.value}
                    </dd>
                    <dt className="mt-1 text-xs font-bold uppercase tracking-[0.14em] text-ink-muted">
                      {item.label}
                    </dt>
                  </div>
                ))}
              </dl>
            </div>

            <div className="animate-fade-up">
              <HeroIllustration className="mx-auto w-full max-w-xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Three headline features */}
      <section className="section-tight">
        <div className="container-page">
          <div className="grid gap-6 md:grid-cols-3">
            {[features[0], features[1], features[3]].map((feature, i) => (
              <FeatureCard
                key={feature.title}
                feature={feature}
                accentName={['brand', 'gold', 'teal'][i]}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Popular courses */}
      <section className="section bg-soft">
        <div className="container-page">
          <SectionHeading
            eyebrow={t.popularEyebrow}
            title={t.popularTitle}
            description={t.popularDescription}
            align="left"
            action={{ href: path('/courses', lang), label: dict.common.allCourses }}
          />

          <div className="mt-12 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
              <CourseCard key={course.slug} course={course} lang={lang} dict={dict} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Elham */}
      <section className="section">
        <div className="container-page">
          <div className="grid items-center gap-14 lg:grid-cols-2">
            <LearningIllustration className="w-full max-w-xl lg:order-2" />

            <div className="lg:order-1">
              <SectionHeading
                eyebrow={t.whyEyebrow}
                title={t.whyTitle}
                description={t.whyDescription}
                align="left"
              />

              <div className="mt-9 space-y-7">
                {whyFeatures.map((feature, i) => (
                  <FeatureCard
                    key={feature.title}
                    feature={feature}
                    variant="plain"
                    accentName={['brand', 'teal', 'gold'][i]}
                  />
                ))}
              </div>

              <Link href={path('/about', lang)} className="btn-primary mt-10">
                {t.whyCta}
                <Icon name="arrow-right" className="h-4 w-4 flip-rtl" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="section-tight">
        <div className="container-page">
          <div className="rounded-5xl bg-mesh px-6 py-12 sm:px-10">
            <SectionHeading eyebrow={t.statsEyebrow} title={t.statsTitle} className="mb-10" />
            <StatsBand stats={stats} lang={lang} />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section pt-0">
        <div className="container-page">
          <SectionHeading
            eyebrow={t.testimonialsEyebrow}
            title={t.testimonialsTitle}
            description={t.testimonialsDescription}
            className="mb-12"
          />
          <Testimonials testimonials={testimonials} />
        </div>
      </section>

    </>
  );
}
