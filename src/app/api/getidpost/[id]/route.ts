import { NextResponse } from 'next/server';
import { getEditPost } from '../../repositories/posts';

export async function GET(request: any, { params }: any) {
  const gotContent = await getEditPost(Number(params.id));

  // console.log('api: ', gotContent);

  return NextResponse.json({ success: gotContent });
}
