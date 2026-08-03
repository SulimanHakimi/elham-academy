/** Shared presentation helpers so accent colours and formatting stay consistent. */

/**
 * Card and thumbnail accents, all drawn from the crest palette: navy, gold, a
 * supporting teal and a warm clay. `coral` is kept as an alias so older content
 * records that still say `accent: 'coral'` render as clay rather than falling
 * back silently.
 */
export const accents = {
  brand: {
    soft: 'bg-brand-50 text-brand-600',
    solid: 'bg-brand-700 text-white',
    thumb: 'from-brand-500 to-brand-800',
    ring: 'ring-brand-100',
    text: 'text-brand-600',
  },
  gold: {
    soft: 'bg-gold-500/15 text-gold-600',
    solid: 'bg-gold-500 text-brand-800',
    thumb: 'from-gold-400 to-gold-600',
    ring: 'ring-gold-500/20',
    text: 'text-gold-600',
  },
  teal: {
    soft: 'bg-teal-500/10 text-teal-600',
    solid: 'bg-teal-500 text-white',
    thumb: 'from-teal-400 to-teal-600',
    ring: 'ring-teal-500/15',
    text: 'text-teal-600',
  },
  clay: {
    soft: 'bg-clay-500/10 text-clay-600',
    solid: 'bg-clay-500 text-white',
    thumb: 'from-clay-400 to-clay-600',
    ring: 'ring-clay-500/15',
    text: 'text-clay-600',
  },
};

accents.coral = accents.clay;

export function accent(name = 'brand') {
  return accents[name] || accents.brand;
}

/** Dari renders numerals in Persian digits, and dates in the Solar calendar. */
function intlLocale(lang) {
  return lang === 'fa' ? 'fa-AF' : 'en-GB';
}

export function formatNumber(value, lang = 'en') {
  return new Intl.NumberFormat(intlLocale(lang)).format(value ?? 0);
}

export function formatMinutes(minutes, lang = 'en', dict) {
  if (!minutes) return '—';

  const minWord = dict?.common?.minutes ?? 'min';
  const hourWord = dict?.common?.hours ?? 'hours';

  if (minutes < 60) return `${formatNumber(minutes, lang)} ${minWord}`;

  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;

  return rest
    ? `${formatNumber(hours, lang)}${lang === 'fa' ? ' ' + hourWord + ' ' : 'h '}${formatNumber(rest, lang)}${lang === 'fa' ? ' ' + minWord : 'm'}`
    : `${formatNumber(hours, lang)} ${hourWord}`;
}

export function formatDate(value, lang = 'en') {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return date.toLocaleDateString(intlLocale(lang), {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

/** Decimal rating, in the right numeral system. */
export function formatRating(value, lang = 'en') {
  return new Intl.NumberFormat(intlLocale(lang), {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(value ?? 0);
}

/** Total lesson count across a course's modules. */
export function lessonCount(course) {
  return (course?.curriculum || []).reduce((sum, m) => sum + (m.lessons?.length || 0), 0);
}

/** Initials for an avatar placeholder, safe for both scripts. */
export function initials(name = '') {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part[0])
    .slice(0, 2)
    .join('');
}
