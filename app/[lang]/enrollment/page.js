import Link from 'next/link';
import Icon from '@/components/Icon';
import PageHero from '@/components/PageHero';
import SectionHeading from '@/components/SectionHeading';
import AccessCard from '@/components/AccessCard';
import Testimonials from '@/components/Testimonials';
import FaqAccordion from '@/components/FaqAccordion';
import { getPlans, getTestimonials, getFaqs, getSupportWays } from '@/lib/data';
import { getDictionary } from '@/lib/dictionaries';
import { path } from '@/lib/i18n';
import { formatNumber } from '@/lib/ui';

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const dict = getDictionary(lang);

  return { title: dict.enrollment.metaTitle, description: dict.enrollment.metaDescription };
}

/** Which access routes include which feature, by row index of `dict.enrollment.comparison`. */
const MATRIX = [
  [true, true, true],
  [true, true, true],
  [true, true, true],
  [true, true, true],
  [true, true, true],
  [true, true, true],
  [false, true, false],
  [false, true, false],
  [false, false, true],
  [false, false, true],
  [false, false, true],
];

const STEP_ICONS = ['user', 'book', 'play', 'award'];

export default async function EnrollmentPage({ params }) {
  const { lang } = await params;
  const dict = getDictionary(lang);
  const t = dict.enrollment;

  const [plans, testimonials, faqs] = await Promise.all([
    getPlans(lang),
    getTestimonials(3, lang),
    getFaqs(undefined, lang),
  ]);

  const supportWays = getSupportWays(lang);

  return (
    <>
      <PageHero eyebrow={t.eyebrow} title={t.title} description={t.description}>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {t.badges.map((badge) => (
            <span key={badge} className="chip bg-white px-4 py-2">
              <Icon name="check" className="h-4 w-4" strokeWidth={3} />
              {badge}
            </span>
          ))}
        </div>
      </PageHero>

      {/* Access routes */}
      <section className="section-tight">
        <div className="container-page">
          <div className="grid items-start gap-7 lg:grid-cols-3">
            {plans.map((plan) => (
              <AccessCard key={plan.slug} plan={plan} lang={lang} dict={dict} />
            ))}
          </div>

          <p className="mt-10 text-center text-sm text-ink-muted">
            {t.fundedNote}{' '}
            <Link
              href={path('/contact', lang)}
              className="font-bold text-brand-600 hover:text-brand-800"
            >
              {t.fundedLink}
            </Link>
            .
          </p>
        </div>
      </section>

      {/* How it works */}
      <section className="section">
        <div className="container-page">
          <SectionHeading eyebrow={t.stepsEyebrow} title={t.stepsTitle} className="mb-12" />

          <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {t.steps.map((step, i) => (
              <li key={step.title} className="card p-7">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
                    <Icon name={STEP_ICONS[i]} className="h-5 w-5" />
                  </span>
                  <span className="font-display text-3xl font-extrabold text-brand-200">
                    {formatNumber(i + 1, lang).padStart(2, lang === 'fa' ? '۰' : '0')}
                  </span>
                </div>
                <h3 className="mt-5 text-lg font-bold text-ink">{step.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-ink-soft">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Comparison */}
      <section className="section pt-0">
        <div className="container-page">
          <SectionHeading
            eyebrow={t.compareEyebrow}
            title={t.compareTitle}
            description={t.compareDescription}
            className="mb-12"
          />

          <div className="overflow-x-auto rounded-4xl bg-white shadow-card ring-1 ring-brand-100/70">
            <table className="w-full min-w-[640px] border-collapse text-start">
              <caption className="sr-only">{t.compareCaption}</caption>
              <thead>
                <tr className="border-b border-brand-100">
                  <th scope="col" className="px-7 py-5 text-sm font-bold text-ink text-start">
                    {t.included}
                  </th>
                  {t.columns.map((name) => (
                    <th
                      key={name}
                      scope="col"
                      className="px-7 py-5 text-center text-sm font-bold text-ink"
                    >
                      {name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-50">
                {t.comparison.map((feature, rowIndex) => (
                  <tr key={feature} className="transition hover:bg-brand-50/40">
                    <th
                      scope="row"
                      className="px-7 py-4 text-sm font-medium text-ink-soft text-start"
                    >
                      {feature}
                    </th>
                    {MATRIX[rowIndex].map((included, colIndex) => (
                      <td key={colIndex} className="px-7 py-4 text-center">
                        {included ? (
                          <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-teal-500/10 text-teal-600">
                            <Icon name="check" className="h-4 w-4" strokeWidth={3} />
                          </span>
                        ) : (
                          <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-brand-50 text-ink-muted">
                            <Icon name="minus" className="h-4 w-4" strokeWidth={3} />
                          </span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* How the institution is supported */}
      <section className="section-tight">
        <div className="container-page">
          <div className="rounded-5xl bg-soft p-8 sm:p-12">
            <SectionHeading
              eyebrow={t.supportEyebrow}
              title={t.supportTitle}
              description={t.supportDescription}
              className="mb-10"
            />

            <div className="grid gap-5 md:grid-cols-3">
              {supportWays.map((way) => (
                <div key={way.title} className="rounded-3xl bg-white p-7 shadow-soft">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
                    <Icon name={way.icon} className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 text-lg font-bold text-ink">{way.title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-ink-soft">{way.description}</p>
                  <Link
                    href={path(way.action.href, lang)}
                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-brand-600 hover:text-brand-800"
                  >
                    {way.action.label}
                    <Icon name="arrow-right" className="h-4 w-4 flip-rtl" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section">
        <div className="container-page">
          <SectionHeading
            eyebrow={t.testimonialsEyebrow}
            title={t.testimonialsTitle}
            className="mb-12"
          />
          <Testimonials testimonials={testimonials} />
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="section bg-soft">
        <div className="container-page">
          <SectionHeading
            eyebrow={t.faqEyebrow}
            title={t.faqTitle}
            description={t.faqDescription}
            className="mb-12"
          />
          <FaqAccordion faqs={faqs} />

          <p className="mt-10 text-center text-sm text-ink-soft">
            {t.stillNotSure}{' '}
            <Link
              href={path('/contact', lang)}
              className="font-bold text-brand-600 hover:text-brand-800"
            >
              {t.askDirectly}
            </Link>
            .
          </p>
        </div>
      </section>

    </>
  );
}
