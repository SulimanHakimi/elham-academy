import Icon from './Icon';
import { initials } from '@/lib/ui';

export function TestimonialCard({ testimonial, light = false }) {
  return (
    <figure
      className={`flex h-full flex-col rounded-3xl p-7 ${
        light ? 'bg-white/10 ring-1 ring-white/15' : 'bg-white shadow-card ring-1 ring-brand-100/70'
      }`}
    >
      <div className="flex items-center gap-1 text-gold-500">
        {Array.from({ length: testimonial.rating || 5 }).map((_, i) => (
          <Icon key={i} name="star" className="h-4 w-4" filled strokeWidth={0} />
        ))}
      </div>

      <blockquote
        className={`mt-5 flex-1 text-[15px] leading-[1.8] ${light ? 'text-white/85' : 'text-ink-soft'}`}
      >
        “{testimonial.quote}”
      </blockquote>

      <figcaption className="mt-6 flex items-center gap-3 border-t pt-5"
        style={{ borderColor: light ? 'rgba(255,255,255,0.14)' : '#f2f0ff' }}
      >
        <span
          className={`inline-flex h-11 w-11 items-center justify-center rounded-full text-sm font-bold ${
            light ? 'bg-white/15 text-white' : 'bg-brand-100 text-brand-700'
          }`}
        >
          {initials(testimonial.name)}
        </span>
        <div>
          <p className={`text-sm font-bold ${light ? 'text-white' : 'text-ink'}`}>{testimonial.name}</p>
          <p className={`text-xs ${light ? 'text-white/60' : 'text-ink-muted'}`}>{testimonial.role}</p>
        </div>
      </figcaption>
    </figure>
  );
}

export default function Testimonials({ testimonials, light = false }) {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {testimonials.map((t) => (
        <TestimonialCard key={t.name} testimonial={t} light={light} />
      ))}
    </div>
  );
}
