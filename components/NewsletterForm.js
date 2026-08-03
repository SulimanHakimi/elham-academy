'use client';

import { useState } from 'react';
import Icon from './Icon';

export default function NewsletterForm({ source = 'footer', variant = 'dark', dict, lang = 'en' }) {
  const [email, setEmail] = useState('');
  const [state, setState] = useState({ status: 'idle', message: '' });

  const t = dict?.forms || {};

  const submit = async (event) => {
    event.preventDefault();
    setState({ status: 'loading', message: '' });

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source, lang }),
      });
      const data = await response.json();

      if (!response.ok) throw new Error(data.error || 'Something went wrong.');

      setState({ status: 'success', message: data.message });
      setEmail('');
    } catch (error) {
      setState({ status: 'error', message: error.message });
    }
  };

  const isDark = variant === 'dark';

  return (
    <div>
      <form onSubmit={submit} className="flex flex-col gap-3 sm:flex-row">
        <label htmlFor={`newsletter-${source}`} className="sr-only">
          {t.emailSrLabel || 'Email address'}
        </label>
        <input
          id={`newsletter-${source}`}
          type="email"
          required
          dir="ltr"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t.newsletterPlaceholder || 'Your email address'}
          className={
            isDark
              ? 'w-full rounded-2xl border border-white/15 bg-white/10 px-5 py-3.5 text-[15px] text-white placeholder:text-white/50 focus:border-white/40 focus:outline-none focus:ring-4 focus:ring-white/10'
              : 'input'
          }
        />
        <button
          type="submit"
          disabled={state.status === 'loading'}
          className={isDark ? 'btn-gold shrink-0' : 'btn-primary shrink-0'}
        >
          {state.status === 'loading' ? t.sending || 'Sending…' : t.subscribe || 'Subscribe'}
          {state.status !== 'loading' && <Icon name="arrow-right" className="h-4 w-4 flip-rtl" />}
        </button>
      </form>

      {state.message && (
        <p
          role="status"
          className={`mt-3 flex items-start gap-2 text-sm ${
            state.status === 'error'
              ? isDark
                ? 'text-clay-400'
                : 'text-clay-600'
              : isDark
                ? 'text-teal-400'
                : 'text-teal-600'
          }`}
        >
          <Icon
            name={state.status === 'error' ? 'close' : 'check'}
            className="mt-0.5 h-4 w-4 shrink-0"
          />
          {state.message}
        </p>
      )}
    </div>
  );
}
