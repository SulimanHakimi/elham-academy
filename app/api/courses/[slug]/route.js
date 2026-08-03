import { NextResponse } from 'next/server';
import { getCourse } from '@/lib/data';
import { normalizeLocale } from '@/lib/i18n';

export const dynamic = 'force-dynamic';

export async function GET(request, { params }) {
  const { slug } = await params;
  const lang = normalizeLocale(new URL(request.url).searchParams.get('lang'));

  const course = await getCourse(slug, lang);

  if (!course) {
    return NextResponse.json({ error: 'Course not found.' }, { status: 404 });
  }

  return NextResponse.json({ lang, course });
}
