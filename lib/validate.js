/** Tiny shared validation helpers for the API routes. */

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function isEmail(value) {
  return typeof value === 'string' && EMAIL.test(value.trim());
}

export function clean(value, max = 500) {
  if (typeof value !== 'string') return '';
  return value.trim().slice(0, max);
}

/** Reads and parses a JSON request body, returning null on malformed input. */
export async function readJson(request) {
  try {
    return await request.json();
  } catch {
    return null;
  }
}
