import { NextResponse } from 'next/server';
import { connectWithTimeout } from '@/lib/mongodb';
import Enrollment from '@/models/Enrollment';
import { getCourse } from '@/lib/data';
import { clean, isEmail, readJson } from '@/lib/validate';

export const dynamic = 'force-dynamic';

/** Replies are written in whichever language the visitor is browsing. */
const MESSAGES = {
  en: {
    invalidBody: 'Invalid request body.',
    missingCourse: 'Missing course.',
    noCourse: 'That course does not exist.',
    name: 'Please enter your full name.',
    email: 'Please enter a valid email address.',
    already: (title, email) =>
      `You are already registered for ${title}. Check ${email} for your access link.`,
    success: (title, email) =>
      `Your access link for ${title} is on its way to ${email}. The course is free — there is nothing to pay.`,
    unavailable:
      'We could not complete your registration right now. Please message us on WhatsApp and we will register you manually.',
  },
  fa: {
    invalidBody: 'درخواست نامعتبر است.',
    missingCourse: 'کورس مشخص نشده است.',
    noCourse: 'این کورس وجود ندارد.',
    name: 'لطفاً نام کامل خود را وارد کنید.',
    email: 'لطفاً یک آدرس ایمیل معتبر وارد کنید.',
    already: (title, email) =>
      `شما قبلاً در کورس «${title}» ثبت نام کرده‌اید. لینک دسترسی خود را در ${email} ببینید.`,
    success: (title, email) =>
      `لینک دسترسی شما برای کورس «${title}» به ${email} فرستاده می‌شود. این کورس رایگان است — چیزی برای پرداخت وجود ندارد.`,
    unavailable:
      'در حال حاضر نتوانستیم ثبت نام شما را تکمیل کنیم. لطفاً در واتساپ به ما پیام بدهید تا شما را دستی ثبت نام کنیم.',
  },
};

export async function POST(request) {
  const body = await readJson(request);
  const lang = body?.lang === 'fa' ? 'fa' : 'en';
  const t = MESSAGES[lang];

  if (!body) {
    return NextResponse.json({ error: t.invalidBody }, { status: 400 });
  }

  const courseSlug = clean(body.courseSlug, 120);
  const name = clean(body.name, 120);
  const email = clean(body.email, 160).toLowerCase();
  const phone = clean(body.phone, 40);
  const province = clean(body.province, 80);
  const note = clean(body.note, 1000);

  if (!courseSlug) {
    return NextResponse.json({ error: t.missingCourse }, { status: 400 });
  }
  if (name.length < 2) {
    return NextResponse.json({ error: t.name }, { status: 400 });
  }
  if (!isEmail(email)) {
    return NextResponse.json({ error: t.email }, { status: 400 });
  }

  const course = await getCourse(courseSlug, lang);
  if (!course) {
    return NextResponse.json({ error: MESSAGES[lang].noCourse }, { status: 404 });
  }

  try {
    await connectWithTimeout(8000);

    const existing = await Enrollment.findOne({ courseSlug, email });
    if (existing) {
      return NextResponse.json({
        ok: true,
        message: MESSAGES[lang].already(course.title, email),
      });
    }

    await Enrollment.create({
      courseSlug,
      courseTitle: course.title,
      name,
      email,
      phone,
      province,
      note,
      plan: 'free',
    });
  } catch (error) {
    console.error('[enroll] could not save enrolment:', error.message);
    return NextResponse.json({ error: MESSAGES[lang].unavailable }, { status: 503 });
  }

  return NextResponse.json({
    ok: true,
    message: MESSAGES[lang].success(course.title, email),
  });
}
