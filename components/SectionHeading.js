import Link from 'next/link';
import Icon from './Icon';

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
  light = false,
  action,
  className = '',
}) {
  const centered = align === 'center';

  return (
    <div
      className={`${centered ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'} ${
        action ? 'sm:flex sm:max-w-none sm:items-end sm:justify-between sm:gap-8 sm:text-start' : ''
      } ${className}`}
    >
      <div className={action ? 'max-w-2xl' : ''}>
        {eyebrow && (
          <p
            className={`eyebrow ${light ? 'text-brand-300' : ''} ${
              centered && !action ? 'justify-center' : ''
            }`}
          >
            <span className={`h-1.5 w-1.5 rounded-full ${light ? 'bg-brand-300' : 'bg-gold-500'}`} />
            {eyebrow}
          </p>
        )}
        {title && <h2 className={`h2 ${light ? 'text-white' : ''}`}>{title}</h2>}
        {description && (
          <p className={`mt-4 text-[17px] leading-relaxed ${light ? 'text-white/70' : 'text-ink-soft'}`}>
            {description}
          </p>
        )}
      </div>

      {action && (
        <Link
          href={action.href}
          className={`mt-6 inline-flex shrink-0 items-center gap-2 text-sm font-bold sm:mt-0 ${
            light ? 'text-white hover:text-brand-200' : 'text-brand-600 hover:text-brand-800'
          }`}
        >
          {action.label}
          <Icon name="arrow-right" className="h-4 w-4 flip-rtl" />
        </Link>
      )}
    </div>
  );
}
