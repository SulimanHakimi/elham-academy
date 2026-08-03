'use client';

import { useEffect, useRef, useState } from 'react';
import { formatNumber } from '@/lib/ui';

/** Counts up to `value` once the element scrolls into view. */
function Counter({ value, suffix = '', duration = 1400, lang = 'en' }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced) {
      setDisplay(value);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting || started.current) return;
          started.current = true;

          const start = performance.now();
          const tick = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            // ease-out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            setDisplay(Math.round(value * eased));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        });
      },
      { threshold: 0.4 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [value, duration]);

  return (
    <span ref={ref}>
      {formatNumber(display, lang)}
      {suffix}
    </span>
  );
}

export default function StatsBand({ stats, light = false, className = '', lang = 'en' }) {
  return (
    <dl className={`grid grid-cols-2 gap-6 lg:grid-cols-4 ${className}`}>
      {stats.map((stat) => (
        <div
          key={stat.label}
          className={`rounded-3xl p-6 text-center ${
            light ? 'bg-white/10 ring-1 ring-white/15' : 'bg-white shadow-card ring-1 ring-brand-100/70'
          }`}
        >
          <dd
            className={`font-display text-3xl font-extrabold sm:text-4xl ${
              light ? 'text-white' : 'text-gradient'
            }`}
          >
            <Counter value={stat.value} suffix={stat.suffix} lang={lang} />
          </dd>
          <dt
            className={`mt-2 text-xs font-bold uppercase tracking-[0.14em] ${
              light ? 'text-white/70' : 'text-ink-muted'
            }`}
          >
            {stat.label}
          </dt>
        </div>
      ))}
    </dl>
  );
}
