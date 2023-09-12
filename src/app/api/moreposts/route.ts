import { NextRequest, NextResponse } from 'next/server';
import { allnews } from '../repositories/posts';

export async function GET(request: NextRequest) {
  const postexception: string | null =
    request.nextUrl.searchParams.get('namepage');

  console.log('except: ', postexception);

  // const getAllContent = await allnews();

  return NextResponse.json({ content: true });
}
