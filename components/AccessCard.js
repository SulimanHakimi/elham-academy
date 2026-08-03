import Link from 'next/link';
import Icon from './Icon';
import { path } from '@/lib/i18n';

/**
 * One route into the institution. These are not products — there is no price,
 * no period and no checkout. `cost` is a plain label such as 'Free'.
 */
export default function AccessCard({ plan, lang = 'en', dict }) {
  const featured = plan.featured;
  const badge = dict?.enrollment?.scholarshipBadge || 'Scholarship';

  return (
    <div
      className={`relative flex h-full flex-col rounded-4xl p-8 ${
        featured
          ? 'bg-ink-mesh text-white shadow-lift lg:-my-4 lg:py-12'
          : 'bg-white shadow-card ring-1 ring-brand-100/70'
      }`}
    >
      {featured && (
        <span className="absolute -top-3 left-8 inline-flex items-center gap-1.5 rounded-full bg-gold-500 px-4 py-1.5 text-[11px] font-bold uppercase tracking-wider text-ink">
          <Icon name="award" className="h-3.5 w-3.5" />
          {badge}
        </span>
      )}

      <h3 className={`text-xl font-bold ${featured ? 'text-white' : 'text-ink'}`}>{plan.name}</h3>
      <p className={`mt-1.5 text-sm ${featured ? 'text-white/70' : 'text-ink-muted'}`}>{plan.tagline}</p>

      <p
        className={`mt-7 font-display text-4xl font-extrabold leading-none ${
          featured ? 'text-white' : 'text-ink'
        }`}
      >
        {plan.cost}
      </p>
      {plan.costNote && (
        <p className={`mt-3 text-sm leading-relaxed ${featured ? 'text-white/70' : 'text-ink-soft'}`}>
          {plan.costNote}
        </p>
      )}

      {plan.audience && (
        <p
          className={`mt-5 flex items-start gap-2.5 rounded-2xl p-4 text-sm ${
            featured ? 'bg-white/10 text-white/85' : 'bg-brand-50 text-ink-soft'
          }`}
        >
          <Icon
            name="users"
            className={`mt-0.5 h-4 w-4 shrink-0 ${featured ? 'text-brand-200' : 'text-brand-600'}`}
          />
          {plan.audience}
        </p>
      )}

      <Link
        href={path(plan.ctaHref || '/contact', lang)}
        className={`mt-7 w-full ${featured ? 'btn-gold' : 'btn-outline'}`}
      >
        {plan.cta}
        <Icon name="arrow-right" className="h-4 w-4 flip-rtl" />
      </Link>

      <ul className="mt-8 space-y-3.5">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-3 text-sm">
            <span
              className={`mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                featured ? 'bg-teal-400/20 text-teal-400' : 'bg-teal-500/10 text-teal-600'
              }`}
            >
              <Icon name="check" className="h-3.5 w-3.5" strokeWidth={3} />
            </span>
            <span className={featured ? 'text-white/85' : 'text-ink-soft'}>{feature}</span>
          </li>
        ))}

        {plan.notIncluded?.map((feature) => (
          <li key={feature} className="flex items-start gap-3 text-sm opacity-50">
            <span
              className={`mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                featured ? 'bg-white/10 text-white' : 'bg-brand-50 text-ink-muted'
              }`}
            >
              <Icon name="minus" className="h-3.5 w-3.5" strokeWidth={3} />
            </span>
            <span className={`line-through ${featured ? 'text-white/70' : 'text-ink-muted'}`}>
              {feature}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
