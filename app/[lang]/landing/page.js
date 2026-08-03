import Link from 'next/link';
import Icon from '@/components/Icon';
import SectionHeading from '@/components/SectionHeading';
import CourseCard from '@/components/CourseCard';
import FeatureCard from '@/components/FeatureCard';
import Testimonials from '@/components/Testimonials';
import {
  HeroIllustration,
  TeachIllustration,
  CommunityIllustration,
} from '@/components/Illustrations';
import { getCourses, getTestimonials, getFeatures, getInstructorPerks } from '@/lib/data';
import { getDictionary } from '@/lib/dictionaries';
import { path } from '@/lib/i18n';

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const dict = getDictionary(lang);

  return { title: dict.landing.metaTitle, description: dict.landing.metaDescription };
}

export default async function LandingPage({ params }) {
  const { lang } = await params;
  const dict = getDictionary(lang);
  const t = dict.landing;

  const [courses, testimonials] = await Promise.all([
    getCourses({ popular: true, limit: 6, lang }),
    getTestimonials(3, lang),
  ]);

  const features = getFeatures(lang);
  const instructorPerks = getInstructorPerks(lang);

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
                {t.titleA} <span className="text-gradient">{t.titleHighlight}</span>
                {t.titleB}
              </h1>
              <p className="lede mt-6 max-w-xl">{t.lede}</p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link href={path('/courses', lang)} className="btn-primary">
                  {t.primaryCta}
                  <Icon name="arrow-right" className="h-4 w-4 flip-rtl" />
                </Link>
                <Link href="#how-to-join" className="btn-outline">
                  {t.secondaryCta}
                </Link>
              </div>

              <ul className="mt-9 flex flex-wrap gap-x-7 gap-y-3 text-sm font-semibold text-ink-soft">
                {t.badges.map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <Icon name="check" className="h-4 w-4 text-teal-500" strokeWidth={2.5} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <HeroIllustration className="mx-auto w-full max-w-xl animate-fade-up" />
          </div>
        </div>
      </section>

      {/* Six features */}
      <section className="section">
        <div className="container-page">
          <SectionHeading
            eyebrow={t.featuresEyebrow}
            title={t.featuresTitle}
            description={t.featuresDescription}
            className="mb-12"
          />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, i) => (
              <FeatureCard
                key={feature.title}
                feature={feature}
                accentName={['brand', 'gold', 'teal', 'gold', 'brand', 'teal'][i]}
              />
            ))}
          </div>
        </div>
      </section>

      {/* How to join */}
      <section id="how-to-join" className="section bg-soft">
        <div className="container-page">
          <SectionHeading
            eyebrow={t.joinEyebrow}
            title={t.joinTitle}
            description={t.joinDescription}
            className="mb-12"
          />

          <div className="mx-auto grid max-w-4xl gap-7 md:grid-cols-2">
            {t.routes.map((tier, index) => {
              const isFeatured = index === 1;

              return (
                <div
                  key={tier.name}
                  className={`flex flex-col rounded-4xl p-8 ${
                    isFeatured
                      ? 'bg-ink-mesh text-white shadow-lift'
                      : 'bg-white shadow-card ring-1 ring-brand-100/70'
                  }`}
                >
                  <h3 className={`text-xl font-bold ${isFeatured ? 'text-white' : 'text-ink'}`}>
                    {tier.name}
                  </h3>
                  <p className={`mt-1.5 text-sm ${isFeatured ? 'text-white/70' : 'text-ink-muted'}`}>
                    {tier.tagline}
                  </p>

                  <p
                    className={`mt-7 font-display text-5xl font-extrabold leading-none ${
                      isFeatured ? 'text-white' : 'text-ink'
                    }`}
                  >
                    {tier.cost}
                  </p>

                  <p
                    className={`mt-4 text-[15px] leading-relaxed ${
                      isFeatured ? 'text-white/75' : 'text-ink-soft'
                    }`}
                  >
                    {tier.description}
                  </p>

                  <ul className="mt-6 flex-1 space-y-3">
                    {tier.points.map((point) => (
                      <li key={point} className="flex items-start gap-3 text-sm">
                        <Icon
                          name="check"
                          className={`mt-0.5 h-4 w-4 shrink-0 ${
                            isFeatured ? 'text-teal-400' : 'text-teal-600'
                          }`}
                          strokeWidth={3}
                        />
                        <span className={isFeatured ? 'text-white/85' : 'text-ink-soft'}>{point}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={path('/enrollment', lang)}
                    className={`mt-8 w-full ${isFeatured ? 'btn-gold' : 'btn-outline'}`}
                  >
                    {tier.cta}
                    <Icon name="arrow-right" className="h-4 w-4 flip-rtl" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Popular courses */}
      <section className="section">
        <div className="container-page">
          <SectionHeading
            eyebrow={t.popularEyebrow}
            title={t.popularTitle}
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

      {/* Get started */}
      <section className="section bg-soft">
        <div className="container-page">
          <div className="grid items-center gap-14 lg:grid-cols-2">
            <CommunityIllustration className="w-full max-w-xl" />

            <div>
              <SectionHeading
                eyebrow={t.startedEyebrow}
                title={t.startedTitle}
                description={t.startedDescription}
                align="left"
              />

              <ul className="mt-9 space-y-5">
                {t.startedPoints.map((point) => (
                  <li key={point} className="flex items-start gap-4">
                    <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-teal-500/10 text-teal-600">
                      <Icon name="check" className="h-4 w-4" strokeWidth={3} />
                    </span>
                    <span className="pt-1.5 text-[15px] leading-relaxed text-ink-soft">{point}</span>
                  </li>
                ))}
              </ul>

              <Link href={path('/courses', lang)} className="btn-primary mt-10">
                {dict.common.browseCourses}
                <Icon name="arrow-right" className="h-4 w-4 flip-rtl" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Become a teacher */}
      <section className="section">
        <div className="container-page">
          <div className="grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr]">
            <TeachIllustration className="w-full max-w-lg lg:order-2" />

            <div className="lg:order-1">
              <SectionHeading
                eyebrow={t.teachEyebrow}
                title={t.teachTitle}
                description={t.teachDescription}
                align="left"
              />

              <ul className="mt-9 grid gap-4 sm:grid-cols-2">
                {instructorPerks.map((perk) => (
                  <li key={perk} className="flex items-start gap-3 rounded-2xl bg-brand-50 p-4">
                    <Icon
                      name="check"
                      className="mt-0.5 h-4 w-4 shrink-0 text-brand-600"
                      strokeWidth={3}
                    />
                    <span className="text-sm font-semibold text-ink">{perk}</span>
                  </li>
                ))}
              </ul>

              <Link href={path('/contact', lang)} className="btn-primary mt-9">
                {t.teachCta}
                <Icon name="arrow-right" className="h-4 w-4 flip-rtl" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section bg-soft">
        <div className="container-page">
          <SectionHeading
            eyebrow={t.testimonialsEyebrow}
            title={t.testimonialsTitle}
            className="mb-12"
          />
          <Testimonials testimonials={testimonials} />
        </div>
      </section>

    </>
  );
}
