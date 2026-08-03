import Link from 'next/link';
import Icon from '@/components/Icon';
import PageHero from '@/components/PageHero';
import SectionHeading from '@/components/SectionHeading';
import FeatureCard from '@/components/FeatureCard';
import StatsBand from '@/components/StatsBand';
import AboutBlock from '@/components/AboutBlock';
import { TeachIllustration } from '@/components/Illustrations';
import {
  getInstructors,
  about,
  getAboutFeatures,
  getValues,
  getMilestones,
  getStats,
  getInstructorPerks,
  getSupportWays,
} from '@/lib/data';
import { getDictionary } from '@/lib/dictionaries';
import { path } from '@/lib/i18n';
import { formatNumber, initials } from '@/lib/ui';

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const dict = getDictionary(lang);

  return { title: dict.about.metaTitle, description: dict.about.metaDescription };
}

export default async function AboutPage({ params }) {
  const { lang } = await params;
  const dict = getDictionary(lang);
  const t = dict.about;

  const instructors = await getInstructors(8, lang);
  const aboutFeatures = getAboutFeatures(lang);
  const values = getValues(lang);
  const milestones = getMilestones(lang);
  const stats = getStats(lang);
  const instructorPerks = getInstructorPerks(lang);
  const supportWays = getSupportWays(lang);

  return (
    <>
      <PageHero
        eyebrow={t.eyebrow}
        title={t.title}
        description={t.description}
        primary={{ href: path('/courses', lang), label: dict.common.browseCourses }}
        secondary={{ href: path('/contact', lang), label: dict.common.talkToUs }}
      />

      {/* The institution, in its own words */}
      <section className="section-tight">
        <div className="container-page">
          <SectionHeading
            eyebrow={t.institutionEyebrow}
            title={t.institutionTitle}
            description={t.institutionDescription}
            className="mb-12"
          />

          <div className="space-y-7">
            <AboutBlock block={about.whatIs} accentName="brand" lang={lang} />
            <AboutBlock block={about.why} accentName="gold" lang={lang} />
            <AboutBlock block={about.whoFor} accentName="teal" lang={lang} />
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section id="mission" className="section bg-soft">
        <div className="container-page">
          <SectionHeading eyebrow={t.missionEyebrow} title={t.missionTitle} className="mb-12" />

          <div className="space-y-7">
            <AboutBlock block={about.mission} accentName="brand" lang={lang} />
            <AboutBlock block={about.vision} accentName="gold" lang={lang} />
          </div>
        </div>
      </section>

      {/* Access features */}
      <section className="section bg-soft">
        <div className="container-page">
          <SectionHeading
            eyebrow={t.howEyebrow}
            title={t.howTitle}
            description={t.howDescription}
            className="mb-12"
          />

          <div className="grid gap-6 md:grid-cols-3">
            {aboutFeatures.map((feature, i) => (
              <FeatureCard
                key={feature.title}
                feature={feature}
                accentName={['brand', 'gold', 'teal'][i]}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="section-tight">
        <div className="container-page">
          <div className="rounded-5xl bg-ink-mesh px-6 py-14 sm:px-12">
            <SectionHeading
              eyebrow={t.numbersEyebrow}
              title={t.numbersTitle}
              description={t.numbersDescription}
              light
              className="mb-10"
            />
            <StatsBand stats={stats} light lang={lang} />
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section">
        <div className="container-page">
          <SectionHeading eyebrow={t.valuesEyebrow} title={t.valuesTitle} className="mb-12" />

          <div className="grid gap-6 sm:grid-cols-2">
            {values.map((value, i) => (
              <div key={value.title} className="card p-8">
                <span className="font-display text-4xl font-extrabold text-brand-200">
                  {formatNumber(i + 1, lang).padStart(2, lang === 'fa' ? '۰' : '0')}
                </span>
                <h3 className="mt-3 text-xl font-bold text-ink">{value.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section bg-soft">
        <div className="container-page">
          <SectionHeading
            eyebrow={t.milestonesEyebrow}
            title={t.milestonesTitle}
            className="mb-14"
          />

          <ol className="relative mx-auto max-w-3xl border-brand-200 ps-8 border-s-2 sm:ps-12">
            {milestones.map((milestone) => (
              <li key={milestone.year} className="relative pb-12 last:pb-0">
                <span className="absolute flex h-8 w-8 items-center justify-center rounded-full bg-brand-600 text-[11px] font-bold text-white start-[-2.6rem] sm:h-10 sm:w-10 sm:text-xs sm:start-[-3.6rem]">
                  {formatNumber(Number(milestone.year) % 100, lang)}
                </span>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-600">
                  {formatNumber(Number(milestone.year), lang).replace(/[,،]/g, '')}
                </p>
                <h3 className="mt-2 text-xl font-bold text-ink">{milestone.title}</h3>
                <p className="mt-2.5 text-[15px] leading-relaxed text-ink-soft">
                  {milestone.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Teachers */}
      <section id="instructors" className="section">
        <div className="container-page">
          <SectionHeading
            eyebrow={t.teachersEyebrow}
            title={t.teachersTitle}
            description={t.teachersDescription}
            className="mb-12"
          />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {instructors.map((instructor) => (
              <div key={instructor.slug} className="card card-hover p-6 text-center">
                <span className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-brand-400 to-brand-700 font-display text-lg font-extrabold text-white">
                  {initials(instructor.name)}
                </span>
                <h3 className="mt-4 text-base font-bold text-ink">{instructor.name}</h3>
                <p className="mt-1 text-xs font-semibold text-brand-600">{instructor.role}</p>
                <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-ink-soft">
                  {instructor.bio}
                </p>
                <div className="mt-4 flex items-center justify-center gap-4 border-t border-brand-50 pt-4 text-xs text-ink-muted">
                  <span className="inline-flex items-center gap-1.5">
                    <Icon name="pin" className="h-3.5 w-3.5" />
                    {instructor.location}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Icon name="users" className="h-3.5 w-3.5" />
                    {formatNumber(instructor.learners, lang)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Support us */}
      <section className="section pt-0">
        <div className="container-page">
          <div className="grid items-center gap-12 rounded-5xl bg-soft p-8 sm:p-12 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <SectionHeading
                eyebrow={t.supportEyebrow}
                title={t.supportTitle}
                description={t.supportDescription}
                align="left"
              />
              <ul className="mt-8 grid gap-4 sm:grid-cols-2">
                {instructorPerks.map((perk) => (
                  <li key={perk} className="flex items-start gap-3 rounded-2xl bg-white p-4">
                    <Icon
                      name="check"
                      className="mt-0.5 h-4 w-4 shrink-0 text-brand-600"
                      strokeWidth={3}
                    />
                    <span className="text-sm font-semibold text-ink">{perk}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-wrap gap-3">
                {supportWays.map((way) => (
                  <Link key={way.title} href={path(way.action.href, lang)} className="btn-outline">
                    <Icon name={way.icon} className="h-4 w-4" />
                    {way.action.label}
                  </Link>
                ))}
              </div>
            </div>

            <TeachIllustration className="mx-auto w-full max-w-md" />
          </div>
        </div>
      </section>

    </>
  );
}
