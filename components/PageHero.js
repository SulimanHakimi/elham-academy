import Link from 'next/link';
import Icon from './Icon';

/** Shared inner-page hero: eyebrow, title, lede and optional buttons + artwork. */
export default function PageHero({
  eyebrow,
  title,
  description,
  primary,
  secondary,
  illustration,
  children,
}) {
  const hasArt = Boolean(illustration);

  return (
    <section className="relative overflow-hidden bg-mesh pb-16 pt-12 sm:pb-20 sm:pt-16">
      <div className="container-page">
        <div
          className={
            hasArt
              ? 'grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]'
              : 'mx-auto max-w-3xl text-center'
          }
        >
          <div className="animate-fade-up">
            {eyebrow && (
              <p className={`eyebrow ${hasArt ? '' : 'justify-center'}`}>
                <span className="h-1.5 w-1.5 rounded-full bg-gold-500" />
                {eyebrow}
              </p>
            )}
            <h1 className="h1">{title}</h1>
            {description && (
              <p className={`lede mt-6 ${hasArt ? 'max-w-xl' : 'mx-auto max-w-2xl'}`}>{description}</p>
            )}

            {(primary || secondary) && (
              <div
                className={`mt-9 flex flex-col gap-3 sm:flex-row ${hasArt ? '' : 'sm:justify-center'}`}
              >
                {primary && (
                  <Link href={primary.href} className="btn-primary">
                    {primary.label}
                    <Icon name="arrow-right" className="h-4 w-4 flip-rtl" />
                  </Link>
                )}
                {secondary && (
                  <Link href={secondary.href} className="btn-outline">
                    {secondary.label}
                  </Link>
                )}
              </div>
            )}

            {children}
          </div>

          {hasArt && <div className="animate-fade-up">{illustration}</div>}
        </div>
      </div>
    </section>
  );
}
