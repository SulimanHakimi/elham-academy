import en from './en';
import fa from './fa';
import { normalizeLocale } from '../i18n';

const dictionaries = { en, fa };

/**
 * Deep merge of the requested dictionary over English, so a missing Dari string
 * renders the English text rather than `undefined`.
 */
function merge(base, override) {
  if (Array.isArray(base)) return override ?? base;
  if (base && typeof base === 'object') {
    const out = { ...base };
    for (const key of Object.keys(base)) {
      if (override && key in override) out[key] = merge(base[key], override[key]);
    }
    // Keys present only in the override (rare, but keep them).
    if (override) {
      for (const key of Object.keys(override)) {
        if (!(key in out)) out[key] = override[key];
      }
    }
    return out;
  }
  return override ?? base;
}

const cache = new Map();

export function getDictionary(lang) {
  const locale = normalizeLocale(lang);
  if (cache.has(locale)) return cache.get(locale);

  const dict = locale === 'en' ? en : merge(en, dictionaries[locale]);
  cache.set(locale, dict);
  return dict;
}

/** Replaces {count}-style placeholders. */
export function fill(template, values = {}) {
  return String(template).replace(/\{(\w+)\}/g, (_, key) =>
    key in values ? String(values[key]) : `{${key}}`
  );
}

export default getDictionary;
