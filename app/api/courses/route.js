import { NextResponse } from 'next/server';
import { getCourses } from '@/lib/data';
import { normalizeLocale } from '@/lib/i18n';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category') || undefined;
  const lang = normalizeLocale(searchParams.get('lang'));
  const limitParam = Number(searchParams.get('limit'));
  const limit = Number.isFinite(limitParam) && limitParam > 0 ? limitParam : undefined;

  const courses = await getCourses({
    category,
    limit,
    lang,
    featured: searchParams.get('featured') === 'true' || undefined,
    popular: searchParams.get('popular') === 'true' || undefined,
  });

  return NextResponse.json({ lang, count: courses.length, courses });
}
