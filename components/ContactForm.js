'use client';

import { useState } from 'react';
import Icon from './Icon';

export default function ContactForm({ dict, lang = 'en' }) {
  const t = dict?.forms || {};
  const subjects = t.subjects || ['General question'];
  const empty = { name: '', email: '', subject: subjects[0], message: '' };

  const [form, setForm] = useState(empty);
  const [state, setState] = useState({ status: 'idle', message: '' });

  const update = (field) => (event) => setForm((f) => ({ ...f, [field]: event.target.value }));

  const submit = async (event) => {
    event.preventDefault();
    setState({ status: 'loading', message: '' });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, lang }),
      });
      const data = await response.json();

      if (!response.ok) throw new Error(data.error || 'Your message could not be sent.');

      setState({ status: 'success', message: data.message });
      setForm(empty);
    } catch (error) {
      setState({ status: 'error', message: error.message });
    }
  };

  if (state.status === 'success') {
    return (
      <div className="card p-9 text-center">
        <span className="inline-flex h-16 w-16 items-center justify-center rounded-3xl bg-teal-500/10 text-teal-600">
          <Icon name="check" className="h-8 w-8" strokeWidth={2.5} />
        </span>
        <h3 className="mt-5 text-2xl">{t.successTitle || 'Message received'}</h3>
        <p className="mx-auto mt-3 max-w-sm text-[15px] leading-relaxed text-ink-soft">
          {state.message}
        </p>
        <button
          type="button"
          onClick={() => setState({ status: 'idle', message: '' })}
          className="btn-outline mt-7"
        >
          {t.sendAnother || 'Send another message'}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="card p-7 sm:p-9" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="label">
            {t.name || 'Name'}
          </label>
          <input
            id="name"
            name="name"
            required
            value={form.name}
            onChange={update('name')}
            placeholder={t.namePlaceholder}
            className="input"
          />
        </div>

        <div>
          <label htmlFor="email" className="label">
            {t.email || 'Email Address'}
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            dir="ltr"
            value={form.email}
            onChange={update('email')}
            placeholder={t.emailPlaceholder}
            className="input"
          />
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="subject" className="label">
          {t.subject || 'Subject'}
        </label>
        <select
          id="subject"
          name="subject"
          value={form.subject}
          onChange={update('subject')}
          className="input"
        >
          {subjects.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-5">
        <label htmlFor="message" className="label">
          {t.message || 'Message'}
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          value={form.message}
          onChange={update('message')}
          placeholder={t.messagePlaceholder}
          className="input resize-y"
        />
      </div>

      {state.status === 'error' && (
        <p role="alert" className="mt-5 flex items-start gap-2 text-sm text-clay-600">
          <Icon name="close" className="mt-0.5 h-4 w-4 shrink-0" />
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={state.status === 'loading'}
        className="btn-primary mt-7 w-full sm:w-auto"
      >
        {state.status === 'loading' ? t.sending || 'Sending…' : t.submit || 'Submit'}
        {state.status !== 'loading' && <Icon name="arrow-right" className="h-4 w-4 flip-rtl" />}
      </button>

      <p className="mt-4 text-xs text-ink-muted">{t.privacyNote}</p>
    </form>
  );
}
