import { NextRequest, NextResponse } from 'next/server';
import { MorePosts } from '../repositories/posts';

export async function GET(request: NextRequest) {
  const slugException: string | null =
    request.nextUrl.searchParams.get('namepage');

  if (slugException) {
    const getMoreArticles = await MorePosts(slugException);
    return NextResponse.json({ content: getMoreArticles });
  }
}
