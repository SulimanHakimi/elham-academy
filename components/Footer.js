import Link from 'next/link';
import Logo from './Logo';
import Icon from './Icon';
import NewsletterForm from './NewsletterForm';
import LanguageSwitcher from './LanguageSwitcher';
import { getSite } from '@/lib/data';
import { path } from '@/lib/i18n';

export default function Footer({ lang, dict }) {
  const site = getSite(lang);
  const t = dict.footer;

  const columns = [
    {
      title: t.columns.learn,
      links: [
        { href: '/courses', label: t.links.allFreeCourses },
        { href: '/courses?category=kankor-prep', label: t.links.kankorPrep },
        { href: '/courses?category=languages', label: t.links.languageCourses },
        { href: '/courses?category=it-software', label: t.links.computerSkills },
        { href: '/enrollment', label: t.links.enrollmentScholarships },
      ],
    },
    {
      title: t.columns.institution,
      links: [
        { href: '/about', label: t.links.aboutUs },
        { href: '/about#mission', label: t.links.missionVision },
        { href: '/about#instructors', label: t.links.ourTeachers },
        { href: '/landing', label: t.links.howElhamWorks },
        { href: '/blog', label: t.links.blog },
      ],
    },
    {
      title: t.columns.support,
      links: [
        { href: '/enrollment#faq', label: t.links.faq },
        { href: '/contact', label: t.links.volunteerTeach },
        { href: '/contact', label: t.links.sponsorScholarship },
        { href: '/enrollment', label: t.links.forSchools },
        { href: '/contact', label: t.links.contactUs },
      ],
    },
  ];

  const socials = [
    { href: site.social.facebook, icon: 'facebook', label: 'Facebook' },
    { href: site.social.x, icon: 'x', label: 'X' },
    { href: site.social.instagram, icon: 'instagram', label: 'Instagram' },
    { href: site.social.youtube, icon: 'youtube', label: 'YouTube' },
  ];

  return (
    <footer className="bg-ink-mesh text-white">
      <div className="container-page py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_2fr]">
          <div>
            <Logo lang={lang} dict={dict} variant="light" />
            <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-white/70">{t.tagline}</p>

            <div className="mt-7 flex gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={`${site.name} — ${s.label}`}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-white transition hover:bg-white/20"
                >
                  <Icon name={s.icon} className="h-5 w-5" />
                </a>
              ))}
            </div>

            <dl className="mt-8 space-y-3 text-sm text-white/70">
              <div className="flex items-start gap-3">
                <Icon name="pin" className="mt-0.5 h-4 w-4 shrink-0 text-brand-300" />
                <dd>{site.address}</dd>
              </div>
              <div className="flex items-start gap-3">
                <Icon name="phone" className="mt-0.5 h-4 w-4 shrink-0 text-brand-300" />
                <dd>
                  <a href={`tel:${site.phone.replace(/\s/g, '')}`} className="hover:text-white" dir="ltr">
                    {site.phone}
                  </a>
                </dd>
              </div>
              <div className="flex items-start gap-3">
                <Icon name="mail" className="mt-0.5 h-4 w-4 shrink-0 text-brand-300" />
                <dd>
                  <a href={`mailto:${site.email}`} className="hover:text-white" dir="ltr">
                    {site.email}
                  </a>
                </dd>
              </div>
            </dl>

            <div className="mt-8">
              <LanguageSwitcher lang={lang} dict={dict} variant="dark" />
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-3">
            {columns.map((col) => (
              <nav key={col.title} aria-label={col.title}>
                <h3 className="mb-5 text-xs font-bold uppercase tracking-[0.18em] text-white">
                  {col.title}
                </h3>
                <ul className="space-y-3">
                  {col.links.map((link) => (
                    <li key={`${col.title}-${link.label}`}>
                      <Link
                        href={path(link.href, lang)}
                        className="text-sm text-white/70 transition hover:text-white"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="mt-14 grid gap-8 rounded-4xl bg-white/5 p-8 ring-1 ring-white/10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <div>
            <h3 className="text-xl text-white">{t.newsletterTitle}</h3>
            <p className="mt-2 text-sm text-white/70">{t.newsletterBody}</p>
          </div>
          <NewsletterForm source="footer" variant="dark" dict={dict} lang={lang} />
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-8 text-sm text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. {t.rights}
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <Link href={path('/about', lang)} className="transition hover:text-white">
              {t.privacy}
            </Link>
            <Link href={path('/about', lang)} className="transition hover:text-white">
              {t.terms}
            </Link>
            <Link href={path('/enrollment', lang)} className="transition hover:text-white">
              {t.enrollment}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
