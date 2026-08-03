import Link from 'next/link';
import { CrestMark } from './Crest';
import { path } from '@/lib/i18n';

export default function Logo({ lang = 'en', dict, variant = 'dark', className = '' }) {
  const isLight = variant === 'light';
  const isDari = lang === 'fa';

  return (
    <Link
      href={path('/', lang)}
      className={`group inline-flex items-center gap-3 ${className}`}
      aria-label={dict?.nav?.home_aria || 'Elham Online Education — home'}
    >
      <CrestMark className="h-11 w-auto shrink-0 transition group-hover:scale-105" />

      <span className="leading-tight">
        <span
          className={`block font-display text-lg font-extrabold ${isDari ? '' : 'tracking-tight'} ${
            isLight ? 'text-white' : 'text-ink'
          }`}
        >
          {isDari ? 'الهام' : 'Elham'}
        </span>
        <span
          className={`block text-[10px] font-bold uppercase ${
            isDari ? 'tracking-normal' : 'tracking-[0.18em]'
          } ${isLight ? 'text-gold-400' : 'text-gold-600'}`}
        >
          {isDari ? 'آموزش آنلاین' : 'Online Education'}
        </span>
      </span>
    </Link>
  );
}
