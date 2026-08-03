import Link from 'next/link';
import Icon from '@/components/Icon';
import SectionHeading from '@/components/SectionHeading';
import ContactForm from '@/components/ContactForm';
import FaqAccordion from '@/components/FaqAccordion';
import { ContactIllustration } from '@/components/Illustrations';
import { getFaqs, getSite, getContactChannels } from '@/lib/data';
import { getDictionary } from '@/lib/dictionaries';
import { path } from '@/lib/i18n';

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const dict = getDictionary(lang);

  return { title: dict.contact.metaTitle, description: dict.contact.metaDescription };
}

export default async function ContactPage({ params }) {
  const { lang } = await params;
  const dict = getDictionary(lang);
  const t = dict.contact;

  const faqs = await getFaqs(4, lang);
  const site = getSite(lang);
  const contactChannels = getContactChannels(lang);

  const officeDetails = [
    { icon: 'pin', label: t.address, value: site.address, ltr: false },
    { icon: 'clock', label: t.openingHours, value: site.hours, ltr: false },
    { icon: 'phone', label: t.phoneLabel, value: site.phone, ltr: true },
    { icon: 'mail', label: t.emailLabel, value: `${site.email} · ${site.supportEmail}`, ltr: true },
  ];

  return (
    <>
      {/* Hero + form */}
      <section className="relative overflow-hidden bg-mesh pb-16 pt-10 sm:pt-14">
        <div className="container-page">
          <div className="grid items-start gap-12 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="animate-fade-up lg:pt-6">
              <p className="eyebrow">
                <span className="h-1.5 w-1.5 rounded-full bg-gold-500" />
                {t.eyebrow}
              </p>
              <h1 className="h1">{t.title}</h1>
              <p className="lede mt-6 max-w-lg">{t.lede}</p>

              <ContactIllustration className="mt-10 hidden w-full max-w-md lg:block" />
            </div>

            <div className="animate-fade-up">
              <ContactForm dict={dict} lang={lang} />
            </div>
          </div>
        </div>
      </section>

      {/* Channels */}
      <section className="section-tight">
        <div className="container-page">
          <div className="grid gap-6 md:grid-cols-3">
            {contactChannels.map((channel) => (
              <div key={channel.title} className="card card-hover p-7">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
                  <Icon name={channel.icon} className="h-6 w-6" />
                </span>
                <h2 className="mt-5 text-lg font-bold text-ink">{channel.title}</h2>
                <p className="mt-2 text-sm font-semibold text-brand-600">{channel.value}</p>
                <p className="mt-2.5 text-sm leading-relaxed text-ink-soft">{channel.description}</p>
                <a
                  href={channel.href}
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-brand-600 hover:text-brand-800"
                  {...(channel.href.startsWith('http')
                    ? { target: '_blank', rel: 'noreferrer noopener' }
                    : {})}
                >
                  {channel.action}
                  <Icon name="arrow-right" className="h-4 w-4 flip-rtl" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Office details */}
      <section className="section-tight">
        <div className="container-page">
          <div className="grid gap-10 rounded-5xl bg-soft p-8 sm:p-12 lg:grid-cols-2 lg:items-center">
            <div>
              <SectionHeading
                eyebrow={t.visitEyebrow}
                title={t.visitTitle}
                description={t.visitDescription}
                align="left"
              />

              <dl className="mt-8 space-y-5">
                {officeDetails.map((item) => (
                  <div key={item.label} className="flex gap-4">
                    <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white text-brand-600 shadow-soft">
                      <Icon name={item.icon} className="h-5 w-5" />
                    </span>
                    <div>
                      <dt className="text-xs font-bold uppercase tracking-[0.14em] text-ink-muted">
                        {item.label}
                      </dt>
                      <dd
                        className="mt-1 text-[15px] font-semibold text-ink"
                        dir={item.ltr ? 'ltr' : undefined}
                      >
                        {item.value}
                      </dd>
                    </div>
                  </div>
                ))}
              </dl>

              <p className="mt-8 rounded-2xl bg-white p-5 text-sm leading-relaxed text-ink-soft">
                <Icon name="lightbulb" className="me-2 inline h-4 w-4 text-gold-500" />
                {t.fridayNote}
              </p>
            </div>

            {/* Stylised map panel — no third-party embed, so the page stays light. */}
            <div className="relative overflow-hidden rounded-4xl bg-white p-6 shadow-card">
              <svg viewBox="0 0 400 320" className="h-full w-full" role="img" aria-label={t.mapAlt}>
                <rect width="400" height="320" rx="18" fill="#f3f6fb" />
                <path d="M0 120h400M0 210h400M120 0v320M270 0v320" stroke="#dfe7f2" strokeWidth="10" />
                <path d="M0 60h400M60 0v320M340 0v320" stroke="#eef2f8" strokeWidth="6" />
                <rect x="140" y="140" width="110" height="50" rx="8" fill="#c7d6ea" />
                <rect x="290" y="70" width="70" height="40" rx="8" fill="#e4ebf5" />
                <rect x="20" y="230" width="80" height="60" rx="8" fill="#e4ebf5" />
                <circle cx="195" cy="165" r="8" fill="#178d80" opacity="0.35" />
                <g transform="translate(195 150)">
                  <path d="M0 34c0-2 16-14 16-22a16 16 0 1 0-32 0c0 8 16 20 16 22z" fill="#14284b" />
                  <circle cx="0" cy="12" r="5.5" fill="#fff" />
                </g>
                <text
                  x="200"
                  y="215"
                  textAnchor="middle"
                  fontSize="13"
                  fontWeight="700"
                  fill="#111d33"
                  fontFamily="sans-serif"
                >
                  {site.name}
                </text>
                <text
                  x="200"
                  y="234"
                  textAnchor="middle"
                  fontSize="11"
                  fill="#6d7b94"
                  fontFamily="sans-serif"
                >
                  {lang === 'fa' ? 'کارته چهار، کابل' : 'Kolola Pushta Road, Karte Char'}
                </text>
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section">
        <div className="container-page">
          <SectionHeading
            eyebrow={t.faqEyebrow}
            title={t.faqTitle}
            description={t.faqDescription}
            className="mb-12"
          />
          <FaqAccordion faqs={faqs} />

          <p className="mt-10 text-center text-sm text-ink-soft">
            {t.lookingElse}{' '}
            <Link
              href={path('/enrollment#faq', lang)}
              className="font-bold text-brand-600 hover:text-brand-800"
            >
              {t.readAllFaqs}
            </Link>
          </p>
        </div>
      </section>

    </>
  );
}
