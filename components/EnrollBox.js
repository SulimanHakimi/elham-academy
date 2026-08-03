'use client';

import { useState } from 'react';
import Link from 'next/link';
import Icon from './Icon';
import { formatNumber, lessonCount } from '@/lib/ui';
import { path } from '@/lib/i18n';

/** Sticky course sidebar: details, what's included, and the registration form. */
export default function EnrollBox({ course, lang = 'en', dict }) {
  const t = dict.course;
  const common = dict.common;
  const provinces = t.provinces;

  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    province: provinces[0],
    note: '',
  });
  const [state, setState] = useState({ status: 'idle', message: '' });

  const update = (field) => (event) => setForm((f) => ({ ...f, [field]: event.target.value }));

  const submit = async (event) => {
    event.preventDefault();
    setState({ status: 'loading', message: '' });

    try {
      const response = await fetch('/api/enroll', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          courseSlug: course.slug,
          courseTitle: course.title,
          lang,
        }),
      });
      const data = await response.json();

      if (!response.ok) throw new Error(data.error || 'Registration could not be completed.');

      setState({ status: 'success', message: data.message });
    } catch (error) {
      setState({ status: 'error', message: error.message });
    }
  };

  const details = [
    { label: common.level, value: dict.explorer.levels[course.level] || course.level, icon: 'signal' },
    {
      label: common.duration,
      value: `${formatNumber(course.hours, lang)} ${common.hours}`,
      icon: 'clock',
    },
    {
      label: dict.course.curriculum,
      value: `${formatNumber(lessonCount(course), lang)} ${common.lessons}`,
      icon: 'play',
    },
    { label: common.language, value: course.languageLabel || course.language, icon: 'globe' },
    { label: common.type, value: course.type, icon: 'compass' },
  ];

  return (
    <div className="lg:sticky lg:top-28">
      <div className="card overflow-hidden">
        <div className="bg-mesh px-7 py-7">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-ink-muted">
                {t.costToYou}
              </p>
              <p className="mt-1.5 font-display text-4xl font-extrabold text-ink">{common.free}</p>
            </div>
            <p className="text-end text-xs text-ink-muted">
              {t.always}
              <br />
              <Link
                href={path('/enrollment', lang)}
                className="font-bold text-brand-600 hover:text-brand-800"
              >
                {t.howItWorks}
              </Link>
            </p>
          </div>

          {state.status === 'success' ? (
            <div className="mt-6 rounded-2xl bg-white p-5 text-center">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-500/10 text-teal-600">
                <Icon name="check" className="h-6 w-6" strokeWidth={2.5} />
              </span>
              <p className="mt-3 font-bold text-ink">{t.registeredTitle}</p>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{state.message}</p>
            </div>
          ) : open ? (
            <form onSubmit={submit} className="mt-6 space-y-3">
              <div>
                <label htmlFor="enroll-name" className="sr-only">
                  {t.fields.name}
                </label>
                <input
                  id="enroll-name"
                  required
                  value={form.name}
                  onChange={update('name')}
                  placeholder={t.fields.name}
                  className="input py-3"
                />
              </div>
              <div>
                <label htmlFor="enroll-email" className="sr-only">
                  {t.fields.email}
                </label>
                <input
                  id="enroll-email"
                  type="email"
                  required
                  dir="ltr"
                  value={form.email}
                  onChange={update('email')}
                  placeholder={t.fields.email}
                  className="input py-3"
                />
              </div>
              <div>
                <label htmlFor="enroll-phone" className="sr-only">
                  {t.fields.phone}
                </label>
                <input
                  id="enroll-phone"
                  dir="ltr"
                  value={form.phone}
                  onChange={update('phone')}
                  placeholder={t.fields.phone}
                  className="input py-3"
                />
              </div>
              <div>
                <label htmlFor="enroll-province" className="sr-only">
                  {t.fields.province}
                </label>
                <select
                  id="enroll-province"
                  value={form.province}
                  onChange={update('province')}
                  className="input py-3"
                >
                  {provinces.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </div>

              {state.status === 'error' && (
                <p role="alert" className="flex items-start gap-2 text-sm text-clay-600">
                  <Icon name="close" className="mt-0.5 h-4 w-4 shrink-0" />
                  {state.message}
                </p>
              )}

              <button
                type="submit"
                disabled={state.status === 'loading'}
                className="btn-primary w-full"
              >
                {state.status === 'loading' ? t.registering : t.confirmRegistration}
              </button>
              <button type="button" onClick={() => setOpen(false)} className="btn-ghost w-full text-sm">
                {t.cancel}
              </button>
            </form>
          ) : (
            <>
              <button type="button" onClick={() => setOpen(true)} className="btn-primary mt-6 w-full">
                {t.register}
                <Icon name="arrow-right" className="h-4 w-4 flip-rtl" />
              </button>
              <p className="mt-3 text-center text-xs text-ink-muted">{t.registerNote}</p>
            </>
          )}
        </div>

        <dl className="divide-y divide-brand-50 px-7 py-2">
          {details.map((detail) => (
            <div key={detail.label} className="flex items-center justify-between gap-4 py-3.5">
              <dt className="flex items-center gap-2.5 text-sm text-ink-muted">
                <Icon name={detail.icon} className="h-4 w-4 text-brand-400" />
                {detail.label}
              </dt>
              <dd className="text-end text-sm font-semibold text-ink">{detail.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="card mt-6 p-7">
        <h3 className="text-lg font-bold text-ink">{t.whatsIncluded}</h3>
        <ul className="mt-5 space-y-4">
          {course.included?.map((item) => (
            <li key={item.label} className="flex items-start gap-3.5">
              <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
                <Icon name={item.icon} className="h-5 w-5" />
              </span>
              <span className="pt-2 text-sm font-semibold text-ink">{item.label}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6 rounded-3xl bg-brand-50 p-6">
        <p className="flex items-start gap-3 text-sm leading-relaxed text-ink-soft">
          <Icon name="download" className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" />
          {t.offlineNote}
        </p>
      </div>
    </div>
  );
}
