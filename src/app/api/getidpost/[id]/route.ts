import { NextResponse } from 'next/server';
import { getEditPost } from '../../repositories/posts';

export async function GET(request: any, { params }: any) {
  const gotContent = await getEditPost(Number(params.id));

  return NextResponse.json({ success: gotContent });
}
