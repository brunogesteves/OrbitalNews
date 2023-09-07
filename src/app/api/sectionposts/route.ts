import { NextRequest, NextResponse } from 'next/server';

import { getSectionContent } from '../repositories/posts';

export async function GET(request: NextRequest) {
  const section: any = request.nextUrl.searchParams.get('section');
  const limit: string | null = request.nextUrl.searchParams.get('limit');

  const sectionContent = await getSectionContent(section, limit);

  return NextResponse.json({ results: sectionContent });
}
