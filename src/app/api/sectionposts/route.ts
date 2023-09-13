import { NextRequest, NextResponse } from 'next/server';

import { getSectionContent } from '../repositories/posts';

export async function GET(request: NextRequest) {
  const section: any = request.nextUrl.searchParams.get('section');
  const quantity: string | null = request.nextUrl.searchParams.get('quantity');

  const sectionContent = await getSectionContent(section, quantity);

  return NextResponse.json({ results: sectionContent });
}
