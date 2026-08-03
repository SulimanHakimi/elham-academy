import { NextResponse } from 'next/server';
import { getPosts } from '@/lib/data';
import { normalizeLocale } from '@/lib/i18n';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const lang = normalizeLocale(searchParams.get('lang'));
  const limitParam = Number(searchParams.get('limit'));
  const limit = Number.isFinite(limitParam) && limitParam > 0 ? limitParam : undefined;

  const posts = await getPosts({ limit, lang });
  return NextResponse.json({ lang, count: posts.length, posts });
}
