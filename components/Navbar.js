'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from './Logo';
import Icon from './Icon';
import LanguageSwitcher from './LanguageSwitcher';
import { path } from '@/lib/i18n';

export default function Navbar({ lang, dict }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const links = [
    { href: '/', label: dict.nav.home },
    { href: '/courses', label: dict.nav.courses },
    { href: '/about', label: dict.nav.about },
    { href: '/enrollment', label: dict.nav.enrollment },
    { href: '/blog', label: dict.nav.blog },
    { href: '/contact', label: dict.nav.contact },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const isActive = (href) => {
    const full = path(href, lang);
    return href === '/' ? pathname === full : pathname === full || pathname.startsWith(`${full}/`);
  };

  return (
    <header
      className={`sticky top-0 z-50 transition duration-300 ${
        scrolled ? 'bg-white/90 shadow-soft backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className="container-page flex h-20 items-center justify-between gap-6">
        <Logo lang={lang} dict={dict} />

        <nav className="hidden items-center gap-1 lg:flex" aria-label={dict.nav.mainNav}>
          {links.map((link) => (
            <Link
              key={link.href}
              href={path(link.href, lang)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                isActive(link.href)
                  ? 'bg-brand-50 text-brand-700'
                  : 'text-ink-soft hover:bg-brand-50/70 hover:text-brand-700'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <LanguageSwitcher lang={lang} dict={dict} />
          <Link href={path('/courses', lang)} className="btn-primary">
            {dict.nav.startLearning}
            <Icon name="arrow-right" className="h-4 w-4 flip-rtl" />
          </Link>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <LanguageSwitcher lang={lang} dict={dict} />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-50 text-brand-700"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? dict.nav.closeMenu : dict.nav.openMenu}
          >
            <Icon name={open ? 'close' : 'menu'} className="h-5 w-5" strokeWidth={2.2} />
          </button>
        </div>
      </div>

      {open && (
        <div id="mobile-menu" className="border-t border-brand-100 bg-white lg:hidden">
          <nav className="container-page flex flex-col py-4" aria-label={dict.nav.mobileNav}>
            {links.map((link) => (
              <Link
                key={link.href}
                href={path(link.href, lang)}
                className={`rounded-2xl px-4 py-3.5 text-base font-semibold transition ${
                  isActive(link.href) ? 'bg-brand-50 text-brand-700' : 'text-ink-soft'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-3 flex flex-col gap-3 border-t border-brand-100 pt-4">
              <Link href={path('/landing', lang)} className="btn-outline w-full">
                {dict.nav.howItWorks}
              </Link>
              <Link href={path('/courses', lang)} className="btn-primary w-full">
                {dict.nav.startLearningFree}
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
