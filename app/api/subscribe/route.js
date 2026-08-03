import { NextResponse } from 'next/server';
import { connectWithTimeout } from '@/lib/mongodb';
import Subscriber from '@/models/Subscriber';
import { clean, isEmail, readJson } from '@/lib/validate';

export const dynamic = 'force-dynamic';

const MESSAGES = {
  en: {
    invalidBody: 'Invalid request body.',
    email: 'Please enter a valid email address.',
    already: 'You are already on the list — thank you!',
    unavailable: 'Subscription is unavailable right now. Please try again shortly.',
    success: 'Subscribed. Look out for your first email on Saturday.',
  },
  fa: {
    invalidBody: 'درخواست نامعتبر است.',
    email: 'لطفاً یک آدرس ایمیل معتبر وارد کنید.',
    already: 'شما قبلاً در فهرست هستید — تشکر!',
    unavailable: 'در حال حاضر اشتراک ممکن نیست. لطفاً کمی بعد دوباره تلاش کنید.',
    success: 'اشتراک شما ثبت شد. اولین ایمیل خود را روز شنبه دریافت می‌کنید.',
  },
};

export async function POST(request) {
  const body = await readJson(request);
  const lang = body?.lang === 'fa' ? 'fa' : 'en';
  const t = MESSAGES[lang];

  if (!body) {
    return NextResponse.json({ error: t.invalidBody }, { status: 400 });
  }

  const email = clean(body.email, 160).toLowerCase();
  const source = clean(body.source, 40) || 'footer';

  if (!isEmail(email)) {
    return NextResponse.json({ error: t.email }, { status: 400 });
  }

  try {
    await connectWithTimeout(8000);

    const existing = await Subscriber.findOne({ email });
    if (existing) {
      if (!existing.active) {
        existing.active = true;
        await existing.save();
      }
      return NextResponse.json({ ok: true, message: t.already });
    }

    await Subscriber.create({ email, source });
  } catch (error) {
    console.error('[subscribe] could not save subscriber:', error.message);
    return NextResponse.json({ error: t.unavailable }, { status: 503 });
  }

  return NextResponse.json({ ok: true, message: t.success });
}
