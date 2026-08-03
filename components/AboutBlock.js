import Icon from './Icon';

/**
 * One of the institution's About sections, rendered in the active language only.
 * The source content is stored bilingually in `lib/seed-data.js`; English pages
 * show the English rendering and Dari pages show the Dari original.
 */
export default function AboutBlock({ block, accentName = 'brand', lang = 'en', children }) {
  const tones = {
    brand: 'bg-brand-50 text-brand-600',
    gold: 'bg-gold-500/15 text-gold-600',
    teal: 'bg-teal-500/10 text-teal-600',
    clay: 'bg-clay-500/10 text-clay-600',
  };

  const isDari = lang === 'fa';
  const heading = isDari ? block.heading.fa : block.heading.en;
  const paragraph = isDari ? block.fa : block.en;

  return (
    <article className="card p-7 sm:p-9">
      <header className="flex flex-wrap items-center gap-4">
        {block.icon && (
          <span
            className={`inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${
              tones[accentName] || tones.brand
            }`}
          >
            <Icon name={block.icon} className="h-6 w-6" />
          </span>
        )}
        <h3 className="min-w-0 text-xl font-bold text-ink sm:text-2xl">{heading}</h3>
      </header>

      <p className="mt-6 text-[16px] leading-[1.9] text-ink-soft">{paragraph}</p>

      {block.points && (
        <ul className="mt-6 grid gap-3.5 sm:grid-cols-2">
          {block.points.map((point) => (
            <li
              key={isDari ? point.fa : point.en}
              className="flex items-start gap-3 rounded-2xl bg-brand-50/60 p-4 text-[15px] leading-relaxed text-ink-soft"
            >
              <Icon name="check" className="mt-1 h-4 w-4 shrink-0 text-teal-600" strokeWidth={3} />
              <span>{isDari ? point.fa : point.en}</span>
            </li>
          ))}
        </ul>
      )}

      {children}
    </article>
  );
}
