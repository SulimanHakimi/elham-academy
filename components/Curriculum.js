'use client';

import { useState } from 'react';
import Icon from './Icon';
import { formatNumber } from '@/lib/ui';

export default function Curriculum({ modules, lang = 'en', dict }) {
  const [open, setOpen] = useState([0]);
  const t = dict?.course || {};
  const common = dict?.common || {};

  const toggle = (index) =>
    setOpen((current) =>
      current.includes(index) ? current.filter((i) => i !== index) : [...current, index]
    );

  const allOpen = open.length === modules.length;

  return (
    <div>
      <div className="mb-4 flex justify-end">
        <button
          type="button"
          onClick={() => setOpen(allOpen ? [] : modules.map((_, i) => i))}
          className="btn-ghost text-sm"
        >
          {allOpen ? t.collapseAll : t.expandAll}
        </button>
      </div>

      <div className="divide-y divide-brand-100 overflow-hidden rounded-4xl bg-white shadow-card ring-1 ring-brand-100/70">
        {modules.map((module, index) => {
          const isOpen = open.includes(index);
          const minutes = (module.lessons || []).reduce((sum, l) => sum + (l.duration || 0), 0);

          return (
            <div key={module.title}>
              <h3>
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  aria-expanded={isOpen}
                  aria-controls={`module-${index}`}
                  className="flex w-full items-center gap-5 px-6 py-5 text-start transition hover:bg-brand-50/50"
                >
                  <span
                    className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl font-display text-sm font-bold transition ${
                      isOpen ? 'bg-brand-600 text-white' : 'bg-brand-50 text-brand-700'
                    }`}
                  >
                    {formatNumber(index + 1, lang)}
                  </span>

                  <span className="min-w-0 flex-1">
                    <span className="block text-[17px] font-bold text-ink">{module.title}</span>
                    <span className="mt-1 block text-sm text-ink-muted">{module.summary}</span>
                  </span>

                  <span className="hidden shrink-0 text-xs font-semibold text-ink-muted sm:block">
                    {formatNumber(module.lessons?.length || 0, lang)} {common.lessons} ·{' '}
                    {formatNumber(minutes, lang)} {common.minutes}
                  </span>

                  <Icon
                    name={isOpen ? 'minus' : 'plus'}
                    className="h-5 w-5 shrink-0 text-brand-600"
                    strokeWidth={2.5}
                  />
                </button>
              </h3>

              <ul
                id={`module-${index}`}
                hidden={!isOpen}
                className="border-t border-brand-50 bg-brand-50/30"
              >
                {module.lessons?.map((lesson, lessonIndex) => (
                  <li
                    key={lesson.title}
                    className="flex items-center gap-4 px-6 py-3.5 text-sm ps-[4.6rem]"
                  >
                    <Icon
                      name="play"
                      className="h-3.5 w-3.5 shrink-0 text-brand-400"
                      filled
                      strokeWidth={0}
                    />
                    <span className="min-w-0 flex-1 text-ink-soft">
                      {formatNumber(lessonIndex + 1, lang)}. {lesson.title}
                    </span>
                    {lesson.preview && (
                      <span className="hidden rounded-full bg-teal-500/10 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-teal-600 sm:inline">
                        {t.freePreview}
                      </span>
                    )}
                    <span className="shrink-0 text-xs text-ink-muted">
                      {formatNumber(lesson.duration, lang)} {common.minutes}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}
