import Icon from './Icon';
import { accent } from '@/lib/ui';

export default function FeatureCard({ feature, accentName = 'brand', variant = 'card' }) {
  const a = accent(accentName);

  if (variant === 'plain') {
    return (
      <div className="flex gap-5">
        <span className={`inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${a.soft}`}>
          <Icon name={feature.icon} className="h-7 w-7" />
        </span>
        <div>
          <h3 className="text-lg font-bold text-ink">{feature.title}</h3>
          <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">{feature.description}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card card-hover h-full p-7">
      <span className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl ${a.soft}`}>
        <Icon name={feature.icon} className="h-7 w-7" />
      </span>
      <h3 className="mt-5 text-lg font-bold text-ink">{feature.title}</h3>
      <p className="mt-2.5 text-[15px] leading-relaxed text-ink-soft">{feature.description}</p>
    </div>
  );
}
