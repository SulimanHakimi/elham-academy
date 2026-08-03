import { NextResponse } from 'next/server';
import { connectWithTimeout } from '@/lib/mongodb';
import Message from '@/models/Message';
import { clean, isEmail, readJson } from '@/lib/validate';

export const dynamic = 'force-dynamic';

const MESSAGES = {
  en: {
    invalidBody: 'Invalid request body.',
    name: 'Please enter your name.',
    email: 'Please enter a valid email address.',
    short: 'Please write a little more so we can help properly.',
    unavailable:
      'We could not save your message right now. Please email info@elhamonline.af or message us on WhatsApp.',
    success: (firstName, email) =>
      `Thank you, ${firstName}. We have your message and will reply to ${email} within one working day.`,
  },
  fa: {
    invalidBody: 'درخواست نامعتبر است.',
    name: 'لطفاً نام خود را وارد کنید.',
    email: 'لطفاً یک آدرس ایمیل معتبر وارد کنید.',
    short: 'لطفاً کمی بیشتر بنویسید تا بتوانیم درست کمک کنیم.',
    unavailable:
      'در حال حاضر نتوانستیم پیام شما را ذخیره کنیم. لطفاً به info@elhamonline.af ایمیل بفرستید یا در واتساپ به ما پیام بدهید.',
    success: (firstName, email) =>
      `تشکر، ${firstName}. پیام شما را دریافت کردیم و در جریان یک روز کاری به ${email} پاسخ می‌دهیم.`,
  },
};

export async function POST(request) {
  const body = await readJson(request);
  const lang = body?.lang === 'fa' ? 'fa' : 'en';
  const t = MESSAGES[lang];

  if (!body) {
    return NextResponse.json({ error: t.invalidBody }, { status: 400 });
  }

  const name = clean(body.name, 120);
  const email = clean(body.email, 160);
  const subject = clean(body.subject, 160) || 'General question';
  const message = clean(body.message, 4000);

  if (name.length < 2) {
    return NextResponse.json({ error: t.name }, { status: 400 });
  }
  if (!isEmail(email)) {
    return NextResponse.json({ error: t.email }, { status: 400 });
  }
  if (message.length < 10) {
    return NextResponse.json({ error: t.short }, { status: 400 });
  }

  try {
    await connectWithTimeout(8000);
    await Message.create({ name, email, subject, message });
  } catch (error) {
    console.error('[contact] could not save message:', error.message);
    return NextResponse.json({ error: t.unavailable }, { status: 503 });
  }

  return NextResponse.json({
    ok: true,
    message: t.success(name.split(' ')[0], email),
  });
}
